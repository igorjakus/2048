var canvas = document.getElementById("2048-game");
var ctx = canvas.getContext("2d");

// background
ctx.fillStyle = "#ff9980";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var padding = 15;
var rectx = (600 / 4) - 2*padding;
var recty = (600 / 4) - 2*padding;

for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
        ctx.fillStyle = "gray";
        ctx.fillRect((x*150)+padding, (y*150)+padding, rectx, recty);
    }
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

function initializeArray() {
    var grid = [[0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]];
    return grid;
}

var array = initializeArray();
newNumber();
newNumber();
console.log(array)
drawNumbers();

function drawNumbers() {
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            x = array[i][j]
            if(x != 0) {
                // koordynaty lewego dolnego rogu jezeli nie align center
                // koordynaty srodka dolu jezeli align center
                // 36px = wysokosc znaku dla font 50px
                // 75px = polowa kwadratu 150px
                ctx.fillText(x, j*150 + 75, i*150 + 36/2 + 75)
            }
        }        
    }
}
