// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	var images = $$('#images div');
	confMenu (1, 0, 1, 1, 1);
	
	var miKara = new aPlayer.karaoke ({
		audioPlayerName: 'song2mikebike.mp3',
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
			'background-position': ((iM + 2)*(-250)).toString () + 'px top'
		});
	});
});