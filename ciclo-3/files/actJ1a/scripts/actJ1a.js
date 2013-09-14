// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){

	confMenu (1, 0, 0, 1, 0);
	
	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops');
	var sounds = $$('#sounds div');

	var ajusteSnds = new Array (3);
	sounds.each (function (sound, iS) {
		ajusteSnds[iS] = {
			x: 420 + (iS * 100),
			y: 0
		}
	})


	var sonidos = new aPlayer.speakers (sounds, {
		sounds: 3,
		basicSounds: true,
		adjSpeakers: ajusteSnds
	});
	
	
	// Generamos array adjDrags en forma semiCircular
	
	var opciones = {
		width: 750,
		height: 350,
		left: 440,
		top: 380,
		alphaIni: -110,
		alphaFin: 130
	};
	
	ajusteDrags = new Array (12);
	ajusteDrags.setCircular (opciones);
	
	ajusteDrags.randomize ();

	// objeto ActJ1a tipo DxD.Base
	var ActJ1a = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actJ1a',
		enableSnds: [0, 0, 0, 0, 1, 0]
	});


	ActJ1a.addEvent ('trueDrop', function (drag, drop){
		if (drop.getParent().getText() == ' ') $('image').setStyle ('background-position', '-550px top');
	});

	// function initAct() de ActJ1a
	var initAct2 = function () {
		ActJ1a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				left: [425, ajusteDrags[iD].x],
				top: [350, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (100*iD);
		});
	};

	
	
	// Llamamos inicio de Actividad
	initAct2();

});