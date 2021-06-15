function cargarWeb(){
  var nom, edad, urlGame;
   nom=document.getElementById("Name").value
   edad=document.getElementById("Difi").value



   urlGame = "game.html#" + nom + "#" + edad;

   window.open(urlGame);

}