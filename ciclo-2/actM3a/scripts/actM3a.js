var initAct;

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);
	
	var sonidos = new aPlayer.Base ();

	var drags = $$('#textsDrag div');
	var drops = $$('#images div');
	var textDrops = $$('#images div span');

	$$('#images div').each(function(img, iImg){
		img.setStyle('background-position', (iImg * -200).toString () + 'px top');
	});

	drags[2].setHTML ('<br >' + drags[2].getText());
	drags[3].setHTML ('<br >' + drags[3].getText());
	

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		textInDrop: false,
		cssClass: 'actM3a'
	});

	miDxD.fncTrueDrop = function(drag, drop) {
		if (solution[drag.Ind] == drop.Ind) return true;
		else false;
	};

	miDxD.addEvent('trueDrop', function(drag, drop){
		textDrops[drop.Ind].setText (drag.getText ());
		drop.setOpacity (1);
	});

// function initAct() de miDxD
	initAct = function () {
		textDrops.each(function(txtDrop){
			txtDrop.setText('');
		});
		miDxD.reset();
		miDxD.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [530, ajusteDrags[iD].y],
				left: [500, ajusteDrags[iD].x],
				opacity: 1
			})}).delay (200*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct();

}); // end onDomReady
