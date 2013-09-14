function checkAct (drag,drop){

	};
// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){

	var sonidos = new aPlayer.Base ();
	
	confMenu (1, 0, 0, 1, 1);
	
	
	// Drags y Drops
	var drops = $$('#drops div');
	var drags = $$('#drags div');
	var images = $$('#images div');
	// Objeto act4a tipo DxD.Base
	var actB4a = new DxD.Text (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actB4a'
	});

	images.each(function(img,iImg) {
		img.setStyle('background-position', iImg * -150);
	});
	
	actB4a.addEvent ('textComplete', function (iL, ID) {

		if (drops[iL].getText ().contains ('Does')) {
			drops[iL].setText (drops[iL].getText() + '?');
		}
		else drops[iL].setText (drops[iL].getText() + '.');
	});
	
	// function initAct() de actB4a
	var initAct2 = function () {
		actB4a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, actB4a.options.adjDrags[iD].y],
				opacity: 1
			})}).delay (100*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();

});
