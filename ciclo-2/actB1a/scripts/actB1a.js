var initAct;

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);

	var drags = $$('#days div');
	var drops = $$('#toDrop div');
	var cajaDrops = $$('#cajaDrop div');
	var sonidos = $$('#sounds div');

	var adjSonidos = new Array (sonidos.length);
	sonidos.each (function (sonido, iS){
		adjSonidos[iS] = {x: ajusteDrops[iS].x + 70, y: ajusteDrops[iS].y - 40};
	});
	var cant = drags.length;

	var miKara = new aPlayer.speakers (sonidos, {
		adjSpeakers: adjSonidos,
		sounds: 7
	});
	
	cajaDrops.each (function (caja, iC) {
		caja.setOpacity (0.2);
		caja.setPosition (ajusteDrops[iC]);
	});

	miDxD = new DxD.Film (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		bgOffsetDrag: -170,
		bgPosDrop: 170,
		multiDrop: false
	});

	miDxD.fncTrueDrop = function(drag, drop) {

		if (solution[drag.Ind] == drop.Ind) return true;
		else return false;
	};

	miDxD.addEvent ('trueDrop', function (drag, drop) {
		sonidos[drop.Ind].setStyle('display', 'none');
		cant--;
		if (!cant) aniOk ();
	});

	aniOk = function () {
		miDxD.drops.each (function (drop, iD) {
			cajaDrops[iD].remove();
			drop.fxDrop.start ({
				left: ajusteDays[iD].x,
				top: ajusteDays[iD].y
			});
		});
	};
	
	initAct = function () {
		sonidos.each(function(snd){
			snd.setStyle('display', 'block');
		});
		drops.each(function(drop, iD) {
			drop.qttDrops = 1;
			drop.setStyle('background-position', 'right center');
			
			(function () {drop.fxDrop.start ({
				top: [200, ajusteDrops[iD].y],
				left: [500, ajusteDrops[iD].x],
				opacity: 1
			})}).delay (150 * iD);
			
			
		});

		miDxD.drags.each (function (drag, iD) {
			drag.setStyle('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [200, ajusteDrags[iD].y],
				left: [500, ajusteDrags[iD].x],
				opacity: 1
			})}).delay (150 * iD);
		});
	};

	initAct ();
}); // end onDomReady