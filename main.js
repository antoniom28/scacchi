
//test(0);
let scacchiera = [];
let result = [];
let n = 7;
let tot = 0;
//let letters = ['a','b','c','d','e','f','g','h','i','l','m','n','o']; //13
createBoard();
//showBoard();
placeQueen(scacchiera , 0);
showBoards();
console.log(tot);
showGraphic();

/*
<div id="queens-box" class="queens-box">

            </div>
            */

function showGraphic(){
    let dim = 100 / n;
    let boards = document.getElementById('boards');
    //console.log(result[0][0][1]);

    for(let t = 0; t<result.length; t++){
        let box = document.createElement('div');
        box.className += ' queens-box';
    // let box = document.getElementById('queens-box');

        for(let i = 0; i < n; i++){
            for(let j = 0; j < n; j++){
                let casella = document.createElement('div');
                casella.style.height = `${dim}%`;
                casella.style.width = `${dim}%`;
                casella.className += ' casella';
                if(result[t][i][j] == 'Q')
                    casella.className += ' queen';
                box.append(casella);
            }
        }

        boards.append(box);
    }
}

function test(n){
    console.log('qua1');
    if(n >= 2){
        return;
    } else
        console.log('qua2');
    test(n + 1);
    console.log('qua3',n);   
}

function createBoard(){
    for(let i = 0; i<n; i++){
        let temp = [];
        for(let j = 0; j<n; j++){
           // temp.push(letters[j]+i);
             temp.push('#');
        }
        scacchiera.push(temp);
    }
}

function showBoards(){
    console.log(result);
}

function copyMatrix(board){
    let mat = [];
    for (let i = 0; i < n; i++){
        let temp = [];
        for (let j = 0; j < n; j++){
            temp.push(board[i][j]);
        }
        mat.push(temp);
    }

        /*for (let i = 0; i < n; i++)
            for (let j = 0; j < n; j++)
                mat[i][j] = board[i][j];*/

      //  console.log(mat);
        return mat;    
}

function placeQueen(board , row){
    let tempBoard = [];

    if(row == n){
        result.push(board);
        tot++;
        return;
    }

    tempBoard = copyMatrix(board);

    for(let col = 0; col < n; col++){
        if(tempBoard[row][col] != 'X'){
            for(let i = 0; i < n; i++){
           //     console.log(i,row);
                if(i == row)
                    continue;
                
                tempBoard[i][col] = 'X';

                let diagDx = col - row + i;
                if(diagDx >= 0 && diagDx < n)
                    tempBoard[i][diagDx] = 'X';

                let diagSx = col + row - i;
                if(diagSx >= 0 && diagSx < n)
                    tempBoard[i][diagSx] = 'X';
            }

            tempBoard[row][col] = 'Q';
            placeQueen(tempBoard , row + 1);
            tempBoard = copyMatrix(board);
        }
    }
    //console.log('ciao');
    //console.log(row + 1);
}