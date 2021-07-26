var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var edad;
//edad=document.getElementById("Difi").value

function cargarWeb(){
  var nom, urlGame;
  nom=document.getElementById("Name").value
  edad=document.getElementById("Difi").value
  alert(edad);
  urlGame = "game.html#" + nom + "#" + edad;
  if(nom!==""){
    window.open(urlGame);
  }else alert("Ingrese un Nombre Por Favor");
}

function J(){
  var urlGame, nom, difi;
  urlGame = window.location.href.split("/")[4];
  nom = urlGame.split("#")[1];
  difi= urlGame.split("#")[2];
  document.getElementById("Snombre").innerHTML = nom;
  document.getElementById("Sdifi").innerHTML = difi;
}

function armarPantalla() {
  dibujarFondo(ctx);
  dibujarHub(ctx);
  dibujarEnemigos(ctx);
  dibujarAliado(ctx)
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

function dibujarEnemigos(ctx) {
  const invasor = document.createElement("img");
  //edad=document.getElementById("Difi").value;
  invasor.src = "Imagenes/inva2.png";
  alert(edad.value);
  if (edad === 'hard') {
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
  else{
    invasor.onload = function () {
      for (let i = 0; i < 3; i++) {
        let j = i * 350;
        ctx.drawImage(invasor, (200 + j), 100);
        ctx.drawImage(invasor, (200 + j), 200);
        ctx.drawImage(invasor, (200 + j), 300);
        //alert("usted a ingresado a dificultad facil!");
      }
    }
  }
}
/* ************************************
    Funciones de Jugador/Player
 *************************************/

/*function dibujarAliado(ctx) {
  const aliado = document.createElement("img");
  aliado.src = "Imagenes/nave.png";
  aliado.onload = function () {
      ctx.drawImage(aliado, 550 , 700);
    }
  }*/

function dibujarAliado(){
  //canvas.width=canvas.width;
  naveAliada.dibujar();
  if (rightPressed && naveAliada.posX<canvas.width - 50){

    naveAliada.posX+=7;
  }else if(leftPressed && naveAliada.posX>0){

    naveAliada.posX-=7;
  }
}
setInterval(dibujarAliado,10)

var naveAliada = {
  posX: (canvas.width-50)/2,
  dibujar: function (){
    ctx.beginPath();
    ctx.fillRect(this.posX,790,50,50);
    ctx.fillStyle = "#00ce0f";
    ctx.fill();
    ctx.closePath();
  }
};

var leftPressed= false;
var rightPressed = false;
document.addEventListener("keydown", keyDownHandler,false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
  if(e.keyCode === 39){
    rightPressed = true;
  }
  else if(e.keyCode === 37){
    leftPressed= true;
  }
}

function keyUpHandler(e){
  if(e.keyCode === 39){
    rightPressed = false;
  }
  else if(e.keyCode === 37){
    leftPressed = false;
  }
}











