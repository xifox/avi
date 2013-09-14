// function initAct() de actE5a
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 1);

	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops div');
	var lines = $$('#drops p');
	var images = $$('#imagesDo div');

	images.each(function(image, iImg){
		image.setStyles({
			'width': ajusteImages[iImg][0],
			'height': ajusteImages[iImg][1],
			'background-position': ajusteImages[iImg][2]
		});
	});

	// objeto actE5a tipo DxD.Base
	var actE5a = new DxD.Text (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actE5a'
	});
	
	lines.each (function (linea, iL) {
		if ((iL%2)) linea.setStyle ('color', '#05F');
	});
	
	actE5a.addEvent ('textComplete', function (iL) {
		if (!(iL%2)) lines[iL].setStyle ('color', '#2B2');
		else lines[iL].setStyle ('color', '#A02');
	});
	
	// function initAct() de actE5a
	var initAct2 = function () {
		
		actE5a.drags.each (function (drag, iD){
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
});