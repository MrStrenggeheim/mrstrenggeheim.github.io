/**
 * Landing Page - Desktop reveal and native mobile scroll snapping
 * State 1: 100vh hero (full)
 * State 2: 50vh hero + bio
 */

(function () {
    const landingWrapper = document.querySelector('.landing-wrapper');
    const hero = document.querySelector('.hero');
    const bio = document.querySelector('.bio');
    const mobile = window.matchMedia('(max-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (!landingWrapper || !hero || !bio) return;

    // State tracking
    let isScrolled = false;
    let isAnimating = false;

    // Threshold for state change
    const SCROLL_THRESHOLD = 100;

    function goToState2() {
        if (mobile.matches) {
            bio.scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'instant' : 'smooth' });
            return;
        }
        if (isScrolled || isAnimating) return;
        isAnimating = true;
        isScrolled = true;

        hero.classList.add('scrolled');
        if (scrollIndicator) scrollIndicator.classList.add('hidden');

        setTimeout(() => {
            isAnimating = false;
        }, 400);
    }

    function goToState1() {
        if (mobile.matches) {
            landingWrapper.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
            return;
        }
        if (!isScrolled || isAnimating) return;
        isAnimating = true;
        isScrolled = false;

        hero.classList.remove('scrolled');
        if (scrollIndicator) scrollIndicator.classList.remove('hidden');

        // Scroll to top
        landingWrapper.scrollTop = 0;

        setTimeout(() => {
            isAnimating = false;
        }, 400);
    }

    // Handle wheel events for state switching
    landingWrapper.addEventListener('wheel', (e) => {
        if (mobile.matches) return;
        if (isAnimating) {
            e.preventDefault();
            return;
        }

        // Scrolling down
        if (e.deltaY > 0 && !isScrolled) {
            e.preventDefault();
            goToState2();
        }
        // Scrolling up from top of bio section
        else if (e.deltaY < 0 && isScrolled && landingWrapper.scrollTop < SCROLL_THRESHOLD) {
            e.preventDefault();
            goToState1();
        }
    }, { passive: false });

    // Handle touch events for mobile
    let touchStartY = 0;
    landingWrapper.addEventListener('touchstart', (e) => {
        if (mobile.matches) return;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    landingWrapper.addEventListener('touchmove', (e) => {
        if (mobile.matches) return;
        if (isAnimating) return;

        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;

        // Swipe down (scroll up)
        if (deltaY < -30 && isScrolled && landingWrapper.scrollTop < SCROLL_THRESHOLD) {
            goToState1();
        }
        // Swipe up (scroll down)
        else if (deltaY > 30 && !isScrolled) {
            goToState2();
        }
    }, { passive: true });

    // Mobile follows native scrolling and CSS snapping instead of resizing the hero.
    function updateMobileIndicator() {
        if (!mobile.matches || !scrollIndicator) return;
        scrollIndicator.classList.toggle('hidden', landingWrapper.scrollTop > hero.clientHeight / 2);
    }
    landingWrapper.addEventListener('scroll', updateMobileIndicator, { passive: true });
    mobile.addEventListener('change', () => {
        isScrolled = false;
        isAnimating = false;
        hero.classList.remove('scrolled');
        if (scrollIndicator) scrollIndicator.classList.remove('hidden');
        landingWrapper.scrollTo({ top: 0, behavior: 'instant' });
    });

    // Handle scroll indicator click
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            goToState2();
        });
    }

    // Handle "About" nav link - go to State 2
    const aboutLink = document.querySelector('a.header__nav-link[href="/"]');
    if (aboutLink && landingWrapper) {
        aboutLink.addEventListener('click', (e) => {
            if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                e.preventDefault();
                document.querySelector('.header__nav-links')?.classList.remove('open');
                document.body.classList.remove('menu-open');
                goToState2();
            }
        });
    }

    // Handle logo click - go to State 1
    const logoLink = document.querySelector('.header__logo');
    if (logoLink && landingWrapper) {
        logoLink.addEventListener('click', (e) => {
            if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                e.preventDefault();
                goToState1();
            }
        });
    }
})();
