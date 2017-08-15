<!-- hide script from old browsers




function main(){
    


	var game = new Phaser.Game(600, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	function preload() {

	    game.load.image('star', 'img/asteroid.png');
	    game.load.image('background','img/starfield.png');
	    game.load.image('background2','img/starfield.png');
	    game.load.image('ship', 'img/ship.png');
	    game.load.image('beam', 'img/beam.png');
	    game.load.image('enemy', 'img/enemy.png');
	    game.load.image('enemy2', 'img/enemy2.png');
	    game.load.image('enemyBullet', 'img/bullet.png');
	    game.load.image('end', 'img/end.png');

        game.load.audio('boden', ['audio/Scorched_Circuits.mp3', 
        	'audio/Scorched_Circuits.ogg']);
        game.load.audio('beam1', 'audio/Laser_Shoot.wav');
        game.load.audio('beam2', 'audio/beam2.mp3');
        game.load.audio('beam2', 'audio/beam2.mp3');


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
	var powerDrainAlways = 0.05;
	var powerBarBack;
	var powerBarFore;
	var powerBarWidth = 600 // example;
	var powerBarHeight = 50 // example;

	var timer = 0;
	var flavorState = "start";

	var enemies;
	var secondGenEnemies;
	var beamEnergy = 1.5;
	var starEnergy = 10;

	var firingTimer = 0;
	var secondFiringTimer = 0;
	var enemyBullets;

	var beam1sfx;
	var beam2sfx;

	var the_end;

	function create() {

	    music = game.add.audio('boden');
	    music.play();

		beam1sfx = game.add.audio('beam1');
		beam2sfx = game.add.audio('beam2');
    	beam1sfx.allowMultiple = true;



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
	    stars.setAll('outOfBoundsKill', true);
	    stars.setAll('checkWorldBounds', true);

	    
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
	    enemies.setAll('outOfBoundsKill', true);
	    enemies.setAll('checkWorldBounds', true);

		secondGenEnemies = game.add.group();
	    secondGenEnemies.enableBody = true;
	    secondGenEnemies.physicsBodyType = Phaser.Physics.ARCADE;
	    secondGenEnemies.setAll('outOfBoundsKill', true);
	    secondGenEnemies.setAll('checkWorldBounds', true);

	    enemyBullets = game.add.group();
	    enemyBullets.enableBody = true;
	    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
	    enemyBullets.createMultiple(60, 'enemyBullet');
	    enemyBullets.setAll('anchor.x', 0.5);
	    enemyBullets.setAll('anchor.y', 1);
	    enemyBullets.setAll('outOfBoundsKill', true);
	    enemyBullets.setAll('checkWorldBounds', true);

		the_end = game.add.sprite(0, 0, 'end');
		the_end.visible=false;


	    
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

	    game.physics.arcade.overlap(player, secondGenEnemies, collideEnemy, null, this);
	    game.physics.arcade.overlap(beam, secondGenEnemies, collectEnemy, null, this);

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
	    	music.stop();

		}
		// console.log("power:"+power+ " bar:"+powerBarFore.width);

		timer += 0.0001;
		// console.log("timer:"+timer);
		level = levelChecker(game, stars, enemies, secondGenEnemies, timer, flavorState, flavorText)	    //  Allow the player to jump if they are touching the ground.
	    flavorState = level[0];
	    flavorText = level[1];

	    // console.log("pre the_end: "+flavorState+" time:"+game.time.totalElapsedSeconds());

	    if(flavorState=="end"){
			flavorState = "limbo";

	    	player.kill(); 
			power = 0;
			flavorText.text = "Click to Restart";
			the_end.visible = true;
			game.input.onTap.addOnce(restart,this);
	    	music.stop();
	    	console.log("the_end: "+flavorState);
	    }

	    power = power - powerDrainAlways;

	    if (game.time.totalElapsedSeconds() > firingTimer)
        {
            firingTimer = enemyFires(game, player, enemies, enemyBullets, firingTimer);
        }
        if (game.time.totalElapsedSeconds() > secondFiringTimer)
        {
            secondFiringTimer = secondEnemyFires(game, player, secondGenEnemies, enemyBullets, secondFiringTimer);
        }

	}

	

	function collectStar (player, star) {
	    star.kill();
	    power += starEnergy;
	    beam1sfx.play();

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
	    beam1sfx.play();
	}

	function collideEnemyBullet (player, bullet) {
	    bullet.kill();
	    power -= getBulletEnergy();
	    beam2sfx.play();

	}


	function restart () {
		
	    console.log("restart");
		if(the_end){
			the_end.visible = false;
			// the_end.kill();
			// the_end = "";
		}

	    //  A new level starts
	    power = 100;
	    //revives the player
	    player.revive();
	    //hides the text
		flavorText.text = "restart";
		flavorState = "start";
		timer = 0;
		game.time.reset();
		stars.removeAll();
		enemies.removeAll();
		secondGenEnemies.removeAll();
		// enemyBullets.removeAll();
		firingTimer=0;
		secondFiringTimer=0;

	    music.play();

	    console.log("restart_done:"+flavorState+" time:"+game.time.totalElapsedSeconds());



	}

}




// end hiding script from old browsers -->