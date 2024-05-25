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
    const addMark = (column, row, player) => {
    
        board[row][column].addToken(player);
  
    }

    //print funciton for console version

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return { getBoard, printBoard, addMark };
}

function cell() {
    let value = '-';
    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { addToken, getValue };
}

function GameController() {
    const board = gameBoard();
    const players = [
        {
            name: 'playerOneName',
            token: 'X'
        },
        {
            name: 'playerTwoName',
            token: 'O'
        }
    ];
    board.addMark(2, 2, players[0].token)
    // console.log(players[0].token);
    board.printBoard();
}

GameController();