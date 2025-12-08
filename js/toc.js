/**
 * Article TOC - Sticky sidebar with scroll highlighting
 * Auto-generates table of contents from h2/h3 headings
 */

(function () {
    const tocList = document.querySelector('.article__toc-list');
    const articleContent = document.querySelector('.article__content');

    if (!tocList || !articleContent) return;

    const headings = articleContent.querySelectorAll('h2, h3');
    const tocItems = [];

    // Generate TOC
    headings.forEach((heading, index) => {
        // Add ID to heading if not present
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }

        const level = heading.tagName.toLowerCase();
        const li = document.createElement('li');
        li.className = 'article__toc-item';

        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.className = `article__toc-link level-${level.charAt(1)}`;
        a.textContent = heading.textContent;

        li.appendChild(a);
        tocList.appendChild(li);

        tocItems.push({
            element: heading,
            link: a
        });
    });

    // Highlight current section on scroll
    function updateActiveLink() {
        const scrollY = window.scrollY + 100; // Offset for header

        let currentItem = null;

        for (const item of tocItems) {
            if (item.element.offsetTop <= scrollY) {
                currentItem = item;
            }
        }

        tocItems.forEach(item => {
            item.link.classList.toggle('active', item === currentItem);
        });
    }

    // Throttle scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial update
    updateActiveLink();

    // Smooth scroll on click
    tocList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
})();
