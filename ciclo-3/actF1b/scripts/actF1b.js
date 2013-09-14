var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 1, 1, 1);
	
	var miKara = new aPlayer.karaoke ({
		audioPlayerName: 'verse2.mp3',
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
		$('movie').setStyle ('background-position', (verso.ind)*(-990).toString() + 'px top');
	});

}); // end onDomReady

