/**
 * Works Page - Search, filter, and view toggle functionality
 * Loads works from works.json and renders dynamically
 * URL params: ?tags=ML,AI&type=blog&q=search
 */

(function () {
    let works = [];
    let currentType = 'all';
    let currentTags = [];
    let currentView = 'list';
    let searchQuery = '';

    // DOM Elements
    const grid = document.querySelector('.works__grid');
    const searchInput = document.querySelector('.works__search-input');
    const searchClearBtn = document.querySelector('.works__search-clear');
    const clearAllBtn = document.querySelector('.works__clear-all');
    const typePills = document.querySelectorAll('.works__filter-pill[data-type]');
    const tagContainer = document.querySelector('.works__tags-container');
    const viewBtns = document.querySelectorAll('.works__view-btn');
    const countDisplay = document.querySelector('.works__count');

    // Update URL params (snappy, no page reload)
    function updateUrlParams() {
        const params = new URLSearchParams();
        if (currentType !== 'all') params.set('type', currentType);
        if (currentTags.length > 0) params.set('tags', currentTags.join(','));
        if (searchQuery) params.set('q', searchQuery);
        if (currentView !== 'list') params.set('view', currentView);
        const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
        history.replaceState(null, '', newUrl);
        updateClearButtonsVisibility();
    }

    // Update clear buttons visibility based on current filter state
    function updateClearButtonsVisibility() {
        // Search clear X - visible when there's text in the search
        if (searchClearBtn) {
            searchClearBtn.classList.toggle('visible', searchQuery.length > 0);
        }
        // Clear all button - visible when any filter is active
        const hasActiveFilters = currentType !== 'all' || currentTags.length > 0 || searchQuery.length > 0;
        if (clearAllBtn) {
            clearAllBtn.classList.toggle('visible', hasActiveFilters);
        }
    }

    // Clear all filters
    function clearAllFilters() {
        currentType = 'all';
        currentTags = [];
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        typePills.forEach(p => p.classList.toggle('active', p.dataset.type === 'all'));
        updateTagPills();
        updateUrlParams();
        render();
    }

    // Read URL params on init
    function readUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);

        // Tags (comma-separated or legacy single tag)
        const tagsParam = urlParams.get('tags');
        const tagParam = urlParams.get('tag'); // legacy support
        if (tagsParam) {
            currentTags = tagsParam.split(',').map(t => decodeURIComponent(t.trim())).filter(Boolean);
        } else if (tagParam) {
            currentTags = [decodeURIComponent(tagParam)];
        }

        // Type
        const typeParam = urlParams.get('type');
        if (typeParam && ['all', 'project', 'blog', 'publication'].includes(typeParam)) {
            currentType = typeParam;
        }

        // Search query
        const qParam = urlParams.get('q');
        if (qParam) {
            searchQuery = decodeURIComponent(qParam);
            if (searchInput) searchInput.value = searchQuery;
        }

        // View mode
        const viewParam = urlParams.get('view');
        if (viewParam && ['list', 'gallery'].includes(viewParam)) {
            currentView = viewParam;
        }
    }

    // Initialize
    async function init() {
        try {
            const response = await fetch('/content/works.json');
            works = await response.json();

            // Read URL params
            readUrlParams();

            // Update UI to reflect URL state
            if (currentType !== 'all') {
                typePills.forEach(p => p.classList.toggle('active', p.dataset.type === currentType));
            }
            if (currentView !== 'list') {
                viewBtns.forEach(b => b.classList.toggle('active', b.dataset.view === currentView));
            }

            renderTags();
            updateTagPills();
            render();
            updateClearButtonsVisibility();
        } catch (error) {
            console.error('Failed to load works:', error);
            if (grid) {
                grid.innerHTML = '<p>Failed to load works. Please try again later.</p>';
            }
        }
    }

    // Get unique tags from all works
    function getAllTags() {
        const tagCounts = {};
        works.forEach(work => {
            (work.tags || []).forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });
        return tagCounts;
    }

    // Render tag filter pills
    function renderTags() {
        if (!tagContainer) return;

        const tagCounts = getAllTags();
        tagContainer.innerHTML = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([tag, count]) => `
        <button class="works__filter-pill" data-tag="${tag}">
          ${tag}<span class="works__filter-pill-count">(${count})</span>
        </button>
      `).join('');

        // Add click handlers
        tagContainer.querySelectorAll('.works__filter-pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
                e.preventDefault();
                const tag = pill.dataset.tag;
                toggleTag(tag);
            });
        });
    }

    // Toggle tag selection
    function toggleTag(tag) {
        const index = currentTags.indexOf(tag);
        if (index === -1) {
            currentTags.push(tag);
        } else {
            currentTags.splice(index, 1);
        }
        updateTagPills();
        updateUrlParams();
        render();
    }

    // Update tag pill active states
    function updateTagPills() {
        if (!tagContainer) return;
        tagContainer.querySelectorAll('.works__filter-pill').forEach(pill => {
            const isActive = currentTags.includes(pill.dataset.tag);
            pill.classList.toggle('active', isActive);
        });
    }

    // Filter works
    function getFilteredWorks() {
        return works.filter(work => {
            // Type filter
            if (currentType !== 'all' && work.type !== currentType) {
                return false;
            }

            // Tag filter
            if (currentTags.length > 0) {
                const workTags = work.tags || [];
                if (!currentTags.some(tag => workTags.includes(tag))) {
                    return false;
                }
            }

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const searchable = `${work.title} ${work.subtitle} ${(work.tags || []).join(' ')}`.toLowerCase();
                if (!searchable.includes(query)) {
                    return false;
                }
            }

            return true;
        });
    }

    // Render works grid
    function render() {
        if (!grid) return;

        const filtered = getFilteredWorks();

        // Update count
        if (countDisplay) {
            countDisplay.textContent = `${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'}`;
        }

        // Update grid class
        grid.className = `works__grid ${currentView}`;

        if (filtered.length === 0) {
            grid.innerHTML = '<p class="works__empty">No works found matching your criteria.</p>';
            return;
        }

        grid.innerHTML = filtered.map(work => `
      <a href="${work.url}" class="work-card">
        <div class="work-card__thumbnail">
          <img src="${work.thumbnail || '/assets/thumbnails/default.png'}" alt="${work.title}" loading="lazy">
        </div>
        <div class="work-card__content">
          <h3 class="work-card__title">${work.title}</h3>
          <p class="work-card__subtitle">${work.subtitle || ''}</p>
          <div class="work-card__meta">
            <span class="work-card__date">${formatDate(work.date)}</span>
            <span>
              <span class="work-card__type">${work.type}</span>
              ${work.readingTime ? `<span class="work-card__reading-time">· ${work.readingTime} min</span>` : ''}
            </span>
          </div>
        </div>
      </a>
    `).join('');
    }

    // Format date
    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    // Set up event listeners
    function setupListeners() {
        // Search
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                updateUrlParams();
                render();
            });
        }

        // Search clear X button
        if (searchClearBtn) {
            searchClearBtn.addEventListener('click', () => {
                searchQuery = '';
                if (searchInput) searchInput.value = '';
                updateUrlParams();
                render();
            });
        }

        // Clear all filters button
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', clearAllFilters);
        }

        // Type filters
        typePills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                e.preventDefault();
                currentType = pill.dataset.type;
                typePills.forEach(p => p.classList.toggle('active', p === pill));
                updateUrlParams();
                render();
            });
        });

        // View toggle
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentView = btn.dataset.view;
                viewBtns.forEach(b => b.classList.toggle('active', b === btn));
                updateUrlParams();
                render();
            });
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupListeners();
            init();
        });
    } else {
        setupListeners();
        init();
    }
})();
