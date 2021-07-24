function cargarWeb(){

  var nom, edad, urlGame;
  nom=document.getElementById("Name").value
  edad=document.getElementById("Difi").value



  urlGame = "game.html#" + nom + "#" + edad;
  if(nom!==""){
    window.open(urlGame);
  }else alert("Ingrese un Nombre Por Favor");


}
function J(){
  var urlGame, nom, edad;
  urlGame = window.location.href.split("/")[4];
  nom = urlGame.split("#")[1]
  edad = urlGame.split("#")[2];
  document.getElementById("Snombre").innerHTML = nom;
  document.getElementById("Sage").innerHTML = edad;
}

function DibujarFondo() {
  const canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext("2d");
  var fondo = new Image();
  fondo.width = 1200;
  fondo.onload = function () {
    ctx.drawImage(fondo, 0, 0)
  };
  fondo.src = "Imagenes/estrellas.png";
  var score = new Image();
  score.onload = function () {
    ctx.drawImage(score, 0, 0)
  };
  score.src = "Imagenes/score.png";
  var lifes = new Image();
  lifes.onload = function () {
    ctx.drawImage(lifes, 950, 0)
  };
  lifes.src = "Imagenes/lives.png";
}
  // function DibujarHub(){
  // let ctx2 = canvas.getContext("2d")



/*function DibujarEnemigos(){
  var canvas = document.getElementById('game-canvas');
  let ctx4 = canvas.getContext("2d")
  let invasor = new Image();
  invasor.src = "Imagenes/invasor.png;
  invasor.onload = function () {
  ctx4.drawImage(invasor, 0, 0)
  }
}*/





