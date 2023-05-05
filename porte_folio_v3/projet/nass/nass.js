const myVideo = document.getElementById("myVideo");
const afterVideo = document.getElementById("after-video");

var video = document.getElementById("myVideo");
video.volume = 0.1;
// Ajouter un écouteur d'événements pour détecter la fin de la lecture de la vidéo et la faire disparaître
myVideo.addEventListener("ended", function () {
  myVideo.style.display = "none";
  afterVideo.style.display = "block";
});
// afficher les elements de la page apres la video automatiquement
setTimeout(function () {
  myVideo.style.display = "none";
  afterVideo.style.display = "block";
}
    , 10000);
    

// Récupérez les références des boutons existants
var imageBtn = document.getElementById("image");
var DATBtn = document.getElementById("DAT");
var model3DBtn = document.getElementById("Model3D");

// Récupérez la référence de la pop-up
var modal = document.getElementById("myModal");

// Récupérez la référence de l'élément <span> qui permet de fermer la pop-up
var span = document.getElementsByClassName("close")[0];

// Définissez les fonctions qui ouvrent et ferment la pop-up
function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

// Ajoutez les écouteurs d'événements pour chaque bouton
imageBtn.addEventListener("click", function() {
  openModal();
});

DATBtn.addEventListener("click", function() {
  openModal();
});

model3DBtn.addEventListener("click", function() {
  openModal();
});

// Ajoutez un écouteur d'événements pour le bouton de fermeture
span.addEventListener("click", function() {
  closeModal();
});

// Lorsque l'utilisateur clique en dehors de la pop-up, fermez-la
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
