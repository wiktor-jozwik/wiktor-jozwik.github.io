function alphaBeta(board, alpha, beta, isMax) {
    const winner = checkIfEndOfGame((skipMessage = true));
    if (winner != null) {
        return score.get(winner);
    }

    if (isMax) {
        let maxScore = -100;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = player;
                isMax = false;
                let score = alphaBeta(board, alpha, beta, isMax);
                board[i] = '';
                maxScore = Math.max(score, maxScore);
                alpha = Math.max(alpha, maxScore);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return maxScore;
    } else {
        let minScore = 100;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = AI;
                isMax = true;
                let score = alphaBeta(board, alpha, beta, isMax);
                board[i] = '';
                minScore = Math.min(score, minScore);
                alpha = Math.min(alpha, minScore);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return minScore;
    }
}

function AImove() {
    let score, bestMove;
    let alpha = -100;
    let beta = 100;
    let bestScore = 100;
    let isMax = true;
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = AI;
            score = alphaBeta(board, alpha, beta, isMax);
            board[i] = '';
            if (score < bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    board[bestMove] = AI;
    document.querySelectorAll('.box').forEach((e) => {
        const index = parseInt(e.getAttribute('index'));
        if (index === bestMove) {
            e.innerHTML = AI;
        }
    });
}
