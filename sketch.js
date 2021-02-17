var PLAY = 1;
var END = 0;
var gameState = 1;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver,gameOverImg;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(550,550);
// Moving background
path=createSprite(250,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale =1;

//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
gameOver = createSprite(250,250);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  boy.y= World.mouseY;
  
  edges= createEdgeSprites();
  boy.collide(edges);
 
  
   

  
if(gameState === PLAY){
  
   gameOver.visible = false;
  
   if(boy.isTouching(swordGroup)){
   gameState = END;
  }
  
  
    
       if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }
  createCash();
    createDiamonds();
    createJwellery();
    createSword();
  }
  
    


else if(gameState === END){
  
  gameOver.visible = true;
  boy.depth = gameOver.depth;
  gameOver.depth = gameOver.depth + 1;
  
  path.velocityY = 0;
  
  cashG.destroyEach();
  cashG.setVelocityYEach(0);
  
  diamondsG.destroyEach();
  diamondsG.setVelocityYEach(0);
  
  jwelleryG.destroyEach();
  jwelleryG.setVelocityYEach(0);
  
  swordGroup.destroyEach();
  swordGroup.setVelocityYEach(0);
  
  boy.destroy();
  boy.velocityX = 0;
  
}

   
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  drawSprites();
  textSize(20);
  fill("black");
  text("Treasure: "+ treasureCollection,200,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 4;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 4;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 5;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}