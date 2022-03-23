var bgImg, bg;
var monkeyImg, monkey;
var money,  moneyImg;
var blockImg, block;
var score = 0;
var moneyGroup;
var strength = 300;
var fruit;
var gameState = "play";
var life = 3;
var heart1, heart2, heart3;
var heart;



function preload(){

  bgImg = loadImage("./assets/Bg.jpg");
  monkeyImg = loadImage("./assets/monkey.png");
  moneyImg = loadImage("./assets/money.png");
  blockImg = loadImage("./assets/block.png");
  fruit1Img = loadImage("./assets/mango.png");
  fruit2Img = loadImage("./assets/watermelon.png");
  heart1 = loadImage("./assets/heart_1.png");
  heart2 = loadImage("./assets/heart_2.png");
  heart3 = loadImage("./assets/heart_3.png");



}

function setup(){
createCanvas(windowWidth, windowHeight);

engine = Matter.Engine.create();
world = engine.world;

bg = createSprite(width/2, height/2, width, height);
bg.addImage(bgImg);
bg.scale = 1.9;

monkey = createSprite(600, 600, 20, 20);
monkey.addImage(monkeyImg);
monkey.scale = 0.5;
monkey.setCollider("rectangle", 0, 0, 300, 350);


moneyGroup = createGroup();
fruitGroup = createGroup();
blockGroup = createGroup();

heart = createSprite(140,200,10,10);
heart.addImage("heart3", heart3);
heart.addImage("heart2", heart2);
heart.addImage("heart1", heart1);
heart.scale = 0.4;


}


function draw(){

  Matter.Engine.update(engine);

  background("black");
 
  if(gameState === "play"){
    
    createBlocks();
    createCoins();
    createFruits(); 
    
  
    
    // if space key is pressed
    if(keyDown("SPACE")){

     monkey.velocityY =-10;
   }

   // if left key is pressed
   if(keyDown("LEFT_ARROW")){

    monkey.x = monkey.x -10;
  
   }

   // if right key is pressed
   if(keyDown("RIGHT_ARROW")){

    monkey.x = monkey.x +10;
   }
    strength -= 1;

    monkey.collide(moneyGroup, moneyCollide);
    monkey.collide(blockGroup);
    monkey.collide(fruitGroup, fruitCollide);
  
    //adding gravity
   monkey.velocityY = monkey.velocityY + 1.5;

   if(monkey.y >= height || strength <=0){

  //  life -=1;
    //if(life == 0){
    //  gameState = "end";
      //heart.changeImage(heart1);
   // }

   }
  }    

  else if(gameState === "end"){
    
    fruitGroup.destroyEach();
    moneyGroup.destroyEach();
    blockGroup.destroyEach();
    monkey.destroy();
    score = 0;
    strength = 300;
    sweetAlert();
  }

 // block.debug = true;
 // monkey.debug = true;

 drawSprites();

 textSize(20);
  fill("white");
  text("score : "+ score, 50,80);

  textSize(20);
  fill("white");
  text("life:" + life, 50, 60);

  showStrength();

}

function createCoins(){

  if(frameCount % 150 === 0){

    money = createSprite(750, -10, 30, 20);
    money.addImage(moneyImg);
    money.scale = 0.09;

    money.x = Math.round(random(200, 1400));
    money.velocityY = 3.5;
    money.lieftime = 600;

    moneyGroup.add(money);

    //money.debug = true;

  }
}

function createBlocks(){
  
  if(frameCount % 100 === 0){

  block = createSprite(890, -10, 30, 20);
  block.addImage(blockImg);
  block.scale = 0.9;
  block.setCollider("rectangle", 0, 0, 220, 120);
 

  block.x = Math.round(random(200,1400));
  block.velocityY =3.5;
  block.lifetime = 500;

  blockGroup.add(block);
  //block.debug = true;
  }

}

function createFruits(){

  if(frameCount % 100 === 0){

    fruit = createSprite(random(200, 1300),0,100, 100);
    fruit.velocityY =3;

    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: fruit.addImage(fruit1Img);
      fruit.scale = 0.5;
      break;
      case 2: fruit.addImage(fruit2Img);
      fruit.scale = 0.2;
      break;
    }

    fruitGroup.add(fruit);
    
  }
  if(fruit){
  fruit.display()
  }
  
}

function moneyCollide( monkey, money){

  money.remove();
  score += 1;

}

function fruitCollide(monkey, fruit){

  fruit.remove();
  strength+= 100;
  // how to reset strength when fruit is eaten
  if(strength>=300){

    strength = 300;
  }
}

function sweetAlert(){

  swal({

    title: "Oh No! You lost the game!",
    imageUrl:
    "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  },
  function(isConfirm) {
    if (isConfirm){
      location.reload()
    }
  }
  );
}
  
function showStrength() {
  push();
  //image(fuelImage, width / 2 - 130, height - player.positionY - 350, 20, 20);
  fill("white");
  rect(50, 100, 300, 20);
  fill("#ffc400");
  rect(50,100, strength, 20);
  noStroke();
  pop();
}


