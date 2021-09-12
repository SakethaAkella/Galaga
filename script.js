function loadImages(){
	enemyImage = new Image();
	shipImage = new Image();
	bulletImage = new Image();

	enemyImage.src = "enemy.png";
	shipImage.src = "player.png"
	bulletImage.src = "bullet.png"
}


function init(){
canvas = document.getElementById('mycanvas');
console.log(canvas);
gameover = false;

pen = canvas.getContext('2d'); 
W = canvas.width;
H = canvas.height;
prev_counter = 0;
counter = 0;

loadImages();

ship = {
	x : 300,
	y : H-50,
	w : 50,
	h : 50,
	speed : 25,
	bullets : [],

	update : function(){
		
	},

	draw : function(){
		pen.drawImage(shipImage,ship.x,ship.y,ship.w,ship.h)

	},

	shoot : function(){

		if(counter-prev_counter>=1){
			console.log("Shooting a bullet");

			var b = new bullet(this.x + (this.w)/2, this.y,10);
			this.bullets.push(b);
			prev_counter = counter;

			enemies.forEach(function(enemy){
			if(isCollidingWithBullet(b,enemy)){
				this.state = "inactive";
				console.log("enemy died");
				var index = enemies.indexOf(enemy);
				enemies.splice(index,1);
				}

			});

		}
		
	}

};

function buttonGotPressed(e){
	if(e.key==" "){
		ship.shoot();
	}
	if(e.key=="ArrowLeft"){
		ship.x = ship.x - ship.speed;
		if(ship.x<=0){
			ship.x= 0;
		}
	}
	if(e.key=="ArrowRight"){
		ship.x = ship.x + ship.speed;
		if(ship.x >= W-ship.w){
			ship.x = W-ship.w;
		}
	}
}

document.addEventListener('keydown', buttonGotPressed);   

enemies = [];
var e = new enemy(10,20,5);
enemies.push(e);

}


function bullet(x,y,speed){
	this.x = x;
	this.y = y;
	this.w = 4;
	this.h = 14;
	this.state = "active"
	this.speed = speed;

	this.draw = function(){
        pen.drawImage(bulletImage,this.x,this.y,this.w,this.h);

	}

	this.update = function(){
		this.y -= this.speed;

		if(this.y<=0){
			this.state = "inactive"
		}
	}

}


function enemy(x,y,speed){
	this.x = x;
	this.y = y;
	this.w = 50;
	this.h = 50;
	this.state = "active"
	this.speed = speed;

	this.draw = function(){

		pen.drawImage(enemyImage,this.x,this.y,this.w,this.h);

	}

	this.update = function(){

		this.x = this.x + this.speed;


		if(this.x >= W-this.w || this.x<=0){
			this.speed *= -1;
		}

		this.y++;

		if(this.y<=0){
			this.state = "inactive"
		}
	}

}


function draw(){
	
	pen.clearRect(0,0,W,H);

	pen.fillStyle = "red"  
	ship.draw()

	ship.bullets.forEach(function(bullet){
		bullet.draw();
	});

	enemies.forEach(function(enemy){
		enemy.draw();

	});

}

function update(){
	ship.update()

	ship.bullets.forEach(function(bullet){
		bullet.update();

	});

	enemies.forEach(function(enemy){
		enemy.update();
	});

    
	var no =  Math.random();
	if(no<0.01){
		var x = Math.floor(Math.random()*(W-50));
		
		var y = Math.floor(Math.random()*100);

		var speed = Math.random()*10 +2;
		var negative = Math.random();
		if(negative<0.5){
			speed = -speed;
		}

		var e = new enemy(x,y,speed);
		enemies.push(e);
	}

	enemies.forEach(function(enemy){
		if(isColliding(ship,enemy)){
			alert("Game Over. Click OK to restart..");
			gameover = true;
		}

	});
}

function isColliding(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.w,r2.w);
	var y_axis = Math.abs(r1.y - r2.y)<= Math.max(r1.h,r2.h);

	return x_axis && y_axis;
}

function isCollidingWithBullet(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.w,r2.w);
	var y_axis = Math.abs(r1.y - r2.y)<= Math.max(r1.h,r2.h);

	return x_axis || y_axis;
}


function render(){
	draw();
	update();
	console.log("in render");
	counter++;

	
	if(gameover == false){
		window.requestAnimationFrame(render);
	}
	else{
		startGame();
	}
	}
	
function startGame(){
	init();
	render();
}

startGame();