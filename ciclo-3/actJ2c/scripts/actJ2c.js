// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){
	
			var sonidos = $$('#sonidos div');
	
	var speakers = new aPlayer.speakers (sonidos, {
		sounds: 2,
		prefixFile: 'red',
		adjSpeakers: [{x: 65, y: 0}, {x: 500 , y: 0}]
	});

	confMenu (1, 0, 1, 1, 1);

	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops');
	drags.randomize();
	// objeto actJ2c tipo DxD.Base
	var actJ2c = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actJ2c'
	});
	
	// function initAct() de actJ2c
	var initAct2 = function () {
		actJ2c.drags.each (function (drag, iD){
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