/**
 * Landing Page - Two-state scroll behavior
 * State 1: 100vh hero (full)
 * State 2: 50vh hero + bio
 */

(function () {
    const landingWrapper = document.querySelector('.landing-wrapper');
    const hero = document.querySelector('.hero');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (!landingWrapper || !hero) return;

    // State tracking
    let isScrolled = false;
    let isAnimating = false;

    // Threshold for state change
    const SCROLL_THRESHOLD = 100;

    function goToState2() {
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
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    landingWrapper.addEventListener('touchmove', (e) => {
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
