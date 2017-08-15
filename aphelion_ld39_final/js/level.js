


var timerInterval = 0.1;
var waveInterval = 19.0;
var baseGravity =10;
var typicalHeight =40;
var typicalWidth =70;

var waveCount =9;
var waveWidthSpacing =25;
var waveWidthCount =22;

var starCount =20;
var starWidthSpacing =25;
var starWidthCount =22;

var verticalOffset = 50;

var end = false;

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function generateWave(stars,enemies){
	// enemies.removeAll();

	for (var i = 1; i < starCount; i++)
    {
		var star = stars.create(randomIntFromInterval(1,waveWidthCount)*waveWidthSpacing, -typicalWidth*i-verticalOffset, 'star');
		star.body.gravity.y = baseGravity;
    }
	for (var i = 1; i < waveCount; i++)
    {
		var enemy = enemySpawn(randomIntFromInterval(1,waveWidthCount)*waveWidthSpacing, -typicalWidth*i-verticalOffset, enemies, baseGravity/2);
    }
}
function generateSecondGenWave(secondGenEnemies){
	// secondGenEnemies.removeAll();

	for (var i = 1; i < waveCount; i++)
    {
		var enemy = secondEnemySpawn(randomIntFromInterval(1,waveWidthCount)*waveWidthSpacing, -typicalWidth*i-verticalOffset, secondGenEnemies, baseGravity/2);
    }
}

function levelChecker(game, stars, enemies, secondGenEnemies, timer, flavorState, flavorText){
		if (game.time.totalElapsedSeconds() > 0 && flavorState == "start"){
			flavorText.text = "Use WASD to move your ship\nPress SPACE to fire absorption beam";
			flavorState = "wave1";			
			// generateSecondGenWave(secondGenEnemies);
			generateWave(stars,enemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval && flavorState == "wave1"){
			flavorText.text = 'Keep an eye on your Power bar, located at the top of the screen.\nYou must gather enough Power to maintain your ship\nAnd enough extra to save what remains of the universe.\n';
			flavorState = "wave2";			
			// flavorState = "end";			
			generateWave(stars,enemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*2 && flavorState == "wave2"){
			flavorText.text = 'After a centillion years, heat death becomes an inevitability.\nWith almost no thermodynamic free energy left in the universe,\nThere is little hope for those who remain.';
			// flavorText.text = "more are coming";
			flavorState = "wave3";			
			generateWave(stars,enemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*3 && flavorState == "wave3"){
			flavorText.text = 'Although their light may still reach us,\nAll of the stars have collapsed into brilliant supernovae...\nOnly neutron husks and black holes punctuate the barren landscape.';
			flavorState = "wave4";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*4 && flavorState == "wave4"){
			flavorText.text = 'Unable to gather resources outside of their home systems,\nThe younger and less intelligent races were the first to go,\nFollowed by those who could not harness nuclear fusion.';
			flavorState = "wave5";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*5 && flavorState == "wave5"){
			flavorText.text = 'More advanced races began violating peace agreements,\nResorting to pillaging resources from more vulnerable populations \nIn a desperate attempt at self-preservation.';
			flavorState = "wave6";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*6 && flavorState == "wave6"){
			flavorText.text = 'Many groups and factions have gone rogue,\nLeaving their home systems with everything they can carry,\nHoping to plunder or find enough energy to sustain their ships.';
			flavorState = "wave7";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*7 && flavorState == "wave7"){
			flavorText.text = 'The universal economy is decimated.\nThere are no more trade routes or allies...\nOnly prey.';
			flavorState = "wave8";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*8 && flavorState == "wave8"){
			flavorText.text = 'As energy supplies dwindled, war became inescapable.\nRaces who had long-since been friends and allies turned on each other.\nOne by one, great and ancient civilizations fell.';
			flavorState = "wave9";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*9 && flavorState == "wave9"){
			flavorText.text = 'Those peoples who remain have either given up hope,\nOr are gambling the last of their resources to overtake the others...';
			flavorState = "wave10";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*10 && flavorState == "wave10"){
			flavorText.text = 'Except for one.';
			flavorState = "wave11";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*11 && flavorState == "wave11"){
			flavorText.text = 'We are a differently-minded people.\nHighly intelligent, we surpass all others in technological advancement.\nWe knew this day would come.';
			flavorState = "wave12";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*12 && flavorState == "wave12"){
			flavorText.text = 'A peaceful race, the we opted not to pillage.\nInstead we raised our defenses,\nTo develop and protect that which is most precious...';
			flavorState = "wave13";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*13 && flavorState == "wave13"){
			flavorText.text = 'A device that would save our empire...\nA device that would save our universe...\nOur crowning achievement...';
			flavorState = "wave14";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*14 && flavorState == "wave14"){
			flavorText.text = 'The Trans-Universal Warp Drive.';
			flavorState = "wave15";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*15 && flavorState == "wave15"){
			flavorText.text = 'This device would allow us to explore the multiverse,\nAnd therefore open the path to unlimited energy,\nSaving our race from imminent annihilation.';
			flavorState = "wave16";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*16 && flavorState == "wave16"){
			flavorText.text = 'However, we have run into a problem...\nEnergy reserves are low.\nIt is all we can do to maintain our defenses.';
			flavorState = "wave17";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*17 && flavorState == "wave17"){
			flavorText.text = 'There is not enough left to power the Warp Drive,\nWhile keeping our people safe from destruction.\nHostile forces loom just beyond our borders...';
			flavorState = "wave18";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*18 && flavorState == "wave18"){
			flavorText.text = 'Waiting...';
			flavorState = "wave19";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*19 && flavorState == "wave19"){
			flavorText.text = 'Left with no other option,\nOur engineers installed the drive onto our greatest ship...\nThe Starseeker.';
			flavorState = "wave20";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*20 && flavorState == "wave20"){
			flavorText.text = 'A grand ship,\nCrewed by the best and brightest\nThe Starseeker is the pride of the the fleet.';
			flavorState = "wave21";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*21 && flavorState == "wave21"){
			flavorText.text = 'Given all of the remaining free power in the Aphilion system,\nThe crew has been sent off into the barren wastes...\nThe guardians of the last hope for the universe.';
			flavorState = "wave22";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*22 && flavorState == "wave22"){
			flavorText.text = 'Resources must be gathered to sustain the ship...\nWith enough leftover to power the Warp Drive,\nAnd bring new resources back to the Aphilion system.';
			flavorState = "wave23";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*23 && flavorState == "wave23"){
			flavorText.text = 'You, the Captain of the Starseeker, are in charge of this mission.\nThe fate of the universe rests in your capable hands.\nBest of luck!';
			flavorState = "wave24";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*24 && flavorState == "wave24"){
			flavorText.text = 'Welcome to the last days of the universe.';
			flavorState = "wave25";
			generateWave(stars,enemies);
			generateSecondGenWave(secondGenEnemies);
		}else if (game.time.totalElapsedSeconds() > waveInterval*25.5 && flavorState == "wave25"){
			flavorText.text = '';
			flavorState = "end";
		}else{

		}

		return [flavorState,flavorText]
	}