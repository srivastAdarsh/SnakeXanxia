import {snakePosition,snakeLength, snakeSpeed} from "./snake.js";
import { foodPosition } from "./food.js";

//Rendering screen

let lastRenderTime=0;
// let snakeSpeed=2;
function main(currentTime){
    const secondsSinceLastRender=(currentTime-lastRenderTime)/1000;
    window.requestAnimationFrame(main);
    if(secondsSinceLastRender<1/snakeSpeed) return
    lastRenderTime=currentTime;
    gameStarts();
}
window.requestAnimationFrame(main)


//Game functionality

const gameBoard=document.querySelector(".gameBoard")
const food=document.querySelector(".food")
const snake=document.querySelector(".snake")

function gameStarts(){

    //Snake position update functions
    gameBoard.innerHTML = ''
    snakePosition(gameBoard)

    //Food position update function
    foodPosition(gameBoard)


    //Snake length update function
    snakeLength(gameBoard)
}