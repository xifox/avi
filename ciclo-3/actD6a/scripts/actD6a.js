// function initAct() de 
var initAct = function () {
	reLoad ();
};
function checkAct(){};

window.onDomReady(function(){


var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 1);
// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('.answers');
//	$$('#ansInferior') = drops.copy();
		

	 ajusteDrags.each(function (elem,iElem){
	 	elem.x += (iElem % 6 ) * 160;
		elem.y += 10; 
	 });

	 ajusteDrags.randomize ();

	// objeto act6Da tipo DxD.Base
	actD6a = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: false,
		sendToBack: 'ini',
		adjDrags:  ajusteDrags,
		cssClass: 'actD6a'
	});
	
	var renglones = $$('.answers p');
	
	actD6a.addEvent ('textComplete', function (ind){
		renglones[ind].setStyle ('color', '#00A');
	});
	
	actD6a.addEvent('trueDrop', function(drag,drop){
		var amnWords = drop.getText().split (' ').length;
		drop.setStyle ('width', amnWords*110);
	});
	
// function initAct() de actD6a
	var initAct2 = function(){
		actD6a.drags.each(function(drag, iD){
			drag.setStyle('display', 'block');
			drag.setOpacity(0);
			(function(){
				drag.fxDrag.start({
					top: [0, ajusteDrags[iD].y],
					opacity: 1
				})
			}).delay(100 * iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();
});