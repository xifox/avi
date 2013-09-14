// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	
	confMenu (1, 0, 1, 1, 0);
	
	var sonidos = new aPlayer.Base();

	var drags = $$('#sentences div');
	var drops = $$('#foods div');

	$$('#images div').each(function(img, iImg){
		img.setStyle('background-position', (-80 * iImg));
	});

	miDxD = new DxD.Text (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		multiDrop: 'infinity',
		adjDrags: ajusteDrags,
		cssClass: 'actO2a'
	});

	miDxD.addEvent('textComplete', function(ind){
		$$('#foods div p')[ind].setStyle ('color', '#0A0');
	});
	
	var initAct2 = function(){
		miDxD.drags.each (function (drag, iD){
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (200*iD);
		});
	};

	initAct2 ();
}); // end onDomReady