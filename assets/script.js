const _CFG            = window.CONFIG || {};
const API_URL         = 'https://api.github.com/users/jahaa69/repos?per_page=100&sort=updated';
const TOPICS_3D       = ['3d', 'modelisation', '3d-modeling', 'cad', 'impression-3d', 'stl'];
const DISCORD_WEBHOOK  = _CFG.DISCORD_WEBHOOK  || '';
const GOOGLE_CLIENT_ID = _CFG.GOOGLE_CLIENT_ID || '';

const SERVICE_LABELS = {
  dev:          'Développement Web',
  modelisation: 'Modélisation 3D',
  impression:   'Impression 3D',
  maintenance:  'Maintenance Informatique',
  autre:        'Autre',
};

let currentFilter = 'all';

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
  setupNav();
  loadAllProjects();
  setupFilters();
  setupContactForm();
  setupServiceCardLinks();
  setupGoogleAuth();
});

// ── Nav ────────────────────────────────────────
function setupNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  const header = document.getElementById('header');

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    links.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── Chargement combiné JSON + GitHub ──────────
function loadAllProjects() {
  Promise.allSettled([
    fetch('./assets/projects.json').then(r => { if (!r.ok) throw r; return r.json(); }),
    fetch(API_URL).then(r => { if (!r.ok) throw r; return r.json(); }),
  ]).then(([localResult, githubResult]) => {
    const grid = document.getElementById('realisationsGrid');
    grid.innerHTML = '';
    let count = 0;

    // Projets locaux (projects.json)
    if (localResult.status === 'fulfilled' && Array.isArray(localResult.value)) {
      localResult.value.forEach(p => {
        grid.appendChild(createProjectCard({
          title:    p.title       || 'Sans titre',
          desc:     p.description || '',
          url:      p.url         || null,
          imgUrl:   p.image       || null,
          videoUrl: p.video       || null,
          filter:   p.filter      || '3d',
          topics:   p.topics      || [],
        }));
        count++;
      });
    }

    // Repos GitHub (topics requis)
    if (githubResult.status === 'fulfilled' && Array.isArray(githubResult.value)) {
      setAvatar(githubResult.value);
      githubResult.value
        .filter(r => r.name !== 'jahaa69.github.io' && Array.isArray(r.topics) && r.topics.length > 0)
        .forEach(repo => {
          const topics = repo.topics.map(t => t.toLowerCase());
          const filter = topics.some(t => TOPICS_3D.includes(t)) ? '3d' : 'dev';
          grid.appendChild(createProjectCard({
            title:  repo.name.replace(/-/g, ' '),
            desc:   repo.description || 'Pas de description disponible',
            url:    repo.html_url,
            imgUrl: `https://raw.githubusercontent.com/jahaa69/${repo.name}/main/image.png`,
            filter,
            topics,
          }));
          count++;
        });
    }

    if (!count) renderNoConnexion();
  });
}

function setAvatar(data) {
  if (!data.length) return;
  const wrap = document.getElementById('nav-avatar');
  if (!wrap || wrap.querySelector('img')) return;
  const img = document.createElement('img');
  img.src = data[0].owner.avatar_url;
  img.alt = 'Avatar';
  wrap.appendChild(img);
}

function createProjectCard({ title, desc, url = null, imgUrl = null, videoUrl = null, filter, topics = [] }) {
  const card = document.createElement('article');
  card.className = 'project-card';
  card.dataset.filter = filter;

  if (url) {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
  }

  // ── Media (vidéo ou image) ──
  if (videoUrl) {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.className = 'project-card-img';
    video.autoplay  = true;
    video.muted     = true;
    video.loop      = true;
    video.setAttribute('playsinline', '');
    card.appendChild(video);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'project-card-placeholder';
    placeholder.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
    card.appendChild(placeholder);

    if (imgUrl) {
      const probe = new Image();
      probe.onload = () => {
        const imgEl = document.createElement('img');
        imgEl.src = imgUrl;
        imgEl.alt = title;
        imgEl.className = 'project-card-img';
        placeholder.replaceWith(imgEl);
      };
      probe.src = imgUrl;
    }
  }

  // ── Corps de la carte ──
  const topicsHTML = topics.slice(0, 4).map(t => `<span class="project-topic">${esc(t)}</span>`).join('');
  const body = document.createElement('div');
  body.className = 'project-card-body';
  body.innerHTML = `
    <p class="project-card-tag">${esc(filter)}</p>
    <h3>${esc(title)}</h3>
    <p>${esc(desc)}</p>
    ${topicsHTML ? `<div class="project-topics">${topicsHTML}</div>` : ''}
  `;
  card.appendChild(body);

  if (url) {
    const open = () => window.open(url, '_blank', 'noopener');
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
  }

  return card;
}

