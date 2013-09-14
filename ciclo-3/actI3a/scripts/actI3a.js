// function initAct() de actI3a
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){

	var sonidos = new aPlayer.Base ();
	
	confMenu (1, 0, 0, 1, 0);

// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#calendar div');

	// objeto actI3a tipo DxD.Base
	var actI3a = new DxD.Film (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		bgOffsetDrag: false,
		bgPosDrop: 133,
//		bgOffsetDrop: -133,
		offsetInOver: -133,
		cssClass: 'actI3a'
	});

// function initAct() de actI3a
	var initAct2 = function () {
		actI3a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [500, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (60*iD);
		});
	};

	// Llamamos inicio de Actividad
	initAct2();


	actI3a.fncTrueDrop = function (drag, drop) {
		if (drag.Ind == drop.Ind) return true;
		else return false;
	};

	actI3a.addEvent ('trueDrop', function (drag, drop) {
		drop.setStyle ('background-position', (drop.Ind*(-133).toString()+ 'px top'));
		drop.setText (drag.getText());
	});
});