let message = {
    div: document.getElementById('message'),
    text: 'Current Player: ',
    currentPlayer: 'X',
    winner: ''
};

let table = {
    matrix: [
        [],
        [],
        []
    ],
    htmlElement: document.getElementById('game-table').children[0]
};

function main() {
    renderMessage(message.text, message.currentPlayer);
    startGame();
}

function renderMessage(text, symbol) {
    message.div.textContent = text + symbol;
}

function startGame() {
    for (let i = 0; i < table.htmlElement.children.length; i++) {
        row = table.htmlElement.children[i];
        for (let cell of row.children) {
            cell.textContent = '';
            cell.addEventListener('click', dealCellClick);
            table.matrix[i].push(cell);
        }
    }
}

function dealCellClick() {
    if (this.textContent === '') {
        this.textContent = message.currentPlayer;
        defineNextPlayer();

        renderMessage(message.text, message.currentPlayer);

        if (hasWinner()) {
            renderMessage('Winner: ', message.winner);
            endGame();
        }
        else if (isDraw()) {
            renderMessage('Draw!', '');
            endGame();
        }
    }
}

function defineNextPlayer() {
    if (message.currentPlayer === 'X') {
        message.currentPlayer = 'O';
    }
    else {
        message.currentPlayer = 'X';
    }
}

function hasWinner() {
    // horizontal check
    for (let i = 0; i < table.matrix.length; i++) {
        row = table.matrix[i];

        if (row.every((cell) => (cell.textContent === row[0].textContent && cell.textContent !== ''))) {
            message.winner = row[0].textContent;
            return true;
        }
    }

    // vertical check
    for (let i = 0; i < 3; i++) {
        if ((table.matrix[0][i].textContent !== '') && (table.matrix[0][i].textContent === table.matrix[1][i].textContent) && (table.matrix[0][i].textContent === table.matrix[2][i].textContent)) {
            message.winner = table.matrix[0][i].textContent;
            return true;
        }
    }

    // first diagonal check (equal indexes)
    let firstDiagonal = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i === j) {
                firstDiagonal.push(table.matrix[i][j].textContent);
            }
        }
    }

    if (firstDiagonal.every((cell) => (cell === firstDiagonal[0] && cell !== ''))) {
        message.winner = firstDiagonal[0];
        return true;
    }

    // second diagonal check ([2,0], [1,1] and [0,2])
    let i = 2;
    let j = 0;
    let secondDiagonal = [];
    while (i >= 0 && j <= 2) {
        secondDiagonal.push(table.matrix[i][j].textContent);
        i--;
        j++;
    }

    if (secondDiagonal.every((cell) => (cell === secondDiagonal[0] && cell !== ''))) {
        message.winner = secondDiagonal[0];
        return true;
    }

    return false;
}

function isDraw() {
    for (let row of table.matrix) {
        for (let cell of row) {
            if (cell.textContent === '') {
                return false;
            }
        }
    }
    return true;
}

function endGame() {
    // remove click listeners
    for (let row of table.htmlElement.children) {
        for (let cell of row.children) {
            cell.removeEventListener('click', dealCellClick);
        }
    }
}

function restartGame() {
    table.matrix = [
        [],
        [],
        []
    ];

    message.currentPlayer = 'X';
    message.winner = '';

    renderMessage('Current Player: ', 'X');
    startGame();
}

main();