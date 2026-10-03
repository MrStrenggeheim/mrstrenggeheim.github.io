// The diagram is exported from Mermaid; only the selected workflow path changes here.
(() => {
  const graphs = document.querySelectorAll('.ci-graph-svg');
  const modes = document.querySelectorAll('[data-ci-mode]');
  const jobs = ['Checks', 'Build', 'Release', 'Production', 'Preview', 'Phone', 'Feedback', 'UpdatePR'];
  const ns = 'http://www.w3.org/2000/svg';
  const createText = (text, className, x, y) => {
    const element = document.createElementNS(ns, 'text');
    element.setAttribute('class', className);
    element.setAttribute('x', x);
    element.setAttribute('y', y);
    element.setAttribute('text-anchor', 'middle');
    element.textContent = text;
    return element;
  };
  for (const graph of graphs) {
    const defs = graph.querySelector('defs') || graph.insertBefore(document.createElementNS(ns, 'defs'), graph.firstChild);
    const originalMarker = graph.querySelector('marker');
    for (const state of ['active', 'skipped']) {
      const marker = originalMarker.cloneNode(true);
      marker.id = `${graph.id}-${state}`;
      marker.setAttribute('class', `ci-marker-${state}`);
      defs.appendChild(marker);
    }
    for (const node of graph.querySelectorAll('g.node')) {
      const job = jobs.find(job => node.id.endsWith(`-${job}`) || node.id.includes(`-${job}-`));
      node.dataset.job = job;
      node.dataset.channel = job === 'Build' ? 'both' : ['Checks', 'Release', 'Production'].includes(job) ? 'main' : 'pr';
    }
    for (const edge of graph.querySelectorAll('path.flowchart-link')) {
      const id = edge.dataset.id || edge.id;
      const pair = id.match(/^L_([A-Za-z]+)_([A-Za-z]+)_\d+$/) || id.match(/-([A-Za-z]+)-([A-Za-z]+)$/);
      const [, from, to] = pair;
      edge.dataset.channel = ['Checks', 'Release', 'Production'].includes(from) || ['Checks', 'Release', 'Production'].includes(to) ? 'main' : 'pr';
      if (from === 'UpdatePR') edge.classList.add('ci-return');
      if (from === 'Build' && ['Release', 'Preview'].includes(to)) {
        const midpoint = edge.getPointAtLength(edge.getTotalLength() / 2);
        const label = createText('dist', 'ci-artifact', midpoint.x, midpoint.y - 6);
        const title = document.createElementNS(ns, 'title');
        title.textContent = 'dist: distribution — the compiled frontend ready for hosting';
        label.appendChild(title);
        label.dataset.channel = edge.dataset.channel;
        edge.parentNode.appendChild(label);
      }
    }
  }
  function setMode(mode) {
    document.body.dataset.mode = mode;
    for (const button of modes) button.setAttribute('aria-pressed', String(button.dataset.ciMode === mode));
    for (const graph of graphs) {
      for (const item of graph.querySelectorAll('[data-channel]')) {
        const active = item.dataset.channel === 'both' || item.dataset.channel === mode;
        item.classList.toggle('is-active', active);
        item.classList.toggle('is-skipped', !active);
        if (item.matches('path.flowchart-link')) item.setAttribute('marker-end', `url(#${graph.id}-${active ? 'active' : 'skipped'})`);
      }
    }
    document.getElementById('trigger').textContent = mode === 'pr' ? 'on: pull_request' : 'on: push to main';
    document.getElementById('mode-description').textContent = mode === 'pr'
      ? 'Build → Preview → Test on Phone → Feedback → Update PR. Checks, semantic-release and Production are skipped.'
      : 'Checks → Build → semantic-release → Production. Preview and the phone feedback loop are skipped.';
    document.getElementById('deployment-note').textContent = mode === 'pr'
      ? 'The preview reuses dist; functions are rebuilt and deployed to the shared backend.'
      : 'A new version needs a fresh frontend build. Without one, deployment reuses dist.';
  }
  for (const button of modes) button.addEventListener('click', () => setMode(button.dataset.ciMode));
  document.getElementById('reset').addEventListener('click', () => setMode('pr'));
  setMode('pr');
})();
