/**
 * Bufo library - instant search over the bufo catalog.
 *
 * One click or tap on a card always opens the preview; the preview then offers
 * only the actions that genuinely work for that file on that device:
 *   - Copy   PNG/JPG only, since no browser can put an animation on the
 *            clipboard
 *   - Share  where the Web Share API accepts files - on phones this hands the
 *            real file to WhatsApp and works for PNG and GIF alike
 *   - Download / Copy link  always available
 */

(function () {
    'use strict';

    const CATALOG_URL = '/assets/bufo/catalog.json';
    const FULL_BASE = '/assets/bufo/full/';
    const THUMB_BASE = '/assets/bufo/thumb/';
    const PAGE_SIZE = 120;

    const QUICK_TAGS = [
        'happy', 'sad', 'angry', 'love', 'cry', 'laugh', 'celebration',
        'dance', 'approve', 'disagree', 'confused', 'worry', 'shock',
        'tired', 'cute', 'gratitude', 'greetings', 'farewell', 'food',
        'animated'
    ];

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    // Same snap point as the works sidebar, kept in step with the CSS.
    const FILTER_BREAKPOINT = window.matchMedia('(max-width: 1024px)');

    let catalog = null;
    let bufos = [];
    let tagNames = [];
    let synonyms = {};
    let results = [];
    let rendered = 0;
    let filter = 'all';
    let query = '';

    const el = {};

    // ---------------------------------------------------------------- helpers

    function fullUrl(b) {
        return FULL_BASE + b.id + '.' + b.ext;
    }

    function thumbUrl(b) {
        return THUMB_BASE + b.id + '-' + b.ext + '.webp';
    }

    function absoluteUrl(path) {
        return new URL(path, location.origin).href;
    }

    function displayName(id) {
        return id.replace(/[-_]+/g, ' ').trim();
    }

    function normalise(text) {
        return text
            .toLowerCase()
            .normalize('NFC')
            .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
            .trim();
    }

    /** Levenshtein distance, but bails out as soon as it exceeds `max`. */
    function withinDistance(a, b, max) {
        if (Math.abs(a.length - b.length) > max) return false;
        let prev = new Array(b.length + 1);
        for (let j = 0; j <= b.length; j++) prev[j] = j;
        for (let i = 1; i <= a.length; i++) {
            const cur = [i];
            let best = i;
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
                if (cur[j] < best) best = cur[j];
            }
            if (best > max) return false;
            prev = cur;
        }
        return prev[b.length] <= max;
    }

    // ----------------------------------------------------------------- search

    /**
     * Score one bufo against one query term. Returns 0 when the term does not
     * match at all, which makes multi-term queries behave as AND.
     */
    function scoreTerm(bufo, term, expanded) {
        let tagScore = 0;
        for (const tag of bufo.tags) {
            if (tag === term) tagScore = Math.max(tagScore, 100);
            else if (expanded.has(tag)) tagScore = Math.max(tagScore, 70);
            else if (tag.startsWith(term) && term.length >= 3) tagScore = Math.max(tagScore, 50);
        }

        // An exact name match outweighs a bare tag match on purpose: a good
        // third of the collection carries no tags at all, and a file literally
        // called "bufo-angry" is a better hit for "angry" than some unrelated
        // bufo that merely happens to be tagged angry.
        let nameScore = 0;
        for (const token of bufo.tokens) {
            if (token === term) nameScore = Math.max(nameScore, 110);
            else if (token.startsWith(term)) nameScore = Math.max(nameScore, 45);
            else if (term.length >= 4 && token.includes(term)) nameScore = Math.max(nameScore, 20);
        }

        // Tag and name are added, not max'd: a bufo actually called "thanks"
        // has to outrank every other bufo merely tagged "gratitude".
        if (tagScore || nameScore) return tagScore + nameScore;

        // Typo tolerance, only for terms long enough that one edit is meaningful.
        if (term.length >= 4) {
            for (const tag of bufo.tags) {
                if (withinDistance(tag, term, 1)) return 30;
            }
            for (const token of bufo.tokens) {
                if (withinDistance(token, term, 1)) return 25;
            }
        }
        return 0;
    }

    function search(raw) {
        const terms = normalise(raw).split(/\s+/).filter(Boolean);
        let pool = bufos;

        if (filter === 'static') pool = pool.filter(b => !b.animated);
        else if (filter === 'animated') pool = pool.filter(b => b.animated);

        if (!terms.length) {
            // No query: lead with the best-described bufos, then short names.
            return pool.slice().sort((a, b) =>
                b.tags.length - a.tags.length ||
                a.id.length - b.id.length ||
                (a.id < b.id ? -1 : 1)
            );
        }

        const expansions = terms.map(t => new Set(synonyms[t] || []));
        const scored = [];

        for (const bufo of pool) {
            let total = 0;
            let ok = true;
            for (let i = 0; i < terms.length; i++) {
                const s = scoreTerm(bufo, terms[i], expansions[i]);
                if (!s) { ok = false; break; }
                total += s;
            }
            if (!ok) continue;
            // Nudge concise names up: "bufo-happy" beats a long sentence name.
            total -= Math.min(bufo.tokens.length, 8) * 0.6;
            scored.push([total, bufo]);
        }

        scored.sort((a, b) =>
            b[0] - a[0] || a[1].id.length - b[1].id.length ||
            (a[1].id < b[1].id ? -1 : 1)
        );
        return scored.map(s => s[1]);
    }

    // ---------------------------------------------------------------- actions

    function toast(message, tone) {
        el.toast.textContent = message;
        el.toast.className = 'bufo-toast is-visible' + (tone ? ' is-' + tone : '');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
            el.toast.className = 'bufo-toast';
        }, 2600);
    }

    async function asPngBlob(blob) {
        if (blob.type === 'image/png') return blob;
        const bitmap = await createImageBitmap(blob);
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        canvas.getContext('2d').drawImage(bitmap, 0, 0);
        return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    }

    function canCopyImages() {
        return !!(window.ClipboardItem && navigator.clipboard && navigator.clipboard.write);
    }

    async function copyImage(bufo) {
        if (!canCopyImages()) throw new Error('unsupported');
        const url = fullUrl(bufo);
        const blobPromise = fetch(url).then(r => r.blob()).then(asPngBlob);
        try {
            // Safari needs the ClipboardItem created inside the gesture, so hand
            // it the promise rather than awaiting first.
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blobPromise })
            ]);
        } catch (err) {
            const blob = await blobPromise;
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]);
        }
    }

    async function copyLink(bufo) {
        await navigator.clipboard.writeText(absoluteUrl(fullUrl(bufo)));
    }

    async function shareFile(bufo) {
        const url = fullUrl(bufo);
        const blob = await fetch(url).then(r => r.blob());
        const file = new File([blob], bufo.id + '.' + bufo.ext, { type: blob.type });
        if (!navigator.canShare || !navigator.canShare({ files: [file] })) {
            throw new Error('unsupported');
        }
        await navigator.share({ files: [file] });
    }

    function download(bufo) {
        const a = document.createElement('a');
        a.href = fullUrl(bufo);
        a.download = bufo.id + '.' + bufo.ext;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    function canShareFiles() {
        return !!(navigator.canShare && navigator.share);
    }

    // --------------------------------------------------------------- rendering

    function card(bufo) {
        const button = document.createElement('button');
        button.className = 'bufo-card';
        button.type = 'button';
        button.dataset.id = bufo.key;
        button.setAttribute('aria-label', displayName(bufo.id));
        button.title = displayName(bufo.id);

        const img = document.createElement('img');
        img.src = thumbUrl(bufo);
        img.alt = displayName(bufo.id);
        img.loading = 'lazy';
        img.decoding = 'async';
        img.draggable = false;
        img.width = 96;
        img.height = 96;
        button.appendChild(img);
        return button;
    }

    function renderMore() {
        if (rendered >= results.length) return;
        const slice = results.slice(rendered, rendered + PAGE_SIZE);
        const frag = document.createDocumentFragment();
        for (const bufo of slice) frag.appendChild(card(bufo));
        el.grid.appendChild(frag);
        rendered += slice.length;
        el.sentinel.hidden = rendered >= results.length;
    }

    function render() {
        results = search(query);
        rendered = 0;
        el.grid.replaceChildren();
        el.empty.hidden = results.length > 0;
        el.count.textContent = results.length === bufos.length
            ? results.length.toLocaleString() + ' bufos'
            : results.length.toLocaleString() + ' of ' + bufos.length.toLocaleString();
        renderMore();
    }

    // ---------------------------------------------------------------- preview

    let previewBufo = null;
    let lastFocus = null;

    function openPreview(bufo) {
        previewBufo = bufo;
        lastFocus = document.activeElement;

        el.previewImg.src = fullUrl(bufo);
        el.previewImg.alt = displayName(bufo.id);
        el.previewName.textContent = displayName(bufo.id);
        el.previewMeta.textContent =
            bufo.ext.toUpperCase() + ' · ' + bufo.w + '×' + bufo.h +
            ' · ' + (bufo.animated ? 'animated' : 'static');

        el.previewTags.replaceChildren();
        for (const tag of bufo.tags) {
            if (tag === 'animated') continue;
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'pill pill--filled';
            chip.textContent = tag;
            chip.addEventListener('click', () => {
                closePreview();
                el.input.value = tag;
                query = tag;
                render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            el.previewTags.appendChild(chip);
        }

        // Only offer what this browser can genuinely do with this format. No
        // browser can put an animation on the clipboard, so GIFs get no Copy
        // button at all rather than one that quietly fails.
        const copyable = bufo.ext !== 'gif' && canCopyImages();
        el.previewCopy.hidden = !copyable;
        el.previewShare.hidden = !canShareFiles();

        // Whichever action is the best available one gets the accent.
        const primary = !el.previewCopy.hidden ? el.previewCopy
            : !el.previewShare.hidden ? el.previewShare
                : el.previewDownload;
        for (const button of [el.previewCopy, el.previewShare, el.previewDownload, el.previewLink]) {
            button.classList.toggle('bufo-action--primary', button === primary);
        }

        el.preview.hidden = false;
        document.body.classList.add('bufo-preview-open');
        el.previewClose.focus();
    }

    function closePreview() {
        if (el.preview.hidden) return;
        el.preview.hidden = true;
        el.previewImg.removeAttribute('src');
        previewBufo = null;
        document.body.classList.remove('bufo-preview-open');
        if (lastFocus && lastFocus.isConnected) lastFocus.focus();
    }

    // ------------------------------------------------------------------ events

    function bufoFromEvent(event) {
        const button = event.target.closest('.bufo-card');
        if (!button) return null;
        return bufos.find(b => b.key === button.dataset.id) || null;
    }

    function wireGrid() {
        // One click, one behaviour, everywhere: open the preview and let the
        // user pick from the actions that actually work on their device.
        // Enter and Space arrive here too, since every card is a real button.
        el.grid.addEventListener('click', event => {
            const bufo = bufoFromEvent(event);
            if (bufo) openPreview(bufo);
        });
    }

    function wirePreview() {
        el.previewClose.addEventListener('click', closePreview);
        el.preview.addEventListener('click', event => {
            if (event.target === el.preview) closePreview();
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') closePreview();
        });

        el.previewCopy.addEventListener('click', async () => {
            if (!previewBufo) return;
            try {
                await copyImage(previewBufo);
                toast('Copied — paste it anywhere');
            } catch (err) {
                toast('Image copy unavailable here', 'error');
            }
        });

        el.previewShare.addEventListener('click', async () => {
            if (!previewBufo) return;
            try {
                await shareFile(previewBufo);
            } catch (err) {
                if (err && err.name === 'AbortError') return;
                toast('Sharing unavailable here', 'error');
            }
        });

        el.previewDownload.addEventListener('click', () => {
            if (previewBufo) download(previewBufo);
        });

        el.previewLink.addEventListener('click', async () => {
            if (!previewBufo) return;
            try {
                await copyLink(previewBufo);
                toast('Link copied');
            } catch (err) {
                toast('Could not copy link', 'error');
            }
        });
    }

    function wireSearch() {
        let frame = null;
        const update = () => {
            query = el.input.value;
            if (frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                render();
                const params = new URLSearchParams(location.search);
                if (query.trim()) params.set('q', query.trim());
                else params.delete('q');
                const next = params.toString();
                history.replaceState(null, '', next ? '?' + next : location.pathname);
                updateFilterToggleState();
            });
        };

        el.input.addEventListener('input', update);
        el.clear.addEventListener('click', () => {
            el.input.value = '';
            update();
            el.input.focus();
        });

        el.filters.addEventListener('click', event => {
            const button = event.target.closest('[data-filter]');
            if (!button) return;
            filter = button.dataset.filter;
            for (const b of el.filters.querySelectorAll('[data-filter]')) {
                b.classList.toggle('is-active', b === button);
                b.setAttribute('aria-pressed', String(b === button));
            }
            render();
            updateFilterToggleState();
        });

        // "/" focuses the search from anywhere, Escape clears it.
        document.addEventListener('keydown', event => {
            if (event.key === '/' && document.activeElement !== el.input) {
                event.preventDefault();
                el.input.focus();
                el.input.select();
            } else if (event.key === 'Escape' && document.activeElement === el.input && el.input.value) {
                el.input.value = '';
                update();
            }
        });
    }

    function buildQuickTags() {
        const available = new Set(tagNames);
        for (const tag of QUICK_TAGS) {
            if (!available.has(tag)) continue;
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'pill pill--filled';
            chip.textContent = tag;
            chip.addEventListener('click', () => {
                el.input.value = el.input.value.trim() === tag ? '' : tag;
                el.input.dispatchEvent(new Event('input'));
            });
            el.quickTags.appendChild(chip);
        }

        // The tag row scrolls sideways with no visible scrollbar, so translate a
        // vertical wheel into horizontal movement. Hand the gesture back to the
        // page once the row has nothing left to give in that direction - but
        // clamp rather than bail, or a single 120px notch would overshoot a
        // short row and scroll nothing at all.
        el.quickTags.addEventListener('wheel', event => {
            if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
            const row = el.quickTags;
            const max = row.scrollWidth - row.clientWidth;
            if (max <= 0) return;
            if (event.deltaY < 0 && row.scrollLeft <= 0) return;
            if (event.deltaY > 0 && row.scrollLeft >= max - 1) return;
            event.preventDefault();
            row.scrollLeft = Math.max(0, Math.min(max, row.scrollLeft + event.deltaY));
        }, { passive: false });

        el.quickTags.addEventListener('scroll', updateTagFade, { passive: true });
        window.addEventListener('resize', updateTagFade);
        updateTagFade();
    }

    // ---------------------------------------------------------- filter overlay

    /**
     * Below the breakpoint the filter group is moved into the overlay panel and
     * above it back into the sticky bar. Moving the one group beats rendering a
     * second copy: there is no state to mirror and no way for the two to drift.
     */
    function placeFilters() {
        const inOverlay = FILTER_BREAKPOINT.matches;
        const target = inOverlay ? el.overlayBody : el.filterSlot;
        if (el.filterGroup.parentElement !== target) {
            target.appendChild(el.filterGroup);
        }
        el.filterGroup.classList.toggle('is-stacked', inOverlay);
        if (!inOverlay) {
            closeFilters();
            updateTagFade();
        }
    }

    function openFilters() {
        el.filterOverlay.classList.add('open');
        el.filterToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeFilters() {
        if (!el.filterOverlay.classList.contains('open')) return;
        el.filterOverlay.classList.remove('open');
        el.filterToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function wireFilterOverlay() {
        el.filterToggle.addEventListener('click', () => {
            if (el.filterOverlay.classList.contains('open')) closeFilters();
            else openFilters();
        });

        el.filterOverlay.addEventListener('click', event => {
            if (event.target.closest('[data-close-filters]')) closeFilters();
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') closeFilters();
        });

        FILTER_BREAKPOINT.addEventListener('change', placeFilters);
        placeFilters();
    }

    /** Mark the toggle when a filter other than the default is in play. */
    function updateFilterToggleState() {
        el.filterToggle.classList.toggle('is-active', filter !== 'all' || query.trim() !== '');
    }

    /**
     * Fade whichever edge the tag row continues past, so it is obvious there
     * are more tags than fit. Nothing is faded when everything already fits.
     */
    function updateTagFade() {
        const row = el.quickTags;
        const max = row.scrollWidth - row.clientWidth;
        if (max <= 1) {
            delete row.dataset.overflow;
            return;
        }
        const atStart = row.scrollLeft <= 1;
        const atEnd = row.scrollLeft >= max - 1;
        row.dataset.overflow = atStart ? 'end' : atEnd ? 'start' : 'both';
    }

    // -------------------------------------------------------------------- init

    async function init() {
        el.input = document.getElementById('bufo-q');
        el.clear = document.getElementById('bufo-clear');
        el.filters = document.getElementById('bufo-filters');
        el.quickTags = document.getElementById('bufo-quick-tags');
        el.filterGroup = document.getElementById('bufo-filter-group');
        el.filterSlot = document.getElementById('bufo-filter-slot');
        el.filterToggle = document.getElementById('bufo-filter-toggle');
        el.filterOverlay = document.getElementById('bufo-filter-overlay');
        el.overlayBody = document.getElementById('bufo-filter-overlay-body');
        el.grid = document.getElementById('bufo-grid');
        el.sentinel = document.getElementById('bufo-sentinel');
        el.count = document.getElementById('bufo-count');
        el.empty = document.getElementById('bufo-empty');
        el.toast = document.getElementById('bufo-toast');
        el.preview = document.getElementById('bufo-preview');
        el.previewImg = document.getElementById('bufo-preview-img');
        el.previewName = document.getElementById('bufo-preview-name');
        el.previewMeta = document.getElementById('bufo-preview-meta');
        el.previewTags = document.getElementById('bufo-preview-tags');
        el.previewClose = document.getElementById('bufo-preview-close');
        el.previewCopy = document.getElementById('bufo-preview-copy');
        el.previewShare = document.getElementById('bufo-preview-share');
        el.previewDownload = document.getElementById('bufo-preview-download');
        el.previewLink = document.getElementById('bufo-preview-link');

        let data;
        try {
            const response = await fetch(CATALOG_URL);
            if (!response.ok) throw new Error(response.status);
            data = await response.json();
        } catch (err) {
            el.count.textContent = 'Could not load the bufo catalog.';
            return;
        }

        catalog = data;
        tagNames = data.tags;
        synonyms = data.synonyms;
        const extensions = data.extensions;

        bufos = data.bufos.map(row => {
            const ext = extensions[row[1]];
            return {
                id: row[0],
                key: row[0] + '.' + ext,
                ext: ext,
                animated: row[2] === 1,
                w: row[3],
                h: row[4],
                tags: row[5].map(i => tagNames[i]),
                tokens: row[6]
            };
        });

        buildQuickTags();
        wireSearch();
        wireGrid();
        wirePreview();
        wireFilterOverlay();

        const initial = new URLSearchParams(location.search).get('q');
        if (initial) {
            el.input.value = initial;
            query = initial;
        }
        render();

        new IntersectionObserver(entries => {
            if (entries.some(e => e.isIntersecting)) renderMore();
        }, { rootMargin: '600px' }).observe(el.sentinel);

        // Only steal focus where a keyboard is already present; on touch this
        // would shove the results off-screen behind the on-screen keyboard.
        if (!isTouch) el.input.focus();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
