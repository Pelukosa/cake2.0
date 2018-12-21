var myGamePiece;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 100, 240);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.jump = this.speedY;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed; 
        this.hitBottom();       
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -3; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 3; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -3; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 3; }
    if (myGameArea.keys && myGameArea.keys[16] && myGameArea.keys[37]) {myGamePiece.speedX = myGamePiece.speedX -3; }
    if (myGameArea.keys && myGameArea.keys[16] && myGameArea.keys[39]) {myGamePiece.speedX = myGamePiece.speedX +3; }
    myGamePiece.newPos();    
    myGamePiece.update();
}