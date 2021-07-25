

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


function armarPantalla() {
  const canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext("2d");
  dibujarFondo(ctx);
  dibujarHub(ctx);
  dibujarEnemigos(ctx);
}

function dibujarHub(ctx) {
  dibujarScore(ctx);
  dibujarLife(ctx);
}

function dibujarFondo(ctx) {
  const fondo = document.createElement('img');
  fondo.width = 1200;
  fondo.onload = function () {
    ctx.drawImage(fondo, 0, 0)
  };
  fondo.src = "Imagenes/estrellas.png";

}

function dibujarScore(ctx) {
  const score = document.createElement('img');
  score.onload = function () {
    ctx.drawImage(score, 0, 0)
  };
  score.src = "Imagenes/score.png";
}

function dibujarLife(ctx) {
  const life = document.createElement('img');
  life.onload = function () {
    ctx.drawImage(life, 950, 0)
  };
  life.src = "Imagenes/lives.png";
}

function dibujarEnemigos(ctx){
  const invasor = document.createElement("img")
  invasor.onload = function () {
  ctx.drawImage(invasor, 450, 100)
  };
  invasor.src = "Imagenes/inva2.png";
  invasor.sizes = 2;
}
/* ************************************
    Funciones de Jugador/Player
 *************************************/

//width="1200" height="800"

const GAME_STATE = {
  playerX: 0,
  playerY: 0,
}

function setPosition($el, x, y){
  $el.style.transform = `translate(${x}px, ${y}px)`;
}

function createPlayer ($container){
  GAME_STATE.playerX = 1200/2;
  GAME_STATE.playerY = 800 - 50;
  const $player = document.createElement("img");
  $player.src = "Imagenes/nave.png";
  $player.className= "player";
  $container.appendChild($player);
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}
function init(){
  const $container = document.querySelector(".juego");
  createPlayer ($container);
}
init();





