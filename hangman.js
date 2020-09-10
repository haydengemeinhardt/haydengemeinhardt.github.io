function startHangman() {
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	
	var word;
	var words = ["minister", "juice", "gang", "lobster", "pokemon", "balloon", "weast", "continent", "hamburger", "reflection", "pollution", "questionaire", "trebuchet"];
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
		if (lives < 1)
			currentLives.innerHTML = "You lost!";
		else
			currentLives.innerHTML = "You have " + lives + " lives";
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
		if (lives === 6) {document.getElementById("hangingMan").innerHTML = '<img src="hangmanimages/hangman1.jpg">';}
		else if (lives === 5) {document.getElementById("hangingMan").innerHTML = '<img src="hangmanimages/hangman2.jpg">';}
		else if (lives === 4) {document.getElementById("hangingMan").innerHTML = '<img src="hangmanimages/hangman3.jpg">';}
		else if (lives === 3) {document.getElementById("hangingMan").innerHTML = '<img src="hangmanimages/hangman4.jpg">';}
		else if (lives === 2) {document.getElementById("hangingMan").innerHTML = '<img src="hangmanimages/hangman5.jpg">';}
		else if (lives === 1) {document.getElementById("hangingMan").innerHTML = '<img src="hangmanimages/hangman6.jpg">';}
		else {document.getElementById("hangingMan").innerHTML = '<img src="hangmanimages/hangman7.jpg">';}
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