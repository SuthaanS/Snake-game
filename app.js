const gameBoard=document.getElementById('gamebox');
const context=gameBoard.getContext('2d');
const scoreText=document.getElementById('scoreval')


const WIDTH=gameBoard.width;
const HEIGHT=gameBoard.height;
const UNIT=25;

let foodX;
let foodY;
let xspeed=25;
let yspeed=0;
let score=0;
let started=false;
let active=true;
let paused=false;

let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0, y:0}
];
 
window.addEventListener('keydown',keypress)
startgame();

function startgame(){
    context.fillStyle='#212121';
    //fillRect(xstart,ystart,width,height)--> This for reference
    context.fillRect(0,0,WIDTH,HEIGHT);
    createfood();
    displayfood();
    // drawsnake();
    // movesnake();
    drawsnake();
}

function displayfood(){
    context.fillStyle='red';
    context.fillRect(foodX,foodY,UNIT,UNIT)
}

function clearboard(){
    context.fillStyle='#212121';
    //fillRect(xstart,ystart,width,height)--> This for reference
    context.fillRect(0,0,WIDTH,HEIGHT);

}

function createfood(){
    foodX=Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}

function drawsnake(){
    context.fillStyle= 'aqua' ;
    context.strokeStyle = '#212121';
    snake.forEach((snakepart) =>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT)
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT)
    })
}

function movesnake(){
     const head={x:snake[0].x+xspeed,y:snake[0].y+yspeed}
     snake.unshift(head)
     if(snake[0].x==foodX && snake[0].y==foodY){
        score+=1;
        scoreText.textContent = score;
        createfood(); 
     }
     else{
        snake.pop();
     }
}

function nexttime(){
    if(active &&!paused){
        setTimeout(() => {
            clearboard();
            displayfood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttime();
        }, 300);
    }
    else if(!active){
        clearboard();
        context.font = "bold 30px serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Ohh...It's Game Over!!",WIDTH/2,HEIGHT/2)
    }
}

function keypress(event){
    if(!started){
        started=true;
        nexttime();
    }

    if(event.keyCode===32){
        console.log('clicked')
        if(paused){
            paused=false;
            nexttime();
        }
        else{
            paused=true;
        }
    }
    const left=37
    const up=38
    const right=39
    const down = 40

    switch(true){
        case(event.keyCode==left && xspeed!=UNIT):
            xspeed=-UNIT;
            yspeed=0;
            break;
        
        case(event.keyCode==right && xspeed!=-UNIT):
            xspeed=UNIT;
            yspeed=0;
            break;

        case(event.keyCode==up && yspeed!=UNIT):
            xspeed=0;
            yspeed=-UNIT;
            break;
        
        case(event.keyCode==down && yspeed!=UNIT):
            xspeed=0;
            yspeed=UNIT;
            break;
    }
}

function checkgameover(){
    switch(true){
        case(snake[0].x<0):
            active=false;
            break;
        case(snake[0].x>= WIDTH):
            active=false;
            break;
        case(snake[0].y<0):
            active=false;
            break;
        case(snake[0].y>=HEIGHT):
            active=false;
            break;
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            active = false;
            break;
        }
    }
}