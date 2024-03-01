const homeB = document.getElementById('homeB');
const projetB = document.getElementById('ProjetB');

const homeP = document.getElementById('homeP');
const projetP = document.getElementById('projetP');

projetP.style.display = 'none';

async function api() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function createCard(data) {
  const projetContainer = document.getElementById('projetP');
  for (let i = 0; i < data.length; i++) {
    if (data[i].name !== 'jahaa69.github.io') {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${data[i].name}</h5>
          <p class="card-text">${data[i].description}</p>
          <a href="${data[i].html_url}" class="btn btn-primary">Voir le repo</a>
        </div>
      `;
      projetContainer.appendChild(card);
    }
  }
}

async function main() {
  const data = await api();
  createCard(data);
}

function projetpage() {
  projetB.addEventListener('click', () => {
    homeP.style.display = 'none';
    projetP.style.display = 'flex';
  });
}

function homepage() {
  homeB.addEventListener('click', () => {
    homeP.style.display = 'flex';
    projetP.style.display = 'none';
  });
}

const API_URL = 'https://api.github.com/users/jahaa69/repos';

projetpage();
homepage();
main();
