class Game {
    constructor() {
        this.canvas = document.getElementById("2048-game");
        this.ctx = this.canvas.getContext("2d");
        this.grid = [[2,2,2,0],
                     [0,0,0,0],
                     [0,16,16,0],
                     [2,2,4,2]];    

        //this.addNumber();
        //this.addNumber();
    }

    addNumber() {
        // random position of new square
        do {
            var x = Math.floor(Math.random() * 16);
            var i = Math.floor(x/4);
            var j = x % 4;
        } while (this.grid[i][j] != 0) // infinite loop when space
        
        // 90% of 2, 10% of 4
        var value = 2;
        if (Math.floor(Math.random()*10) == 0) {
            value = 4;
        }

        // add new number
        this.grid[i][j] = value
    }

    draw() {
        this.drawBackground();
        this.drawSquares();
    }

    drawBackground() {
        this.ctx.fillStyle = "silver";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawSquares() {
        const padding = 20;
        const rect = (600 - 5*padding) / 4;
        const space = rect + padding;

        this.ctx.textAlign = "center";
        this.ctx.font = "50px Arial";
        const charHeight = 36

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let value = this.grid[i][j];
                let posX = j*space + padding;
                let posY = i*space + padding;
                this.ctx.fillStyle = this.color(value);
                this.ctx.fillRect(posX, posY, rect, rect);

                // if value == 0 then don't write numbers
                if(value != 0) {
                    this.ctx.fillStyle = "black";
                    this.ctx.fillText(value, posX + rect/2, posY + rect/2 + charHeight/2);
                }
            }        
        }
    }

    color(x) {
        if (x == 0) {
            return "gainsboro"; 
        }
    
        let n = Math.log2(x);
        switch (n) {
            case 1:
                return "lightslategray";
            case 2:
                return "cadetblue";
            case 3:
                return "salmon";
            case 4:
                return "indigo";
            case 5:
                return "crimson";
            default:
                return "darkslategray";
        }
    }

    move_tile(i, j, n, m) {
        this.grid[n][m] = this.grid[i][j];
        this.grid[i][j] = 0;
    }

    move_right() {
        for(let i = 0; i < 4; i++) {
            for(let j = 2; j >= 0; j--) {
                // skips if tile == 0
                if(this.grid[i][j] == 0) {continue;}
    
                for(let k = j+1; k < 4; k++) {
                    // last tile
                    if (k == 3) {
                        if(this.grid[i][k] == 0) {
                            this.move_tile(i, j, i, k);
                        }
                        else if(this.grid[i][k] == this.grid[i][j]) {
                            this.move_tile(i, j, i, k);
                            this.grid[i][k] *= 2;
                        }
                        else {
                            this.move_tile(i, j, i, k-1);
                        }
                    }
                    else {
                        if(this.grid[i][k] == this.grid[i][j]) {
                            this.move_tile(i, j, i, k);
                            this.grid[i][k] *= 2;
                        }
                        if(this.grid[i][k] != 0) {
                            this.move_tile(i, j, i, k-1);
                        }
                    }
                }
            }
        }
    }
}

game = new Game();
game.draw()
game.move_right();
game.draw()