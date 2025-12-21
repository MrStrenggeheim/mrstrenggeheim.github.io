/**
 * Theme Toggle - Light/Dark mode switcher
 * Persists preference in localStorage
 */

(function () {
    const STORAGE_KEY = 'theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    // Get stored theme or default to dark
    function getStoredTheme() {
        return localStorage.getItem(STORAGE_KEY) || DARK;
    }

    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleIcon(theme);
    }

    // Update toggle button icon
    function updateToggleIcon(theme) {
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;

        // Use SVG sprite references
        const sunIcon = `<svg><use href="/assets/icons.svg#icon-sun"></use></svg>`;
        const moonIcon = `<svg><use href="/assets/icons.svg#icon-moon"></use></svg>`;

        toggle.innerHTML = theme === DARK ? sunIcon : moonIcon;
        toggle.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // Toggle theme
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || DARK;
        const next = current === DARK ? LIGHT : DARK;
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    }

    // Initialize on DOM ready
    function init() {
        // Apply theme immediately
        applyTheme(getStoredTheme());

        // Set up toggle button
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', toggleTheme);
        }

        // Set up mobile menu
        const burger = document.querySelector('.header__burger');
        const navLinks = document.querySelector('.header__nav-links');
        if (burger && navLinks) {
            burger.addEventListener('click', () => {
                navLinks.classList.toggle('open');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (navLinks.classList.contains('open') &&
                    !navLinks.contains(e.target) &&
                    !burger.contains(e.target)) {
                    navLinks.classList.remove('open');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }

    // Run init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
