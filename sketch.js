var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;


var zombieGroup;
var bullets = 100;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var gameState = "fight";
var life = 3;

function preload() {

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {


  createCanvas(windowWidth, windowHeight);

  // Agregando la imagen de fondo
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1


  // Creando el sprite del jugador
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)


  // Creando sprites para representar la vida restante
  heart1 = createSprite(displayWidth - 150, 40, 20, 20)
  heart1.visible = false
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth - 100, 40, 20, 20)
  heart2.visible = false
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth - 150, 40, 20, 20)
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.4


  // Creando un grupo para zombis
  zombieGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  background(0);
  if (gameState === "fight") {
    if (life === 3) {
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;

    }
    if (life === 2) {
      heart3.visible = false;
      heart2.visible = true;
      heart1.visible = false;

    }

    if (life === 1) {
      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = true;

    }
    if (life === 0 ") {
    gameState = "lost"

    if (keyDown("UP_ARROW") || touches.length > 0) {
      player.y = player.y - 30
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
      player.y = player.y + 30
    }

    if (keyWentDown("space")) {

      bullet = createSprite(displayWidth - 1150, player.Y - 30, 20, 10);
      bullet.velocityX = 26;
      bulletGroup.add(bullet);
      buletts = bullets - 1;
      player.addImage(shooter_shooting)

    }
   
    else if (keyWentUp("space")) {
      player.addImage(shooterImg)
    }

    if (zombieGroup.isTouching(player)) {


      for (var i = 0; i < zombieGroup.length; i++) {

        if (zombieGroup[i].isTouching(player)) {
          zombieGroup[i].destroy()
        }
      }
    }

  }










  // Liberar balas y cambiar la imagen del tirador a posición de disparo cuando se presiona la barra espaciadora



}

// El jugador regresa a la posición original de pie una vez que se deja de precionar la barra espaciadora



// Destruye al zombi una vez que el jugador lo toca


// Llamando a la función para generar zombis
enemy();

drawSprites();

if(gameState === "lost"){
textSize(100);
fill("red");
text("Perdiste",displayWidth/2,displayHeight/2);
zombieGroup.destroyEach();
player.destroy();


}

else if(gameState === "won"){
  textSize(100);
fill("blue");
text("Ganaste",displayWidth/2,displayHeight/2);
zombieGroup.destroyEach();
player.destroy();

}

else if(gameState === "bullet"){
  textSize(100);
fill("blue");
text("Ganaste",displayWidth/2,displayHeight/2);
zombieGroup.destroyEach();
player.destroy();
bulletGroup.destroyEach();
}

// Creando la función para generar zombis
function enemy() {
  if (frameCount % 50 === 0) {

    // Dando posiciónes X y Y aleatorias para que aparezca el zombi
    zombie = createSprite(random(500, 1100), random(100, 500), 40, 40)



    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug = true
    zombie.setCollider("rectangle", 0, 0, 400, 400)




    zombie.lifetime = 400
    zombieGroup.add(zombie)
  }

}
