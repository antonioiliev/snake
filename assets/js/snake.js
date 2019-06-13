let canvas;
let canvasWidth = 600;
let canvasHeight = 500;
let scl = 10;
let canvasCoordinates;

let snake;
let obstacle;
let fruit;

let gameScore = 0;
let level = 1;

let playing = false;
let dead = false;

let scoreElement = document.getElementById('game-score');
let levelElement = document.getElementById('game-level');
let playButton = document.getElementById('play');
let canvasText = document.querySelector('.canvas-text');
let navigation = document.querySelector('.menu');
let navigationButton = document.querySelector('.menu-icon');

let navOpenFlag = 0;

let canvasElement;
let touchEvent;

let obstacleIntervalID;

function setup() {
    frameRate(40);
    if (window.innerWidth < 770){
        canvas = createCanvas(window.innerWidth - 50, window.innerHeight - 150);
    } else {
        canvas = createCanvas(canvasWidth, canvasHeight);
    }

    canvas.parent('canvas-holder');
    canvasElement = document.getElementById('defaultCanvas0');
    touchEvent = new Hammer(canvasElement);
    rectMode(CENTER);

    canvasCoordinates = canvasElement.getBoundingClientRect();
    if (window.innerWidth < 770){
        canvasText.setAttribute("style","width:" + (window.innerWidth - 100) + "px;top:" + (canvasCoordinates.top + 50) + "px;");
        canvasText.style.width = window.innerWidth - 100;
        canvasText.style.top = canvasCoordinates.top + 50;

    } else {
        canvasText.setAttribute("style","width:" + (canvasWidth - 20) + "px;top:" + (canvasCoordinates.top + 20) + "px;");
        canvasText.style.width = canvasWidth - 20;
        canvasText.style.top = canvasCoordinates.top + 20;
    }
}

function setSketch() {
    snake = new Snake();
    obstacle = new Obstacle();
    fruit = new Fruit();

    fruit.updateCoordinates();

    for (let i = 0; i < snake.snakeLength; i++) {
        snake.xTail.push(snake.x + i * scl);
        snake.yTail.push(snake.y);
    }

    scoreElement.innerHTML = gameScore = 0;
    levelElement.innerHTML = level = 1;

    noLoop();
}

function draw() {
    background("#ffc96c");

    if (playing) {

        switch (level) {
            case 1:
                configureSnakeSpeed(3);
                break;
            case 2:
                configureSnakeSpeed(3);
                break;
            case 3:
                configureSnakeSpeed(2);
                break;
            case 4:
                configureSnakeSpeed(2);
                break;
            case 5:
                configureSnakeSpeed(1);
                break;
        }

        stroke(252, 0, 19);
        circle(fruit.x, fruit.y, 3);
        obstacle.draw();

    } else {
        showMessages();
    }
}

function configureSnakeSpeed (frame) {
    if (frameCount % frame == 0) {
        snake.draw();
        snake.updateCoordinates();
        snake.die();
        snake.eat();
    } else {
        snake.draw();
    }
}

playButton.addEventListener("click", function(){
    this.style.display = "none";
    this.setAttribute("style", "display:none;");
    window.scrollTo(0, 0);
    document.body.setAttribute("style","touch-action: none; overflow-y: hidden;");
    document.body.style.touchAction = 'none';
    document.body.style.overflowY = 'hidden';
    navigationButton.setAttribute("style", "display:none;");
    navigationButton.style.display = 'none';

    setSketch();
    loop();
    playing = true;
    dead = false;
    canvasText.innerHTML = '';

    obstacleIntervalID = setInterval(function(){
        obstacle.addObstacle();
    }, 10000);

    touchEvent.get('swipe').set({
        direction: Hammer.DIRECTION_ALL,
        threshold: 0.1,
        velocity: 0.001
    });

    touchEvent.on("swipeleft swiperight swipeup swipedown", function(event) {
        switch (event.type) {
            case 'swipeleft':
                snake.updateDirection('left', 'right');
                break;
            case 'swipeup':
                snake.updateDirection('up', 'down');
                break;
            case 'swiperight':
                snake.updateDirection('right', 'left');
                break;
            case 'swipedown':
                snake.updateDirection('down', 'up');
                break;
        }
    });

    document.onkeydown = function(event) {
        switch (event.keyCode) {
            case 37:
                snake.updateDirection('left', 'right');
                break;
            case 38:
                snake.updateDirection('up', 'down');
                break;
            case 39:
                snake.updateDirection('right', 'left');
                break;
            case 40:
                snake.updateDirection('down', 'up');
                break;
        }
    };

});



function updateObstaclesSpawnInterval() {
    clearInterval(obstacleIntervalID);

    switch(level) {
        case 1:
            clearInterval(obstacleIntervalID);
            obstacleIntervalID = setInterval(function(){
                obstacle.addObstacle();
            }, 10000);
            break;
        case 2:
            clearInterval(obstacleIntervalID);
            obstacleIntervalID = setInterval(function(){
                obstacle.addObstacle();
            }, 8000);
            break;
        case 3:
            clearInterval(obstacleIntervalID);
            obstacleIntervalID = setInterval(function(){
                obstacle.addObstacle();
            }, 5000);
            break;
        case 4:
            clearInterval(obstacleIntervalID);
            obstacleIntervalID = setInterval(function(){
                obstacle.addObstacle();
            }, 3000);
            break;
        case 5:
            clearInterval(obstacleIntervalID);
            obstacleIntervalID = setInterval(function(){
                obstacle.addObstacle();
            }, 1000);
            break;
    }
}

function windowResized() {
    canvasCoordinates = canvasElement.getBoundingClientRect();

    if (window.innerWidth < 770){
        resizeCanvas(window.innerWidth - 50, window.innerHeight - 150);

        canvasText.setAttribute("style","width:" + (window.innerWidth - 100) + "px;top:" + (canvasCoordinates.top + 50) + "px;");
        canvasText.style.width = window.innerWidth - 100;
        canvasText.style.top = canvasCoordinates.top + 50;
    } else {
        resizeCanvas(canvasWidth, canvasHeight);

        canvasText.setAttribute("style","width:" + (canvasWidth - 20) + "px;top:" + (canvasCoordinates.top + 20) + "px;");
        canvasText.style.width = canvasWidth - 20;
        canvasText.style.top = canvasCoordinates.top + 20;
    }
}

function showMessages() {
    if (!playing && !dead) {
        canvasText.innerHTML = "<h2>Alpibo`s snake</h2>\<p>Welcome to my interpretation of the classic game.</p><p>The rules are simple:</p><ul><li>Collect the fruits to grow bigger</li><li>Avoid the tail of the snake and the walls</li><li>Avoid the black obstacles</li><li>By leveling up, the snake will move faster and the obstacles will spawn more frequently</li></ul>";
    } else if (!playing && dead && gameScore === 0) {
        canvasText.innerHTML = "<h2>Well.. You could have done better. Try again!</h2>";
    } else if (!playing && dead && gameScore > 0) {
        canvasText.innerHTML = "<h2>Well done! <br/>You scored " + gameScore + " points <br/>You reached level " + level + "</h2>";
    }
}


//Toggle fullwidth menu
navigationButton.addEventListener("click", function (e) {
    e.preventDefault();
    navigationButton.classList.toggle("active");
    navigation.classList.toggle("visible");
});




