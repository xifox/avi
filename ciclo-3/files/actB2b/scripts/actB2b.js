// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	confMenu (1, 0, 1, 1, 0);
	var sonidos = new aPlayer.Base ();

	// Drags y Drops
	var drags = $$('#texts div');
	var drops = $$('#cuadros div');

	// objeto actB2b tipo DxD.Base
	var actB2b = new DxD.Base (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		cssClass: 'actB2b',
		dragDelete:true,
		opacity: {
			overDrag: 0.2
		}
	});
	
	// function initAct() de actB2b
	var initAct2 = function () {
		actB2b.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});		
		actB2b.addEvent( 'dropsComplete', function () {
			
		$$('#menuBar div')[1].setStyles ({
			'background-position': '-300px top',
			'cursor': 'pointer'
		});
		$$('#menuBar div')[1].addEvent ('mousedown', function () {
				actB2b.drags.each (function (drag, iD){
					actB2b.drops[drag.indDrop].removeClass (actB2b.options.cssClass + '-trueDrop');
					 if (solution[drag.Ind] == drag.indDrop) actB2b.drops[drag.indDrop].addClass ('ok');
					else actB2b.drops[drag.indDrop].addClass ('error');
				});
			});
		});
	};
	// Llamamos inicio de Actividad
	initAct2();


});
