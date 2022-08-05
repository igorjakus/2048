class Game {
    constructor() {
        this.canvas = document.getElementById("2048-game");
        this.ctx = this.canvas.getContext("2d");
        this.grid = [[2,4,8,16],
                     [2,4,2,4],
                     [4,2,8,32],
                     [8,16,64,256]];   

        this.score = 0;
        this.addNumber();
        this.addNumber();
        this.draw();
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

    // todo: bug infinite loop when no space to add new number
    addNumber() {
        // random position of new square
        do {
            var x = Math.floor(Math.random() * 16);
            var i = Math.floor(x/4);
            var j = x % 4;
        } while (this.grid[i][j] != 0) // infinite loop when no space
        
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

    moveTile(y1, x1, y2, x2) {
        if (!(x1 == x2 & y1 == y2)) {
            this.grid[y2][x2] = this.grid[y1][x1];
            this.grid[y1][x1] = 0;
        }
    }

    addTiles(y1, x1, y2, x2) {
        this.grid[y2][x2] = [this.grid[y1][x1], this.grid[y1][x1]];
        this.score += 2*this.grid[y1][x1];
        this.grid[y1][x1] = 0;

        document.getElementById("htmlScore").innerHTML = `score: ${this.score}`;
    }

    moveRight() {
        for(let y of [0,1,2,3]) {
            for(let x of [2,1,0]) {
                // skips if tile == 0
                if(this.grid[y][x] == 0) continue;
    
                for(let k = x+1; k < 4; k++) {
                    if (k == 3 & this.grid[y][k] == 0) {
                        this.moveTile(y, x, y, k);
                    }
                    else if(this.grid[y][k] == this.grid[y][x]) {
                        this.addTiles(y, x, y, k);
                        break;
                    }
                    else if(this.grid[y][k] != 0) {
                        this.moveTile(y, x, y, k-1);
                        break;
                    }
                }
            }
        }
    }

    moveLeft() {
        for(let y of [0,1,2,3]) {
            for(let x of [1,2,3]) {
                // skips if tile == 0
                if(this.grid[y][x] == 0) continue;
    
                // k is next tile
                for(let k = x-1; k >= 0; k--) {
                    if(k == 0 & this.grid[y][k] == 0) {
                        this.moveTile(y, x, y, k);
                    }
                    else if(this.grid[y][k] == this.grid[y][x]) {
                        this.addTiles(y, x, y, k);
                        break;
                    }
                    else if(this.grid[y][k] != 0) {
                        this.moveTile(y, x, y, k+1);
                        break;
                    }
                }
            }
        }
    }

    moveUp() {
        for(let x of [0,1,2,3]) {
            for(let y of [1,2,3]) {
                if (this.grid[y][x] == 0) continue;
                for(let k = y-1; k >= 0; k--) {
                    if(k == 0 & this.grid[k][x] == 0) {
                        this.moveTile(y, x, k, x);
                    }
                    else if(this.grid[k][x] == this.grid[y][x]) {
                        this.addTiles(y, x, k, x);
                        break;
                    }
                    else if(this.grid[k][x] != 0) {
                        this.moveTile(y, x, k+1, x);
                        break;
                    }
                }
            }
        }
    }

    moveDown() {
        for(let x of [0,1,2,3]) {
            for(let y of [2,1,0]) {
                if (this.grid[y][x] == 0) continue;
                for(let k = y+1; k < 4; k++) {
                    if(k == 3 & this.grid[k][x] == 0) {
                        this.moveTile(y, x, k, x);
                    }
                    else if(this.grid[k][x] == this.grid[y][x]) {
                        this.addTiles(y, x, k, x);
                        break;
                    }
                    else if(this.grid[k][x] != 0) {
                        this.moveTile(y, x, k-1, x);
                        break;
                    }
                }
            }
        }
    }
    
    cleanup() {
        for(let x = 0; x < 4; x++) {
            for(let y = 0; y < 4; y++) {
                if(Array.isArray(this.grid[y][x])) {
                    this.grid[y][x] = sum(this.grid[y][x]);
                }
            }
        }
    }

    move(v) {
        // move by direction
        if (v == 'up')
            this.moveUp();
        else if(v == 'down')
            this.moveDown();
        else if(v == 'left')
            this.moveLeft();
        else if(v == 'right')
            this.moveRight();
        
        this.cleanup();
        this.addNumber();
        this.draw();
    }
}

function sum(array) {
    return array.reduce((a,b) => a + b, 0);
}

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38')      game.move('up');
    else if(e.keyCode == '40')  game.move('down');
    else if(e.keyCode == '37')  game.move('left');
    else if(e.keyCode == '39')  game.move('right');    
}

game = new Game();
document.onkeydown = checkKey;