function renderNoConnexion() {
  const grid = document.getElementById('realisationsGrid');
  grid.innerHTML = `
    <div class="no-connexion">
      <p>Impossible de charger les projets GitHub.</p>
      <a href="https://github.com/jahaa69" target="_blank" rel="noopener">Voir le profil GitHub →</a>
    </div>
  `;
}

// ── Filters ────────────────────────────────────
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;

      document.querySelectorAll('.project-card').forEach(card => {
        const show = currentFilter === 'all' || card.dataset.filter === currentFilter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// ── Service card links → pre-fill contact select ──
function setupServiceCardLinks() {
  document.querySelectorAll('.btn-outline[data-service]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const select = document.getElementById('fservice');
      if (select) select.value = btn.dataset.service;
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ── Google Auth ────────────────────────────────
function setupGoogleAuth() {
  // Attend que le script Google soit chargé
  const tryInit = () => {
    if (typeof google === 'undefined') {
      document.getElementById('authError').hidden = false;
      return;
    }
    google.accounts.id.initialize({
      client_id:            GOOGLE_CLIENT_ID,
      callback:             handleGoogleLogin,
      auto_select:          false,
      cancel_on_tap_outside: true,
    });
    google.accounts.id.renderButton(
      document.getElementById('googleSignInBtn'),
      { theme: 'filled_black', size: 'large', text: 'signin_with', shape: 'rectangular', width: 280 }
    );
  };

  // Le script Google est async — on attend qu'il soit prêt
  if (document.readyState === 'complete') {
    tryInit();
  } else {
    window.addEventListener('load', tryInit);
  }

  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
}

function decodeJwt(token) {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}

function handleGoogleLogin(response) {
  try {
    const payload = decodeJwt(response.credential);
    currentUser = {
      name:    payload.name    || '',
      email:   payload.email   || '',
      picture: payload.picture || '',
    };
    showContactForm();
  } catch {
    document.getElementById('authError').hidden = false;
  }
}

function showContactForm() {
  document.getElementById('contactLoginGate').hidden = true;
  document.getElementById('contactContent').classList.remove('contact-content--locked');

  document.getElementById('userAvatar').src       = currentUser.picture;
  document.getElementById('userName').textContent  = currentUser.name;
  document.getElementById('fname').value           = currentUser.name;
  document.getElementById('femail').value          = currentUser.email;
}

function handleLogout() {
  currentUser = null;
  google.accounts.id.disableAutoSelect();

  document.getElementById('contactLoginGate').hidden = false;
  document.getElementById('contactContent').classList.add('contact-content--locked');
  document.getElementById('contactForm').reset();
  document.getElementById('userAvatar').src       = '';
  document.getElementById('userName').textContent  = '';
}

// ── Contact form → Discord ─────────────────────
function setupContactForm() {
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('submitBtn');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const service = form.service.value;
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !service || !message) return;

    btn.disabled    = true;
    btn.textContent = 'Envoi en cours…';

    const lines = [
      '📬 **Nouveau message depuis le site**',
      `👤 **${name}**`,
      `📧 ${email} ✅ *(email Google vérifié)*`,
      `🔧 **Service :** ${SERVICE_LABELS[service] || service}`,
      subject ? `📌 **Sujet :** ${subject}` : null,
      '',
      message,
    ].filter(l => l !== null).join('\n');

    fetch(DISCORD_WEBHOOK, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ content: lines }),
    })
      .then(res => {
        if (!res.ok) throw new Error();
        btn.textContent = '✓ Message envoyé';
        btn.style.background = '#2a7a46';
        form.reset();
        setTimeout(() => {
          btn.disabled         = false;
          btn.textContent      = 'Envoyer le message';
          btn.style.background = '';
        }, 3500);
      })
      .catch(() => {
        btn.disabled    = false;
        btn.textContent = 'Erreur — réessayer';
        btn.style.background = '#8b1a1a';
        setTimeout(() => {
          btn.textContent      = 'Envoyer le message';
          btn.style.background = '';
        }, 3000);
      });
  });
}
