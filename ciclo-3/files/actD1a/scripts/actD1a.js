function checkAct (drag,drop){

	} 
// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){

//	initSounds (6, 'audio/actD1a.mp3');

	confMenu (1, 0, 0, 1, 0);
	
	var sonidos = new aPlayer.rePro ({
		audioPlayerName: 'actD1a.mp3'
	});
	
	// Drags y Drops
	var drops = $$('#drops div');
	var drags = $$('#drags div');
	var capas = $$('#capas div');	
	var sounds = $$('#sounds div');

	// Objeto actD1a tipo DxD.Base
	var actD1a = new DxD.Base (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		cssClass: 'actD1a',
		dragDelete: true
		});	


// function initAct() de actD1a
	var initAct2 = function () {
		actD1a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (100*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();

	actD1a.drops.each (function (drop, iD){
		drop.addEvents ({
			over: function () {
				if (drop.indDrag ==-1) 
					capas[drop.Ind].setStyle('background-position', iD * -520);
			},
			
			leave: function () {
				if (drop.indDrag ==-1) 
					capas[drop.Ind].setStyle('background-position', '540px');			},
			emptyTrueDrop: function () {
				if (drop.indDrag ==-1) 
					capas[drop.Ind].setStyle('background-position', '540px');			},
			
			trueDrop: function () {
			}
		});
	});
	
	actD1a.fncTrueDrop = function (drag, drop) {
			if (drag.Ind == drop.Ind) return true;
			else return false;
	}
});
