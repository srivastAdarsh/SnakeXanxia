import{snakeBody} from './snake.js'

export let location = {x:5, y:10}

export function foodPosition(gameBoard){
    const div=document.createElement('div')
    div.style.gridRowStart=location.y;
    div.style.gridColumnStart=location.x;
    div.classList.add('food');
    gameBoard.appendChild(div);
}

export function updateFood(gameBoard){
    while(onSnake(location)){
        location.x=Math.floor(Math.random()*30)+1;
        location.y=Math.floor(Math.random()*30)+1; 
    }
}

function onSnake(location) {
    for(let i=0; i<snakeBody.length; i++){
        if(snakeBody[i].x===location.x && snakeBody[i].y===location.y){
            return true;
        }
    }
    return false;
}



