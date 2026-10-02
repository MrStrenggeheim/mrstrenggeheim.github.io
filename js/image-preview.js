/** Image previews for article covers and inline figures. */
(() => {
  const article = document.querySelector('.article');
  if (!article || typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;

  const isImageUrl = url => /\.(avif|bmp|gif|jpe?g|png|svg|webp)(?:$|[?#])/i.test(url);
  const eligible = image => {
    if (image.closest('.link-preview')) return false;
    const link = image.closest('a');
    return !link || !link.hasAttribute('download') && (isImageUrl(link.href) || link.href === image.src || link.href === image.currentSrc);
  };
  const source = image => {
    const link = image.closest('a');
    return link && isImageUrl(link.href) ? link.href : image.currentSrc || image.src;
  };
  const dialog = document.createElement('dialog');
  dialog.className = 'image-preview';
  dialog.setAttribute('aria-labelledby', 'image-preview-title');
  dialog.innerHTML = `
    <div class="image-preview__toolbar">
      <span class="image-preview__title" id="image-preview-title">Image preview</span>
      <span class="image-preview__count" aria-live="polite"></span>
      <button type="button" data-action="close" aria-label="Close image preview" title="Close (Escape)" autofocus><svg viewBox="0 0 24 24" aria-hidden="true"><use href="/assets/icons.svg#icon-close"></use></svg></button>
    </div>
    <div class="image-preview__view">
      <button type="button" class="image-preview__nav" data-action="previous" aria-label="Previous image" title="Previous image (left arrow)">&lt;</button>
      <div class="image-preview__stage">
        <img class="image-preview__image" alt="">
        <p class="image-preview__error" role="status" hidden>This image could not be loaded.</p>
      </div>
      <button type="button" class="image-preview__nav" data-action="next" aria-label="Next image" title="Next image (right arrow)">&gt;</button>
    </div>
    <p class="image-preview__caption"></p>`;
  document.body.append(dialog);

  const stage = dialog.querySelector('.image-preview__stage');
  stage.tabIndex = 0;
  stage.setAttribute('role', 'group');
  stage.setAttribute('aria-label', 'Image. Press Enter to zoom or fit; scroll to see details when zoomed');
  const preview = dialog.querySelector('img');
  const caption = dialog.querySelector('.image-preview__caption');
  const count = dialog.querySelector('.image-preview__count');
  const error = dialog.querySelector('.image-preview__error');
  const viewer = dialog.querySelector('.image-preview__view');
  const previous = dialog.querySelector('[data-action="previous"]');
  const next = dialog.querySelector('[data-action="next"]');
  let images = [], index = 0, opener, zoomed = false, backdropStart = false;

  function zoom(value) {
    zoomed = value;
    dialog.classList.toggle('is-zoomed', zoomed);
    stage.scrollTo(0, 0);
    placeArrows();
  }
  function placeArrows() {
    if (!dialog.open || preview.hidden) return;
    const area = viewer.getBoundingClientRect();
    const image = preview.getBoundingClientRect();
    previous.style.left = `${Math.max(0, image.left - area.left - previous.offsetWidth - 8)}px`;
    next.style.right = `${Math.max(0, area.right - image.right - next.offsetWidth - 8)}px`;
  }
  function show(nextIndex) {
    index = (nextIndex + images.length) % images.length;
    const image = images[index];
    zoom(false);
    error.hidden = true;
    preview.hidden = false;
    preview.alt = image.alt;
    preview.src = source(image);
    caption.textContent = image.alt;
    count.textContent = `${index + 1} / ${images.length}`;
    for (const action of ['previous', 'next']) dialog.querySelector(`[data-action="${action}"]`).hidden = images.length < 2;
  }
  function open(image, trigger) {
    const seen = new Set();
    images = [...article.querySelectorAll('.article__banner-img, .article__content img')].filter(candidate => {
      if (!eligible(candidate) || !candidate.getClientRects().length) return false;
      const url = source(candidate);
      if (seen.has(url)) return false;
      seen.add(url);
      return true;
    });
    const selected = images.findIndex(candidate => source(candidate) === source(image));
    if (selected < 0) return;
    images[selected] = image;
    opener = trigger;
    show(selected);
    document.documentElement.classList.add('image-preview-open');
    dialog.showModal();
    placeArrows();
  }

  for (const image of article.querySelectorAll('.article__content img')) {
    if (!eligible(image)) continue;
    image.classList.add('article-image-preview');
    const link = image.closest('a');
    const trigger = link || image;
    trigger.setAttribute('aria-haspopup', 'dialog');
    if (!link) {
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `Preview image${image.alt ? `: ${image.alt}` : ''}`);
      image.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(image, trigger); }
      });
    }
    trigger.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      open(image, trigger);
    });
  }

  const cover = article.querySelector('.article__banner-img');
  if (cover) {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'article-image-cover';
    trigger.setAttribute('aria-label', 'Preview cover image');
    trigger.setAttribute('aria-haspopup', 'dialog');
    cover.parentElement.append(trigger);
    trigger.addEventListener('click', () => open(cover, trigger));
  }
  dialog.querySelector('[data-action="close"]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-action="previous"]').addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-action="next"]').addEventListener('click', () => show(index + 1));
  preview.addEventListener('click', () => { zoom(!zoomed); stage.focus({ preventScroll: true }); });
  preview.addEventListener('load', placeArrows);
  stage.addEventListener('scroll', placeArrows);
  new ResizeObserver(placeArrows).observe(stage);
  preview.addEventListener('error', () => { preview.hidden = true; error.hidden = false; });
  dialog.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && document.activeElement === stage) {
      event.preventDefault(); zoom(!zoomed);
    }
    if (event.key === 'Tab') {
      const controls = [...dialog.querySelectorAll('button, [tabindex="0"]')].filter(control => !control.hidden && !control.disabled);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && !(zoomed && document.activeElement === stage)) {
      event.preventDefault();
      show(index + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('pointerdown', event => {
    const box = dialog.getBoundingClientRect();
    backdropStart = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  });
  dialog.addEventListener('click', event => {
    if (backdropStart && event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('image-preview-open');
    opener?.focus({ preventScroll: true });
  });
})();
