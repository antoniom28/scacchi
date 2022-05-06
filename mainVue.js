
var app = new Vue(
    {
        el: "#boards",
        data: {
            scacchiera: [],
            result: [],
            dim: 100,
            num: 0,
            tot: 0,
            load: false,
            alert: null,
        },
        methods:{
            alertP(){
                this.alert = this.num;
            },
            start(){
                if(this.load)
                    return;
                this.load = true;
                this.alert = false;
                let time = 0;
                if(this.num > 10)
                    time = 1000;
                setTimeout(() => {
                    console.log('aspetto',time);
                    this.scacchiera = [];
                    this.result = [];
                    this.dim = 100 / this.num;
                    this.tot = 0;
                    console.log('svuotato tutto');
    
                    this.createBoard();
                    console.log('board creata');
                    this.placeQueen(this.scacchiera , 0);
                    console.log('ricorsione terminata');
                    setTimeout(() => {
                        this.load = false;
                        
                        console.log(this.result);
                        console.log(this.tot);
                    }, 1000); 
                }, time);
            },
            copyMatrix(board){
                let mat = [];
                for (let i = 0; i < this.num; i++){
                    let temp = [];
                    for (let j = 0; j < this.num; j++){
                        temp.push(board[i][j]);
                    }
                    mat.push(temp);
                }
                
                return mat;    
            },
            createBoard(){
                for(let i = 0; i<this.num; i++){
                    let temp = [];
                    for(let j = 0; j<this.num; j++)
                         temp.push('#');
                    this.scacchiera.push(temp);
                }
            },
            placeQueen(board , row){

                let tempBoard = [];

                if(row == this.num){
                    this.result.push(board);
                    this.tot++;
                    return;
                }
            
                tempBoard = this.copyMatrix(board);
            
                for(let col = 0; col < this.num; col++){
                    if(tempBoard[row][col] != 'X'){
                        for(let i = 0; i < this.num; i++){
                            if(i == row)
                                continue;
                            
                            tempBoard[i][col] = 'X';
            
                            let diagDx = col - row + i;
                            if(diagDx >= 0 && diagDx < this.num)
                                tempBoard[i][diagDx] = 'X';
            
                            let diagSx = col + row - i;
                            if(diagSx >= 0 && diagSx < this.num)
                                tempBoard[i][diagSx] = 'X';
                        }
            
                        tempBoard[row][col] = 'Q';
                        this.placeQueen(tempBoard , row + 1);
                        tempBoard = this.copyMatrix(board);
                    }
                }

            },
        },
    }
);
