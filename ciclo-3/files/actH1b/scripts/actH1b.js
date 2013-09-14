// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){
	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 1, 1, 0);

	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops div span');

	// objeto actH1b tipo DxD.Base
	var actH1b = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actH1b',
		opacity: {drop: 0.5, trueDrop: .8}
	});

	$$('#largeWord2').setStyles({'font-size': '14pt'});
	$$('#largeWord').setStyles({'font-size': '12pt'});

	$$('#drops div').each(function(image,iImg) {
		image.setStyle('background-position', iImg * -230);
	});

	actH1b.fncTrueDrop = function (drag, drop) {
		if (drag.Ind == ans[drop.Ind]) return true;
	};

// function initAct() de actH1b
	var initAct2 = function () {
		actH1b.drags.each (function (drag, iD){
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
