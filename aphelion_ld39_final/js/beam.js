function beamCreate(game,playerGroup){
    var beam;
    var offset = {x:17,y:0};
   	beam = playerGroup.create(playerGroup.x + offset.x, 
                                playerGroup.y + offset.y, 
                                    'beam');
    beam.name = 'beam';
	//  We need to enable physics on the player
    game.physics.arcade.enable(beam);

    beam.pivot.x = beam.width * .5;
    beam.pivot.y = beam.height;


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


}

