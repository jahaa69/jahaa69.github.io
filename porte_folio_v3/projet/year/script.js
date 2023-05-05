 // Récupère le bouton et le modal
 var btn = document.getElementById("myBtn");
 var modal = document.getElementById("myModal");
 
 // Récupère l'élément de fermeture du modal
 var span = document.getElementsByClassName("close")[0];
 
 // Ajoute un événement de clic sur le bouton pour ouvrir le modal
 btn.onclick = function() {
   modal.style.display = "block";
 }
 
 // Ajoute un événement de clic sur l'élément de fermeture pour fermer le modal
 span.onclick = function() {
   modal.style.display = "none";
 }
 
 // Ajoute un événement de clic en dehors du modal pour le fermer
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }