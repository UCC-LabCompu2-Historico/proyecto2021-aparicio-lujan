/**
 * creacion de clase bases
 * return function()
 */
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // Implementacion de la clase "base"(no hace nada)
  this.Class = function(){};

// creacion de una nueva clase que herede
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instanciacion de la clase base (solo la crea,
    //no corre el contructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // se copian las propiedades en el nuevo prototipado
    for (var name in prop) {
      // se comprueba si se esta sobreescribiendo una funcion existente
      prototype[name] = typeof prop[name] == "function" &&
      typeof _super[name] == "function" && fnTest.test(prop[name]) ?
          (function(name, fn){
            return function() {
              var tmp = this._super;


              // se agrego un nuevo metodo ._super() que es el mismo metodo
              // pero en una super-clase
              this._super = _super[name];

              // el metodo solo tiene que estar temporalmete, por lo cual
              // lo removeremos cuando termine su ejecucion
              var ret = fn.apply(this, arguments);
              this._super = tmp;

              return ret;
            };
          })(name, prop[name]) :
          prop[name];
    }

    /** constructor de una clase "tonta"
     * @method Class
     * @constructor
     */
    function Class() {
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // rellenamos nuestro prototipado de constructor de objeto
    Class.prototype = prototype;

    // hacer que el contructor cumpla lo que esperamos
    Class.prototype.constructor = Class;

    // y hacer esta clase extendible
    Class.extend = arguments.callee;

    return Class;
  };
})();


// ###################################################################
// shims
//
// ###################################################################

/**
 * configuracion de animaciones
 */
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();
/**
 *
 */
(function() {
  if (!window.performance.now) {
    window.performance.now = (!Date.now) ? function() { return new Date().getTime(); } :
        function() { return Date.now(); }
  }
})();

// ###################################################################
// Constantes
//
// ###################################################################
var IS_CHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 640;
var SPRITE_SHEET_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAEACAYAAAADRnAGAAACGUlEQVR42u3aSQ7CMBAEQIsn8P+/hiviAAK8zFIt5QbELiTHmfEYE3L9mZE9AAAAqAVwBQ8AAAD6THY5CgAAAKbfbPX3AQAAYBEEAADAuZrC6UUyfMEEAIBiAN8OePXnAQAAsLcmmKFPAQAAgHMbm+gbr3Sdo/LtcAAAANR6GywPAgBAM4D2JXAAABoBzBjA7AmlOx8AAEAzAOcDAADovTc4vQim6wUCABAYQG8QAADd4dPd2fRVYQAAANQG0B4HAABAawDnAwAA6AXgfAAAALpA2uMAAABwPgAAgPoAM9Ci/R4AAAD2dmqcEQIAIC/AiQGuAAYAAECcRS/a/cJXkUf2AAAAoBaA3iAAALrD+gIAAADY9baX/nwAAADNADwFAADo9YK0e5FMX/UFACA5QPSNEAAAAHKtCekmDAAAAADvBljtfgAAAGgMMGOrunvCy2uCAAAACFU6BwAAwF6AGQPa/XsAAADYB+B8AAAAtU+ItD4OAwAAAFVhAACaA0T7B44/BQAAANALwGMQAAAAADYO8If2+P31AgAAQN0SWbhFDwCAZlXgaO1xAAAA1FngnA8AACAeQPSNEAAAAM4CnC64AAAA4GzN4N9NSfgKEAAAAACszO26X8/X6BYAAAD0Anid8KcLAAAAAAAAAJBnwNEvAAAA9Jns1ygAAAAAAAAAAAAAAAAAAABAQ4COCENERERERERERBrnAa1sJuUVr3rsAAAAAElFTkSuQmCC';
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var SHOOT_KEY = 88;
var TEXT_BLINK_FREQ = 500;
var PLAYER_CLIP_RECT = { x: 0, y: 204, w: 62, h: 32 };
var ALIEN_BOTTOM_ROW = [ { x: 0, y: 0, w: 51, h: 34 }, { x: 0, y: 102, w: 51, h: 34 }];
var ALIEN_MIDDLE_ROW = [ { x: 0, y: 137, w: 50, h: 33 }, { x: 0, y: 170, w: 50, h: 34 }];
var ALIEN_TOP_ROW = [ { x: 0, y: 68, w: 50, h: 32 }, { x: 0, y: 34, w: 50, h: 32 }];
var ALIEN_X_MARGIN = 40;
var ALIEN_SQUAD_WIDTH = 11 * ALIEN_X_MARGIN;



