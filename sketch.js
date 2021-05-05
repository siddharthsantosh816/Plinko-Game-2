const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var plinko, ground1;
var check = 0;
var particles = [];
var plinkos=[];
var divisions=[];
var score=0, attempts=5;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
    scoreSound = loadSound("jump.wav");
}

function setup() {
	createCanvas(800, 650);
	rectMode(CENTER);

	engine = Engine.create();
	world = engine.world;
		
	//Create the Bodies Here.
	ground1 = new Ground(0,645,1600,10);
   
    //Creating divisions
	for(var x=0; x <=width; x=x+80){
        divisions.push(new Divisions(x,height-10, 10,350));
    }
    //Creating Plinkos
    for(var x=40; x<=width; x=x+50){
        for (var y = 100; y<=280; y=y+180) {
             plinkos.push(new Plinkos(x,y,5));
        }
    }
    for(var x=15; x<=width; x=x+50){
        for(var y =190; y<=370;y=y+180){
            plinkos.push(new Plinkos(x,y,5));
        }
    }
    Engine.run(engine);
}

function draw() {
	background(0);
	fill("white");
    ground1.display();
    
    textSize(18);
    text("Score: "+ score, 10, 30);
    text("Attempts Left: "+ attempts, width-150, 30);

    for(var x=25; x<width; x=x+80){
        var d;
        if(x<320){
          d=100;
        }
        else if(x<480){
            d=500;
        }
        else{
            d=200;
        }

        textSize(18);
        text(d,x,480)
    }
    
     
    if (gameState === END) {
        textSize(40);
        fill("red");
        text("Game Over", 300, 340);
        textSize(18);
        text("Press 'R' to restart the game", 300, 30)
    } 

    for(var i=0; i <plinkos.length; i++){
        plinkos[i].display();   
    } 
   

    for(var i=0; i <divisions.length; i++){
        divisions[i].display();  
    } 
    if (particles.length>0){
    for(var i=0; i<particles.length; i++){ 
        particles[i].display();
        var num = particles.length-1;
        console.log(num);
    }
}
    //scoring
    if(check===0 && particles.length>0){
        if(particles[num].body.position.y>470 &&particles[num].body.position.x > 5 && particles[num].body.position.x < 795 ){
            if(particles[num].body.position.x<320){
                score=score+100;
                scoreSound.play();
                check=1;
            }
            else if(particles[num].body.position.x<480){
                score=score+500;
                scoreSound.play();
                check=1;
            }
            else{
                score=score+200;
                scoreSound.play();
                check=1;
            }
        }
    }
    if(attempts===0){
        gameState=END;
    }

 }
 
function mousePressed() {
    if(gameState === PLAY) {
        particles.push(new Particle(mouseX,10,8,6));
        attempts = attempts -1;
        check=0;
    } 
}
function keyPressed() {
    if (keyCode === 82 && gameState === END) {   
        score=0;
        attempts=5;
        check = 0;
        particles = [];
        gameState = PLAY;
    }
}
