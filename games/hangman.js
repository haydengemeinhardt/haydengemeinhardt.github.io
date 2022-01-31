function startHangman() {
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	
	var word;
	var words = ["minister", "juice", "gang", "lobster", "pokemon", "balloon", "weast", "continent", "hamburger", "reflection", "pollution", "questionaire", "trebuchet", "abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "euouae", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz", "microwave", "mnemonic", "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", "pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch", "zipper", "zodiac", "zombie"];
	var lives = 6;
	var guesses = [ ];
	var letterCount = 0;
	var win = 0;


	var showLives = document.getElementById("mylives");
	
	/* Create alphabet interface */
	var buttons = function () {
		letterButtons = document.getElementById('buttons');
		letters = document.createElement('ul');
		for (var i = 0; i < 26; i++)
		{
			letters.id = 'alphabet'
			list = document.createElement('li');
			list.id = 'letter';
			list.innerHTML = alphabet[i];
			click();
			letterButtons.appendChild(letters);
			letters.appendChild(list);
		}
	}
	
	/* Show lives */
	var updateLives = function () {
		currentLives = document.getElementById('lives');
		if (win != 1){
		if (lives < 1)
		{
				currentLives.innerHTML = "You lost!";
				win = -1;
			}
			else
				currentLives.innerHTML = "You have " + lives + " lives";
		}
		if (letterCount == word.length && win == 0)
		{
			currentLives.innerHTML = "You Win!";
			win = 1;
		}
	}
	
	/* Create answer interface */
	var answer = function () {
		hold = document.getElementById('answerHold');
		blanks = document.createElement('ul');
		for (var i = 0; i < word.length; i++)
		{
			blanks.setAttribute('id', 'word');
			blank = document.createElement('li');
			blank.setAttribute('class', 'guess');
			blank.innerHTML = "_";
			guesses.push(blank);
			hold.appendChild(blanks);
			blanks.appendChild(blank);
		}
	}
	
	/* When letter is clicked */
	var click = function () {
		list.onclick = function(){
			
			var guess = (this.innerHTML);
			this.setAttribute("style", "cursor: default; background-color: yellow");
			this.onclick = null;
			for (var i = 0; i < word.length; i++)
			{
				if (word[i] === guess)
				{
					guesses[i].innerHTML = guess;
					letterCount += 1;
				}
			}
			var j = (word.indexOf(guess));
			if (j === -1) {
				lives -= 1;
				if (win === 0)
					updateMan();
			}
			updateLives();
		}
	}
	
	var updateMan = function () {
		if (lives === 6) {document.getElementById("hangingMan").innerHTML = '<img src="/img/games/hangmanimages/hangman1.jpg">';}
		else if (lives === 5) {document.getElementById("hangingMan").innerHTML = '<img src="/img/games/hangmanimages/hangman2.jpg">';}
		else if (lives === 4) {document.getElementById("hangingMan").innerHTML = '<img src="/img/games/hangmanimages/hangman3.jpg">';}
		else if (lives === 3) {document.getElementById("hangingMan").innerHTML = '<img src="/img/games/hangmanimages/hangman4.jpg">';}
		else if (lives === 2) {document.getElementById("hangingMan").innerHTML = '<img src="/img/games/hangmanimages/hangman5.jpg">';}
		else if (lives === 1) {document.getElementById("hangingMan").innerHTML = '<img src="/img/games/hangmanimages/hangman6.jpg">';}
		else {document.getElementById("hangingMan").innerHTML = '<img src="/img/games/hangmanimages/hangman7.jpg">';}
	}

	
	
	/* Start */
	var start = function () {
		word = words[Math.floor(Math.random() * words.length)];
		console.log(word);
		word = word.replace(/\s/g, "-");
		guesses = [ ];
		buttons();
		lives = 6;
		letterCount = 0;
		win = 0;
		updateLives();
		answer();
		updateMan();
	}
	
	start();
	
	document.getElementById('restart').onclick = function () {
		blanks.parentNode.removeChild(blanks);
		letters.parentNode.removeChild(letters);
		start();
	}
}
