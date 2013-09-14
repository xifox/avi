// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){
	
	var sonidos = new aPlayer.Base ();

	confMenu (1, 0, 1, 1, 0);

// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops div');
	
	var actL2c = new DxD.Film (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		dragDelete:'none',
		adjDrags: ajusteDrags,
		cssClass: 'actL2c',
		bgPosDrop:150,
		bgOffsetDrag: -150
	});
	
	
	actL2c.fncTrueDrop = function (drag, drop) {
		if (drag.Ind == drop.Ind) return true
		else return false;
		};
		
	// function initAct() de actL2c
	var initAct2 = function () {
		actL2c.drags.each (function (drag, iD){
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
});