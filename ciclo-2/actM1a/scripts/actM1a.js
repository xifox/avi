// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	//initSounds(0, false);
	confMenu (1, 0, 0, 1, 0);
	
	var drags = $$('#sentences div');
	var drops = $$('#quest');
	
	var sonidos = new aPlayer.Base ();
	
	miDxD = new DxD.Text (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		cssClass: 'DxD',
		adjDrags: ajusteDrags
	});

	initAct2 = function () {
		miDxD.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [50, ajusteDrags[iD].y],
				left: [0, ajusteDrags[iD].x],
				opacity: 1
			})}).delay (50*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();
});