// ###################################################################
// funciones de utilidad y clases
//
// ###################################################################
/**
 * obtener una arbitracion random
 * @method getRandomArbitrary
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * ovtener un int random
 * @method getRandomInt
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @method clamp
 * @param num
 * @param min
 * @param max
 * @returns {number}
 */
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * evaluacion de rango
 * @method valueInRange
 * @param value
 * @param min
 * @param max
 * @returns {boolean}
 */
function valueInRange(value, min, max) {
  return (value <= max) && (value >= min);
}

/**
 * checkeo de colisiones
 * @method checkRectCollision
 * @param A
 * @param B
 * @returns {boolean}
 */
function checkRectCollision(A, B) {
  var xOverlap = valueInRange(A.x, B.x, B.x + B.w) ||
      valueInRange(B.x, A.x, A.x + A.w);

  var yOverlap = valueInRange(A.y, B.y, B.y + B.h) ||
      valueInRange(B.y, A.y, A.y + A.h);
  return xOverlap && yOverlap;
}

var Point2D = Class.extend({
  init: function(x, y) {
    this.x = (typeof x === 'undefined') ? 0 : x;
    this.y = (typeof y === 'undefined') ? 0 : y;
  },
  /**
   * seteo de funcion
   * @param x
   * @param y
   */
  set: function(x, y) {
    this.x = x;
    this.y = y;
  }
});

var Rect = Class.extend({
  init: function(x, y, w, h) {
    this.x = (typeof x === 'undefined') ? 0 : x;
    this.y = (typeof y === 'undefined') ? 0 : y;
    this.w = (typeof w === 'undefined') ? 0 : w;
    this.h = (typeof h === 'undefined') ? 0 : h;
  },
  /**
   * seteo de funcion
   * @param x
   * @param y
   * @param w
   * @param h
   */
  set: function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
});



// ###################################################################
// Globales
//
// ###################################################################
var canvas = null;
var ctx = null;
var spriteSheetImg = null;
var bulletImg = null;
var keyStates = null;
var prevKeyStates = null;
var lastTime = 0;
var player = null;
var aliens = [];
var particleManager = null;
var updateAlienLogic = false;
var alienDirection = -1;
var alienYDown = 0;
var alienCount = 0;
var wave = 1;
var hasGameStarted = false;



// ###################################################################
// Entidades
//
// ###################################################################
var BaseSprite = Class.extend({
  init: function(img, x, y) {
    this.img = img;
    this.position = new Point2D(x, y);
    this.scale = new Point2D(1, 1);
    this.bounds = new Rect(x, y, this.img.width, this.img.height);
    this.doLogic = true;
  },
  /** actualizacion de funcion
   * @param dt
   */
  update: function(dt) { },

  _updateBounds: function() {
    this.bounds.set(this.position.x, this.position.y, ~~(0.5 + this.img.width * this.scale.x), ~~(0.5 + this.img.height * this.scale.y));
  },
  /** dibujo de imagen
   */
  _drawImage: function() {
    ctx.drawImage(this.img, this.position.x, this.position.y);
  },
  /**
   * dibujo
   * @param resized
   */
  draw: function(resized) {
    this._updateBounds();

    this._drawImage();
  }
});

