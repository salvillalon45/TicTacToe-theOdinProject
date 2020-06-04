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

        // Make the pop up appear
        let popUp = document.querySelector(".popup");
        popUp.classList.remove("hidden");

        // Added who won to the pop up
        let playerWon = document.createElement("p");
        playerWon.innerHTML = "Player 1 Won";
        winnerPopUp.append(playerWon);

        // Button to play again
        let playAgain = document.createElement("button");
        playAgain.innerHTML = "play again";
        playAgain.classList.add("play-again-btn");
        winnerPopUp.append(playAgain);
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

    function startScreen() {
        console.log("Inside startScreen");
        let winnerPopUp = document.querySelector(".start-screen");

        // Make the start screen disappear after it is clicked
        let startButton = document.querySelector(".start-btn");
        startButton.addEventListener("click", startGame);
    }

    function startGame() {
        console.log("Inside startGame()");

        // Make the pop up appear
        let startScreen = document.querySelector(".start-screen");
        startScreen.classList.add("hidden");

        let game = document.querySelector(".game-screen");
        game.classList.remove("hidden");
    }

    function goBackToStartScreen() {

    }



    return { addMarker, startScreen };
};


// create a factor that is in charge of changing the screens.
// this functiosn will go here:
// function startScreen() {
//     console.log("Inside startScreen");
//     let winnerPopUp = document.querySelector(".start-screen");
//
//     // Make the start screen disappear after it is clicked
//     let startButton = document.querySelector(".start-btn");
//     startButton.addEventListener("click", startGame);
// }
//
// function startGame() {
//     console.log("Inside startGame()");
//
//     // Make the pop up appear
//     let startScreen = document.querySelector(".start-screen");
//     startScreen.classList.add("hidden");
//
//     let game = document.querySelector(".game-screen");
//     game.classList.remove("hidden");
// }
//
// function goBackToStartScreen() {
//
// }


let GameBoardObj = GameBoardFactory();
let gameBoardArray = GameBoardObj.gameBoard;
let GameFlowObj = GameFlowFactory(gameBoardArray);



GameBoardObj.render();
GameFlowObj.startScreen();