function equals3(a, b, c) {
    return a === b && b === c && a === c && a !== '';
}

function checkIfEndOfGame(skipMessage) {
    let winner = null;
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < 8; i++) {
        const winCombination = winCombinations[i];
        if (
            equals3(
                board[winCombination[0]],
                board[winCombination[1]],
                board[winCombination[2]]
            )
        ) {
            winner = board[winCombination[0]];
            const msg = winner === player ? winMessage : loseMessage;
            if (!skipMessage) {
                printWinner(msg);
                activeGame = false;
            }
            return winner;
        }
    }

    if (!board.includes('')) {
        winner = 'TIE';
        if (!skipMessage) {
            printWinner(tieMessage);
            activeGame = false;
        }
        return winner;
    }
}

function printWinner(msg) {
    const status = document.querySelector('.status');
    status.innerHTML = msg;
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.box').forEach((e) => {
        e.innerHTML = '';
    });
    document.querySelector('.status').innerHTML = 'Try again';
    activeGame = true;
}

function boxClick(box) {
    const boxClicked = box.target;
    const boxNum = parseInt(boxClicked.getAttribute('index'));
    if (!activeGame) return;
    if (board[boxNum] === '') {
        if (currentPlayer === player) {
            boxClicked.innerHTML = currentPlayer;
            board[boxNum] = currentPlayer;

            currentPlayer = AI;
            checkIfEndOfGame((skipMessage = false));
        }

        if (currentPlayer === AI) {
            AImove();
            currentPlayer = player;
            checkIfEndOfGame((skipMessage = false));
        }
    }
}

const score = new Map();
score.set('X', 1);
score.set('O', -1);
score.set('TIE', 0);

const winMessage = 'Congratulations, you\'ve won';
const loseMessage = 'Unfortunately the AI is too strong';
const tieMessage = 'It\'s a draw, you are as good as the AI';

const player = 'X';
const AI = 'O';
let currentPlayer = player;
let board = ['', '', '', '', '', '', '', '', ''];
let activeGame = true;

const boxSelected = document.querySelectorAll('.box');

document.querySelector('.restart').addEventListener('click', restartGame);

boxSelected.forEach(e => e.addEventListener('click', boxClick));