var SheetSprite = BaseSprite.extend({
  init: function(sheetImg, clipRect, x, y) {
    this._super(sheetImg, x, y);
    this.clipRect = clipRect;
    this.bounds.set(x, y, this.clipRect.w, this.clipRect.h);
  },
  /**
   * actualizacion de funcion
   * @param dt
   */
  update: function(dt) {},

  _updateBounds: function() {
    var w = ~~(0.5 + this.clipRect.w * this.scale.x);
    var h = ~~(0.5 + this.clipRect.h * this.scale.y);
    this.bounds.set(this.position.x - w/2, this.position.y - h/2, w, h);
  },
  /**
   * dibujo de imagen
   * @private
   */
  _drawImage: function() {
    ctx.save();
    ctx.transform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
    ctx.drawImage(this.img, this.clipRect.x, this.clipRect.y, this.clipRect.w, this.clipRect.h, ~~(0.5 + -this.clipRect.w*0.5), ~~(0.5 + -this.clipRect.h*0.5), this.clipRect.w, this.clipRect.h);
    ctx.restore();

  },
  /**
   * dibujo
   * @param resized
   */
  draw: function(resized) {
    this._super(resized);
  }
});

var Player = SheetSprite.extend({
  init: function() {
    this._super(spriteSheetImg, PLAYER_CLIP_RECT, CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
    this.scale.set(0.85, 0.85);
    this.lives = 3;
    this.xVel = 0;
    this.bullets = [];
    this.bulletDelayAccumulator = 0;
    this.score = 0;
  },
  /**
   * reseteo de la funcion
   */
  reset: function() {
    this.lives = 3;
    this.score = 0;
    this.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
  },
  /**
   * disparos
   */
  shoot: function() {
    var bullet = new Bullet(this.position.x, this.position.y - this.bounds.h / 2, 1, 1000);
    this.bullets.push(bullet);
  },
  /**
   * resolucion del input
   */
  handleInput: function() {
    if (isKeyDown(LEFT_KEY)) {
      this.xVel = -175;
    } else if (isKeyDown(RIGHT_KEY)) {
      this.xVel = 175;
    } else this.xVel = 0;

    if (wasKeyPressed(SHOOT_KEY)) {
      if (this.bulletDelayAccumulator > 0.5) {
        this.shoot();
        this.bulletDelayAccumulator = 0;
      }
    }
  },
  /**
   * actualizacion de los disparos
   * @param dt
   */
  updateBullets: function(dt) {
    for (var i = this.bullets.length - 1; i >= 0; i--) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.update(dt);
      } else {
        this.bullets.splice(i, 1);
        bullet = null;
      }
    }
  },
  /**
   * actualizacion de tiempo transcurrido entre frame
   * @param dt
   */
  update: function(dt) {

    this.bulletDelayAccumulator += dt;

    this.position.x += this.xVel * dt;

    // posicion del jugador
    this.position.x = clamp(this.position.x, this.bounds.w/2, CANVAS_WIDTH - this.bounds.w/2);
    this.updateBullets(dt);
  },
  /**
   * dibujo de balas
   * @param resized
   */
  draw: function(resized) {
    this._super(resized);

    // dibujar bullets
    for (var i = 0, len = this.bullets.length; i < len; i++) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.draw(resized);
      }
    }
  }
});

var Bullet = BaseSprite.extend({
  /**
   *  posicion de los disparos y velocidad
   * @param x
   * @param y
   * @param direction
   * @param speed
   */
  init: function(x, y, direction, speed) {
    this._super(bulletImg, x, y);
    this.direction = direction;
    this.speed = speed;
    this.alive = true;
  },
  /**
   * actualizacion de funcion
   * @param dt
   */
  update: function(dt) {
    this.position.y -= (this.speed * this.direction) * dt;

    if (this.position.y < 0) {
      this.alive = false;
    }
  },
  /**
   * dibujo de disparos
   * @param resized
   */
  draw: function(resized) {
    this._super(resized);
  }
});

