function Snake(){
    this.x = Math.ceil(random(0, canvasWidth - 200) / scl) * scl;
    this.y = Math.ceil(random(5, canvasHeight - 50) / scl) * scl;

    this.snakeLength = 3;
    this.direction = 'right';
    this.directions = ['right'];

    this.xTail = [];
    this.yTail = [];

    this.draw = function () {
        for (let i = 0; i < this.snakeLength; i++) {
            strokeWeight(9);
            stroke(0, 174, 25);
            line(this.xTail[i], this.yTail[i], this.xTail[i + 1], this.yTail[i + 1]);
        }
    }

    this.eat = function () {
        let distance = dist(this.xTail[this.xTail.length - 1], this.yTail[this.yTail.length - 1], fruit.x, fruit.y);

        if ( distance === 0 ) {
            this.xTail.unshift(this.xTail[0]);
            this.yTail.unshift(this.yTail[0]);
            this.snakeLength++;
            scoreElement.innerHTML = ++gameScore;

            switch (gameScore) {
                case 10:
                    level++;
                    this.levelUp();
                    break;
                case 25:
                    level++;
                    this.levelUp();
                    break;
                case 35:
                    level++;
                    this.levelUp();
                    break;
                case 45:
                    level++;
                    this.levelUp();
                    break;
            }
            fruit.updateCoordinates();
        }
    }

    this.die = function () {

        if (
            this.xTail[this.xTail.length - 1] > width ||
            this.xTail[this.xTail.length - 1] < 0 ||
            this.yTail[this.yTail.length - 1] > height ||
            this.yTail[this.yTail.length - 1] < 0 || this.snakeCollision()
        ) {
            clearInterval(obstacleIntervalID);
            playing = false;
            dead = true;
            document.body.setAttribute("style","touch-action: auto; overflow-y: auto;");
            document.body.style.touchAction = 'auto';
            document.body.style.overflowY = 'auto';
            navigationButton.setAttribute("style", "display:block;");
            navigationButton.style.display = 'block';
            playButton.style.display = "block";
            playButton.setAttribute("style", "display:block;");
            clear();
            noLoop();
            showMessages();

        }
    }

    this.snakeCollision = function () {
        let snakeHeadX = this.xTail[this.xTail.length - 1];
        let snakeHeadY = this.yTail[this.yTail.length - 1];
        for (let i = 0; i < this.xTail.length - 1; i++) {
            if (this.xTail[i] === snakeHeadX && this.yTail[i] === snakeHeadY) {
                return true;
            }
        }

        //Check for collision with an obstacle
        for (let i = 0; i < obstacle.coordinates.length; i++) {
            if (snakeHeadX === obstacle.coordinates[i].x && snakeHeadY === obstacle.coordinates[i].y) {
                return true;
            }
        }

    }

    this.updateCoordinates = function() {
        for (let i = 0; i < this.snakeLength - 1; i++) {
            this.xTail[i] = this.xTail[i + 1];
            this.yTail[i] = this.yTail[i + 1];
        }
        if (this.directions.length > 1) {
            this.executeDirections();
            this.directions.shift();
            this.executeDirections();
        } else {
            this.executeDirections();
        }
    }

    this.updateDirection = function (direction, oppositeDirection) {
        if (this.direction !== oppositeDirection) {
            this.direction = direction;
            this.directions.push(direction);
        } else {
            switch (oppositeDirection) {
                case 'left':
                    this.directions.push('up');
                    this.directions.push(direction);
                    this.direction = direction;
                    break;
                case 'right':
                    this.directions.push('down');
                    this.directions.push(direction);
                    this.direction = direction;
                    break;
                case 'down':
                    this.directions.push('left');
                    this.directions.push(direction);
                    this.direction = direction;
                    break;
                case 'up':
                    this.directions.push('right');
                    this.directions.push(direction);
                    this.direction = direction;
                    break;
            }
        }
    }

    this.executeDirections = function () {
        switch (this.directions[0]) {
            case 'right':
                this.xTail[this.snakeLength - 1] = this.xTail[this.snakeLength - 2] + scl;
                this.yTail[this.snakeLength - 1] = this.yTail[this.snakeLength - 2];
                break;
            case 'up':
                this.xTail[this.snakeLength - 1] = this.xTail[this.snakeLength - 2];
                this.yTail[this.snakeLength - 1] = this.yTail[this.snakeLength - 2] - scl;
                break;
            case 'left':
                this.xTail[this.snakeLength - 1] = this.xTail[this.snakeLength - 2] - scl;
                this.yTail[this.snakeLength - 1] = this.yTail[this.snakeLength - 2];
                break;
            case 'down':
                this.xTail[this.snakeLength - 1] = this.xTail[this.snakeLength - 2];
                this.yTail[this.snakeLength - 1] = this.yTail[this.snakeLength - 2] + scl;
                break;
        }
    }

    this.levelUp = function () {
        levelElement.innerHTML = level + "/5";
        updateObstaclesSpawnInterval();
    }
}