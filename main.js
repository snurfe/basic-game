class RegularSprite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(ctx) {

    }
}
function getDistance(x,y,xx,yy, sx, sy){

    if (((x + 10) > xx && (x) < xx+sx) && ((y+10)>yy && (y)<yy+sy)){
        return true;
    }
}
class Projectile {
    constructor(ix, iy, xx, yy, a, color) {
        this.ix = ix;
        this.iy = iy;
        this.xx = xx;
        this.yy = yy;
        this.a = a;
        this.color = color;
    }
    build(){

    }
    draw(ctx) {
        this.ix=this.ix+this.a
        if(this.ix>=495 || this.ix<=-5){
            for (let i=0; i<sprites.length; i++) {
                if(sprites[i]==this){
                    sprites.splice(i, 1)
                    fire=false;
                }
            }
        }
        for (const sprite of sprites) {
            if (getDistance(this.ix, this.iy, sprite.x, sprite.y, sprite.xx, sprite.yy) == true &&sprite instanceof Enemy) {
                for (let i = 0; i < sprites.length; i++) {
                    if (sprites[i] == sprite || sprites[i] == this) {
                        sprites.splice(i, 1)
                        console.log("yes")
                    }
                }
                fire = false;
            }
        }
        ctx.fillStyle = this.color;
        ctx.fillRect(this.ix, this.iy, this.xx, this.yy);
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
        let cvbg = 100;
        for (const sprite of sprites) {
            /*if (((sprite.y-bottom) < cb && bottom<=sprite.y) && sprite.id != this.id && ((width > sprite.x) && (this.x < sprite.x + sprite.xx))) {
                cb = sprite.y
            }*/
            if (getDistance(this.x, this.y + 10, sprite.x, sprite.y, sprite.xx, sprite.yy) == true && sprite.id!=this.id){
                cb = sprite.y
            }
            if (getDistance(this.x, this.y + gravity-3, sprite.x, sprite.y, sprite.xx, sprite.yy) == true && sprite.id != this.id) {
                if(gravy<0){
                    gravy=0;
                }
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
        let tsotl=false;
        /*if(this.x-5>-5){
            this.x = this.x - 5
        }*/
        for (const sprite of sprites) {
            if (getDistance(this.x-5, this.y, sprite.x, sprite.y, sprite.xx, sprite.yy) == true && sprite.id != this.id) {
                tsotl = true
            }
        }
        if(tsotl==false && this.x-5>-5){
            this.x = this.x-5
        }
    }
    mr() {
        
        let tsotl = false;
        /*if(this.x+5<495){
            this.x=this.x+5
        }*/
        for (const sprite of sprites) {
            if (getDistance(this.x + 5, this.y, sprite.x, sprite.y, sprite.xx, sprite.yy) == true && sprite.id != this.id) {
                tsotl = true
            }
        }
        if (tsotl == false && this.x + 5 < 495) {
            this.x = this.x + 5
        }
    }
    fire(ix, iy, xx, yy, a) {
        let projectile = new Projectile(ix, iy, xx, yy, a, "black")
        sprites.push(projectile);
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
            for (const sprite of sprites) {
                if (getDistance(this.x + 2.5, this.y, sprite.x, sprite.y, sprite.xx, sprite.yy) == true && sprite.id != this.id) {
                    console.log("Game over")
                    gameover=true
                }
            }
        }
        if (this.move==x){
            this.zz=true
        }
        if (this.zz == true && this.move > (x-(2*x))) {
            this.x = this.x - 2.5
            this.move = this.move - 2.5
            for (const sprite of sprites) {
                if (getDistance(this.x - 2.5, this.y, sprite.x, sprite.y, sprite.xx, sprite.yy) == true && sprite.id != this.id) {
                    console.log("Game over")
                    gameover=true
                }
            }
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
let gameover=false
var downa=false;
var downd = false;
var ld = 1;
var wk="";
var depth;
let fire = false;
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
        ld=0
    }
    if(wk=="D"){
        downd=true;
        ld=1
    }
    if (wk == "W" && gravy==0) {
        gravy=-6
    };
    if (wk == "F" && fire==false) {
        fire = true;
        if(ld==1){
            avatar.fire(avatar.x, avatar.y+5, 10, 2.5, 5)
        } else {
            avatar.fire(avatar.x, avatar.y + 5, 10, 2.5, -5)
        }
    }
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
    //console.log(getDistance(avatar.x, avatar.y, chao.x, chao.y))
    for (const sprite of sprites) sprite.draw(ctx);
    if(gameover==false){
        window.requestAnimationFrame(gameloop);
    } else {
        ctx.clearRect(0, 0, 500, 500);
        ctx.font = "100px Arial";
        ctx.fillText("Game Over!", 150, 300, 200)
    }
}

