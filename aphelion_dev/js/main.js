<!-- hide script from old browsers




function main(){
    


	var game = new Phaser.Game(600, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	function preload() {

	    game.load.image('sky', 'img/sky.png');
	    game.load.image('ground', 'img/platform.png');
	    game.load.image('star', 'img/star.png');
	    game.load.spritesheet('dude', 'img/dude.png', 32, 48);
	    game.load.image('background','img/starfield.png');
	    game.load.image('background2','img/starfield.png');
	    // game.load.spritesheet('sword','img/shitsword.png',64, 64);
	    game.load.image('sword', 'img/shitsword_skinny.png');
	    game.load.image('ship', 'img/ship.png');
	    game.load.image('beam', 'img/beam.png');

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

	function create() {

		starfield = game.add.tileSprite(0, 0, 600, 900, 'background');
		starfield2 = game.add.tileSprite(0, 0, 600, 900, 'background2');

	    game.world.setBounds(0, 0, 600, 900);

	    // game.physics.startSystem(Phaser.Physics.P2JS);
	    // game.physics.p2.setImpactEvents(true);
	    // game.physics.p2.restitution = 0.9;
	    //  We're going to be using physics, so enable the Arcade Physics system
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //  A simple background for our game
	    // game.add.sprite(0, 0, 'sky');

	    //  The platforms group contains the ground and the 2 ledges we can jump on
	    platforms = game.add.group();

	    //  We will enable physics for any object that is created in this group
	    platforms.enableBody = true;

	    // Here we create the ground.
	    // var ground = platforms.create(0, game.world.height - 64, 'ground');

	    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	    // ground.scale.setTo(2, 2);

	    //  This stops it from falling away when you jump on it
	    // ground.body.immovable = true;

	    //  Now let's create two ledges
	    // var ledge = platforms.create(400, 400, 'ground');
	    // ledge.body.immovable = true;

	    // ledge = platforms.create(-150, 250, 'ground');
	    // ledge.body.immovable = true;

	    // The player and its settings
	    // player = game.add.sprite(32, game.world.height - 150, 'dude');
	    playerGroup = game.add.group();

	    player = playerCreate(game, playerGroup);

	    beam = beamCreate(game,playerGroup);
	    player.addChild(beam);
	    beam.visible = false;
	    // player.sword.anchor.setTo(0.15, 0.5);

	    // cursors = game.input.keyboard.createCursorKeys();

	    //  Notice that the sprite doesn't have any momentum at all,
	    //  it's all just set by the camera follow type.
	    //  0.1 is the amount of linear interpolation to use.
	    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
	    

	    //  Finally some stars to collect
	    stars = game.add.group();

	    //  We will enable physics for any star that is created in this group
	    stars.enableBody = true;

	    // stars.body.setCircle(15);
	    
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




	    //  Here we'll create 12 of them evenly spaced apart
	    // for (var i = 0; i < 12; i++)
	    // {
	    //     //  Create a star inside of the 'stars' group
	    //     var star = stars.create(i * 70, 30, 'star');

	    //     //  Let gravity do its thing
	    //     star.body.gravity.y = 100;
	    //     // star.body.gravity.x = 300;
    	// 	// game.physics.p2.enable(star, true);

    	// 	// star.body.setCircle(15);


	    //     //  This just gives each star a slightly random bounce value
	    //     star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    // }

	    //  The score
	    flavorText = game.add.text(16, game.world.height - 100, 'Use WASD to move your ship\nPress SPACE to fire absorption beam', { fontSize: '16px', fill: '#fff' });

	    //  Our controls.
	    // cursors = game.input.keyboard.createCursorKeys();
	    fire = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	    cursors = game.input.keyboard.addKeys( { 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D } );

	 //    var wasd = {
		//   up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		//   down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		//   left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		//   right: game.input.keyboard.addKey(Phaser.Keyboard.D),
		// };


		console.log(player.body.debug);
		// console.log(sword.body.debug);
		// console.log(stars.body.debug);
	    
	}

	function update() {

	    //  Collide the player and the stars with the platforms
	    game.physics.arcade.collide(player, platforms);
	    game.physics.arcade.collide(stars, platforms);

	    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
	    game.physics.arcade.overlap(player, stars, collideStar, null, this);
	    game.physics.arcade.overlap(beam, stars, collectStar, null, this);

	    //  Reset the players velocity (movement)
	    // player.body.setZeroVelocity();
	    var swipeDirection = playerMovement(cursors, player);
	    
	    power = beamSwipe(fire, beam, power);


	    starfield.tilePosition.y += scrollSpeed;
    	starfield2.tilePosition.y += scrollSpeed/2;
		// swordStickToParent(sword, player);

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
		level = levelChecker(stars, timer, flavorState, flavorText)	    //  Allow the player to jump if they are touching the ground.
	    flavorState = level[0];
	    flavorText = level[1];
	    // if (cursors.up.isDown && player.body.touching.down)
	    // {
	    //     player.body.velocity.y = -350;
	    // }
	    power = power - powerDrainAlways;

	}

	

	function collectStar (player, star) {
	    
	    // Removes the star from the screen
	    star.kill();

	    //  Add and update the score
	    // score += 10;
	    // scoreText.text = 'Score: ' + score;
	    power += 20;

	}

	function collideStar (player, star) {
	    
	    // Removes the star from the screen
	    star.kill();

	    //  Add and update the score
	    // score += 10;
	    // scoreText.text = 'Score: ' + score;
	    power -= 10;

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