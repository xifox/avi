// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
//	initSounds(0, false);
	confMenu (1, 0, 1, 1, 0);
	
	var drags = $$('#wordsDrag div');
	var drops = $$('#toDrop div');
	var images = $$('#images div');

	images.each(function(img,iImg){
		img.setStyle('background-position', (iImg +3) * -100);
	});
	
	var sonidos = new aPlayer.Base ();
	
	miDxD = new DxD.Text (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		multiDrop: 'infinity',
		cssClass: 'drop',
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