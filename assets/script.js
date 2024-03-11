const API_URL = 'https://api.github.com/users/jahaa69/repos';
const ACCESS_TOKEN = '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';
const tab = [];





document.addEventListener('DOMContentLoaded', function () {
  api();
});


function api() {
  fetch(API_URL, {
    headers: {
      Authorization: `token ${ACCESS_TOKEN}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach((repo) => {
          tab.push(repo);
        });
        connectedOrNot(data);
        logo(data);
      } else {
        throw new Error('Data is not an array');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      noConnexion();
      console.log("test");
    });
}


function connectedOrNot(data) {
  if (data.length === 0) {
  } else {
    noConnexion();
    // createCards(data);
  }
}

function createCards(data) {
  const projetPageDiv = document.getElementById('projetPage');

  data.forEach((repo) => {
    if (repo.name === 'jahaa69.github.io') {
      return;
    }
    const migna = new URL(`https://raw.githubusercontent.com/jahaa69/${repo.name}/main/image.png`);

    const gridProjetDiv = document.createElement('div');
    gridProjetDiv.className = 'gridProjet';

    const projetCardDiv = document.createElement('div');
    projetCardDiv.className = 'ProjetCard';
    projetCardDiv.onclick = () => {
      window.open(repo.html_url, '_blank');
    };

    const imgElement = document.createElement('img');
    imgElement.src = migna;
    imgElement.alt = 'image du projet';
    imgElement.className = 'mignature';

    const h3Element = document.createElement('h3');
    h3Element.textContent = repo.name;

    const pElement = document.createElement('p');
    pElement.textContent = repo.description || 'Aucune description disponible';
    pElement.className = 'description';

    projetCardDiv.appendChild(imgElement);
    projetCardDiv.appendChild(h3Element);
    projetCardDiv.appendChild(pElement);
    gridProjetDiv.appendChild(projetCardDiv);
    projetPageDiv.appendChild(gridProjetDiv);
  });
}

function noConnexion() {
  const projetPageDiv = document.getElementById('projetPage');
  projetPageDiv.style.display = 'flex';
  projetPageDiv.style.gridTemplateColumns = 'none';
  

  const noConnexionDiv = document.createElement('div');
  const h1Element = document.createElement('h1');
  const imgElement = document.createElement('img');
  const clickElement = document.createElement('div');

  clickElement.style.display = 'flex';
  clickElement.style.flexDirection = 'row';
  clickElement.style.height = '5%';
  clickElement.style.backgroundColor = 'black';
  clickElement.style.justifyContent = 'center';
  clickElement.style.alignItems = 'center';
  clickElement.style.cursor = 'pointer';
  clickElement.style.backgroundColor = '#272626';


  imgElement.src = 'assets/img/logoGithub.png';
  imgElement.alt = 'image de connexion';
  imgElement.className = 'logo';

  noConnexionDiv.className = 'noConnexion';
  h1Element.textContent = 'lien des projets';
  h1Element.style.color = 'white';
  
  clickElement.appendChild(h1Element);
  clickElement.appendChild(imgElement);
  clickElement.onclick = () => {
    window.open('https://github.com/jahaa69', '_blank');
    
  }
  noConnexionDiv.appendChild(clickElement);
  projetPageDiv.appendChild(noConnexionDiv);
}

function logo(data) {
  const logo = document.getElementById('logo');
  const imgElement = document.createElement('img');
  imgElement.className = 'logo';
  imgElement.src = data[0].owner.avatar_url;
  imgElement.alt = 'image du projet';
  logo.appendChild(imgElement);
}


function submit() {
  let name = form.name.value;
  let email = form.email.value;
  let subject = form.subject.value;
  let message = form.message.value;
  console.log('click');
  console.log(form.name.value);
  fetch("https://discord.com/api/webhooks/1215223694675410944/4-Lxh69yjJP4-UXbYmR3qoW-jUvGni38amwo7gWEPrqEtNmDmVFkdAjggv0xgaqc0CsC", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: `Nouveau message de ${name} : pour ${subject}\n ${message} \n\n Email de contact : ${email}`
    })
  }).then(() => {
    alert('Message envoyé avec succès');
    form.name.value = '';
    form.email.value = '';
    form.subject.value = '';
    form.message.value = '';    
  })
}

event, addEventListener('submit', function (e) {
  e.preventDefault();
  submit();
});