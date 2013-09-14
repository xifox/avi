// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);
	
	var sonidos = new aPlayer.Base ();

	var letterDrags = $$('#lettersDrag div');
	var letterDrops = $$('#wordDrops div span');
	
	var wordDrops = $$('#wordDrops div');
	var lblNumbers = $$('#numbers div');
	var lblNumbersS = $$('#numbersShadow div');
	
	wordDrops.each (function (drop, iD){
		drop.setStyles (adjWordDrops[iD]);
		lblNumbers [iD].setStyles ({
				left: adjWordDrops[iD].left-30,
				top: adjWordDrops[iD].top-70
			});

		lblNumbersS [iD].setStyles ({
				left: adjWordDrops[iD].left-27,
				top: adjWordDrops[iD].top-67
			});
	});
	
	

	miDxD = new DxD.Base (letterDrags, letterDrops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actJ4a',
		textInDrop: false
	});

	miDxD.fncTrueDrop = function(drag, drop){
		if (drag.getText() == drop.getText()) return true;
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
			})}).delay (150*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();

}); // end onDomReady

