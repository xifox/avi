// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){


	
	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 0);
	
	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops div');

	// objeto actD4a tipo DxD.Base
	var actD4a = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: true,
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops : ajusteDrops,
		cssClass: 'actD4a',
		opacity: {
			drop: 0.3,
			trueDrop: 0.8
		}
	});
	
	// function initAct() de actD4a
	var initAct2 = function () {
		actD4a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (100*iD);
		});
	};

	// Llamamos inicio de Actividad
	initAct2();
	actD4a.fncTrueDrop = function (drag, drop) {
		if (drag.Ind == drop.Ind) return true;
		else return false;
	};
});