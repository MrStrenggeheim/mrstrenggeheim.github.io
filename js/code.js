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
});
