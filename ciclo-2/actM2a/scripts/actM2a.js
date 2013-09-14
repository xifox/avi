// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);
	
	var sonidos = new aPlayer.Base ();
	
	var drags = $$('#adjectives div');
	var drops = $$('#images div');
	var textDrops = $$('#images div span');

	$$('#images div').each(function(img, iImg){
		img.setStyle('background-position', (-170 * iImg).toString () + 'px top');
	});


	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		textInDrop: false,
		cssClass: 'actM2a'
	});

	miDxD.fncTrueDrop = function(drag, drop) {
		if (solution[drag.Ind] == drop.Ind) return true;
		else return false;
	};

	miDxD.addEvent('trueDrop', function(drag, drop){
		textDrops[drop.Ind].setText (textDrops[drop.Ind].getText() + ' ' + drag.getText () + '.');
	});

// function initAct() de miDxD
	initAct2 = function () {
		textDrops.each (function(txtDrop, iT){
			txtDrop.setText(textD[iT]);
		});
		miDxD.reset();
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
