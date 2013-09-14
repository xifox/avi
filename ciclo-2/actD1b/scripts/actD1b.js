var initAct = function () {
	reLoad ();
}

window.onDomReady (function () {
	confMenu (1, 0, 1, 1, 0);

	var miKara = new aPlayer.karaoke ({
		audioPlayerName: 'sndD1b.mp3',
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

//	miKara.stanzas[0].setStyles (miKara.options.stylesStanzaDown);

	var film = $('film');
	var fxFilm = new Fx.Style(film, 'left', {duration: 400});

	// Movemos film con el cambio de las estrofas (stanza)
	miKara.addEvent ('upStanza', function (stanza, stanzaAnt){
		fxFilm.start((stanzaAnt) ? stanzaAnt.ind *(-400) : 0, (stanza.ind)* (-400));
	});
}); // end onDomReady