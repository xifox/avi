var checkAct = function () {
	actB3a.drops.each (function (drop, iD) {
		if (!(drop.indDrag - iD)) {

			drop.setStyles ({
				opacity: 0,
				'background-position': (iD*(-180) - 720).toString() + 'px top'
			});
			drop.getParent().setStyles ({'background-position': '-500px top'});

			drop.fxDrop.start ({opacity: 1});

		}
		else {
			drop.setStyles ({opacity: 1});
			drop.fxDrop.start ({opacity: 0.2});
		};
	});
};

// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	
	confMenu (1, 0, 0, 1, 1);
	$('vosNO').setStyle ('width', 225);
	
	var sonidos = new aPlayer.Base ();

	var staticDrops = $$('#drops div');

	staticDrops.each (function (cuadro, iD){
		cuadro.setStyles ({
			left: iD*250,
			top: iD*105
		});
	});
	
	var infinity = 'infinity';
	
	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops div span');

	// objeto actB3a tipo DxD.Base
	actB3a = new DxD.Film (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		bgOffsetDrag: -180,
		bgPosDrop: 180,
		cssClass: 'actB3a',
		dragDelete: 'none'
	});
	
	// function initAct() de actB3a
	var initAct2 = function () {
		actB3a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (200*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();

	actB3a.addEvent ('dropsComplete', function () {
		confMenu (1, 1, 0, 1, 1);
	});

});