var Enemy = SheetSprite.extend({
  init: function(clipRects, x, y) {
    this._super(spriteSheetImg, clipRects[0], x, y);
    this.clipRects = clipRects;
    this.scale.set(0.5, 0.5);
    this.alive = true;
    this.onFirstState = true;
    this.stepDelay = 1; // try 2 secs to start with...
    this.stepAccumulator = 0;
    this.doShoot - false;
    this.bullet = null;
  },
  /**
   * funcion de posicionamiento
   */
  toggleFrame: function() {
    this.onFirstState = !this.onFirstState;
    this.clipRect = (this.onFirstState) ? this.clipRects[0] : this.clipRects[1];
  },
  /**
   * funcion de los disparos y su posicion
   */
  shoot: function() {
    this.bullet = new Bullet(this.position.x, this.position.y + this.bounds.w/2, -1, 500);
  },
  /**
   * actualizacion de parametros
   * @param dt
   */
  update: function(dt) {
    this.stepAccumulator += dt;

    if (this.stepAccumulator >= this.stepDelay) {
      if (this.position.x < this.bounds.w/2 + 20 && alienDirection < 0) {
        updateAlienLogic = true;
      } if (alienDirection === 1 && this.position.x > CANVAS_WIDTH - this.bounds.w/2 - 20) {
        updateAlienLogic = true;
      }
      if (this.position.y > CANVAS_WIDTH - 50) {
        reset();
      }

      var fireTest = Math.floor(Math.random() * (this.stepDelay + 1));
      if (getRandomArbitrary(0, 1000) <= 5 * (this.stepDelay + 1)) {
        this.doShoot = true;
      }
      this.position.x += 10 * alienDirection;
      this.toggleFrame();
      this.stepAccumulator = 0;
    }
    this.position.y += alienYDown;

    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.update(dt);
    } else {
      this.bullet = null;
    }
  },
  /**
   * dibujo de los disparos si son nulos
   * @param resized
   */
  draw: function(resized) {
    this._super(resized);
    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.draw(resized);
    }
  }
});

var ParticleExplosion = Class.extend({
  /**
   * funcion de particulas en la explosiones
   */
  init: function() {
    this.particlePool = [];
    this.particles = [];
  },
  /**
   * dibujo de la funcion
   */
  draw: function() {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var particle = this.particles[i];
      particle.moves++;
      particle.x += particle.xunits;
      particle.y += particle.yunits + (particle.gravity * particle.moves);
      particle.life--;

      if (particle.life <= 0 ) {
        if (this.particlePool.length < 100) {
          this.particlePool.push(this.particles.splice(i,1));
        } else {
          this.particles.splice(i,1);
        }
      } else {
        ctx.globalAlpha = (particle.life)/(particle.maxLife);
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
        ctx.globalAlpha = 1;
      }
    }
  },
  /**
   * creacion de las explosiones
   * @param x
   * @param y
   * @param color
   * @param number
   * @param width
   * @param height
   * @param spd
   * @param grav
   * @param lif
   */
  createExplosion: function(x, y, color, number, width, height, spd, grav, lif) {
    for (var i =0;i < number;i++) {
      var angle = Math.floor(Math.random()*360);
      var speed = Math.floor(Math.random()*spd/2) + spd;
      var life = Math.floor(Math.random()*lif)+lif/2;
      var radians = angle * Math.PI/ 180;
      var xunits = Math.cos(radians) * speed;
      var yunits = Math.sin(radians) * speed;

      if (this.particlePool.length > 0) {
        var tempParticle = this.particlePool.pop();
        tempParticle.x = x;
        tempParticle.y = y;
        tempParticle.xunits = xunits;
        tempParticle.yunits = yunits;
        tempParticle.life = life;
        tempParticle.color = color;
        tempParticle.width = width;
        tempParticle.height = height;
        tempParticle.gravity = grav;
        tempParticle.moves = 0;
        tempParticle.alpha = 1;
        tempParticle.maxLife = life;
        this.particles.push(tempParticle);
      } else {
        this.particles.push({x:x,y:y,xunits:xunits,yunits:yunits,life:life,color:color,width:width,height:height,gravity:grav,moves:0,alpha:1, maxLife:life});
      }

    }
  }
});



