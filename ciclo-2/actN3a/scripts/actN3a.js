// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady (function () {
	var mySounds = new aPlayer.Base();
	confMenu (1, 0, 0, 1, 0);
	

	// Drags y Drops
	var drops = $$('#drops');
	var lines = $$('#drops p');
	var drags = $$('#drags div');

	ajusteDrags.randomize ();

	// objeto actN3a tipo DxD.Base
	var actN3a = new DxD.Text (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actN3a'
	});

	lines.each (function (linea, iL) {
		if (!(iL%2)) linea.setStyle ('color', '#05F')
	});

	actN3a.addEvent ('textComplete', function (iL) {
		if (!(iL%2)) lines[iL].setStyle ('color', '#A02');
		else lines[iL].setStyle ('color', '#2B2');
	});
	
	// function initAct() de actN3a
	var initAct2 = function () {
		
		actN3a.drags.each (function (drag, iD){
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




	

