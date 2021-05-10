//varibles
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var survivalTime = 0;
var gameState=0;
var PLAY=0;
var END=0;

function preload(){
 
  obstacleImage=loadImage("obstacle.png");
  monkey_running = loadAnimation    ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 
}

function setup() {
  createCanvas(400, 400);
 
  //creating monkey
  var monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1
 
  //creating ground
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
 
  bananaGroup = new Group();
  
  
  function food(){
    //create banana sprite after 80 frames
    if (frameCount % 80 === 0) {
      var banana = createSprite(600,120,40,10);
      cloud.y = Math.round(random(120,200));
      banana.addImage(bananaImage);
      banana.scale = 0.5;
      banana.velocityX = -3;
     
      //asign lifetime to the banana
      banana.lifetime = 200;
     
    }
  }
   
 function obstacles(){
  //create obstacle sprite after 300 frames
    if (frameCount % 300 === 0) {
      var obstacle = createSprite(600,120,40,10);
      cloud.y = Math.round(random(120,200));
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.5;
      obstacle.velocityX = -2;
     
      //asign lifetime to the banana
      obstacle.lifetime = 200;
   
 }  
   }
 
}

function draw() {
  background(220);
 
 
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);

   if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
   
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
   
    //change the monkey animation
    trex.changeAnimation("monkey");
   
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
   
    if(mousePressedOver(restart)) {
      reset();
    }
  }
 
 
  if(ground.x<0) {
    ground.x = ground.width/2;
  }
 
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
 
  monkey.velocityY = monkey.velocityY + 0.8;
 
  monkey.collide(ground);
 
  //calling functions for food and obstacles
  food();
  obstacles();
  
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,100,50);
 
 
  drawSprites();
}
 

  function reset(){
    gameState = PLAY;
    gameOver.visible = true;
    restart.visible = true;
    monkey.changeAnimation()
   
   
 }

