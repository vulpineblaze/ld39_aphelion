


	var timerInterval = 0.04;


function levelChecker(stars, timer, flavorState, flavorText){
		if (timer > 0 && flavorState == "start"){
			// flavorText.text = "test";
			flavorState = "test";
			for (var i = 0; i < 12; i++)
		    {
		        var star = stars.create(600- (i * 70), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval && flavorState == "test"){
			// flavorText.text = "more are coming";
			flavorState = "more";
			for (var i = 0; i < 12; i++)
		    {
		        var star = stars.create(i * 70, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*2 && flavorState == "more"){
			// flavorText.text = "more are coming";
			flavorState = "wave3";
			for (var i = 0; i < 12; i++)
		    {
		        var star = stars.create(i * 70, -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*3 && flavorState == "wave3"){
			flavorText.text = 'Keep an eye on your Power bar, located at the top of the screen.\nYou must gather enough Power to maintain your ship\nAnd enough extra to save what remains of the universe.\n';
			flavorState = "wave4";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*4 && flavorState == "wave4"){
			flavorState = "wave5";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*5 && flavorState == "wave5"){
			flavorState = "wave6";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*6 && flavorState == "wave6"){
			flavorText.text = 'After a centillion years, heat death becomes an inevitability.\nWith almost no thermodynamic free energy left in the universe,\nThere is little hope for those who remain.';
			flavorState = "wave7";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*7 && flavorState == "wave7"){
			flavorState = "wave8";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*8 && flavorState == "wave8"){
			flavorState = "wave9";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*9 && flavorState == "wave9"){
			flavorText.text = 'Although their light may still reach us,\nAll of the stars have collapsed into brilliant supernovae...\nOnly neutron husks and black holes punctuate the barren landscape.';
			flavorState = "wave10";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer >timerInterval*10 && flavorState == "wave10"){
			flavorState = "wave11";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*11 && flavorState == "wave11"){
			flavorState = "wave12";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*12 && flavorState == "wave12"){
			flavorText.text = 'Unable to gather resources outside of their home systems,\nThe younger and less intelligent races were the first to go,\nFollowed by those who could not harness nuclear fusion.';
			flavorState = "wave13";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*13 && flavorState == "wave13"){
			flavorState = "wave14";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*14 && flavorState == "wave14"){
			flavorState = "wave15";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else if (timer > timerInterval*14 && flavorState == "wave15"){
			flavorText.text = 'More advanced races began violating peace agreements,\nResorting to pillaging resources from more vulnerable populations \nIn a desperate attempt at self-preservation.';
			flavorState = "wave16";
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(i * 140, i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
			for (var i = 0; i < 6; i++)
		    {
		        var star = stars.create(600- (i * 140), i * -30, 'star');
		        star.body.gravity.y = 10;
		    }
		}else{

		}

		return [flavorState,flavorText]
	}