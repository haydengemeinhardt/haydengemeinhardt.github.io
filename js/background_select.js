window.onload = () => {
	var backgrounds=['futurecity','futurecity2','futurecity3'];
	var randn = Math.floor(Math.random() * backgrounds.length);
	var background = backgrounds[randn];
	document.body.backgroundImage = '/img/'+background+'.jpg';
}
