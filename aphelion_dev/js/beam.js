function beamCreate(game,playerGroup){
    var beam;
    var offset = {x:17,y:0};
   	beam = playerGroup.create(playerGroup.x + offset.x, 
                                playerGroup.y + offset.y, 
                                    'beam');
    beam.name = 'beam';
	//  We need to enable physics on the player
    game.physics.arcade.enable(beam);
    // beam.physicsBodyType = Phaser.Physics.P2JS;
    // game.physics.p2.enable(beam, true);
    // beam.body.collideWorldBounds = true;
    // beam.enableBody = true;
    // beam.physicsBodyType = Phaser.Physics.P2JS;

    //  Player physics properties. Give the little guy a slight bounce.
    // player.body.bounce.y = 0.2;
    // player.body.gravity.y = 300;

    // beam.body.setCircle(18);
    // beam.body.fixedRotation = true;
    // beam.anchor.setTo(-0.5, 0.5);

    //  Our two animations, walking left and right.
    // beam.animations.add('swipe', [0, 1, 2, 3], 10, false);
    // beam.animations.add('right', [5, 6, 7, 8], 10, true);

    // game.physics.p2.setPostBroadphaseCallback(checkbeamHit, this);
    // beam.anchor.setTo(-0.0, -0.4);
    beam.pivot.x = beam.width * .5;
    beam.pivot.y = beam.height;
    // beam.pivot.y = 180;
    // beam.pivot.x = -5;

	return beam;
}

var rotateMax = 3.1;
var rotateMin = 0;
var rotateStep = 0.4;
var lastDir = 'right';
var powerDrain = 0.8;

function beamSwipe(beamKey, beam, power){
    var swipeShift = {x:30,y:1};

    

    if (beamKey.isDown)
    {
        beam.body.enable = true;
        beam.visible = true;
        // beam.animations.play('swipe');
        console.log("SAPACEBAR pressed" + beam.rotation);


        power = power - powerDrain;

        // if(beam.rotation < rotateMin){
        //     beam.rotation = rotateMax;
        // }

    }else{
        beam.body.enable = false;
        beam.rotation = rotateMin;
        beam.visible = false;

        // beam.rotation = rotateMax;

        // beam.animations.stop();

        // beam.frame = 5;
    }
    return power;
}



function beamStickToParent(beam, player){
    // beam.x = player.x;
    // beam.y = player.y;
    // beam.body.x = player.x;
    // beam.body.y = player.y;
    // beam.body.velocity.x = 0;
    // beam.body.velocity.y = 0;
    // console.log("beam stick " + beam.position + player.position);

}


function checkbeamHit(body1, body2) {

    //  To explain - the post broadphase event has collected together all potential collision pairs in the world
    //  It doesn't mean they WILL collide, just that they might do.

    //  This callback is sent each collision pair of bodies. It's up to you how you compare them.
    //  If you return true then the pair will carry on into the narrow phase, potentially colliding.
    //  If you return false they will be removed from the narrow phase check all together.

    //  In this simple example if one of the bodies is our space ship, 
    //  and the other body is the green pepper sprite (frame ID 4) then we DON'T allow the collision to happen.
    //  Usually you would use a collision mask for something this simple, but it demonstates use.
    console.log(" body1 test!! " +body1.sprite.name+ "|"+ body1.position);
    console.log(" body2 test!! " +body2.sprite.name+ "|"+ body2.position);

    if ((body1.sprite.name === 'beam' && body2.sprite.name === 'star') || (body2.sprite.name === 'beam' && body1.sprite.name === 'star'))
    {
        return true;
        console.log(" star hit!! " +body1.sprite.name+ "|" + body1.position);

    }

    return false;

}