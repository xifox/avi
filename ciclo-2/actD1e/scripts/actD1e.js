// function initAct() de 
var initAct = function () {
	reLoad ();
};
window.onDomReady (function () {
	confMenu (1, 0, 1, 1, 0);
	
	var miKara = new aPlayer.karaoke ({
		audioPlayerName: 'sndD1e.mp3',
		basicSounds: false,
		sincro: tiempos,
		refreshTime: 40,
		stylesWordUp: {
			color: '#FF7F00'
		},
		stylesWordDown: {
			color: '#210'
		}
	});
	
}); // end onDomReady