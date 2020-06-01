console.log("Inside index.js");

const PlayerFactor = function(name) {
    return { name };
};


const GameBoardFactory = function() {
    let gameBoard = ["x", "O", "0", "x", "x", "0", "x", "0", "x"];
    // let currentMarker = "X";
    // let currentTurn = 1;
    //
    // function updateMarker(index) {
    //
    //     if (currentMarker === "X") {
    //         currentMarker = "O";
    //         currentTurn = 0;
    //         gameBoard[index] = currentMarker;
    //     }
    //     else {
    //         currentMarker = "X";
    //         currentTurn = 1;
    //         gameBoard[index] = currentMarker;
    //     }
    // }
    //
    // function addMarker() {
    //     this.innerHTML = currentMarker;
    //     this.classList.add(currentTurn);
    //
    //     updateMarker(this.id);
    // }

    function addCellEvent() {
        let gameCellArray = Array.from(document.querySelectorAll(".game-cell"));

        for (let i = 0; i < gameCellArray.length; i++) {
            let cell = gameCellArray[i];
            cell.addEventListener("click", GameFlowObj.addMarker);
            // cell.addEventListener("click", null);
        }
    }

    function render() {
        let gameContainer = document.querySelector(".game-container");
        let gameBoardArray = gameBoard;

        for (let i = 0; i < gameBoardArray.length; i++) {
            let gameCell = document.createElement("div");
            gameCell.classList.add("game-cell");
            gameCell.id = String(i);
            gameCell.innerHTML = gameBoardArray[i];
            gameContainer.append(gameCell);
        }

        addCellEvent();
    }

    return { gameBoard, render };
};

const GameFlowFactory = function(gameBoard) {
    let currentMarker = "X";
    let currentTurn = 1;
    let gameCell = document.querySelector(".game-cell");
    // console.log(gameCell.getAttribute('listener'));

    function updateMarker(index) {
        console.log("Inside updateMarker()");
        if (currentMarker === "X") {
            currentMarker = "O";
            currentTurn = 0;
            gameBoard[index] = currentMarker;
        }
        else {
            currentMarker = "X";
            currentTurn = 1;
            gameBoard[index] = currentMarker;
        }
    }

    function addMarker() {

        this.innerHTML = currentMarker;


        let classArray = this.className.split(" ");

        console.log(classArray);
        if (classArray.length < 2) {
            console.log("this.id" + this.id);
            this.classList.add(currentTurn);
            updateMarker(this.id);
        }





    }



    return { addMarker };
};


let GameBoardObj = GameBoardFactory();
let gameBoardArray = GameBoardObj.gameBoard;
let GameFlowObj = GameFlowFactory(gameBoardArray);



GameBoardObj.render();