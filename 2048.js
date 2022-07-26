class Game {
    constructor() {
        this.canvas = document.getElementById("2048-game");
        this.ctx = this.canvas.getContext("2d");
        this.grid = [[0,0,0,0],
                     [0,0,0,0],
                     [0,0,0,0],
                     [0,0,0,0]];

        this.addNumber();
        this.addNumber();
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
}

game = new Game();
game.drawBackground();
game.drawSquares();
