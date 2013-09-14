// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
//	initSounds(0, false);
	confMenu (1, 0, 0, 1, 1);
	
	var drags = $$('#wordsDrag div');
	var drops = $$('#toDrop');
	var images = $$('#images div');
	
	var sonidos = new aPlayer.Base ();

	images.each(function(img,iImg){
		img.setStyle('background-position', iImg * -100);
	});
	
	miDxD = new DxD.Text (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		textInDrop: false,
		cssClass: 'DxD'
	});
	
	var nuevosDrops = $$('#toDrop p');
	
	miDxD.addEvent ('textComplete', function (id) {
		nuevosDrops[id].setText (nuevosDrops[id].getText() + '.');
		nuevosDrops[id].setStyle ('color', '#0A0');
	});

	// function initAct() de miDxD
	var initAct2 = function () {
		miDxD.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [600, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};

	// Llamamos inicio de Actividad
	initAct2();
});	