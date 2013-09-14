// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);
	var sonidos = new aPlayer.Base ();

	var drags = $$('#textsDrag div');
	var drops = $$('#toDrop div');
	var imags = $$('#images div');

	imags.each(function(img, iImg){
		img.setStyle('background-position', iImg * -150);
	});

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: true,
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actK2a'
	});

	miDxD.fncTrueDrop = function(drag, drop) {
		if (solution[drop.Ind] == drag.Ind) return true;
		else false;
	};

	miDxD.addEvent('trueDrop', function(drag, drop){
		drop.setText(drag.getText());
	});
	
	// function initAct() de miDxD
	var initAct2 = function () {
		miDxD.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (180*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();
	
}); // end onDomReady
