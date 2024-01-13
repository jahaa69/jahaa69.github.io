const homeB = document.getElementById('homeB');
const projetB = document.getElementById('ProjetB');

const homeP = document.getElementById('homeP');
const projetP = document.getElementById('projetP');

const title = document.getElementById('titlePage');
const conteneur3d = document.getElementById('conteneur3D');

projetP.style.display = 'none';

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
const ACCESS_TOKEN = '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';

const tab =[];
function api() {
  fetch(API_URL, {
    headers: {
      Authorization: `token ${ACCESS_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((repo) => {
        createCard(repo);
        tab.push(repo);
        
      })
      filtre(tab);
    })
    .catch(() => {
      noData();
      defaultCards();
    });
}


function noData() {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
  <h3 style="font-family: monospace;">Erreur</h3>
  <h1 style="font-family: monospace;">desolé mais github bloque les api et donc il
  met impossible pour le moemnt de vous montré mes projet sur cette page je vous 
  laisserais voir mes repos github grace a ce lien  </h1>
  <a href="https://github.com/jahaa69">Go to repo</a>`;
  projetP.appendChild(card);
}


function filtre(tab) {
  const filteredTabs = tab.filter((item) => item.stargazers_count > 0);
  const sortedTabs = filteredTabs.sort((a, b) => b-a)
  const result = sortedTabs.slice(0, 3);
  result.forEach(repo => {
    frontcard(repo);
  });
}



function frontcard(repo) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.id = 'card';
  card.innerHTML = `
    <h3 style="font-family: monospace;">${repo.language}</h3>
    <h1 style="font-family: monospace;">${repo.name}</h1>
    <p style="font-family: monospace; text-align: center;">${repo.description}</p>
    <button type="button" class="btn btn-primary"><a href="${repo.html_url}" style="text-decoration: none; color: black; font-family: monospace;">Go Repo</a></button>  `;

  conteneur3d.appendChild(card);
}
function defaultCards() {
  carte1();
  carte2();
  carte3();
}

function carte1() {
  const card = document.createElement('div');
  card.classList.add('card');
  card.id = 'card';
  card.innerHTML = `
  <h3 style="font-family: monospace;">C++</h3>
  <h1 style="font-family: monospace;">Armebot</h1>
  <a href="https://github.com/jahaa69/ArmBot">Go to repo</a>`;
  conteneur3d.appendChild(card);
}

function carte2() {
  const card = document.createElement('div');
  card.classList.add('card');
  card.id = 'card';
  card.innerHTML = `
  <h3 style="font-family: monospace;">PowerShell</h3>
  <h1 style="font-family: monospace;">Bit-Buncker</h1>
  <a href="https://github.com/jahaa69/Bit-Bunker-V2">Go to repo</a>`;
  conteneur3d.appendChild(card);
}

function carte3() {
  const card = document.createElement('div');
  card.classList.add('card');
  card.id = 'card';
  card.innerHTML = `
  <h3 style="font-family: monospace;">Java Script</h3>
  <h1 style="font-family: monospace;">Boxxle</h1>
  <a href="https://github.com/jahaa69/boxxle">Go to repo</a>`;
  conteneur3d.appendChild(card);
}





function createCaroussel(){
  const card=document.createElement('div');
  card.innerHTML=`
  <div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
  projetP.appendChild(card);

}



 function createCard(data) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${data.name}</h5>
      <p class="card-text">${data.description}</p>
      <a href="${data.html_url}" class="btn btn-secondary">Go to repo</a>
    </div>
  `;


}

function titlePage() {
  let titleName = 'Exposito_Bastien';


  function addLetters(i) {
    setTimeout(() => {
      title.innerHTML += titleName[i];
      if (i === titleName.length - 1) {
        setTimeout(() => {
          for (let j = 0; j < titleName.length; j++) {
            setTimeout(() => {
              title.innerHTML = titleName.substring(0, titleName.length - j - 1);
            }, 100 * j);
          }
          setTimeout(() => {
            title.innerHTML = '';
            titlePage();
          }, 200 * titleName.length);
        }, 1000);
      }
    }, 100 * i);
  }


  for (let i = 0; i < titleName.length; i++) {
    addLetters(i);
  }
}

function blink() {
  const cursor = document.getElementById('cursor');
  setInterval(() => {
    cursor.style.opacity = 0;
    setTimeout(() => {
      cursor.style.opacity = 1;
    }, 500);
  }, 1000);
}


blink();
api();
projetpage();
titlePage();
homepage();