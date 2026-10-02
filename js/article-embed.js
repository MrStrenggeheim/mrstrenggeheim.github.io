// Article examples inherit the website theme and resize to their content.
(() => {
  /* Lucide RotateCcw — https://lucide.dev/icons/rotate-ccw
   * ISC License, Copyright (c) 2026 Lucide Icons and Contributors.
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   */
  for (const button of document.querySelectorAll('[data-demo-reset]')) {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>';
  }

  let parentRoot;
  try {
    if (window.parent !== window) parentRoot = window.parent.document.documentElement;
  } catch (_) {
    // External embeds use the reader's system theme.
  }
  const preference = matchMedia('(prefers-color-scheme: dark)');
  const syncTheme = () => {
    const theme = parentRoot?.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', theme || (preference.matches ? 'dark' : 'light'));
  };
  syncTheme();
  preference.addEventListener('change', syncTheme);
  if (parentRoot) {
    new MutationObserver(syncTheme).observe(parentRoot, { attributes: true, attributeFilter: ['data-theme'] });
  }

  if (window.parent === window) return;
  const resize = () => {
    const height = Math.ceil(document.body.getBoundingClientRect().height);
    try {
      const frame = window.frameElement;
      if (frame && height > 0) {
        // The site's border-box sizing includes the frame border in its height.
        const border = frame.offsetHeight - frame.clientHeight;
        frame.style.height = `${height + border}px`;
      }
    } catch (_) {
      // External embeds keep the height chosen by their host.
    }
  };
  new ResizeObserver(resize).observe(document.body);
  resize();
})();
