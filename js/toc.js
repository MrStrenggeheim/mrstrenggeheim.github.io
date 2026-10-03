/** Article TOC: desktop sidebar and mobile section picker. */
(function () {
    const toc = document.querySelector('.article__toc');
    const tocList = document.querySelector('.article__toc-list');
    const articleContent = document.querySelector('.article__content');
    if (!toc || !tocList || !articleContent) return;

    const mobile = window.matchMedia('(max-width: 1024px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tocItems = [];
    articleContent.querySelectorAll('h1, h2, h3').forEach((heading, index) => {
        if (!heading.id) heading.id = `heading-${index}`;
        const li = document.createElement('li');
        li.className = 'article__toc-item';
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.className = `article__toc-link level-${heading.tagName.slice(1)}`;
        link.textContent = heading.textContent;
        li.appendChild(link);
        tocList.appendChild(li);
        tocItems.push({ element: heading, link });
    });
    if (!tocItems.length) return;

    function updateActiveLink() {
        let currentItem = null;
        for (const item of tocItems) {
            if (item.element.getBoundingClientRect().top <= 100) currentItem = item;
        }
        tocItems.forEach(item => {
            item.link.classList.toggle('active', item === currentItem);
            if (item === currentItem) item.link.setAttribute('aria-current', 'location');
            else item.link.removeAttribute('aria-current');
        });
    }
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { updateActiveLink(); ticking = false; });
    }, { passive: true });
    updateActiveLink();

    const title = toc.querySelector('.article__toc-title');
    toc.id ||= 'article-toc';
    if (title) title.id ||= 'article-toc-title';
    const panel = document.createElement('div');
    panel.className = 'article__toc-panel';
    panel.id = `${toc.id}-panel`;
    const panelInner = document.createElement('div');
    panelInner.className = 'article__toc-panel-inner';
    if (title) panelInner.appendChild(title);
    panelInner.appendChild(tocList);
    panel.appendChild(panelInner);

    const backdrop = document.createElement('div');
    backdrop.className = 'toc-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    const fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'toc-fab';
    fab.setAttribute('aria-label', 'Open table of contents');
    fab.setAttribute('aria-controls', panel.id);
    fab.setAttribute('aria-expanded', 'false');
    fab.innerHTML = '<span class="toc-fab__label" aria-hidden="true">On this page</span><svg class="toc-fab__open" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h12M8 12h12M8 18h8M4 6h.01M4 12h.01M4 18h.01"/></svg><svg class="toc-fab__close" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="m6 6 12 12M6 18 18 6"/></svg>';
    const closeToggle = fab.cloneNode(true);
    closeToggle.className = 'toc-close';
    closeToggle.setAttribute('aria-label', 'Close table of contents');
    const surface = document.createElement('div');
    surface.className = 'article__toc-surface';
    surface.append(panel, closeToggle);
    toc.append(surface, fab);
    document.body.appendChild(backdrop);
    surface.inert = mobile.matches;
    let open = false;
    let previousOverflow = '';
    function setOpen(next, restoreFocus = true) {
        next = next && mobile.matches;
        if (open === next) return;
        open = next;
        toc.classList.toggle('toc-overlay-open', open);
        backdrop.classList.toggle('is-open', open);
        surface.inert = mobile.matches && !open;
        closeToggle.setAttribute('aria-expanded', String(open));
        fab.setAttribute('aria-expanded', String(open));
        fab.setAttribute('aria-label', open ? 'Close table of contents' : 'Open table of contents');
        if (open) {
            previousOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            toc.setAttribute('role', 'dialog');
            toc.setAttribute('aria-modal', 'true');
            if (title) toc.setAttribute('aria-labelledby', title.id);
            const current = tocList.querySelector('.active') || tocItems[0].link;
            current.focus({ preventScroll: true });
            current.scrollIntoView({ block: 'nearest' });
        } else {
            document.body.style.overflow = previousOverflow;
            toc.removeAttribute('role');
            toc.removeAttribute('aria-modal');
            toc.removeAttribute('aria-labelledby');
            if (restoreFocus && mobile.matches) fab.focus({ preventScroll: true });
        }
    }
    fab.addEventListener('click', () => setOpen(true));
    closeToggle.addEventListener('click', () => setOpen(false));
    backdrop.addEventListener('click', () => setOpen(false));
    mobile.addEventListener('change', () => {
        setOpen(false, false);
        surface.inert = mobile.matches;
    });
    document.addEventListener('keydown', event => {
        if (!open) return;
        if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
        if (event.key === 'Tab') {
            const controls = [...tocList.querySelectorAll('a'), closeToggle];
            const current = controls.indexOf(document.activeElement);
            if (event.shiftKey && current <= 0) { event.preventDefault(); closeToggle.focus(); }
            else if (!event.shiftKey && (current === controls.length - 1 || current < 0)) {
                event.preventDefault(); controls[0].focus();
            }
        }
    });
    let finishNavigation = null;
    function cancelNavigation() {
        if (finishNavigation) window.removeEventListener('scrollend', finishNavigation);
        finishNavigation = null;
    }
    window.addEventListener('wheel', cancelNavigation, { passive: true });
    window.addEventListener('touchstart', cancelNavigation, { passive: true });
    window.addEventListener('keydown', cancelNavigation);
    tocList.addEventListener('click', event => {
        const link = event.target.closest('a');
        if (!link) return;
        const target = document.getElementById(link.getAttribute('href').slice(1));
        if (!target) return;
        event.preventDefault();
        setOpen(false);
        cancelNavigation();
        if (Math.abs(target.getBoundingClientRect().top - 80) <= 2) return;
        // Lazy embeds may resize while scrolling past them. Align once at the end.
        finishNavigation = () => {
            const offset = target.getBoundingClientRect().top - 80;
            if (Math.abs(offset) > 2) window.scrollTo({ top: window.scrollY + offset, behavior: 'instant' });
            finishNavigation = null;
        };
        window.addEventListener('scrollend', finishNavigation, { once: true });
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80,
            behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    });
})();
