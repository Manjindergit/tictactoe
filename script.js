const gameBoard = () => {

    //Create board of 3x3 and add cell into it
    const rows=3;
    const columns=3;
    const board =[];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }

    //board to update UI

    const getBoard = ()=>board;

    //add mark for player
    const addMark = (column, row, x) => {
        board[row][column]=x;
    }

    //print funciton for console version

    const printBoard = ()=>{
        console.log(board);
    }

    return {getBoard, printBoard, addMark};
}

const board = gameBoard();
board.addMark(2,2,'x')
board.printBoard();