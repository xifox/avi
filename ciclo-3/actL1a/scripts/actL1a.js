// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	confMenu (1, 0, 0, 1, 0);

	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops div span');

	// objeto actL1a tipo DxD.Base
	var actL1a = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actL1a',
		opacity: {drop: 0.5}
	});

	$$('#drops div').each(function(image,iImg) {
		image.setStyle('background-position', iImg * -230);
	});

	actL1a.fncTrueDrop = function (drag, drop) {
		if (drag.Ind == ans[drop.Ind]) return true;
	};

// function initAct() de actL1a
	var initAct2 = function () {
		actL1a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (120*iD);
		});
	};

	// Llamamos inicio de Actividad
	initAct2();
});