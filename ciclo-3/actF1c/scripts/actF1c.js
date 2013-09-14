var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 1, 1, 0);
	
	var miKara = new aPlayer.karaoke ({
		audioPlayerName: 'verse3.mp3',
		basicSounds: false,
		sincro: tiempos,
		refreshTime: 40,
		stylesWordUp: {
			color: '#0A0'
		},
		stylesWordDown: {
			color: '#010'
		}
	});

	miKara.addEvent ('upVerse', function (verso, versoAnt){
		if ((verso.ind) != 3) $('movie').setStyle ('background-position', (verso.ind)*(-990).toString() + 'px top');
	});

}); // end onDomReady

