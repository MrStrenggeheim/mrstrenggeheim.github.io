/** Full-canvas article image viewer with wheel/pinch zoom and optional chrome. */
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
  dialog.setAttribute('aria-label', 'Image viewer');
  dialog.innerHTML = `
    <div class="image-preview__toolbar image-preview__chrome">
      <span class="image-preview__count" aria-live="polite"></span>
      <button type="button" data-action="close" aria-label="Close image" title="Close (Escape)" autofocus><svg viewBox="0 0 24 24" aria-hidden="true"><use href="/assets/icons.svg#icon-close"></use></svg></button>
    </div>
    <div class="image-preview__view">
      <div class="image-preview__stage" tabindex="0" role="group" aria-label="Image. Scroll or pinch to zoom; drag to pan. Click or press Enter to toggle controls. Plus and minus zoom; zero resets.">
        <img class="image-preview__image" alt="" draggable="false">
        <p class="image-preview__error" role="status" hidden>This image could not be loaded.</p>
      </div>
      <button type="button" class="image-preview__nav image-preview__chrome" data-action="previous" aria-label="Previous image" title="Previous image (left arrow)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <button type="button" class="image-preview__nav image-preview__chrome" data-action="next" aria-label="Next image" title="Next image (right arrow)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
    </div>
    <p class="image-preview__caption image-preview__chrome"></p>`;
  document.body.append(dialog);

  const stage = dialog.querySelector('.image-preview__stage');
  const preview = dialog.querySelector('img');
  const caption = dialog.querySelector('.image-preview__caption');
  const count = dialog.querySelector('.image-preview__count');
  const error = dialog.querySelector('.image-preview__error');
  const pointers = new Map();
  let images = [], index = 0, opener, scale = 1, pan = { x: 0, y: 0 }, gesture, moved = false;
  const numberToken = (name, fallback) => parseFloat(getComputedStyle(dialog).getPropertyValue(name)) || fallback;
  const center = event => {
    const box = stage.getBoundingClientRect();
    return { x: event.clientX - box.left - box.width / 2, y: event.clientY - box.top - box.height / 2 };
  };
  const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  function render() {
    const fit = Math.min(stage.clientWidth / (preview.naturalWidth || 1), stage.clientHeight / (preview.naturalHeight || 1));
    const limitX = Math.max(0, ((preview.naturalWidth || 1) * fit * scale - stage.clientWidth) / 2);
    const limitY = Math.max(0, ((preview.naturalHeight || 1) * fit * scale - stage.clientHeight) / 2);
    pan.x = Math.max(-limitX, Math.min(limitX, pan.x));
    pan.y = Math.max(-limitY, Math.min(limitY, pan.y));
    preview.style.transform = `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`;
    dialog.classList.toggle('is-zoomed', scale > 1);
  }
  function resetZoom() { scale = 1; pan = { x: 0, y: 0 }; render(); }
  function zoomTo(value, anchor = { x: 0, y: 0 }) {
    if (preview.hidden || !preview.naturalWidth) return;
    const nextScale = Math.max(1, Math.min(numberToken('--preview-max-scale', 8), value));
    const ratio = nextScale / scale;
    pan = { x: anchor.x - ratio * (anchor.x - pan.x), y: anchor.y - ratio * (anchor.y - pan.y) };
    scale = nextScale;
    render();
  }
  function toggleChrome() {
    const hidden = dialog.classList.toggle('is-chrome-hidden');
    if (hidden) stage.focus({ preventScroll: true });
  }
  function show(nextIndex) {
    index = (nextIndex + images.length) % images.length;
    const image = images[index];
    pointers.clear(); gesture = null;
    resetZoom();
    error.hidden = true;
    preview.hidden = false;
    preview.alt = image.alt;
    preview.src = source(image);
    caption.textContent = image.alt;
    count.textContent = `${index + 1}/${images.length}`;
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
    dialog.classList.remove('is-chrome-hidden');
    show(selected);
    document.documentElement.classList.add('image-preview-open');
    dialog.showModal();
    render();
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
  stage.addEventListener('click', event => {
    if (moved) return;
    const point = center(event);
    const fit = Math.min(stage.clientWidth / (preview.naturalWidth || 1), stage.clientHeight / (preview.naturalHeight || 1));
    const onImage = !preview.hidden && preview.naturalWidth
      && Math.abs(point.x - pan.x) <= preview.naturalWidth * fit * scale / 2
      && Math.abs(point.y - pan.y) <= preview.naturalHeight * fit * scale / 2;
    if (onImage) toggleChrome();
    else dialog.close();
  });
  const outsidePanel = event => {
    const box = dialog.getBoundingClientRect();
    return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  };
  let backdropPress = false;
  dialog.addEventListener('pointerdown', event => { backdropPress = event.target === dialog && outsidePanel(event); });
  dialog.addEventListener('click', event => {
    if (backdropPress && event.target === dialog && outsidePanel(event)) dialog.close();
    backdropPress = false;
  });
  preview.addEventListener('load', render);
  new ResizeObserver(() => { if (dialog.open) { render(); beginGesture(); } }).observe(stage);
  preview.addEventListener('error', () => { preview.hidden = true; error.hidden = false; });

  stage.addEventListener('wheel', event => {
    event.preventDefault();
    const unit = event.deltaMode === 1 ? parseFloat(getComputedStyle(stage).fontSize) : event.deltaMode === 2 ? stage.clientHeight : 1;
    zoomTo(scale * Math.exp(-event.deltaY * unit * numberToken('--preview-zoom-sensitivity', 0.002)), center(event));
  }, { passive: false });

  function beginGesture() {
    const points = [...pointers.values()];
    gesture = points.length >= 2
      ? { kind: 'pinch', point: midpoint(points[0], points[1]), distance: distance(points[0], points[1]), scale, pan: { ...pan } }
      : points.length ? { kind: 'pan', point: points[0], pan: { ...pan } } : null;
  }
  stage.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    if (!pointers.size) moved = false;
    pointers.set(event.pointerId, center(event));
    stage.setPointerCapture(event.pointerId);
    if (pointers.size > 1) moved = true;
    beginGesture();
  });
  stage.addEventListener('pointermove', event => {
    if (!pointers.has(event.pointerId) || !gesture) return;
    pointers.set(event.pointerId, center(event));
    const points = [...pointers.values()];
    if (gesture.kind === 'pinch' && points.length >= 2) {
      const point = midpoint(points[0], points[1]);
      const nextScale = Math.max(1, Math.min(numberToken('--preview-max-scale', 8), gesture.scale * distance(points[0], points[1]) / Math.max(1, gesture.distance)));
      const ratio = nextScale / gesture.scale;
      pan = { x: point.x - ratio * (gesture.point.x - gesture.pan.x), y: point.y - ratio * (gesture.point.y - gesture.pan.y) };
      scale = nextScale;
      moved = true;
    } else {
      const point = points[0];
      if (distance(point, gesture.point) > numberToken('--preview-drag-threshold', 6)) moved = true;
      pan = { x: gesture.pan.x + point.x - gesture.point.x, y: gesture.pan.y + point.y - gesture.point.y };
    }
    dialog.classList.toggle('is-dragging', moved && scale > 1);
    render();
  });
  function finishPointer(event) {
    pointers.delete(event.pointerId);
    if (event.type === 'pointercancel') moved = true;
    dialog.classList.remove('is-dragging');
    beginGesture();
  }
  stage.addEventListener('pointerup', finishPointer);
  stage.addEventListener('pointercancel', finishPointer);
  stage.addEventListener('lostpointercapture', finishPointer);

  dialog.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      dialog.classList.remove('is-chrome-hidden');
      const controls = [...dialog.querySelectorAll('button, [tabindex="0"]')].filter(control => !control.hidden && !control.disabled);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    if ((event.key === 'Enter' || event.key === ' ') && document.activeElement === stage) { event.preventDefault(); toggleChrome(); }
    if (['+', '=', '-', '0'].includes(event.key)) {
      event.preventDefault();
      if (event.key === '0') resetZoom();
      else zoomTo(scale * (event.key === '-' ? 1 / numberToken('--preview-zoom-step', 1.25) : numberToken('--preview-zoom-step', 1.25)));
    }
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      if (scale > 1 && document.activeElement === stage) {
        const step = dialog.querySelector('[data-action="close"]').offsetWidth;
        pan.x += event.key === 'ArrowLeft' ? step : event.key === 'ArrowRight' ? -step : 0;
        pan.y += event.key === 'ArrowUp' ? step : event.key === 'ArrowDown' ? -step : 0;
        render();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') show(index + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('close', () => {
    pointers.clear(); gesture = null;
    document.documentElement.classList.remove('image-preview-open');
    opener?.focus({ preventScroll: true });
  });
})();
