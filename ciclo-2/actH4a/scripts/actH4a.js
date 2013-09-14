// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	//initSounds(0, false);
	confMenu (1, 0, 0, 1, 1);
	
	var drags = $$('#forDrag div');
	var drops = $$('#sentences');
	
	var sonidos = new aPlayer.Base ();

	miDxD = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: true,
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actH4a'
	});
	
	confINI ();
}); // end onDomReady

confINI = function () {
	miDxD.drags.each (function (drag, iD){
		drag.setStyle ('display', 'block');
		drag.setOpacity (0);
	
		(function () {drag.fxDrag.start ({
			top: [0, ajusteDrags[iD].y],
			opacity: 1
		})}).delay (150*iD);
	})
};