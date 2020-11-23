// if you are reading this, it is still in a mess from my testing... but I think I finally fixed the bug?!

function startHangman() {
	var numbers = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8'];
	var win = 0;
	var words = "fdg";
	var guess = -1;
	var guessnumber = -1;
	var secondguess = -1;
	var secondguessnumb = -1;
	var score = 0;
	wintitle = document.getElementsByClassName('wintitle')[0];
	
	/* Create card interface */
	var buttons = function () {
		cards = document.getElementsByClassName('buttons')[0];
		card = document.createElement('ul');
		for (var i = 0; i < 16; i++)
		{
			card.class = 'buttons';
			list = document.createElement('li');
			list.class = 'letter';
			var temp = Math.floor(Math.random() * numbers.length);
			list.innerHTML = numbers[temp];
			numbers.splice(temp, 1);
			click();
			cards.appendChild(card);
			card.appendChild(list);
		}
	}
	
	/* When letter is clicked */
	var click = function () {
		list.onclick = function(){
			this.setAttribute("style", "cursor: crosshair; background-color: white");
			this.onclick = disableclick(this);
			console.log("null");
			if (guess == -1)
			{
				guessnumber = (this.innerHTML);
				guess = this;
				console.log(guess);
			}
			else
			{
//				wait();
				secondguessnum = this.innerHTML;
				secondguess = this;
				console.log(secondguessnum);
				document.getElementsByClassName('buttons')[0].style.pointerEvents = 'none';
				setTimeout(function() {
					document.getElementsByClassName('buttons')[0].style.pointerEvents = 'auto';
					if (guessnumber == secondguessnum)
					{
						guess.setAttribute("style", "cursor: default; background-color: gray");
						secondguess.setAttribute("style", "cursor: default; background-color: gray");
						console.log("startcorrectguess");
						correctguess();
					}
					else
					{
						guess.setAttribute("style", "cursor: pointer; background-color: black");
						console.log(guess);
						guess.onclick = clicked;
						console.log("1wrongonclick");
						secondguess.setAttribute("style", "cursor: pointer; background-color: black");
						console.log(secondguess);
						secondguess.onclick = clicked;
						console.log("2wrongonclick");
						console.log("wrong");
						guess = -1;
						guessnumber = -1;
						secondguess = -1;
						secondguessnum = -1;
					}
				}, 1000);
			}
		}
	}
	
	var clicked = function(){
		this.setAttribute("style", "cursor: crosshair; background-color: white");
		this.onclick = disableclick(this);
		console.log("null");
		if (guess === -1)
		{
			guessnumber = (this.innerHTML);
			guess = this;
			console.log(guess);
		}
		else
		{
//				wait();
			secondguessnum = this.innerHTML;
			secondguess = this;
			console.log(secondguessnum);
			document.getElementsByClassName('buttons')[0].style.pointerEvents = 'none';
			setTimeout(function() {
				document.getElementsByClassName('buttons')[0].style.pointerEvents = 'auto';
				if (guessnumber == secondguessnum)
				{
					guess.setAttribute("style", "cursor: default; background-color: gray");
					secondguess.setAttribute("style", "cursor: default; background-color: gray");
					console.log("startcorrectguess");
					correctguess();
				}
				else
				{
					guess.setAttribute("style", "cursor: pointer; background-color: black");
					console.log(guess);
					guess.onclick = clicked;
					console.log("1wrongonclick");
					secondguess.setAttribute("style", "cursor: pointer; background-color: black");
					console.log(secondguess);
					secondguess.onclick = clicked;
					console.log("2wrongonclick");
					console.log("wrong");
					guess = -1;
					guessnumber = -1;
					secondguess = -1;
					secondguessnum = -1;
				}
			}, 1000);
		}
	
	}
	
	
	var disableclick = function (el) {
		el.disabled = true;
	}
	
	var enableclick = function (el) {
		console.log("enableclick");
		el.disabled = false;
	}
	
	
	//probably get rid of
	var correctguess = function () {
		guess = -1;
		guessnumber = -1;
		secondguess = -1;
		secondguessnum = -1;
		score = score+2;
		if (score === 16)
		{
			console.log("win!");
			wintitle.setAttribute("style", "display: flex");
		}
		console.log("finishcorrectguess");
	}
	
	var resetguess = function () {
		guess = -1;
		guessnumber = -1;
		secondguess = -1;
	}
	
	var wait = function () {
		document.getElementsByClassName('buttons')[0].style.pointerEvents = 'none';
		setTimeout(function() {
		(document.getElementsByClassName('buttons')[0].style.pointerEvents = 'auto');}, 1000);
		console.log("done");
//		document.getElementsByClassName('buttons')[0].style.pointerEvents = 'auto';
	}
	
	/* Start easy */
	var start = function () {
		numbers = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8'];
		buttons();
		win = 0;
		score = 0;
		wintitle.setAttribute("style", "display: none");
	}
	
	start();
	
	document.getElementsByClassName('restart')[0].onclick = function () {
		card.parentNode.removeChild(card);
		start();
	}
}