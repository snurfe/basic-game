class RegularSprite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(ctx) {

    }
}

class PhysicsSprite {
    constructor(x, y, xx, yy, id) {
        this.x = x;
        this.y = y;
        this.xx = xx;
        this.yy = yy;
        this.id = id;
    }
    gravity(mass, cs) {
        let cb = 500;
        gravy=gravy+(cs/10)
        let gravity=Math.round(gravy)
        let bottom = this.y+this.yy;
        let width = this.x+this.xx
        let cvbg = 10
        for (const sprite of sprites) {
            if (((sprite.y-bottom) < cb && bottom<=sprite.y) && sprite.id != this.id && ((width > sprite.x) && (this.x < sprite.x + sprite.xx))) {
                cb = sprite.y
            }
        }
        if(bottom+gravity<=cb) {
            this.y = this.y+gravity
        }else{
            while (bottom+cvbg>cb && cvbg>0){
                cvbg = cvbg-1
            }
            this.y=this.y+(cvbg)
        }
        if(bottom==cb && gravy>0){
            gravy=0;
        }
    }
    draw(ctx) {

    }
}

class Player extends PhysicsSprite {
    constructor(x, y, xx, yy, color,id) {
        super(0, 500);
        this.x = x;
        this.y = y;
        this.xx = xx;
        this.yy = yy;
        this.id = id;
        this.color = color;
    }
    ml() {
        if(this.x-5>-5){
            this.x = this.x - 5
        }
    }
    mr() {
        if(this.x+5<495){
            this.x=this.x+5
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.xx, this.yy);
    }
}
class Enemy extends PhysicsSprite {
    constructor(x, y, xx, yy, color, id, move) {
        super(0, 500);
        this.x = x;
        this.y = y;
        this.xx = xx;
        this.yy = yy;
        this.id = id;
        this.move = move
        this.color = color;
        this.zz=false
    }
    movee(x) {
        if (this.move == (x-(x*2))) {
            this.zz = false
        }
        if (this.zz==false && this.move<x) {
            this.x=this.x+2.5
            this.move= this.move+2.5
        }
        if (this.move==x){
            this.zz=true
        }
        if (this.zz == true && this.move > (x-(2*x))) {
            this.x = this.x - 2.5
            this.move = this.move - 2.5
        }
    }
    gravity(mass, cs) {
        let cb = 500;
        othersg = othersg + (cs / 10)
        let gravity = Math.round(othersg)
        let bottom = this.y + this.yy;
        let width = this.x + this.xx
        let cvbg = 10
        for (const sprite of sprites) {
            if (((sprite.y - bottom) < cb && bottom <= sprite.y) && sprite.id != this.id && ((width > sprite.x) && (this.x < sprite.x + sprite.xx))) {
                cb = sprite.y
            }
        }
        if (bottom + gravity <= cb) {
            this.y = this.y + gravity
        } else {
            while (bottom + cvbg > cb && cvbg > 0) {
                cvbg = cvbg - 1
            }
            this.y = this.y + (cvbg)
        }
        if (bottom == cb && gravy > 0) {
            othersg = 0;
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.xx, this.yy);
    }
}
class CollisionBox extends RegularSprite {
    constructor(x, y, xx, yy, color) {
        super(0, 500);
        this.x = x;
        this.y = y;
        this.xx = xx;
        this.yy = yy;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.xx, this.yy);
    }
}

gravy=0
othersg=0
var downa=false;
var downd = false;
var wk="";
var depth;
let ctx = null;
let chao = new CollisionBox(50, 450, 400, 50, 'green');
let floating = new CollisionBox(0, 300, 100, 50, 'green');
let avatar = new Player(0, 0, 10, 10, 'black', 1);
let enemy = new Enemy(300, 300, 10, 10, 'red', 2, 0);

let sprites = [];

document.addEventListener('DOMContentLoaded', init);
function init() {
    ctx = document.querySelector('canvas').getContext('2d');
    window.requestAnimationFrame(gameloop);
    sprites.push(chao);
    sprites.push(floating)
    sprites.push(enemy)
    sprites.push(avatar)
}
document.addEventListener('keydown', function (event) {
    var x = event.charCode || event.keyCode;
    wk = String.fromCharCode(x)
    if(wk=="A"){
        downa=true;
    }
    if(wk=="D"){
        downd=true;
    }
    if (wk == "W" && gravy==0) {
        gravy=-6
    };
});
document.addEventListener('keyup', function (event) {
    var x = event.charCode || event.keyCode;
    wk = String.fromCharCode(x)
    if (wk== "A") {
        downa = false;
    }
    if (wk== "D") {
        downd = false;
    }
});
function gameloop() {
    // ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 500, 500); // clear canvas
    avatar.gravity(100, 1)
    enemy.gravity(100, 1)
    enemy.movee(100)
    if (downa==true){
        avatar.ml()
    }
    if (downd==true){
        avatar.mr()
    }
    for (const sprite of sprites) sprite.draw(ctx);
    window.requestAnimationFrame(gameloop);
}

