var goCrazyBloque;

window.onDomReady (function (){
	confMenu (1, 0, 0, 1, 1);
	
	var miKara = new aPlayer.karaokeFx ({
		audioPlayerName: 'abc_redun.mp3',
		basicSounds: false,
		sincro: tiempos,
		refreshTime: 50,
		wordSpace: '',
		stylesWordUp: {
			'font-size': 100,
			padding: 30,
			'border-width': 5,
			'line-height': 230
		},
		stylesWordDown: {
			'font-size': 30,
			padding: 3,
			'border-width': 1,
			'line-height': 60
		},
		timeLastWord: 20		// Delay de la ultima palabra
	});

	miKara.words.each (function (word, iW){
		colorCW = [iW *15, 90, 87].hsbToRgb();
		bgColorCW = [iW *15, 10, 100].hsbToRgb();
		bColorCW = [iW *15, 16, 100].hsbToRgb();
		
		word.setStyles ({
			color: colorCW,
			'background-color': bgColorCW,
			'border-color': bColorCW
		});
	});

	miKara.addEvent ('upWord', function (wordNode, time, dTime){
		wordNode.fx.options.transition = Fx.Transitions.Quint.easeIn;
	});

	miKara.addEvent ('downWord', function (wordNode, time, dTime){
		wordNode.fx.options.transition = Fx.Transitions.Quad.easeOut;
	});
});

var initAct = function () {
	document.location = 'actA1a.html';
};