// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
//	initSounds(4, false);
	confMenu (1, 0, 0, 1, 0);
	
	var drags = $$('#images div');
	var drops = $$('#toDrop div');
	var texts = $$('#texts div');

	var sonidos = new aPlayer.speakers (drops, {
		sounds: 4
	});

	
	texts.each(function(text, iText){
		text.setStyles(ajusteTexts[iText]);
	});

	miDxD = new DxD.Film (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		bgOffsetDrag: -105,
		bgPosDrop: -525,
		cssClass: 'actH3a'
	});

	miDxD.fncTrueDrop = function (drag, drop){
		if (solution[drag.Ind] == drop.Ind) return true;
		else return false;
	};

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

