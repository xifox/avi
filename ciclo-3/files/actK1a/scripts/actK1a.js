
// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){
	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 0);
	
	
	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#sentences');

	// objeto actK1a tipo DxD.Text
	var actK1a = new DxD.Text (drags, drops, {
		container: $('content'),		
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass:  'actK1a',
		multiDrop: 'infinity'
	});

	// function initAct() de actK1a
	var initAct2 = function () {
		actK1a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (120*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();
});