var canvas = document.getElementById("2048-game");
var ctx = canvas.getContext("2d");


function initializeArray() {
    var grid = [[0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]];
    return grid;
}

function newNumber() {
    do {
        var x = Math.floor(Math.random() * 16); // random integer from 0 to 15 
        var i = Math.floor(x/4);
        var j = x % 4;
        console.log(x, i, j)
    } while (array[i][j] != 0);

    var value = 2;
    if (Math.round(Math.random()*10) == 0) {
        value = 4;
    }

    array[i][j] = value;
}   

function drawBackground() {
    ctx.fillStyle = "silver";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSquares() {
    const padding = 20;
    const rect = (600 - 5*padding) / 4;
    const space = rect + padding;

    ctx.textAlign = "center";
    ctx.font = "50px Arial";
    const charHeight = 36

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            value = array[i][j];
            posX = j*space + padding;
            posY = i*space + padding;
            ctx.fillStyle = color(value)
            ctx.fillRect(posX, posY, rect, rect)

            if(value != 0) {
                ctx.fillStyle = "black";
                ctx.fillText(value, posX + rect/2, posY + rect/2 + charHeight/2);
            }
        }        
    }
}

function color(x) {
    if (x == 0) {
        return "gainsboro"; 
    }

    n = Math.log2(x);
    switch (n) {
        case 1:
            return "lightslategray";
        case 2:
            return "cadetblue";
        case 3:
            return "salmon";
        case 4:
            return "indigo";
        default:
            return "darkslategray";
    }
}


var array = initializeArray();
newNumber();
newNumber();
drawBackground();
drawSquares();
console.log(array);
