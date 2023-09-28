import {snakeBody,snakePosition ,snakeLength, snakeSpeed} from "./snake.js";
import {foodPosition,location,updateFood } from "./food.js";

//Rendering screen

let lastRenderTime=0;
function main(currentTime){
    const secondsSinceLastRender=(currentTime-lastRenderTime)/1000;
    window.requestAnimationFrame(main);
    if(secondsSinceLastRender<1/snakeSpeed) return
    lastRenderTime=currentTime;
    gameStarts();
}
window.requestAnimationFrame(main)


export const foodSound = new Audio('food.mp3')
export const gameOverSound = new Audio('gameover.mp3')
export const movementSound = new Audio('move.mp3')
export const gameSound = new Audio('music.mp3')
movementSound.volume=0.5
gameSound.volume=0.5



//Game functionality

export let score = {
    currentScore:0,
    highScore:0
}

score.highScore = localStorage.getItem('highScore')

const span = document.querySelectorAll('span')
const gameBoard=document.querySelector(".gameBoard")
const food=document.querySelector(".food")
const snake=document.querySelector(".snake")

function gameStarts(){
    
    gameBoard.innerHTML = ''

    //updating snake position
    snakePosition(gameBoard)

    //updating food position
    foodPosition(gameBoard)

    //displaying score and high score
    span[0].innerText=score.currentScore
    span[1].innerText=score.highScore

    //updating high score
    if(score.highScore<=score.currentScore){
        score.highScore=score.currentScore
        span[1].innerText=score.currentScore

        //storing in localStorage
        localStorage.setItem('highScore', score.highScore)
    }
}




