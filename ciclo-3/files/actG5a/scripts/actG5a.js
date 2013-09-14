var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);
	
	var pictures = $$('#pictures div');
	
	pictures.each (function (picture, iP) {
		picture.setStyles ({
			'background-position': (-230)*iP.toString() + 'px top',
			opacity: 0.7
		});
	});
	
	var miKara = new aPlayer.karaoke ({
		audioPlayerName: 'inatown5.mp3',
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

	var cuadro = -1;

	// Movemos film con el cambio de las estrofas (stanza)
	miKara.addEvent ('upVerse', function (verso, versoAnt){
		cuadro = (sincro2[verso.ind] != -1) ? sincro2[verso.ind] : cuadro;

		if (cuadro != -1) pictures[cuadro].setStyles ({
			opacity: 1,
			'background-position': ((-230*7) - 230*cuadro).toString() + 'px top'
		});
	});
}); // end onDomReady