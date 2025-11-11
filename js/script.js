// script.js
document.addEventListener('DOMContentLoaded', () => {
  const wishlist = document.getElementById('wishlist');
  const modal = document.getElementById('modal');
  const modalInner = document.getElementById('modal-inner');
  const closeBtn = document.getElementById('closeBtn');

  const reserveModal = document.getElementById("reserveModal");
  const closeReserveBtn = document.getElementById("closeReserveBtn");
  const reserveTitle = document.getElementById("reserveTitle");
  const reserveArticle = document.getElementById("reserveArticle");

  let currentArticle = null; // pour garder la référence de l'article sélectionné

  // Fermer la modale de réservation
  closeReserveBtn.addEventListener("click", () => {
    reserveModal.classList.add("hidden");
  });

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
          <button class="reserveBtn">🎅 Réserver</button>
        `;
        wishlist.appendChild(article);
      });

      // --- Initialiser la modale et les boutons de réservation ---
      initModalEvents();
    })
    .catch(err => console.error('Erreur chargement JSON:', err));

  // --- Fonction modale ---
  function initModalEvents() {
    const articles = document.querySelectorAll('.zoomable');

    articles.forEach(article => {
      const reserveBtn = article.querySelector(".reserveBtn");

      // Bouton Réserver dans l'article
      if (reserveBtn) {
        reserveBtn.addEventListener("click", e => {
          e.stopPropagation(); // éviter d'ouvrir la modale principale
          currentArticle = article;
          reserveTitle.innerText = `Réserver : ${currentArticle.querySelector("h2").innerText}`;
          reserveArticle.value = currentArticle.querySelector("h2").innerText;
          reserveModal.classList.remove("hidden");
        });
      }

      // Clic sur l'article pour ouvrir la modale principale
      article.addEventListener('click', e => {
        e.preventDefault();
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
      p.style.textAlign = "center"; // centre la description
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
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });

  // --- Traîneau du Père Noël ---
  const santa = document.getElementById('santa');
  let posX = -150;

  function animateSanta() {
    posX += 1.5;
    if (posX > window.innerWidth) posX = -150;
    santa.style.left = posX + 'px';

    const amplitude = 30;
    const frequency = 50;
    santa.style.top = 50 + amplitude * Math.sin(posX / frequency) + 'px';

    requestAnimationFrame(animateSanta);
  }
  animateSanta();

  // --- Animation de neige ---
  const snowContainer = document.getElementById('snow-container');

  function createSnowflake() {
    const snowflake = document.createElement('span');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowflake.style.animationDuration = 5 + Math.random() * 5 + 's';
    snowflake.style.opacity = Math.random();
    snowContainer.appendChild(snowflake);
    setTimeout(() => snowflake.remove(), 10000);
  }

  setInterval(createSnowflake, 200);

  // --- Récupération des réservations Pageclip ---
  (async () => {
    const API_KEY = "api_QNu03a1VRm0hmllRilj2HkXI3psXINOr";
    const FORM_ID = "3TKlcidHGYa873xBb24LoPMTon9UH5qh";

    try {
      const response = await fetch(`https://api.pageclip.co/forms/${FORM_ID}/submissions`, {
        headers: { Authorization: `Basic ${btoa(API_KEY + ":")}` }
      });

      if (!response.ok) throw new Error("Erreur API Pageclip");

      const data = await response.json();

      data.submissions.forEach(sub => {
        const articleName = sub.data.article;
        const nom = sub.data.nom;

        document.querySelectorAll("article").forEach(article => {
          const titre = article.querySelector("h2").innerText.trim();
          if (titre === articleName) {
            const reserved = document.createElement("p");
            reserved.textContent = `🎁 Réservé par ${nom}`;
            reserved.style.color = "#2a9d8f";
            reserved.style.fontWeight = "bold";
            article.classList.add("reserved");
            article.appendChild(reserved);

            const btn = article.querySelector(".reserveBtn");
            if (btn) {
              btn.disabled = true;
              btn.textContent = "Déjà réservé 🎁";
              btn.style.backgroundColor = "#aaa";
              btn.style.cursor = "not-allowed";
            }
          }
        });
      });

    } catch (err) {
      console.error("Erreur de récupération des réservations :", err);
    }
  })();

});
