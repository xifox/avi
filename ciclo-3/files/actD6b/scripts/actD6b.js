// function initAct() de 
var initAct = function () {
	reLoad ();
};
function checkAct(){};

window.onDomReady(function(){


var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 1, 1, 1);
// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('.answers');
//	$$('#ansInferior') = drops.copy();
		

	 ajusteDrags.each(function (elem,iElem){
	 	elem.x += (iElem % 6 ) * 160;
		elem.y += 10; 
	 });

	 ajusteDrags.randomize ();

	// objeto actD6b tipo DxD.Base
	actD6b = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: false,
		sendToBack: 'ini',
		adjDrags:  ajusteDrags,
		cssClass: 'actD6b'
	});
	
	var renglones = $$('.answers p');
	
	actD6b.addEvent ('textComplete', function (ind){
		renglones[ind].setStyle ('color', '#00A');
	});
	
	actD6b.addEvent('trueDrop', function(drag,drop){
		var amnWords = drop.getText().split (' ').length;
		drop.setStyle ('width', amnWords*110);
	});
	
// function initAct() de actD6b
	var initAct2 = function(){
		actD6b.drags.each(function(drag, iD){
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