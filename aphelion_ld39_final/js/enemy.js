

var enemyMaxEnergy = 30;
var livingEnemies = [];
var bulletEnergy = 10;
var firingInterval = 0.9;
var bulletSpeed = 150;

function getBulletEnergy(){
	return bulletEnergy;
}

function enemySpawn(x,y, enemies, gravity){
	var enemy = enemies.create(x, y, 'enemy');
	enemy.body.gravity.y = gravity;
	enemy.energy = enemyMaxEnergy;
    // console.log("energy:"+enemy.energy);
	return enemy;
}

function enemyFires(game, player, enemies,enemyBullets, firingTimer){
	enemyBullet = enemyBullets.getFirstExists(false);
	livingEnemies.length=0;
	enemies.forEachAlive(function(enemy){

        // put every living enemy in an array
        livingEnemies.push(enemy);
    });
	if (enemyBullet && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,bulletSpeed);
        firingTimer = game.time.totalElapsedSeconds() + firingInterval;
    }
    return firingTimer;
}
	


