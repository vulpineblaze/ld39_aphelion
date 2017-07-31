

var enemyMaxEnergySecondGen = 80;
var livingEnemiesSecondGen = [];
var bulletEnergySecondGen = 10;
var firingIntervalSecondGen = 0.45;
var bulletSpeedSecondGen = 200;

function getSecondBulletEnergy(){
	return bulletEnergySecondGen;
}

function secondEnemySpawn(x,y, enemies, gravity){
	var enemy = enemies.create(x, y, 'enemy2');
	enemy.body.gravity.y = gravity;
	enemy.energy = enemyMaxEnergySecondGen;
	return enemy;
}

function secondEnemyFires(game, player, enemies,enemyBullets, firingTimer){
	enemyBullet = enemyBullets.getFirstExists(false);
	livingEnemiesSecondGen.length=0;
	enemies.forEachAlive(function(enemy){

        // put every living enemy in an array
        livingEnemiesSecondGen.push(enemy);
    });
	if (enemyBullet && livingEnemiesSecondGen.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemiesSecondGen.length-1);

        // randomly select one of them
        var shooter=livingEnemiesSecondGen[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,bulletSpeedSecondGen);
        firingTimer = game.time.totalElapsedSeconds() + firingIntervalSecondGen;
    }
    return firingTimer;
}
	


