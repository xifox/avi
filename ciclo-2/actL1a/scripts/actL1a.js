// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);
	
	var sonidos = new aPlayer.Base ();

	var drags = $$('#images div');
	var drops = $$('#toDrops div');

	miDxD = new DxD.Film (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		bgOffsetDrag: -120,
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		bgPosDrop: -720,
		textInDrop: false,
		cssClass: 'actL1a'
	});

	miDxD.fncTrueDrop = function(drag, drop) {
		if (solution[drag.Ind] == drop.Ind) return true;
		else false;
	};

	var confINI = function () {
		miDxD.drags.each (function (drag, iD){

			drag.setStyle ('display', 'block');
			drag.setOpacity (0);

			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};
	
	confINI ();
}); // end onDomReady

