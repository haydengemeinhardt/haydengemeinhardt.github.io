function input(ele){
	if(event.key == "Enter"){startMinesweeper();};
}

function startMinesweeper()
{
	grid.innerHTML = "";
	wintitle.innerHTML = "";
	
	var size = parseInt(document.getElementById("gridsize").value);
	if(size>50){size=50;}
	var flagcount = 0;
	var minecount = parseInt(document.getElementById("minecount").value);
	if(minecount>(size*size)){minecount=(size*size);}
	var minesleft = minecount;
	var i = 0;
	var j=0;
	var arr = [];
	var garr = [];
	var width = 30*(size+2);
	var loss = 0;

	var initializearray = function(){
		for (var i=0; i< size+2; i++) { 
			for (var j=0; j<size+2; j++) { 
				if (!garr[i]) garr[i] = []
				garr[i][j] = 0; 
			} 
		} 
	}

	var generateGrid = function(){
		var grid = document.getElementById("grid");
		grid.style.width = width+"px"
		grid.style.height = width+"px"
		//create table rows
		for(i = 0; i<size+2; i++)
		{
			var tr = document.createElement("tr");
			grid.appendChild(tr);
			//create cells for each row
			for(j=0; j<size+2; j++)
			{
				var btn = document.createElement("button"); //button for the data
				var t = document.createTextNode(garr[i][j]);//info in the cell
				if(i==0 || i==size+1 || j==0 || j==size+1){
					btn.id="clicked";
					btn.setAttribute("style", "cursor: default; background-color: transparent; color: transparent; border: transparent;");}
				else{btn.id="cell";}
				btn.value = [i,j];
				var mcheck = document.createElement("onoff");
				mcheck.value="0";
				btn.appendChild(t); 
				btn.appendChild(mcheck);				
				tr.appendChild(btn);
				btn.onclick = function(){clicked(this);};
			}
		}
	}
	
	
	//Thanks to this beauty https://stackoverflow.com/questions/19543514/check-whether-an-array-exists-in-an-array-of-arrays
	//Returns an unoccupied space in a 2d array so mines don't overlap
	var findSpot = function(){
		temp = [Math.floor(Math.random()*size+1),Math.floor(Math.random()*size+1)];
		tarr = JSON.stringify(arr);
		temp = JSON.stringify(temp);
		var c = tarr.indexOf(temp);
		if(c != -1){
			return findSpot();
		}
		else{
			return temp;
		}
	}
	
	//set mines in 2d array
	var assignMines = function(){
		for(var x=0; x<minecount; x++)
		{
			mine = findSpot();
			arr.push(mine);
		}
	}
	
	
	var checkCell = function(x,y){
		cnt=0;
		tarr = JSON.stringify(arr);
		temp = JSON.stringify([x,y]);
		var c = tarr.indexOf(temp);
		if(c != -1){
			cnt++;
		}
		return cnt;
	}
	
	var checkAround = function(x,y) {
		count=0;
		count+= checkCell(x,y-1);
		count+= checkCell(x,y+1);
		count+= checkCell(x+1,y-1);
		count+= checkCell(x+1,y);
		count+= checkCell(x+1,y+1);
		count+= checkCell(x-1,y+1);
		count+= checkCell(x-1,y);
		count+= checkCell(x-1,y-1);
		return count;
	}
	
	var assignNumbers = function(){
		for(var x=0; x<size+2; x++)
		{
			for(var y=0; y<size+2; y++)
			{
				if(checkCell(x,y) > 0)
					garr[x][y]=99;
				else
					garr[x][y] = checkAround(x,y);
			}
		}
	}
	
	var reveal = function(btn, row, col){
		var res = btn.value.split(",");
		color(btn);
		row = res[0];
		col = res[1];
		btn.id="clicked";
		if(btn.parentNode.childNodes[col-1].childNodes[0].nodeValue == 0 && btn.parentNode.childNodes[col-1].getAttribute('id') != "clicked"){ //left is zero
			reveal(btn.parentNode.childNodes[col-1], row, col-1);
		}
		if(btn.parentNode.parentNode.childNodes[row-1].childNodes[col-1].childNodes[0].nodeValue == 0 && btn.parentNode.parentNode.childNodes[row-1].childNodes[col-1].getAttribute('id') != "clicked"){ //left above is zero
			reveal(btn.parentNode.parentNode.childNodes[row-1].childNodes[col-1], row-1, col-1)
		}
		if(btn.parentNode.parentNode.childNodes[row-1].childNodes[col].childNodes[0].nodeValue == 0 && btn.parentNode.parentNode.childNodes[row-1].childNodes[col].getAttribute('id') != "clicked"){ //above is zero
			reveal(btn.parentNode.parentNode.childNodes[row-1].childNodes[col], row-1, col);
		}
		if(btn.parentNode.parentNode.childNodes[row-1].childNodes[parseInt(col)+1].childNodes[0].nodeValue == 0 && btn.parentNode.parentNode.childNodes[row-1].childNodes[parseInt(col)+1].getAttribute('id') != "clicked"){ //right above is zero
			reveal(btn.parentNode.parentNode.childNodes[row-1].childNodes[parseInt(col)+1], row-1, parseInt(col)+1);
		}
		if(btn.parentNode.childNodes[parseInt(col)+1].childNodes[0].nodeValue == 0 && btn.parentNode.childNodes[parseInt(col)+1].getAttribute('id') != "clicked"){ //right is zero
			reveal(btn.parentNode.childNodes[parseInt(col)+1], row, parseInt(col)+1);
		}
		if(btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[parseInt(col)+1].childNodes[0].nodeValue == 0 && btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[parseInt(col)+1].getAttribute('id') != "clicked"){ //right below is zero
			reveal(btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[parseInt(col)+1], parseInt(row)+1, parseInt(col)+1);
		}
		if(btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[col].childNodes[0].nodeValue == 0 && btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[col].getAttribute('id') != "clicked"){ //below is zero
			reveal(btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[col], parseInt(row)+1, col)
		}
		if(btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[parseInt(col)-1].childNodes[0].nodeValue == 0 && btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[parseInt(col)-1].getAttribute('id') != "clicked"){ //left below is zero
			reveal(btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[parseInt(col)-1], parseInt(row)+1, parseInt(col)-1);
		}
		revealAround(btn, row, col);
		return;
	}
	
	
	var revealAround = function(btn, row, col){
		btn.id="clicked"; //current
		btn.parentNode.parentNode.childNodes[row-1].childNodes[col].id="clicked"; //current above
		color(btn.parentNode.parentNode.childNodes[row-1].childNodes[col]);
		btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[col].id="clicked"; //current below
		color(btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[col]);
		btn.parentNode.parentNode.childNodes[row].childNodes[parseInt(col)+1].id="clicked"; //left
		color(btn.parentNode.parentNode.childNodes[row].childNodes[parseInt(col)+1]);
		btn.parentNode.parentNode.childNodes[row-1].childNodes[parseInt(col)+1].id="clicked"; //left above
		color(btn.parentNode.parentNode.childNodes[row-1].childNodes[parseInt(col)+1]);
		btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[parseInt(col)+1].id="clicked"; //left below
		color(btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[parseInt(col)+1]);
		btn.parentNode.parentNode.childNodes[row].childNodes[col-1].id="clicked"; //right
		color(btn.parentNode.parentNode.childNodes[row].childNodes[col-1]);
		btn.parentNode.parentNode.childNodes[row-1].childNodes[col-1].id="clicked"; //right above
		color(btn.parentNode.parentNode.childNodes[row-1].childNodes[col-1]);
		btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[col-1].id="clicked"; //right below
		color(btn.parentNode.parentNode.childNodes[parseInt(row)+1].childNodes[col-1]);
		return;
	}
	
	var removeFlag = function(btn){
		btn.innerHTML = btn.innerHTML.substr(50);
		btn.childNodes[1].value = 0;
//		if(btn.childNodes[0].nodeValue == 99){minesleft+=1;}
		flagcount-=1
	}
	
	var color = function(btn){
		var res = btn.value.split(",");
		if(btn.children.length == 2){removeFlag(btn);}
		i = res[0];
		j = res[1];
		if(i!=0 && i!=size+1 && j!=0 && j!=size+1){
			value = btn.childNodes[0].nodeValue
			if(value == 0){btn.setAttribute("style","color:white;")}
			else if (value == 1){btn.setAttribute("style","color:blue;")}
			else if (value == 2){btn.setAttribute("style","color:green;")}
			else if (value == 3){btn.setAttribute("style","color:red;")}
			else if (value == 4){btn.setAttribute("style","color:purple;")}
			else if (value == 5){btn.setAttribute("style","color:maroon;")}
			else if (value == 6){btn.setAttribute("style","color:turqoise;")}
			else if (value == 7){btn.setAttribute("style","color:black;")}
			else if (value == 8){btn.setAttribute("style","color:gray;")}
		}
	}
	
	var clicked = function(btn){
		var res = btn.value.split(",");
		row = res[0];
		col = res[1];
		if (event.shiftKey && btn.id !="clicked"){//to set flag
			if(btn.childNodes[1].value == 0) //no flag
			{
				btn.innerHTML = '<img src="/img/games/flag.png" width="20" height="20"/>' + btn.innerHTML;
				btn.childNodes[2].value = 1;
				if(btn.childNodes[1].nodeValue == 99){minesleft-=1;}
				flagcount+=1;
				if(minesleft==0 && flagcount==minecount && loss==0){wintitle.innerHTML="YOU WIN!";}
			}
			else{ //flag
				btn.innerHTML = btn.innerHTML.substr(50);
				btn.childNodes[1].value = 0;
				if(btn.childNodes[0].nodeValue == 99){minesleft+=1;}
				flagcount-=1
			}
		}
		else if(btn.children.length < 2 && btn.id !="clicked"){//can only click if no flag
			color(btn);
			if (btn.childNodes[0].nodeValue == 99){//if mine
				btn.setAttribute("style", "background-color: red; color: transparent;");
				wintitle.innerHTML = "KABLAMO!";
				loss=1;
			}
			else if (btn.childNodes[0].nodeValue == 0){//empty space
				btn.id="clicked";
				reveal(btn);
			}
			else{btn.id="clicked";}
		}
	}
	
	console.log("hi");
	wintitle = document.getElementById('wintitle');
	initializearray();
	assignMines();
	assignNumbers();
	generateGrid();
	
	document.getElementById('restart').onclick = function () {
		grid.innerHTML = "";
		wintitle.innerHTML = "";
		startMinesweeper();
	}
}
