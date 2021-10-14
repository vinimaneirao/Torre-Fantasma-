var esqueleto, esqueletopula, esqueletopara;

var musicamedo;

var porta, portaimg, grupop, sacada, sacadaimg, grupos;

var torre, torrezona, preto;

var estadodejogo;

var bordas;

function portas(){
  if (frameCount%140==0){
    
    //portas
    porta = createSprite(10,10,10,10);
    porta.addImage("portaa", portaimg);
    porta.x = Math.round(random(200,400));
    porta.velocityY = 3;
    porta.depth = 4;
    grupop.add(porta);
    
    //sacadas
    sacada = createSprite(10,10,10,10);
    sacada.addImage("sacadaa", sacadaimg);
    sacada.x = porta.x;
    sacada.velocityY = 3;
    sacada.depth = 4;
    sacada.y = porta.y + 70;
    grupos.add(sacada);  
    
  }
}

function preload(){
 
  esqueletopula = loadAnimation("ghost-jumping.png");
  esqueletopara = loadAnimation("ghost-standing.png");
  
  musicamedo = loadSound("spooky.wav");
  
  portaimg = loadImage("door.png");
  sacadaimg = loadImage("climber.png");
  
  torre = loadImage("tower.png");
  preto = loadImage("preto.png");
  
}

function setup(){
  createCanvas(600,600);

  //esqueleto
  esqueleto = createSprite(300,450,10,10);
  esqueleto.addAnimation("esqueletoparaa", esqueletopara);
  esqueleto.addAnimation("esqueletopulaa", esqueletopula);
  esqueleto.scale = 0.34;
  esqueleto.depth = 4;
  
  //torre
  torrezona = createSprite(300,300,600,600);
  torrezona.addImage("torres", torre);
  torrezona.depth = 2;
  
  //estado de jogo
  estadodejogo = "inicio";
  
  //grupos
  grupop = new Group();
  grupos = new Group();
  
  //bordas
  bordas = createEdgeSprites();
  }


function draw(){
  
  
  
  if (estadodejogo=="jogando"){
    

    //funçao portas
      portas();
    
      //esqueleto pula
    if (keyWentDown("space")){
      esqueleto.velocityY = -4
      esqueleto.changeAnimation("esqueletopulaa");
    }
    
    if (keyWentUp("space")){
      esqueleto.changeAnimation("esqueletoparaa");
    }
  
    //esqueleto "anda"
    if (keyDown("left")){
      esqueleto.velocityX = -4
    }
    
    if (keyDown("right")){
      esqueleto.velocityX = 4
    }
    
    
    //gravidade
    esqueleto.velocityY = esqueleto.velocityY + 0.38;
    
    
    //torre se movendo
    torrezona.velocityY = -3;
    
    //esqueleto mortinho
    if (esqueleto.isTouching(bordas[3])|| esqueleto.isTouching(grupop)){
      estadodejogo = "fim";
      
    }
    
    if (torrezona.y < 0){
      torrezona.y = width/2;
    } 
    
    //esqueleto bate bordas
    if (esqueleto.x < 0){
      esqueleto.x = 1;
    }
    if (esqueleto.x > 600){
      esqueleto.x = 599;
    }

  }
  
  
  drawSprites();
  
  if (estadodejogo=="inicio"){
    background("black");
    
    if (keyDown ("space")){
      estadodejogo = "jogando";
    }
    
    
    fill ("lightgreen");
    stroke ("white");
    textSize (20);
    text("APERTE ESPAÇO PARA COMEÇAR!", 120,300);
  }
  
    if (estadodejogo=="fim"){
    
    background("black");
      
    //todos parem
    esqueleto.destroy();
    torrezona.destroy();
    grupop.destroyEach();
    grupos.destroyEach();
      

    fill ("lightgreen");
    stroke ("white");
    textSize (30);
    text("VOCÊ BATEU AS BOTAS :( ", 120,300);      
      
    
  }
  
}