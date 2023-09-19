import Blocks from "./blocks.js";

const board = document.querySelector(".board ul");
const gameStart = document.querySelector(".gameStart");
const gameOver = document.querySelector(".gameOver");
const scoreDisplay = document.querySelector(".scores");
const start = document.querySelector(".startBTN")
const restart = document.querySelector(".restartBTN");

const board_Row = 20;
const board_Col = 10;
let score = 0;
let duration = 500;
let downInterval;
let tempMovingBlock;

const movingBlock = {
    type: "",
    direction: 0,
    top: 0,
    left: 3
};

const init = () => {
    tempMovingBlock = {...movingBlock};

    for (let i = 0; i < board_Row; i++){
        prependNewLine();
    }
    generateNewBlock();
}

const prependNewLine = () => {
    const li = document.createElement("li");
    const ul = document.createElement("ul");

    for (let j = 0; j < board_Col; j++) {
        const metrix = document.createElement("li");
        ul.prepend(metrix);
    }
    li.prepend(ul);
    board.prepend(li); 
}

const renderingBlocks = (moveType = " ") => {
    const { type, direction, top, left } = tempMovingBlock;
    const shiftingBlocks = document.querySelectorAll(".moving");
    shiftingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    });

    Blocks[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = board.childNodes[y] ? board.childNodes[y].childNodes[0].childNodes[x] : null;
        const isEmpty = checkEmpty(target);

        if(isEmpty){
            target.classList.add(type, "moving");
        } else{
            tempMovingBlock = {...movingBlock};
            if(moveType === "retry"){
                clearInterval(downInterval);
                showGameOverText();
            }
            setTimeout(()=>{
                renderingBlocks("retry");
                if(moveType === "top"){
                    seizedBlock();
                }
            },0);
            return true;
        }
    });
    movingBlock.left = left;
    movingBlock.top = top;
    movingBlock.direction = direction;
}

const seizedBlock = () =>{
    const shiftingBlocks = document.querySelectorAll(".moving");
    shiftingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    });
    checkMatch();
}
const checkMatch = () =>{
    const childNodes = board.childNodes;

    childNodes.forEach(child => {
        let matched = true;
        child.children[0].childNodes.forEach(li => {
            if(!li.classList.contains("seized")){
                matched = false;
            }
        });
        if(matched){
            child.remove();
            prependNewLine();
            score++;
            scoreDisplay.innerHTML = score;
        }
    });
    generateNewBlock();
}

const generateNewBlock = () =>{

    clearInterval(downInterval);
    downInterval = setInterval(() => {
        shiftingBlock('top',1)
    }, duration);

    const blockArray = Object.entries(Blocks);
    const randomBlock = Math.floor(Math.random() * blockArray.length);
    movingBlock.type = blockArray[randomBlock][0];
    movingBlock.top = 0;
    movingBlock.left = 3;
    movingBlock.direction = 0;
    tempMovingBlock = {... movingBlock};
    renderingBlocks();
}

const checkEmpty = (target) =>{
    if(!target || target.classList.contains("seized")){
        return false;
    }
    return true;
}

const shiftingBlock = (movetype, amount) =>{
    tempMovingBlock[movetype] += amount;
    renderingBlocks(movetype);
}

const changeDirection = () =>{
    const direction = tempMovingBlock.direction;
    direction === 3 ? tempMovingBlock.direction = 0 : tempMovingBlock.direction += 1;
    renderingBlocks();
}

const dropBlock = () =>{
    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        shiftingBlock("top",1);
    }, 10);
}

const showGameOverText = () =>{
    gameOver.style.display = "flex";
}

const increaseDuration = () =>{
    duration -= 40;
}

setInterval(increaseDuration, 10000);

document.addEventListener("keydown", event => {

    switch(event.keyCode){
        case 39:
            shiftingBlock("left", 1);
            break;
        case 37:
            shiftingBlock("left", -1);
            break;
        case 40:
            shiftingBlock("top", 1);
            break;
        case 38:
            changeDirection();
            break;
        case 32:
            dropBlock();
            break;
        default:
            break;
    }
});

start.addEventListener("click", () =>{
    gameStart.style.display = "none";
    init();
});

restart.addEventListener("click", () => {
    board.innerHTML = "";
    gameOver.style.display = "none";
    score = 0;
    duration = 500;
    scoreDisplay.innerHTML = score;
    init();
});