// ###################################################################
// Inicializacion de funciones
//
// ###################################################################
/**
 * comenzar a dibujar el juego en el canvas
 * @method initCanvas
 */
function initCanvas() {
// creacion de canvas y context
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');

  // sacar el suavizado de imagen
  setImageSmoothing(false);

  // creacion de la hoja principal de la img
  spriteSheetImg = new Image();
  spriteSheetImg.src = SPRITE_SHEET_SRC;
  preDrawImages();

// agregar eventos "listerners" y cambiar el tamaño inicial
  window.addEventListener('resize', resize);
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
}

/**
 * pre dibujo en el canvas
 *  @method preDrawImages
 */
function preDrawImages() {
  var canvas = drawIntoCanvas(2, 8, function(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  });
  bulletImg = new Image();
  bulletImg.src = canvas.toDataURL();
}

/**
 * suavizado de imagen
 * @method setImageSmoothing
 * @param value
 */
function setImageSmoothing(value) {
  this.ctx['imageSmoothingEnabled'] = value;
  this.ctx['mozImageSmoothingEnabled'] = value;
  this.ctx['oImageSmoothingEnabled'] = value;
  this.ctx['webkitImageSmoothingEnabled'] = value;
  this.ctx['msImageSmoothingEnabled'] = value;
}

/**
 * iniciacion del juego
 */
function initGame() {
  dirtyRects = [];
  aliens = [];
  player = new Player();
  particleManager = new ParticleExplosion();
  setupAlienFormation();
  drawBottomHud();
}

/**
 * seteo de la formacion de los aliens
 * @method setupAlienFormation
 */
function setupAlienFormation() {
  alienCount = 0;
  for (var i = 0, len = 5 * 11; i < len; i++) {
    var gridX = (i % 11);
    var gridY = Math.floor(i / 11);
    var clipRects;
    switch (gridY) {
      case 0:
      case 1: clipRects = ALIEN_BOTTOM_ROW; break;
      case 2:
      case 3: clipRects = ALIEN_MIDDLE_ROW; break;
      case 4: clipRects = ALIEN_TOP_ROW; break;
    }
    aliens.push(new Enemy(clipRects, (CANVAS_WIDTH/2 - ALIEN_SQUAD_WIDTH/2) + ALIEN_X_MARGIN/2 + gridX * ALIEN_X_MARGIN, CANVAS_HEIGHT/3.25 - gridY * 40));
    alienCount++;
  }
}

/**
 * reseteo de la formacion
 * @method reset
 */
function reset() {
  aliens = [];
  setupAlienFormation();
  player.reset();
}

/**
 * inicializacion
 * @method init
 */
function init() {
  initCanvas();
  keyStates = [];
  prevKeyStates = [];
  resize();
}



// ###################################################################
// funciones de entradas utiles
//
// ###################################################################
/**
 * teclas de movimiento y disparo
 * @method isKeyDown
 * @param key
 * @returns {*}
 */
function isKeyDown(key) {
  return keyStates[key];
}

/**
 * teclas de movimiento y disparo
 * @method wasKeyPressed
 * @param key
 * @returns {boolean}
 */
function wasKeyPressed(key) {
  return !prevKeyStates[key] && keyStates[key];
}


// ###################################################################
// funciones de Drawing & update
//
// ###################################################################
/**
 * actualizacion de aliens
 * @method updateAliens
 * @param dt
 */
function updateAliens(dt) {
  if (updateAlienLogic) {
    updateAlienLogic = false;
    alienDirection = -alienDirection;
    alienYDown = 25;
  }

  for (var i = aliens.length - 1; i >= 0; i--) {
    var alien = aliens[i];
    if (!alien.alive) {
      aliens.splice(i, 1);
      alien = null;
      alienCount--;
      if (alienCount < 1) {
        wave++;
        setupAlienFormation();
      }
      return;
    }

    alien.stepDelay = ((alienCount * 20) - (wave * 10)) / 1000;
    if (alien.stepDelay <= 0.05) {
      alien.stepDelay = 0.05;
    }
    alien.update(dt);

    if (alien.doShoot) {
      alien.doShoot = false;
      alien.shoot();
    }
  }
  alienYDown = 0;
}

