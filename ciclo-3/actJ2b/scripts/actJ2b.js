// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	confMenu (1, 0, 1, 1, 1);
	
		var sonidos = $$('#sonidos div');
	
	var speakers = new aPlayer.speakers (sonidos, {
		sounds: 2,
		prefixFile: 'red',
		adjSpeakers: [{x: 60, y: 50}, {x: 550 , y: 50}]
	});

	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops');

	drags.randomize();

	// objeto actJ2b tipo DxD.Base
	var actJ2b = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actJ2b'
	});
	
	// function initAct() de actJ2b
	var initAct2 = function () {
		actJ2b.drags.each (function (drag, iD){
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
})