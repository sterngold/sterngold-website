// colophon.js — Made With Anders attribution system
// Reads JSON from #essay-colophon-data, builds colophon + X-ray toggle

(function () {
  'use strict';

  const dataEl = document.getElementById('essay-colophon-data');
  if (!dataEl) return;

  let data;
  try { data = JSON.parse(dataEl.textContent); } catch (e) { return; }

  const container = document.getElementById('colophon');
  if (!container) return;

  // ── Build colophon HTML ──────────────────────────
  const colors = { vlad: '#22c55e', anders: '#a855f7', panel: 'var(--pride-gradient)' };
  const labels = { vlad: 'Vlad', anders: 'Anders', panel: 'Panel' };

  let barsHTML = '';
  data.contributors.forEach(c => {
    const bg = c.id === 'panel' || c.id === 'mixed'
      ? 'background: linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7)'
      : `background: ${colors[c.id] || '#6b7280'}`;
    barsHTML += `
      <div class="colophon-contributor">
        <div class="colophon-contributor-header">
          <span class="colophon-contributor-name">${c.name}</span>
          <span class="colophon-contributor-pct">${c.pct}%</span>
        </div>
        <div class="colophon-bar-track">
          <div class="colophon-bar-fill" data-pct="${c.pct}" style="${bg}; width: 0%;"></div>
        </div>
        <div class="colophon-contributor-role">${c.role}</div>
      </div>`;
  });

  const proc = data.process;
  const toolsStr = proc.tools ? proc.tools.map(t => `<span class="colophon-tool">/${t}</span>`).join(' ') : '';

  container.innerHTML = `
    <div class="colophon-header">
      <h2 class="colophon-title">Made With Anders</h2>
      <button class="colophon-xray-btn" id="xrayToggle" aria-pressed="false" title="Toggle X-ray mode: see who wrote what">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        <span>X-ray</span>
      </button>
    </div>
    <div class="colophon-bars">${barsHTML}</div>
    <div class="colophon-process">
      <span>${proc.versions} version${proc.versions !== 1 ? 's' : ''}</span>
      <span class="colophon-dot"></span>
      <span>${proc.sessions} session${proc.sessions !== 1 ? 's' : ''}</span>
      <span class="colophon-dot"></span>
      <span>${proc.editPasses} edit pass${proc.editPasses !== 1 ? 'es' : ''}</span>
    </div>
    ${toolsStr ? `<div class="colophon-tools">${toolsStr}</div>` : ''}
  `;

  // ── Animate bars on scroll ───────────────────────
  const bars = container.querySelectorAll('.colophon-bar-fill');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        bars.forEach(function (bar) {
          bar.style.width = bar.dataset.pct + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(container);

  // ── X-ray toggle ─────────────────────────────────
  const essayBody = document.querySelector('.essay-body');
  const xrayBtn = document.getElementById('xrayToggle');
  if (!essayBody || !xrayBtn) return;

  // Default: paragraphs without data-author are treated as vlad
  essayBody.querySelectorAll('p:not([data-author])').forEach(function (p) {
    p.setAttribute('data-author', 'vlad');
  });

  let xrayActive = false;
  let legend = null;

  xrayBtn.addEventListener('click', function () {
    xrayActive = !xrayActive;
    essayBody.classList.toggle('xray-active', xrayActive);
    xrayBtn.setAttribute('aria-pressed', String(xrayActive));
    xrayBtn.classList.toggle('active', xrayActive);

    if (xrayActive && !legend) {
      legend = document.createElement('div');
      legend.className = 'xray-legend';
      legend.innerHTML = `
        <span class="xray-legend-item"><span class="xray-legend-swatch" style="background:#22c55e;"></span>Vlad</span>
        <span class="xray-legend-item"><span class="xray-legend-swatch" style="background:#a855f7;"></span>Anders</span>
        <span class="xray-legend-item"><span class="xray-legend-swatch" style="background:linear-gradient(90deg,#22c55e,#a855f7);"></span>Mixed</span>
      `;
      document.body.appendChild(legend);
    }
    if (legend) legend.classList.toggle('visible', xrayActive);
  });
})();
