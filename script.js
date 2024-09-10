const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const winnerDisplay = document.getElementById('winner');
let currentPlayer = 'X';

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].textContent === currentPlayer);
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    winnerDisplay.textContent = '';
    currentPlayer = 'X';
}

board.addEventListener('click', (e) => {
    const cell = e.target;
    if (cell.classList.contains('cell') && cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.classList.add('disabled');

        if (checkWinner()) {
            winnerDisplay.textContent = `Player ${currentPlayer} Wins!`;
            setTimeout(resetGame, 2000);
        } else if ([...cells].every(cell => cell.textContent !== '')) {
            winnerDisplay.textContent = `It's a Draw!`;
            setTimeout(resetGame, 2000);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
});
