const homeB=document.getElementById('homeB');
const projetB=document.getElementById('ProjetB');

const homeP=document.getElementById('homeP');
const projetP=document.getElementById('projetP');

projetP.style.display='none';



function projetpage(){
    projetB.addEventListener('click',()=>{
        homeP.style.display='none';
        projetP.style.display='flex';
    })
}

function homepage(){
    homeB.addEventListener('click',()=>{
        homeP.style.display='flex';
        projetP.style.display='none';
    })
}
const API_URL = 'https://api.github.com/users/jahaa69/repos';
const ACCESS_TOKEN = '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';

async function api() {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${ACCESS_TOKEN}`);

  const response = await fetch(API_URL, {
    headers,
  });
  const data = await response.json();

  return data;
}

async function createCard(data) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="carte-body">
    <h5 class="card-title">${data.name}</h5>
    <p class="card-text">${data.description}</p>
    <a href="${data.html_url}" class="btn btn-primary">Go to repo</a>
    </div>
    `;
  projetP.appendChild(card);
}

function main() {
  api()
    .then((data) => {
      data.forEach((repo) => {
        createCard(repo);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function error(){
  // si le site ne communique pas avec l'API sinon executé main()
  if(!api()){
    console.log('error');
  }else{
    main();
  }
}


projetpage();
homepage();
api();
error();