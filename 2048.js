class Game {
    constructor() {
        this.canvas = document.getElementById("2048-game");
        this.ctx = this.canvas.getContext("2d");
        this.grid = [[2,2,2,0],
                     [0,0,0,0],
                     [32,16,16,0],
                     [0,4,2,2]];   

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
        if (x == 0) return "gainsboro";
        else if (x == 2) return "lightslategray"; 
        else if (x == 4) return "cadetblue"; 
        else if (x == 8) return "salmon"; 
        else if (x == 16) return "indigo"; 
        else if (x == 32) return "crimson"; 
        else return "darkslategray";
    }

    move_tile(y1, x1, y2, x2) {
        if (!(x1 == x2 & y1 == y2)) {
            this.grid[y2][x2] = this.grid[y1][x1];
            this.grid[y1][x1] = 0;
        }
    }

    addTiles(y1, x1, y2, x2) {
        this.grid[y2][x2] += this.grid[y1][x1];
        this.grid[y1][x1] = 0;
    }

    // TODO: bug when 2 times one number adds with another tiles
    move_right() {
        for(let i = 0; i < 4; i++) {
            for(let j = 2; j >= 0; j--) {
                // skips if tile == 0
                if(this.grid[i][j] == 0) {continue;}
    
                for(let k = j+1; k < 4; k++) {
                    // last tile, don't need to break
                    if (k == 3) {
                        if(this.grid[i][k] == 0) {
                            this.move_tile(i, j, i, k);
                        }
                        else if(this.grid[i][k] == this.grid[i][j]) {
                            this.addTiles(i, j, i, k);
                        }
                        else {
                            this.move_tile(i, j, i, k-1);
                        }
                    }
                    else {
                        if(this.grid[i][k] == this.grid[i][j]) {
                            this.addTiles(i, j, i, k);
                            break;
                        }
                        else if(this.grid[i][k] != 0) {
                            this.move_tile(i, j, i, k-1);
                            break;
                        }
                    }
                }
            }
        }
    }

    moveLeft() {
        for(let i = 0; i < 4; i++) {
            for(let j = 1; j < 4; j++) {
                // skips if tile == 0
                if(this.grid[i][j] == 0) {continue;}
    
                // k is next tile
                for(let k = j-1; k >= 0; k--) {
                    // last tile, don't need to break
                    if (k == 0) {
                        if(this.grid[i][k] == 0) {
                            this.move_tile(i, j, i, k);
                        }
                        else if(this.grid[i][k] == this.grid[i][j]) {
                            this.addTiles(i, j, i, k);
                        }
                        else {
                            this.move_tile(i, j, i, k+1);
                        }
                    }
                    else {
                        if(this.grid[i][k] == this.grid[i][j]) {
                            this.addTiles(i, j, i, k);
                            break;
                        }
                        else if(this.grid[i][k] != 0) {
                            this.move_tile(i, j, i, k+1);
                            break;
                        }
                    }
                }
            }
        }
    }
}

// moze sie przydac
function sum(array) {
    return array.reduce((a,b) => a + b, 0);
}

game = new Game();
game.draw()
//game.move_right();
game.draw()