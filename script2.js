var canvas = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");
var snakeWidth = 10;
var snakeHeight = 10;
var direction = "right";
let score = "0";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "sound/dead.mp3";
eat.src = "sound/eat.mp3";
up.src = "sound/up.mp3";
right.src = "sound/right.mp3";
left.src = "sound/left.mp3";
down.src = "sound/down.mp3";


//draw snake
function drawSnake(x,y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
    ctx.fillStyle = "red";
    ctx.strokeRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
}

//create snake
let len = 4;
snake = [];
for(let i=len-1; i>=0; i--) {
    snake.push({
        x:i,
        y:0
    });
}

// direction control
document.addEventListener("keydown", dirControl);

function dirControl(e) {
    if(e.keyCode == 37 && direction!="right") {
        left.play();
        direction = "left";
    }
    else if(e.keyCode == 38 && direction!="down") {
        up.play();
        direction = "up";
    }
    else if(e.keyCode == 39 && direction!="left") {
        right.play();
        direction = "right";
    }
    else if(e.keyCode == 40 && direction!="up") {
        down.play();
        direction = "down";
    }
}
function arrowUp() {direction = "up"; up.play();}
if(arrowUp == true) {
    direction != "down";
}
function arrowDown() {direction = "down"; down.play();}
function arrowRight() {direction = "right"; right.play();}
function arrowLeft() {direction = "left"; left.play();}


// create food 
let food = {
    x:Math.round(Math.random()*(canvas.width/snakeWidth-2)+1),
    y:Math.round(Math.random()*(canvas.height/snakeHeight-3)+1)
}

// draw food
function drawFood(x,y) {
    ctx.fillStyle = "springgreen";
    ctx.fillRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
}

//check collision
function collision(x,y,array) {
    for(let i = 1; i< array.length; i++) {
        if(x == array[i].x && y == array[i].y) {
            return true;
        }
    }
    return false;
}


// score funciton 
function drawScore(x) {
    ctx.fillStyle = "yellow";
    ctx.font = "20px Vardana"
    ctx.fillText("score : "+x, 5, canvas.height-5);
    ctx.fillText("©durJoy", 422, canvas.height-5);
    ctx.fillText("L2", 235, canvas.height-6);
}


// snakeLength function start
function snakeLength() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i=0; i<snake.length; i++) {
        let x = snake[i].x;
        let y = snake[i].y;
        drawSnake(x,y)
    }

    drawFood(food.x, food.y);

// snake head
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;


    if(direction == "right"){
        snakeX++;
    }
    if(direction == "left"){
        snakeX--;
    }
    if(direction == "up"){
        snakeY--;
    }
    if(direction == "down"){
        snakeY++;
    }

    // game over 

    if(snakeX < 0 || snakeY < 0 || snakeX >= canvas.width/snakeWidth || snakeY >= canvas.height/snakeHeight || collision(snakeX ,snakeY ,snake)) {
        dead.play();
        ctx.fillStyle = "red";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        window.location.replace("snakeThird.html");
    }

    //snake eat food
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x:Math.round(Math.random()*(canvas.width/snakeWidth-2)+1),
            y:Math.round(Math.random()*(canvas.height/snakeHeight-3)+1)
        }

        var newHead = {
            x: snakeX,
            y: snakeY
        };
    }else {
        snake.pop();
        var newHead = {
            x: snakeX,
            y: snakeY
        }
    }


    snake.unshift(newHead);
    drawScore(score);
}

// end snakeLength function

setInterval(snakeLength, 65);
snakeLength();
