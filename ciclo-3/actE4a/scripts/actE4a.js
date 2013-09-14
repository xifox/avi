// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 1);

	
	var pictures = $$('#pictures div');
	
	pictures.each (function (picture, iP) {
		picture.setStyle ('background-position', (-150)*imgs[iP].toString () + 'px top');
	});

	// Drags y Drops
	var drops = $$('#drops div');
	var drags = $$('#drags div');

	// objeto act4a tipo DxD.Base
	var actE4a = new DxD.Text (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actE4a',
		multiDrop: 'infinity'
	});
	
	var answers=$$('#drops div p span span');
	
	actE4a.addEvent('trueDrop', function(drag,drop){
		
		answers[drop.Ind].setStyle('width', answers[drop.Ind].getStyle('width').toInt() - 70);
	});
	
	// function initAct() de actE4a
	var initAct2 = function () {

		actE4a.drags.each (function (drag, iD){
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