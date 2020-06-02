console.log("Inside index.js");

const PlayerFactor = function(name) {
    return { name };
};


const GameBoardFactory = function() {
    let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
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

    function updateGameBoard(index) {
        gameBoard[index] = currentMarker;
        checkWin();
    }

    function createWinnerPopUp() {
        console.log("Inside createWinnerPopup");

        let winnerPopUp = document.querySelector(".winner-popup");
        winnerPopUp.classList.remove("hidden");
    }

    function checkWin() {
        console.log("Inside checkWin()");
        console.log({currentMarker});
        let winnerFlag = false;

        // Rows
        // ---------------------------------------------
        if (gameBoard[0] === currentMarker && gameBoard[1] === currentMarker && gameBoard[2] === currentMarker) {
            console.log("WON");
            winnerFlag = true;
        }
        else if (gameBoard[3] === currentMarker && gameBoard[4] === currentMarker && gameBoard[5] === currentMarker) {
            console.log("WON");
            winnerFlag = true;
        }
        else if (gameBoard[6] === currentMarker && gameBoard[7] === currentMarker && gameBoard[8] === currentMarker) {
            console.log("WON");
            winnerFlag = true;
        }
        // Columns
        // ---------------------------------------------
        else if (gameBoard[0] === currentMarker && gameBoard[3] === currentMarker && gameBoard[6] === currentMarker) {
            console.log("WON");
            winnerFlag = true;
        }
        else if (gameBoard[1] === currentMarker && gameBoard[4] === currentMarker && gameBoard[7] === currentMarker) {
            console.log("WON");
            winnerFlag = true;
        }
        else if (gameBoard[2] === currentMarker && gameBoard[5] === currentMarker && gameBoard[8] === currentMarker) {
            console.log("WON");
            winnerFlag = true;
        }
        // Diagonals
        // ---------------------------------------------
        else if (gameBoard[0] === currentMarker && gameBoard[4] === currentMarker && gameBoard[8] === currentMarker) {
            console.log("WON");
            winnerFlag = true;
        }
        else if (gameBoard[2] === currentMarker && gameBoard[4] === currentMarker && gameBoard[6] === currentMarker) {
            console.log("WON");
            winnerFlag = true;
        }

        if (winnerFlag === false && gameBoard.indexOf(" ") < 0) {
            console.log("TIE");
        }
        if (winnerFlag) {
            createWinnerPopUp();
        }
    }

    function updateMarker(index) {
        console.log("Inside updateMarker()");
        console.log("what is currentMarker:: " + currentMarker);

        if (currentMarker === "X") {
            updateGameBoard(index);
            currentMarker = "O";
            currentTurn = 0;
        }
        else {
            updateGameBoard(index);
            currentMarker = "X";
            currentTurn = 1;
        }
    }

    function checkToAddMarker(that) {
        let classArray = that.className.split(" ");

        if (classArray.indexOf("taken") < 0) {
            that.innerHTML = currentMarker;
            that.classList.add("taken");
            updateMarker(that.id);
        }
        else {
            console.log("spot is taken");
        }
    }

    function addMarker() {
        console.log("Inside addMarker()");
        let that = this;
        checkToAddMarker(that);
    }



    return { addMarker };
};


let GameBoardObj = GameBoardFactory();
let gameBoardArray = GameBoardObj.gameBoard;
let GameFlowObj = GameFlowFactory(gameBoardArray);



GameBoardObj.render();