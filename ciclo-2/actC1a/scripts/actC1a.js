// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);

	var drags = $$('#asignature div');
	var drops = $$('#toDrop div');
	var images = $$('#images div');
	var cant = drags.length;

	images.each(function (img, iImg) {
		img.setStyle('background-position', (offsetImg[iImg] * (-100)).toString() + 'px top');
	});
	
	var miSound = new aPlayer.Base();

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		cssClass: 'desp180',
		textInDrop: true
	});

	miDxD.fncTrueDrop = function (drag, drop){
		if (solution[drag.Ind] == drop.Ind) return true
		else false;
	};

	miDxD.addEvent ('trueDrop', function (drag, drop) {
			cant--;
			if (!cant) actOK ();
			images[drop.Ind].setStyle ('background-position', (offsetImg[drop.Ind] * (-100) - 800));
		});
		
	actOK = function () {
		
		miDxD.drops.each (function (drop, iD) {
			drop.setPosition ({x: ajusteDrops[iD].x, y: -200});
			drop.setOpacity (0);

			drop.fxDrop.options.duration = 800;
			
			(function () {drop.fxDrop.start ({
				'top': ajusteDrops[iD].y,
				opacity: 1
			})}).delay (180*iD);
			
			
		});
	};


	// function initAct() de miDxD
	initAct2 = function () {
		
		miDxD.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};
	// Llamamos inicio de Actividad
	initAct2();

}); // end onDomReady