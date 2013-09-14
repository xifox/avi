// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 0);
	

	// Drags y Drops
	var drags = $$('#town div');
	var drops = $$('#drops div');
	var layersTown = $$('#desk-film div');

	// objeto actG1a tipo DxD.Base
	var actG1a = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		cssClass: 'actG1a'
	});
	
	
	// function initAct() de actG1a
	var initAct2 = function () {
		actG1a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (250*iD);
		});
	};
	
	
	actG1a.fncTrueDrop = function (drag, drop) {
		if (drag.Ind == drop.Ind) return true;
		else return false;
	};
	
	
	actG1a.addEvent ('trueDrop', function (drag, drop){
		layersTown[drop.Ind].setStyles ({
			'background-position': (-700)*(drop.Ind + 1).toString () + 'px top'
		});
	});

	actG1a.addEvent ('dropsComplete', function (drag, drop){
		$('desk-film').setStyles ({
			'background-position': '-5600px top'
		});
	});

	
	// Llamamos inicio de Actividad
	initAct2();
	
});