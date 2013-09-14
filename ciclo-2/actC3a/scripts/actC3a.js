var initAct = function () {
	reLoad ();
}


window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);		
	var sonidos = new aPlayer.Base ();

	// Variables Globales
	var drags = $$('#asignatures div');
	var drops = $$('#daystable tbody td');

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags
	});

	miDxD.addEvent ('trueDrop', function (drag, drop) {
		drop.addClass (drag.getProperty ('class'));
		
	});
	
	// function initAct() de miDxD
	var initAct = function () {
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
	initAct();
}); // end onDomReady
