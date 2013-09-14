var initAct = function () {
	reLoad ();
}

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);	
//	initSounds (5, false);

	// Variables Globales
	var drags = $$('#asignatures div');
	var drops = $$('#daystable table .emptyDay');
	var sounds = $$('#sounds div');
	
	var miSound = new aPlayer.speakers(sounds,{
		sounds: 5,
		adjSpeakers: ajusteSonidos,
		cssName: 'sound'
	});

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		textInDrop: true
	});


	miDxD.fncTrueDrop = function (drag, drop){
		if (solution[drop.Ind] == drag.Ind) return true
		else false;
	};


	miDxD.addEvent ('trueDrop', function (drag, drop) {
			drop.addClass (drag.getProperty ('class'));
			sounds[drag.Ind].remove();
	});

	// function initAct() de miDxD
	var initAct2 = function () {
		miDxD.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();
}); // end onDomReady