var backgrounds=['futurecity','futurecity2','futurecity3','futurecity4','futurecity5','futurecity6'];
var randn = Math.floor(Math.random() * backgrounds.length);
var background = backgrounds[randn];
document.body.background = '/img/'+background+'.jpg';
console.log('it loaded');
