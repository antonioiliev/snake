function Obstacle(){
    this.x;
    this.y;
    this.number = 0;
    this.coordinates = [];
    
    this.addObstacle = function () {
        let notSnake = false;
        let notBomb = false;
        let notFruit = false;

        while (notSnake == false || notBomb == false || notFruit == false) {
            notSnake = true;
            notBomb = true;
            notFruit = true;

            this.x = floor(random(10, (width - 10) / scl)) * scl;
            this.y = floor(random(10, (height - 10) / scl)) * scl;

            //Make sure the fruit does not land on top of the snake
            for (let i = 0; i < snake.snakeLength; i++) {
                if (this.x == snake.xTail[i] && this.y == snake.yTail[i]) {
                    notSnake = false;
                }
            }

            //Make sure a bomb does not land on top of other bombs
            if (obstacle.coordinates.length > 0 ) {
                for (let i = 0; i < obstacle.coordinates.length; i++) {
                    if (this.x == obstacle.coordinates[i].x && this.y == obstacle.coordinates[i].y) {
                        notBomb = false;
                    }
                }
            }

            //Make sure that a bomb does not land on a fruit
            if (this.x == fruit.x && this.y == fruit.y){
                notFruit = false;
            }
        }

        let obstacleMeta = {
            x: this.x,
            y: this.y,
            width: 5,
            height: 5,
        }

        this.coordinates.push(obstacleMeta);
        this.number++;
        this.draw();
    }


this.draw = function() {
    if (this.coordinates.length > 0 ) {
        for (let i = 0; i < this.coordinates.length; i++) {
            stroke(0);
            rect(this.coordinates[i].x, this.coordinates[i].y, this.coordinates[i].width, this.coordinates[i].height);
        }
    }
}

}