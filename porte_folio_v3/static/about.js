// Récupération de les éléments HTML grace a leur id
const image = document.getElementById("image-container");
const image2 = document.getElementById("image-container2");
// Initialisation de la position de l'image
let position = 250;
let position2 = 180;

// Fonction pour déplacer l'image
function moveImage() {
  // Récupération de la largeur de la fenêtre
  const windowWidth = window.innerWidth;

  // Calcul de la nouvelle position de l'image
  position += 3;
  position2 += 3;
  if (position > windowWidth){
    position = -image.width;
  }
  if (position2 > windowWidth){
    position2 = -image2.width;
  }

  // Déplacement de l'image
  image.style.left = position + "px";
  image2.style.left = position2 + "px";
}

// Appel de la fonction moveImage toutes les 50 millisecondes
setInterval(moveImage, 50);
