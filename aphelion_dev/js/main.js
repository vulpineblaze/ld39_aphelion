<!-- hide script from old browsers




function main(){
    


	var game = new Phaser.Game(600, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	function preload() {

	    game.load.image('star', 'img/star.png');
	    game.load.image('background','img/starfield.png');
	    game.load.image('background2','img/starfield.png');
	    game.load.image('ship', 'img/ship.png');
	    game.load.image('beam', 'img/beam.png');
	    game.load.image('enemy', 'img/enemy.png');
	    game.load.image('enemyBullet', 'img/bullet.png');

	}

	var player;
	var playerGroup;
	var sword;
	var platforms;
	var scrollSpeed = 1;

	var cursors;
	var swordKey;

	var stars;
	var score = 0;
	var flavorText;

	var power = 100;
	var powerDrainAlways = 0.1;
	var powerBarBack;
	var powerBarFore;
	var powerBarWidth = 600 // example;
	var powerBarHeight = 50 // example;

	var timer = 0;
	var flavorState = "start";

	var enemies;
	var beamEnergy = 0.8;
	var starEnergy = 10;

	var firingTimer = 0;
	var enemyBullets;

	function create() {

		starfield = game.add.tileSprite(0, 0, 600, 900, 'background');
		starfield2 = game.add.tileSprite(0, 0, 600, 900, 'background2');

	    game.world.setBounds(0, 0, 600, 900);
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	   
	    playerGroup = game.add.group();

	    player = playerCreate(game, playerGroup);

	    beam = beamCreate(game,playerGroup);
	    player.addChild(beam);
	    beam.visible = false;

	    stars = game.add.group();

	    stars.enableBody = true;

	    
		var bmd = game.add.bitmapData(powerBarWidth, powerBarHeight);
		
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, powerBarWidth, powerBarHeight);
		bmd.ctx.fillStyle = '#000000';
		bmd.ctx.fill();
		powerBarBack = game.add.sprite(game.world.centerX, 0, bmd);
		powerBarBack.anchor.setTo(0.5, 0.5);

		var bmd2 = game.add.bitmapData(powerBarWidth, powerBarHeight);

		bmd2.ctx.beginPath();
		bmd2.ctx.rect(0, 0, powerBarWidth, powerBarHeight);
		bmd2.ctx.fillStyle = '#ffff00';
		bmd2.ctx.fill();
		powerBarFore = game.add.sprite(game.world.centerX, 0, bmd2);
		powerBarFore.anchor.setTo(0.5, 0.5);



	    flavorText = game.add.text(16, game.world.height - 100, 'blank', { fontSize: '16px', fill: '#fff' });

	    fire = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	    cursors = game.input.keyboard.addKeys( { 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D } );


		enemies = game.add.group();
	    enemies.enableBody = true;
	    enemies.physicsBodyType = Phaser.Physics.ARCADE;

	    enemyBullets = game.add.group();
	    enemyBullets.enableBody = true;
	    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
	    enemyBullets.createMultiple(30, 'enemyBullet');
	    enemyBullets.setAll('anchor.x', 0.5);
	    enemyBullets.setAll('anchor.y', 1);
	    enemyBullets.setAll('outOfBoundsKill', true);
	    enemyBullets.setAll('checkWorldBounds', true);

	    
	}

	function update() {

	    //  Collide the player and the stars with the platforms
	    game.physics.arcade.collide(player, platforms);
	    game.physics.arcade.collide(stars, platforms);

	    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
	    game.physics.arcade.overlap(player, stars, collideStar, null, this);
	    game.physics.arcade.overlap(beam, stars, collectStar, null, this);
	    game.physics.arcade.overlap(player, enemies, collideEnemy, null, this);
	    game.physics.arcade.overlap(beam, enemies, collectEnemy, null, this);
	    game.physics.arcade.overlap(player, enemyBullets, collideEnemyBullet, null, this);
	    // game.physics.arcade.overlap(beam, enemyBullets, collideEnemyBullet, null, this);

	
	    var swipeDirection = playerMovement(cursors, player);
	    
	    power = beamSwipe(fire, beam, power);


	    starfield.tilePosition.y += scrollSpeed;
    	starfield2.tilePosition.y += scrollSpeed/2;

		powerBarFore.width = (600 * power) / 100;
		if (power > 100) { power = 100;}
		if (power < 0) { 
			player.kill(); 
			power = 0;
			flavorText.text = "Click to Restart";
			game.input.onTap.addOnce(restart,this);
		}
		console.log("power:"+power+ " bar:"+powerBarFore.width);

		timer += 0.0001;
		console.log("timer:"+timer);
		level = levelChecker(stars, enemies, timer, flavorState, flavorText)	    //  Allow the player to jump if they are touching the ground.
	    flavorState = level[0];
	    flavorText = level[1];

	    power = power - powerDrainAlways;

	    if (game.time.now > firingTimer)
        {
            firingTimer = enemyFires(game, player, enemies, enemyBullets, firingTimer);
        }

	}

	

	function collectStar (player, star) {
	    star.kill();
	    power += starEnergy;
	}
	function collideStar (player, star) {
	    star.kill();
	    power -= starEnergy;
	}

	function collideEnemy(player, enemy){
		enemy.kill();
	    power -= 20;
	}
	function collectEnemy(beam, enemy){
		enemy.energy -= beamEnergy;
		power += beamEnergy;
		if(enemy.energy < 0){
			enemy.kill();
		}
	}

	function collideEnemyBullet (player, bullet) {
	    bullet.kill();
	    power -= getBulletEnergy();
	}


	function restart () {

	    //  A new level starts
	    power = 100;
	    //revives the player
	    player.revive();
	    //hides the text
		flavorText.text = "restart";
		flavorState = "start";
		timer = 0;
		stars.removeAll();


	}

}




// end hiding script from old browsers -->