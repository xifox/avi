// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
//	initSounds(0, 'audio/seasons1.mp3');
	confMenu (1, 0, 0, 1, 0);

	var drags = $$('#seasons div');
	var drops = $$('#sentences div');
	var images = $$('#images div');
	
	images.each(function(image, index){
		image.setStyle('background-position', -105 * index);
	});
	
	var sonidos = new aPlayer.rePro ({
		audioPlayerName: 'seasons1.mp3'
	});

	miDxD = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: true,
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actH2a'
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
		
	});

};

