var size = 9;
grid = document.getElementById("grid");

//generateGrid();

function generateGrid(){
//	grid.innerHTML = "";
	for(var i = 0; i<size; i++)
		var tr = document.createElement("tr")
		for(var j=0; j<size; j++)
			var td = document.createElement("td"); 
			var btn = document.createElement("button");
			td.appendChild(btn);
			tr.appendChild(td);
}