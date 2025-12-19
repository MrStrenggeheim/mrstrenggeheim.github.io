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

        const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
        const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;

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
