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

	// objeto actI2a tipo DxD.Base
	var actI2a = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		cssClass: 'actI2a',
		textInDrop: true
	});
	
	actI2a.fncTrueDrop = function (drag, drop){
		if (drag.Ind == drop.Ind) return true
		else return false;
	};
	
	// function initAct() de actI2a
	var initAct2 = function () {
		actI2a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (200*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();
});