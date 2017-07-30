
var max_velocity = 300; 


function playerCreate(game, playerGroup){
    var player;
   	player = playerGroup.create(game.world.centerX, game.world.centerY, 'ship');
    player.name="ship"

	//  We need to enable physics on the player
    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;

    player.body.fixedRotation = true;

    // player.body.setCircle(18);

    // player.anchor.setTo(-0.5, 0.5);   


    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    //  Our two animations, walking left and right.
    // player.animations.add('left', [0, 1, 2, 3], 10, true);
    // player.animations.add('right', [5, 6, 7, 8], 10, true);

    // game.physics.p2.setPostBroadphaseCallback(checkVeg, this);
    // console.log("player.name="+player.name);

	return player;
}



function playerMovement(cursors, player){
	player.body.velocity.x *= 0.01;
    player.body.velocity.y *= 0.01;

    var swipeDirection = "";

    if (cursors.up.isDown)
    {
        player.body.velocity.y = -max_velocity;
        swipeDirection +='up';
    }
    else if (cursors.down.isDown)
    {
        swipeDirection +='down';
        player.body.velocity.y = max_velocity;
    }

    if (cursors.left.isDown)
    {
        swipeDirection +='left';
        player.body.velocity.x = -max_velocity;
        player.animations.play('left');

    }
    else if (cursors.right.isDown)
    {
        swipeDirection +='right';
        player.body.velocity.x =max_velocity;
        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    return	swipeDirection	;
}
