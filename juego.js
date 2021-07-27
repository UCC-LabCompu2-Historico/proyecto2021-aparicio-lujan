var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var level;
var objImagen = new Image();
objImagen.src = "Imagenes/nave.png";

/**
 * Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
 */

function cargarWeb(){
  var nom, urlGame;
  nom=document.getElementById("Name").value;
  level=document.getElementById("level").value;
  urlGame = "game.html#" + nom + "#" + level;
  if(nom!==""){
    window.open(urlGame);
  }else alert("Ingrese un Nombre Por Favor");
}

/**
 * Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
 */

function J(){
  var urlGame, nom, difi;
  urlGame = window.location.href.split("/")[5];
  nom = urlGame.split("#")[1];
  difi= urlGame.split("#")[2];
  document.getElementById("Snombre").innerHTML = nom;
  document.getElementById("Sdifi").innerHTML = difi;
}

/**
 * Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
 */

function armarPantalla() {
  dibujarFondo(ctx);
  dibujarHub(ctx);
  dibujarEnemigos(ctx);
}
/**
* Funcion que se encarga de dar movimiento a la naveJugador
* @method moverJugador
*/

function moverJugador(){
  Jugador.dibujar();
  if (rightPressed){
    canvas.width=canvas.width;
    armarPantalla();
    Jugador.posX += 7;
  }else if(leftPressed){
    canvas.width=canvas.width;
    armarPantalla();
    Jugador.posX-=7;
  }
}
setInterval(moverJugador,1);

/**
 * Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
 */

function dibujarHub(ctx) {
  dibujarScore(ctx);
  dibujarLife(ctx);
}

/**
 * Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
 */

function dibujarFondo(ctx) {
  const fondo = document.createElement('img');
  fondo.width = 1200;
  fondo.onload = function () {
    ctx.drawImage(fondo, 0, 0)
  };
  fondo.src = "Imagenes/estrellas.png";
}

/**
 * Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
 */

function dibujarScore(ctx) {
  const score = document.createElement('img');
  score.onload = function () {
    ctx.drawImage(score, 0, 0)
    window.setTimeout(function (){ctx.drawImage(score, 0, 0)},50);
  };
  score.src = "Imagenes/score.png";
}

/**
 * Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
 */

function dibujarLife(ctx) {
  const life = document.createElement('img');
  life.onload = function () {
    ctx.drawImage(life, 950, 0)
    window.setTimeout(function (){ctx.drawImage(life, 950, 0)},50);
  };
  life.src = "Imagenes/lives.png";
}

/**
 * Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
 */

function dibujarEnemigos(ctx) {
  window.setTimeout(function (){
    const invasor = document.createElement("img");
    let urlGame = window.location.href.split("/")[5];
    level=urlGame.split("#")[2];
    invasor.src = "Imagenes/inva2.png";
    switch (level) {
      case "easy":
        invasor.onload = function () {
          for (let i = 0; i < 3; i++) {
            let j = i * 350;
            ctx.drawImage(invasor, (200 + j), 100);
            ctx.drawImage(invasor, (200 + j), 200);
            ctx.drawImage(invasor, (200 + j), 300);
          }
        }
        break;
      default:
        invasor.onload = function () {
          for (let i = 0; i < 5; i++) {
            let j = i * 200;
            ctx.drawImage(invasor, (200 + j), 100);
            ctx.drawImage(invasor, (200 + j), 200);
            ctx.drawImage(invasor, (200 + j), 300);
            ctx.drawImage(invasor, (200 + j), 400);
            ctx.drawImage(invasor, (200 + j), 500);
          }
        }
    }
  },50);
  }

/* ************************************
    Funciones de Jugador/Player
 *************************************/

var leftPressed= false;
var rightPressed = false;
document.addEventListener("keydown", keyDownHandler,false);
document.addEventListener("keyup", keyUpHandler, false);

/**
* Funcion que se encarga de detectar si la teclas son presionadas
* @method keyDownHandler
* @param Parámetro e
*/

function keyDownHandler(e){
  if(e.keyCode === 39){
    rightPressed = true;
  }
  else if(e.keyCode === 37){
    leftPressed= true;
  }
}

/**
* Funcion que se encarga de detectar si la tecla se dejo de presionar
* @method keyUpHandler
* @param Parámetro e
*/

function keyUpHandler(e){
  if(e.keyCode === 39){
    rightPressed = false;
  }
  else if(e.keyCode === 37){
    leftPressed = false;
  }
}


var Jugador = {
  posX: (canvas.width-75)/2,
dibujar: function() {
  window.setTimeout(function (){ctx.drawImage(objImagen,Jugador.posX, 690)},200);
  }
}







