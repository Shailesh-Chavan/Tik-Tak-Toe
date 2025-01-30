let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new-game");
let resetBtn = document.querySelector("#reset-btn")
let msgContainer = document.querySelector(".msg-container")

let msg = document.querySelector(".msg")
let turn0 = true;
let count=0;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const clearBoxes = () =>{
    for(let box of boxes){
        turn0=true;
        box.innerText = "";
        box.disabled=false;
    }
    msgContainer.classList.add("hide");
    count=0;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        count++;
        if (turn0 === true) {
            box.innerText = "0";
            turn0 = false;
        }
        else {
            box.innerText = "X";
            turn0 = true;
        }
        checkWinner();
        box.disabled = true;

        if(count == boxes.length)
        {
            gameDraw(); 
        }
    }); 
});

const showWinner = (winnr) => {
    msgContainer.classList.remove("hide");
    msg.classList.remove("draw-msg");
    msg.classList.add("win-msg");
    msg.innerText = `Congratulations ! the winner is ${winnr}`;   
};

const gameDraw = () => {
    msgContainer.classList.remove("hide");
    msg.classList.remove("win-msg");
    msg.classList.add("draw-msg");
    msg.innerText="Game is drawn ! try next time";
    count = 0;
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {

            if (pos1Val === pos2Val && pos2Val === pos3Val) { 
                showWinner(pos1Val);
                count = 0;              
                for (let box of boxes) {
                    box.disabled = true;
                }
            }       
        }
    }    
};

newGameBtn.addEventListener("click", clearBoxes);
resetBtn.addEventListener("click", clearBoxes);