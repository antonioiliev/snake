## The Snake | By Antonio Iliev

This is my interpretation of the great classic - The Snake. 

## Play it

Absolutely no need to download and test on your local machine.

[http://snake.alpibo.com](http://snake.alpibo.com/)

## Rules

The game is simple - collect the fruits to grow bigger, avoid the tail of the snake and the walls, avoid the black obstacles that will certainly get you killed. Also be aware of the leveling up as the game has 5 levels which make the game more and more difficult with each level.

## About the project

The project is built with JavaScript in its entirety with the help of two libraries - [p5.js](https://p5js.org) and [Hammer.js](https://hammerjs.github.io/)

[p5.js](https://p5js.org) is responsible for creating the canvas and processing the snake and its movement, the fruits and the obstacles.

[Hammer.js](https://hammerjs.github.io/) is responsible for making the game mobile friendly by making it possible to have 'swipe' detection on devices where there is no keyboard.

There are 4 JavaScript files that make up the logic of the game. The main one is [snake.js](https://github.com/antonioiliev/snake/blob/master/assets/js/snake.js) which is the basis of the game. It is responsible for creating the canvas itself, instantiating the necessary objects and managing the state of the game.

Then there are three more files - [snake-object.js](https://github.com/antonioiliev/snake/blob/master/assets/js/snake-object.js), [fruit-object.js](https://github.com/antonioiliev/snake/blob/master/assets/js/fruit-object.js) and [obstacle-object.js](https://github.com/antonioiliev/snake/blob/master/assets/js/obstacle-object.js).

## [snake-object.js](https://github.com/antonioiliev/snake/blob/master/assets/js/snake-object.js)

The file is responsible for the snake in general. It generate the spawn coordinates for the snake, draws it, moves it, changes its direction, detects when the snake eats a fruit, detects when the snake has 'died' and also handles leveling up.

## [fruit-object.js](https://github.com/antonioiliev/snake/blob/master/assets/js/fruit-object.js)

When the snake eats a fruit, this file contains a 'update' function that generates new coordinates to spawn a fruit which do not coincide with the head/tail of the snake or a bomb.

## [obstacle-object.js](https://github.com/antonioiliev/snake/blob/master/assets/js/obstacle-object.js)

This contains functions that are reponsible for generating obstacle coordinates and then drawing them. It also keeps track of how many obstacles have been generated and their respective coordinates. No obstacle should be drawn over another obstacle, a fruit or the snake.

## License

'The Snake by Antonio Iliev' is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

