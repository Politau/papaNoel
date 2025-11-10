// script.js
document.addEventListener('DOMContentLoaded', () => {
  const wishlist = document.getElementById('wishlist');
  const modal = document.getElementById('modal');
  const modalInner = document.getElementById('modal-inner');
  const closeBtn = document.getElementById('closeBtn');

  // --- Charger les cadeaux depuis JSON ---
  fetch('data/data.json')
    .then(res => res.json())
    .then(data => {
      wishlist.innerHTML = '';
      data.forEach(item => {
        const article = document.createElement('article');
        article.classList.add('zoomable');

        article.innerHTML = `
          <a href="${item.lien}">
            <h2>${item.titre}</h2>
            ${item.image ? `<img src="${item.image}" alt="${item.titre}" class="cadeau">` : ''}
          </a>
          ${item.description ? `<p>${item.description}</p>` : ''}
        `;
        wishlist.appendChild(article);
      });

      // --- Initialiser la modale pour tous les articles ---
      initModalEvents();
    })
    .catch(err => console.error('Erreur chargement JSON:', err));

  // --- Fonction modale ---
  function initModalEvents() {
    const articles = document.querySelectorAll('.zoomable');

    articles.forEach(article => {
      article.addEventListener('click', (e) => {
        e.preventDefault(); // empêche navigation
        openModalFromArticle(article);
      });
    });
  }

  function openModalFromArticle(article) {
    const titleEl = article.querySelector('h2');
    const imgEl = article.querySelector('img.cadeau');
    const pEl = article.querySelector('p');
    const linkEl = article.querySelector('a');

    const title = titleEl ? titleEl.textContent.trim() : '';
    const imgSrc = imgEl ? imgEl.src : '';
    const imgAlt = imgEl ? (imgEl.alt || title) : '';
    const desc = pEl ? pEl.innerHTML.trim() : '';
    const href = linkEl ? linkEl.href : null;

    const wrapper = document.createElement('div');
    wrapper.className = 'modal-article';

    if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'modal-link';

      const h2 = document.createElement('h2');
      h2.textContent = title;

      if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = imgAlt;
        link.appendChild(img);
      }

      link.appendChild(h2);
      wrapper.appendChild(link);
    } else {
      const h2 = document.createElement('h2');
      h2.textContent = title;
      wrapper.appendChild(h2);

      if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = imgAlt;
        wrapper.appendChild(img);
      }
    }

    if (desc) {
      const p = document.createElement('p');
      p.innerHTML = desc;
      wrapper.appendChild(p);
    }

    modalInner.innerHTML = '';
    modalInner.appendChild(wrapper);

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modal.classList.add('hidden');
    modalInner.innerHTML = '';
    document.body.classList.remove('modal-open');
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });
});



const santa = document.getElementById('santa');
let posX = -150;

function animateSanta() {
  posX += 2; // vitesse du traîneau
  if (posX > window.innerWidth) posX = -150; // recommence à gauche
  santa.style.left = posX + 'px';

  // Effet de "vol" en arc
  const amplitude = 30; // hauteur de l'arc
  const frequency = 50; // longueur d'onde
  santa.style.top = 50 + amplitude * Math.sin(posX / frequency) + 'px';

  requestAnimationFrame(animateSanta);
}

animateSanta();
