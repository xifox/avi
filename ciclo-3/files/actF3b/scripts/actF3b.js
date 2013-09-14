// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	var player = new aPlayer.rePro ({
		audioPlayerName: 'verse2.mp3'
		});
	confMenu (1, 0, 1, 1, 1);
	

	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#text div');
	var imgs = $$('#images div');
	
	// objeto actF3b tipo DxD.Base
	var actF3b = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		cssClass: 'actF3b'
	});
	
	actF3b.addEvent ('trueDrop', function (drag, drop) {
		imgs[actF3b.options.adjDrags[drag.Ind].x/125].setStyles({
			opacity: 1,
			'background-color': '#AFD'
		});
	});
	
	// function initAct() de actF3b
	var initAct2 = function () {
	actF3b.options.adjDrags.randomize ();

		actF3b.drags.each (function (drag, iD){
			drag.setStyles ({
				'display': 'block',
				left: actF3b.options.adjDrags[iD].x
			});

			imgs[iD].setOpacity (0.5);

			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, actF3b.options.adjDrags[iD].y],
				opacity: 1
			})}).delay (100*iD);
			
			indImg = actF3b.options.adjDrags[iD].x/125;
			imgs[indImg].setStyle ('background-position', iD*(-100));
		});
	};

	// Llamamos inicio de Actividad
	initAct2();
});