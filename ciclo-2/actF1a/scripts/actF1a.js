// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){

	confMenu (1, 0, 0, 1, 1);
	
	var miKara = new aPlayer.karaoke ({
		audioPlayerName: 'songverse1.mp3',
		basicSounds: false,
		sincro: tiempos,
		refreshTime: 40,
		stylesWordUp: {
			color: '#0A0'
		},
		stylesWordDown: {
			color: '#010'
		},

		stylesStanzaUp: {
			opacity: 1
		},

		stylesStanzaDown: {
			display: 'block',
			opacity: 0.3
		}
	});

	miKara.stanzas[0].setStyles (miKara.options.stylesStanzaDown);
});