/**
 * destruccion de los aliens si le das
 * @method resolveBulletEnemyCollisions
 */
function resolveBulletEnemyCollisions() {
  var bullets = player.bullets;

  for (var i = 0, len = bullets.length; i < len; i++) {
    var bullet = bullets[i];
    for (var j = 0, alen = aliens.length; j < alen; j++) {
      var alien = aliens[j];
      if (checkRectCollision(bullet.bounds, alien.bounds)) {
        alien.alive = bullet.alive = false;
        particleManager.createExplosion(alien.position.x, alien.position.y, 'white', 70, 5,5,3,.15,50);
        player.score += 25;
      }
    }
  }
}

/**
 * destruccion si el jugador es disparado
 * @method resolveBulletPlayerCollisions
 */
function resolveBulletPlayerCollisions() {
  for (var i = 0, len = aliens.length; i < len; i++) {
    var alien = aliens[i];
    if (alien.bullet !== null && checkRectCollision(alien.bullet.bounds, player.bounds)) {
      if (player.lives === 0) {
        alert("                                   -GAME        OVER- ",player.score);
        hasGameStarted = false;
      } else {
        alien.bullet.alive = false;
        particleManager.createExplosion(player.position.x, player.position.y, 'green', 100, 8,8,6,0.001,40);
        player.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
        player.lives--;
        break;
      }

    }
  }
}

/**
 * resolucion de colisiones
 * @method resolveCollisions
 */
function resolveCollisions() {
  resolveBulletEnemyCollisions();
  resolveBulletPlayerCollisions();
}

/**
 * actualizacion del juego
 * @method updateGame
 * @param dt
 */
function updateGame(dt) {
  player.handleInput();
  prevKeyStates = keyStates.slice();
  player.update(dt);
  updateAliens(dt);
  resolveCollisions();
}

/**
 * dibuja en el canvas
 * @method drawIntoCanvas
 * @param width
 * @param height
 * @param drawFunc
 * @returns {HTMLCanvasElement}
 */
function drawIntoCanvas(width, height, drawFunc) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  drawFunc(ctx);
  return canvas;
}

/**
 * creacion de texto
 * @method fillText
 * @param text
 * @param x
 * @param y
 * @param color
 * @param fontSize
 */
function fillText(text, x, y, color, fontSize) {
  if (typeof color !== 'undefined') ctx.fillStyle = color;
  if (typeof fontSize !== 'undefined') ctx.font = fontSize + 'px Play';
  ctx.fillText(text, x, y);
}

/**
 * centrado de texto
 * @method fillCenteredText
 * @param text
 * @param x
 * @param y
 * @param color
 * @param fontSize
 */
function fillCenteredText(text, x, y, color, fontSize) {
  var metrics = ctx.measureText(text);
  fillText(text, x - metrics.width/2, y, color, fontSize);
}

/**
 * parpadeo de los score y de los textos
 * @method fillBlinkingText
 * @param text
 * @param x
 * @param y
 * @param blinkFreq
 * @param color
 * @param fontSize
 */
function fillBlinkingText(text, x, y, blinkFreq, color, fontSize) {
  if (~~(0.5 + Date.now() / blinkFreq) % 2) {
    fillCenteredText(text, x, y, color, fontSize);
  }
}

/**
 * creacion de un hud inferior
 * @method drawBottomHud
 */
