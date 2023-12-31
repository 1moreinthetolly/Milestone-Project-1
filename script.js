const statusDisplay = document.querySelector('.game-state');

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.tile').forEach(tile => tile.addEventListener('click', handleCellClick));
document.querySelector('.game-new').addEventListener('click', handleRestartGame);

function handleTileClick(clickedTileEvent) {   
        const clickedTile = clickedTileEvent.target;
        const clickedTileIndex = parseInt(
          clickedTile.getAttribute('tile-index')
        );
    
        if (gameState[clickedTileIndex] !== "" || !gameActive) {
            return;
        }
   
        handleTilePlayed(clickedTile, clickedTileIndex);
        handleResultValidation();
}

function handleTilePlayed(clickedTile, clickedTileIndex) {
    
        gameState[clickedTileIndex] = currentPlayer;
        clickedTile.innerHTML = currentPlayer;
    }

    const winningOrders = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winOrder = winningOrders[i];
            let a = gameState[winOrder[0]];
            let b = gameState[winOrder[1]];
            let c = gameState[winOrder[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.tile')
               .forEach(tile => tile.innerHTML = "");
}    