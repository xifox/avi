// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){
	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 0);
	
	// Drags y Drops
	var drags = $$('#arrows div');
	var drops = $$('#drops div');

	var desk = $$('#desk div');
	
	var arrowsTxt = $$('#arrowsTxt div');
	var txt = new Array (3);
	txt.color = ['#A00', '#0A0', '#00A'];
	txt.bgColor = ['#FEE', '#EFE', '#EEF'];
	txt.brdColor = ['#EAA', '#AEA', '#AAE'];
	
	arrowsTxt.each (function (arrow, iA){
		arrow.setStyles ({
			color: txt.color[iA],
			'background-color': txt.bgColor[iA],
			'border-color': txt.brdColor[iA]
		});
	});

	// objeto actG3a tipo DxD.Base
	var actG3a = new DxD.Film (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		bgOffsetDrag: -50,
		cssClass: 'actG3a',
		adjDrops: ajusteDrops
	});
	
	// function initAct() de actG3a
	var initAct2 = function () {
		actG3a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, actG3a.options.adjDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};
	
	actG3a.fncTrueDrop = function (drag, drop) {
		if (drag.Ind == drop.Ind) return true
		else return false;
	};
	
	var numDrop = 0;
	actG3a.addEvent ('trueDrop', function (drag, drop) {
		desk[drop.Ind].setStyles ({
			'background-position': (-1000) * (drop.Ind + 1).toString() + 'px top',
			'z-index': 100 + numDrop
		});
		numDrop++;
	});

	// Llamamos inicio de Actividad
	initAct2();

});