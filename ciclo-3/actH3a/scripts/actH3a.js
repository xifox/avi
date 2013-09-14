// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	var sonidos = new aPlayer.Base (); 


	confMenu (1, 0, 0, 1, 1);
	
	
	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops');




	var ajusteDrags = new Array (9);

	// objeto actH3a tipo DxD.Base
	var actH3a = new DxD.Text (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		cssClass: 'actH3a',
		textInDrop: false
	});

	var txtAns = $$('#drops p span span');
	
	actH3a.addEvent ('trueDrop', function (drag, drop){
		console.log (drag, drop);
		drop.setStyle ('display', 'inline');
	});
	
	txtAns.each (function (el, iE) {
		console.log (el.getParent());
		//el.getParent().setStyle ('display', 'inline');
		//el.setStyle ('display', 'inline');
	});


	// function initAct() de actH3a
	var initAct2 = function () {
		actH3a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [200, actH3a.options.adjDrags[iD].y],
				opacity: 1
			})}).delay (200*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();

});