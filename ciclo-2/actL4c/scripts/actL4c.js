// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	
	confMenu (1, 0, 1, 1, 0);
	var images = $$('#images div');
	var cuadros = [0, 5];

	images[0].setStyle('left', '35px');
	images[1].setStyle('right','35px');

	var miKara = new aPlayer.karaoke ({
		audioPlayerName: 'song2dennistennis2.mp3',
		basicSounds: false,
		sincro: tiempos,
		refreshTime: 40,
		stylesWordUp: {
			color: '#0A0'
		},
		stylesWordDown: {
			color: '#210'
		}
		});

	images.each (function (image, iM){
		image.setStyles ({
			'background-position': (cuadros[iM]*(-250)).toString () + 'px top'
		});
	});
});