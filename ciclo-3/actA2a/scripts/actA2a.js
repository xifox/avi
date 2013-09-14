// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	
	confMenu (1, 0, 0, 1, 1);
	
	var sonidos = new aPlayer.Base ();
	
	// Drags y Drops
	var drops = $$('#drops div');
	var drags = $$('#drags div');
	
	ajusteDrags.randomize();

	// objeto act2a tipo DxD.Base
	var actA2a = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: true,
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actA2a'
	});

	actA2a.addEvent ('trueDrop', function (drag,drop) {
		drops[drop.Ind].addClass (actA2a.options.cssClass + '-trueDrop');
	});

	// function initAct() de actA2a
	var initAct2 = function () {

		actA2a.drags.each (function (drag, iD){
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