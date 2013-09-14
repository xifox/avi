// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){
	var sonidos = new aPlayer.Base ();

	confMenu (1, 0, 0, 1, 1);
	
	// Drags y Drops
	var drags = $$('#txtNumbers div');
	var drops = $$('#numbers div');
	
	var celdas = $$('#tabla td');

	// objeto act4a tipo DxD.Base
	var actI1a = new DxD.Base (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		cssClass: 'actI1a',
		textInDrop: false
	});
	
	actI1a.fncTrueDrop = function (drag, drop){
		if (drag.Ind == drop.Ind) return true;
		else return false;
	};
	
	var posIni = 0;
	
	actI1a.addEvent ('trueDrop', function (drag, drop){
		
		drag.fxDrag.options.duration = 500;
		drop.fxDrop.options.duration = 500;
		
		drag.fxDrag.start ({
			left: 800,
			top: posIni*35 + 42
		});
		
		drop.fxDrop.start ({
			left: 800,
			top: posIni*35 + 42
		}).chain (function () {
			texto = drag.getText() + ' - ' + drop.getText();
			celdas [posIni].setText (texto);
			celdas [posIni].addClass ('celdaOk');
			drag.remove();
			drop.remove();
			posIni++;
		});
	});
	
	// function initAct() de actI1a
	var initAct2 = function () {
		actI1a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, actI1a.options.adjDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();
});