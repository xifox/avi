// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	var player = new aPlayer.rePro ({
		audioPlayerName: 'verse1.mp3'
	});
	confMenu (1, 0, 0, 1, 1);
	

	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#text div');
	var imgs = $$('#images div');
	
	// objeto actF3a tipo DxD.Base
	var actF3a = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		cssClass: 'actF3a'
	});
	
	actF3a.addEvent ('trueDrop', function (drag, drop) {
		imgs[actF3a.options.adjDrags[drag.Ind].x/125].setStyles({
			opacity: 1,
			'background-color': '#AFD'
		});
	});
	
	// function initAct() de actF3a
	var initAct2 = function () {
	actF3a.options.adjDrags.randomize ();

		actF3a.drags.each (function (drag, iD){
			drag.setStyles ({
				'display': 'block',
				left: actF3a.options.adjDrags[iD].x
			});
			
			imgs[iD].setOpacity (0.5);
			
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, actF3a.options.adjDrags[iD].y],
				opacity: 1
			})}).delay (100*iD);
			
			indImg = actF3a.options.adjDrags[iD].x/125;
			imgs[indImg].setStyle ('background-position', iD*(-100));
		});
	};

	// Llamamos inicio de Actividad
	initAct2();
});