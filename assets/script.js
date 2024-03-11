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
    .then((response) => response.json())
    .then((data) => {
      data.forEach((repo) => {
        tab.push(repo);
      });
      createCards(data);
      logo(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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