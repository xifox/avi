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
	var pictures = $$('#pictures div');
	
	ajusteDrags.randomize ();
	var actE4b = new DxD.Text (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actE4b'
	});
	
	

	// function initAct() de actE4b
	var initAct2 = function () {
		actE4b.drags.each (function (drag, iD){
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
	
	actE4b.addEvent ('trueDrop', function (drag, drop) {
		if (!drops[drop.Ind].innerHTML.contains ('txt-hidden')) {
			var no = (drops[drop.Ind].getText ().contains ('don\'t'))*-150;
			pictures [drop.Ind].setStyle ('background-position', (no - 300*(drop.Ind)).toString() + 'px top');
		};
		
/*		if (!((drops[(drop.Ind - drop.Ind %2) / 2].innerHTML).contains ('txt-hidden'))) {
			var no = (drops[(drop.Ind - drop.Ind %2) / 2].getText ().contains ('don\'t'))*-150;
			pictures [(drop.Ind - drop.Ind %2) / 2].setStyle ('background-position', (no -300*((drop.Ind - drop.Ind %2) / 2)).toString() + 'px top');
		};
		*/
	});
});