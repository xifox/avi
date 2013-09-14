window.onDomReady(function(){
	confMenu (1, 0, 1, 1, 0);
	
	var miKara = new aPlayer.karaoke ({
		audioPlayerName: 'days1.mp3',
		basicSounds: false,
		sincro: tiempos,
		refreshTime: 40,
		
		stylesWordUp: {
			color: '#FFF'
		},
		stylesWordDown: {
			color: '#8F8'
		},
		
		stylesVerseUp: {
			opacity: 1
		},
		stylesVerseDown: {
			opacity: 0.4
		},

		stylesStanzaDown: {
			display: 'block'
		}
	});
});

// function initAct() de coco
	var initAct = function(){
		reLoad ();
	};