function drawBottomHud() {
  ctx.fillStyle = '#02ff12';
  ctx.fillRect(0, CANVAS_HEIGHT - 30, CANVAS_WIDTH, 2);
  fillText(player.lives + ' x ', 10, CANVAS_HEIGHT - 7.5, 'white', 20);
  ctx.drawImage(spriteSheetImg, player.clipRect.x, player.clipRect.y, player.clipRect.w,
      player.clipRect.h, 45, CANVAS_HEIGHT - 23, player.clipRect.w * 0.5,
      player.clipRect.h * 0.5);
  fillText('CREDIT: ', CANVAS_WIDTH - 115, CANVAS_HEIGHT - 7.5);
  fillCenteredText('SCORE: ' + player.score, CANVAS_WIDTH/10, 20);
  fillBlinkingText('00', CANVAS_WIDTH - 25, CANVAS_HEIGHT - 7.5, TEXT_BLINK_FREQ);
}

/**
 * dibujo de los aliens
 * @method drawAliens
 * @param resized
 */
function drawAliens(resized) {
  for (var i = 0; i < aliens.length; i++) {
    var alien = aliens[i];
    alien.draw(resized);
  }
}

/**
 * dibujo del juego entero
 * @method drawGame
 * @param resized
 */
function drawGame(resized) {
  player.draw(resized);
  drawAliens(resized);
  particleManager.draw();
  drawBottomHud();
}

/**
 * dibujo de la pantalla de inicio
 * @method drawStartScreen
 */
function drawStartScreen() {
  fillCenteredText("Space Invaders", CANVAS_WIDTH/2, CANVAS_HEIGHT/2.75, '#FFFFFF', 36);
  fillBlinkingText("Press enter to play!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 500, '#FFFFFF', 36);
}

/**
 * animaciones
 * @method animate
 */
function animate() {
  var now = window.performance.now();
  var dt = now - lastTime;
  if (dt > 100) dt = 100;
  if (wasKeyPressed(13) && !hasGameStarted) {
    initGame();
    hasGameStarted = true;
  }

  if (hasGameStarted) {
    updateGame(dt / 1000);
  }


  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (hasGameStarted) {
    drawGame(false);
  } else {
    drawStartScreen();
  }
  lastTime = now;
  requestAnimationFrame(animate);
}



// ###################################################################
// funciones de eventos "Listener"
//
// ###################################################################
/**
 * reescalado
 * @method resize
 */
function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;

  // calcular el factor de escala para mantener una relación de aspecto correcta
  var scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);

  if (IS_CHROME) {
    canvas.width = CANVAS_WIDTH * scaleFactor;
    canvas.height = CANVAS_HEIGHT * scaleFactor;
    setImageSmoothing(false);
    ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);
  } else {
    //redimensionar las propiedades del lienzo css
    canvas.style.width = CANVAS_WIDTH * scaleFactor + 'px';
    canvas.style.height = CANVAS_HEIGHT * scaleFactor + 'px';
  }
}

/**
 * funcion de presion de tecla
 * @method inKeyDown
 * @param e
 */
function onKeyDown(e) {
  e.preventDefault();
  keyStates[e.keyCode] = true;
}

/**
 * funcion de soltar tecla
 * @method onKeyUp
 * @param e
 */
function onKeyUp(e) {
  e.preventDefault();
  keyStates[e.keyCode] = false;
}


// ###################################################################
// Start game!
//
// ###################################################################
/**
 * inicializacion del juego
 * @method ini
 */
function ini() {
  init();
  animate();
}

/**
 * paso desde el index.html a game.html
 * @method cargarWeb
 */
function cargarWeb(){

  var nom, edad, urlGame;
  nom=document.getElementById("Name").value
  edad=document.getElementById("Difi").value



  urlGame = "game.html#" + nom + "#" + edad;
  if(nom!==""){
    window.open(urlGame);
  }else alert("Ingrese un Nombre Por Favor");


}

/**
 *
 */

function J(){
  ini();
  var urlGame, nom, edad;
  urlGame = window.location.href.split("/")[4];
  nom = urlGame.split("#")[1]
  edad = urlGame.split("#")[2];
  document.getElementById("Snombre").innerHTML = nom;
  document.getElementById("Sage").innerHTML = edad;





}
