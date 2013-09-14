// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){
	var images = $$('#images div');
	confMenu (1, 0, 0, 1, 1);
	var images= $$('#images div');

	images[0].setStyle('left', '35px');
	images[1].setStyle('right','35px');

	var miKara = new aPlayer.karaoke ({
		audioPlayerName: 'song2dennistennis.mp3',
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
			'background-position': (iM*(-250)).toString () + 'px top'
		});
	});
});