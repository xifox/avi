// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	confMenu (1, 0, 0, 1, 1);
	
	var sonidos = $$('#sonidos div');
	
	var speakers = new aPlayer.speakers (sonidos, {
		sounds: 2,
		prefixFile: 'red',
		adjSpeakers: [{x: 80, y: 50}, {x: 500 , y: 50}]
	});

	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops');

	drags.randomize();

	// objeto actJ2a tipo DxD.Base
	var actJ2a = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actJ2a'
	});
	
	// function initAct() de actJ2a
	var initAct2 = function () {
		actJ2a.drags.each (function (drag, iD){
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
});