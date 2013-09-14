// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	var player = new aPlayer.rePro ({
		audioPlayerName:'verse3.mp3'
	});
	
	confMenu (1, 0, 1, 1, 0);
	

	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#text div');
	var imgs = $$('#images div');
	
	// objeto actF3c tipo DxD.Base
	var actF3c = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		cssClass: 'actF3c'
	});
	
	actF3c.addEvent ('trueDrop', function (drag, drop) {
		imgs[actF3c.options.adjDrags[drag.Ind].x/125].setStyles({
			opacity: 1,
			'background-color': '#AFD'
		});
	});
	
	// function initAct() de actF3c
	var initAct2 = function () {
	actF3c.options.adjDrags.randomize ();

		actF3c.drags.each (function (drag, iD){
			drag.setStyles ({
				'display': 'block',
				left: actF3c.options.adjDrags[iD].x
			});

			imgs[iD].setOpacity (0.5);

			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, actF3c.options.adjDrags[iD].y],
				opacity: 1
			})}).delay (100*iD);
			
			indImg = actF3c.options.adjDrags[iD].x/125;
			imgs[indImg].setStyle ('background-position', iD*(-100));
		});
	};

	// Llamamos inicio de Actividad
	initAct2();
});