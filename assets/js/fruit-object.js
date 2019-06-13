function Fruit(){
    this.x;
    this.y;
    
    this.updateCoordinates = function() {
        let notBomb = false;
        let notSnake = false;

        while (notSnake == false || notBomb == false) {
            notSnake = true;
            notBomb = true;
            this.x = floor(random(10, (width - 10) / scl)) * scl;
            this.y = floor(random(10, (height - 10) / scl)) * scl;

            //Make sure the fruit does not land on top of the snake
            for (let i = 0; i < snake.snakeLength; i++) {
                if (this.x == snake.xTail[i] && this.y == snake.yTail[i]) {
                    notSnake = false;
                }
            }

            //Make sure the fruit does not land on top of the bombs
            if (obstacle.coordinates.length > 0 ) {
                for (let i = 0; i < obstacle.coordinates.length; i++) {
                    if (this.x == obstacle.coordinates[i].x && this.y == obstacle.coordinates[i].y) {
                        notBomb = false;
                    }
                }
            }
        }
    }
}