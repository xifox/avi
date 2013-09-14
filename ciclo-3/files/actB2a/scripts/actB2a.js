// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	confMenu (1, 0, 0, 1, 1);
	
	var sonidos = new aPlayer.Base ();

	// Drags y Drops
	var drags = $$('#texts div');
	var drops = $$('#cuadros div');

	// objeto actB2a tipo DxD.Base
	var actB2a = new DxD.Base (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		cssClass: 'actB2a',
		dragDelete:true,
		opacity: {
			overDrag: 0.2
		}
	});
	
	// function initAct() de actB2a
	var initAct2 = function () {
		actB2a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};

	actB2a.addEvent( 'dropsComplete', function () {
		$$('#menuBar div')[1].setStyles ({
			'background-position': '-300px top',
			'cursor': 'pointer'
		});

		$$('#menuBar div')[1].addEvent ('mousedown', function () {
			actB2a.drags.each (function (drag, iD){
				$('vinetas').setOpacity (0.4);
				actB2a.drops[drag.indDrop].removeClass (actB2a.options.cssClass + '-trueDrop');
				
				if (solution[drag.Ind] == drag.indDrop) actB2a.drops[drag.indDrop].addClass ('ok');
				else actB2a.drops[drag.indDrop].addClass ('error');
			});
		});
	});

	// Llamamos inicio de Actividad
	initAct2();
});
