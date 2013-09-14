// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady (function () {
	
	confMenu (1, 0, 0, 1, 0);
	
	var sonidos = new aPlayer.Base();

	var drags = $$('#sentences div');
	var drops = $$('#images div');
	var textDrops = $$('#images div span');

	$$('#images div').each(function(img, iImg){
		img.setStyle('background-position', (iImg * -240).toString() + 'px top');
		textDrops[iImg].setOpacity (0.6);
	});

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		textInDrop: false,
		cssClass: 'actN2a'
	});

	miDxD.fncTrueDrop = function(drag, drop) {
		if (drop.Ind == drag.Ind) return true;
		else false;
	};

	miDxD.addEvent('trueDrop', function(drag, drop){
		textDrops[drop.Ind].setText (drag.getText ());
		textDrops[drop.Ind].setOpacity (1);
		drop.setOpacity (1);
	});

	initAct2 = function () {
		miDxD.reset();
		textDrops.each (function(txtDrop){
			txtDrop.setText('');
		});
		miDxD.drags.each (function (drag, iD){
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

}); // end onDomReady