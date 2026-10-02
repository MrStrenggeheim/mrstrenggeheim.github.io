/**
 * Code Block Enhancements
 * - Adds line-numbers class to all code blocks
 * - Ensures Prism.js applies properly
 */

document.addEventListener('DOMContentLoaded', function () {
    // Add line-numbers class to all pre elements for Prism line numbers plugin
    document.querySelectorAll('pre').forEach(function (pre) {
        pre.classList.add('line-numbers');
    });

    // Re-highlight if Prism is available (in case DOM was modified)
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    document.querySelectorAll('.copy-to-clipboard-button').forEach(function (button) {
        button.title = 'Copy code';
        const label = button.querySelector('span');
        label.classList.add('sr-only');
        label.setAttribute('aria-live', 'polite');
        label.setAttribute('aria-atomic', 'true');
        button.insertAdjacentHTML('beforeend', '<svg class="code-copy__icon" viewBox="0 0 24 24" aria-hidden="true"><use href="/assets/icons.svg#icon-copy"></use></svg><svg class="code-copy__check" viewBox="0 0 24 24" aria-hidden="true"><use href="/assets/icons.svg#icon-check"></use></svg>');
    });
});
