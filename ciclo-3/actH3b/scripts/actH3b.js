// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	var sonidos = new aPlayer.Base ();
	
	confMenu (1, 0, 1, 1, 0);


	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops');

	// objeto actH3b tipo DxD.Base
	var actH3b = new DxD.Text (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actH3b',
		textInDrop: false
	});
	
	// function initAct() de actH3b
	var initAct2 = function () {
		actH3b.drags.each (function (drag, iD){
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