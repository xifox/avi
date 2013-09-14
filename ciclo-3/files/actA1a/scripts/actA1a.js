// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	var player = new aPlayer.rePro ({
		audioPlayerName: 'clothes.mp3'
		});
		
	confMenu (1, 0, 0, 1, 1);
	
	// Drags y Drops
	var drops = $$('#drops');
	var lines = $$('#drops p');
	var drags = $$('#drags div');

	ajusteDrags.randomize ();

	// objeto actA1a tipo DxD.Base
	var actA1a = new DxD.Text (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actA1a'
	});
	
	
	lines.each (function (linea, iL) {
		if ((iL%2)) linea.setStyle ('color', '#05F');
	});
	
	actA1a.addEvent ('textComplete', function (iL) {
		if (!(iL%2)) lines[iL].setStyle ('color', '#2B2');
		else lines[iL].setStyle ('color', '#A02');
	});
	
	// function initAct() de actA1a
	var initAct2 = function () {
		
		actA1a.drags.each (function (drag, iD){
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
});
