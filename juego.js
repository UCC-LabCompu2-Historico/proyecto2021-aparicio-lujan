/* en la linea 4 y 5 usamos las variables globlales por que en cada una de las funciones se repetia lo mismo
   en la linea 6 utilizamos la goblal level para despues poder elegir el nivel ya sea dificl o facil
    */
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var level;
var objImagen = new Image();
objImagen.src = "Imagenes/nave.png";

/** Descripción: volver a la pagina principal
 * @method volverWeb
 */
function volverWeb() {
    var urlPage;
    urlPage = "index.html";
    window.open(urlPage);
}

/**
 * Descripción: Asigna nombre y nivel
 * @method cargarWeb
 */

function cargarWeb() {
    var nom, urlGame;
    nom = document.getElementById("Name").value;
    level = document.getElementById("level").value;
    urlGame = "game.html#" + nom + "#" + level;
    if (nom !== "") {
        window.open(urlGame);
    } else alert("Ingrese un Nombre Por Favor");
}

/**
 * Descripción: Carga el nombre y nivel en la nueva pagina
 * @method J
 */

function J() {
    var urlGame, nom, difi;
    window.setTimeout(function () {
        urlGame = window.location.href.split("/")[4];
        nom = urlGame.split("#")[1];
        difi = urlGame.split("#")[2];
        document.getElementById("Snombre").innerHTML = nom;
        document.getElementById("Sdifi").innerHTML = difi;
    }, 10)
}

/**
 * Descripción: inicia el canvas con sus respetivos objetos
 * @method armarPantalla
 */

function armarPantalla() {
    dibujarFondo(ctx);
    dibujarHub(ctx);
    dibujarEnemigos(ctx);
}

/**
 * Funcion que se encarga de dar movimiento a la nave Jugador
 * @method moverJugador
 */

function moverJugador() {
    Jugador.dibujar(ctx);
    if (rightPressed && Jugador.posX < 1200) {
        canvas.width = canvas.width;
        armarPantalla(ctx);
        Jugador.posX += 7;
    } else if (leftPressed && Jugador.posX > 0) {
        canvas.width = canvas.width;
        armarPantalla(ctx);
        Jugador.posX -= 7;
    }
}

setInterval(moverJugador, 10);

/**
 * Descripción: Dibuja el interfaz del juego
 * @method dibujarHub
 * @param ctx
 */

function dibujarHub(ctx) {
    dibujarScore(ctx);
    dibujarLife(ctx);
}

/**
 * Descripción: Dibuja el fondo del canvas
 * @method dibujarFondo
 * @param ctx
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
 * Descripción: Dibuja la palabra Score en la esquina superior izquierda
 * @method dibujarScore
 * @param ctx
 */

function dibujarScore(ctx) {
    const score = document.createElement('img');
    score.onload = function () {
        ctx.drawImage(score, 0, 0)
        window.setTimeout(function () {
            ctx.drawImage(score, 0, 0)
        }, 50);
    };
    score.src = "Imagenes/score.png";
}

/**
 * Descripción: Dibuja la palabra life en la esquina superior derecha
 * @method dibujarLife
 * @param ctx
 */

function dibujarLife(ctx) {
    const life = document.createElement('img');
    life.onload = function () {
        ctx.drawImage(life, 950, 0)
        window.setTimeout(function () {
            ctx.drawImage(life, 950, 0)
        }, 50);
    };
    life.src = "Imagenes/lives.png";
}

/**
 * Descripción: dibuja las naves enemigas en el canvas
 * @method dibujarEnemigos
 * @param ctx
 *
 */

function dibujarEnemigos(ctx) {
    window.setTimeout(function () {
        const invasor = document.createElement("img");
        let urlGame = window.location.href.split("/")[4];
        level = urlGame.split("#")[2];
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
    }, 50);
}

/* ************************************
    Funciones de Jugador/Player
 *************************************/

var leftPressed = false;
var rightPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/**
 * Funcion que se encarga de detectar si la teclas son presionadas
 * @method keyDownHandler
 * @param e
 */

function keyDownHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = true;
    } else if (e.keyCode === 37) {
        leftPressed = true;
    }
}

/**
 * Funcion que se encarga de detectar si la tecla se dejo de presionar
 * @method keyUpHandler
 * @param e
 */

function keyUpHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = false;
    } else if (e.keyCode === 37) {
        leftPressed = false;
    }
}

var Jugador = {
    posX: (canvas.width - 75) / 2,
    dibujar: function () {
        window.setTimeout(function () {
            ctx.drawImage(objImagen, Jugador.posX, 690)
        }, 200);
    }
}







