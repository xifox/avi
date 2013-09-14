// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);

	var sonidos = new aPlayer.Base ();	

	var drags = $$('#wordsDrag div');
	var drops = $$('#staticPharses div');
	var images = $$('#images div');
	

	images.each(function(image, iImage){
		image.setStyle('background-position', iImage * (-90));
	});

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		textInDrop: false,
		cssClass: 'actK1a'
	});

	miDxD.addEvent('trueDrop', function(drag, drop){
		var tempoStr;
		if (drop.Ind != 2) tempoStr = drop.getText().substr (0, drop.getText().length - 3) + drag.getText () + '.';
		else tempoStr = drop.getText().substr (0, drop.getText().length - 4) + drag.getText () + '?';

		drop.setText (tempoStr);
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