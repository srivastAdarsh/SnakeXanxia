import {score,foodSound,movementSound,gameOverSound,gameSound} from './app.js'
import {location, updateFood} from './food.js'


export let snakeSpeed=10;
export let snakeBody=[{x:15,y:18}]
let count=0;
let isPlaying=false;

let inputDirection={x:0,y:0}
export function snakePosition(gameBoard){
    //creating snake
    snakeBody.forEach((e,index)=>{
        const div=document.createElement('div')
        div.style.gridRowStart=e.y;
        div.style.gridColumnStart=e.x;
        if(index===0) div.classList.add('head')
        else div.classList.add('body')
        gameBoard.appendChild(div)
    })

    //adding event listener for snake movement 
    window.addEventListener('keydown',(e)=>{
        //playing move sound
        if(e.key==='ArrowUp' || e.key==='ArrowDown' || e.key==='ArrowLeft' || e.key==='ArrowRight') 
            movementSound.play();

        switch(e.key){
            case 'ArrowUp':
                if(inputDirection.y===0){
                    inputDirection.x=0;
                    inputDirection.y=-1;
                }
            break;

            case 'ArrowDown':
                if(inputDirection.y===0){
                    inputDirection.x=0;
                    inputDirection.y=1;
                }
                break;
                
            case 'ArrowLeft':
                if(inputDirection.x===0){
                    inputDirection.x=-1;
                    inputDirection.y=0;
                }
                break;
                
            case 'ArrowRight':
                if(inputDirection.x===0){
                    inputDirection.x=1;
                    inputDirection.y=0;
                }
                break;

            default: break;
        }
    })


    //adding eventlistener to mute music -------------------->error
    window.addEventListener('keydown', (e)=>{
        if(e.key==='p' || e.key==='P'){
            if(isPlaying) {
                gameSound.pause()
                isPlaying=false
            }

            else{
                gameSound.play()
                isPlaying=true
            }
        }
    })

    //moving snake

        //shifting the body parts
    for(let i=snakeBody.length-2; i>=0; i--) {
        snakeBody[i+1]={...snakeBody[i]}
    }
        //shifting the head
    snakeBody[0].x+=inputDirection.x;
    snakeBody[0].y+=inputDirection.y;

    //checking if snake has eaten the food
    if(snakeBody[0].x===location.x && snakeBody[0].y===location.y){

        //playing food sound
        foodSound.play()

        //updating food location
        updateFood(gameBoard)

        //incresing snake length
        snakeLength(gameBoard)

        //updating currentScore
        score.currentScore++ 

        //incrementing number of times food eaten
        count++

        //incresing snake speed every 5 eat
        if(count==5){
            snakeSpeed+=2;
            count=0;
        }
    }

    //checking for game over
    if(hasCollided()){
        gameOverSound.play()
        gameSound.pause()
        resetBoard()
    }
}


export function snakeLength(gameBoard){
    snakeBody.unshift({
        x:snakeBody[0].x+inputDirection.x,
        y:snakeBody[0].y+inputDirection.y
    })
}

function hasCollided(){

    //checking for collision with itself
    for(let i=1; i<snakeBody.length; i++){
        if(snakeBody[0].x===snakeBody[i].x && snakeBody[0].y===snakeBody[i].y){
            return true
        }
    }

    //checking for collision with walls
    if(snakeBody[0].x<0 || snakeBody[0].y<0 || snakeBody[0].x>31 || snakeBody[0].y>31){
        return true
    }

}

function resetBoard(){

    //alerting gameover
    alert('Game Over')

    //reseting the snake position
    snakeBody=[{x:15, y:15}]
    
    //reseting the food position
    location.x=5
    location.y=5

    //reseting the input direction
    inputDirection={x:0,y:0}

    //reseting the score
    score.currentScore=0  

    //reseting the snake speed
    snakeSpeed=10;

    //reseting the music
    gameSound.pause()
    isPlaying=false
}




