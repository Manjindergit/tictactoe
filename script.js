const gameBoard = () => {

    //Create board of 3x3 and add cell into it
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    //board to update UI

    const getBoard = () => board;

    //add mark for player
    const addMark = (row, column, player) => {

        board[row][column].addToken(player);

    }

    //print funciton for console version

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    const checkWinner = () => {
        // Check rows
       
        for (let i = 0; i < 3; i++) {
            if (board[i][0].getValue() && board[i][0].getValue() === board[i][1].getValue() && board[i][0].getValue() === board[i][2].getValue()) {
                console.log('you won');
               
                return board[i][0].getValue();
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i].getValue() && board[0][i].getValue() === board[1][i].getValue() && board[0][i].getValue() === board[2][i].getValue()) {
                console.log('you won');
                return board[0][i].getValue();
            }
        }

        // Check diagonals
        if (board[0][0].getValue() && board[0][0].getValue() === board[1][1].getValue() && board[0][0].getValue() === board[2][2].getValue()) {
            console.log('you won');
            return board[0][0].getValue();
        }
        if (board[0][2].getValue() && board[0][2].getValue() === board[1][1].getValue() && board[0][2].getValue() === board[2][0].getValue()) {
            console.log('you won');
            return board[0][2].getValue();
        }

        // No winner
        return null;
    }

    return { getBoard, printBoard, addMark, checkWinner };
}

function cell() {
    let value = '';
    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { addToken, getValue };
}

function GameController(playerOneName, playerTwoName) {
    const board = gameBoard();
    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ];

    let currentPlayer = players[0];
    console.log(currentPlayer);

    const switchPlayerTurn = () => {
        currentPlayer === players[0] ? (currentPlayer = players[1]) : currentPlayer = players[0];
    }

    const getActivePlayer = () => currentPlayer;

    const printNewRound = () => {
        board.printBoard();

    }

    const playRound = (row, column) => {
        board.addMark(row, column, getActivePlayer().token);
        //check winner and if someone wins return the winner name and end the game or switch player
        const winner = board.checkWinner();
        if (winner) {
            return `${getActivePlayer().name} wins!`;
        }
        else if (board.getBoard().flat().every(cell => cell.getValue())) {
            console.log('It is a tie!');
            return 'tie';
        }
        else{
            switchPlayerTurn();
            return getActivePlayer().name;
        }

    }

    return { getActivePlayer, playRound, getBoard: board.getBoard };
}



function playGame() {
    let player1= prompt("Enter player one name");
    let player2= prompt("Enter player two name");
    const game = GameController(player1, player2);
    const playerTurnH2 = document.getElementById('playerTurn');
    const gameTable = document.getElementById('gameTable');

    playerTurnH2.textContent = game.getActivePlayer().name;

    // DocumentFragment to avoid reflow & innerHTML
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let slot = document.createElement('div');
            slot.className = 'slot';
            slot.setAttribute('row', i);
            slot.setAttribute('col', j);
            fragment.appendChild(slot);
        }
    }

    gameTable.appendChild(fragment);

    gameTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('slot') && e.target.textContent === "") {
            const targetSlotRow = e.target.getAttribute('row');
            const targetSlotCol = e.target.getAttribute('col');
            e.target.textContent = game.getActivePlayer().token;
            const next = game.playRound(targetSlotRow, targetSlotCol);
            playerTurnH2.textContent = next;
            //restart game if someone wins or tie and also add a timer to display the countdown
            if (next === 'tie' || next.includes('wins')) {
                setTimeout(() => {
                    window.location.reload();
                   
                }, 3000);
            }
            
        } else if (e.target.textContent !== "") {
            alert("This slot is marked, choose another");
        }
    });
}
