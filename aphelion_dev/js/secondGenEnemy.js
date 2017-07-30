

var enemyMaxEnergy = 80;
var livingEnemies = [];
var bulletEnergy = 10;
var firingInterval = 450;
var bulletSpeed = 200;

function getSecondBulletEnergy(){
	return bulletEnergy;
}

function secondEnemySpawn(x,y, enemies, gravity){
	var enemy = enemies.create(x, y, 'enemy2');
	enemy.body.gravity.y = gravity;
	enemy.energy = enemyMaxEnergy;
	return enemy;
}

function secondEnemyFires(game, player, enemies,enemyBullets, firingTimer){
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
        firingTimer = game.time.now + firingInterval;
    }
    return firingTimer;
}
	


