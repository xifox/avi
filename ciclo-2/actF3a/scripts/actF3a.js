// function initAct() de 
var initAct = function () {
	reLoad ();
};
window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 1);

	var sonidos = new aPlayer.Base ();

	// Variables Globales
	var drags = $$('#wordsDrag div');
	var drops = $$('#texts1 span', '#texts2 span');
	var images = $$('#images div');

	images.each(function(image, index) {
		image.setStyle('background-position', 150 * index);
	});

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: true,
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		textInDrop: false,
		cssClass: 'actF3a',
		opacity: {
			overDrop: 0
		}
	});

	confINI ();

	miDxD.fncTrueDrop = function (drag, drop){
		if (solution[drop.Ind] == drag.Ind) return true;
		else false;
	};
}); // end onDomReady


confINI = function () {
		miDxD.drags.each (function (drag, iD){
		drag.setStyle ('display', 'block');
		drag.setOpacity (0);

		(function () {drag.fxDrag.start ({
			top: [0, ajusteDrags[iD].y],
			opacity: 1
		})}).delay (150*iD);
	});
};
