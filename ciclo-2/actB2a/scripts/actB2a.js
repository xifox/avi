var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	
	var miRepro = new aPlayer.rePro ({
		audioPlayerName: 'days1.mp3',
		basicSounds: true
	});
	
	confMenu (1, 0, 0, 1, 1);

	var dias = $$('#days div');
	var drops = $$('#soundbox table tbody td');
	var cant = dias.length;

	miDxD = new DxD.Film (dias, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		bgOffsetDrag: -170,
		bgPosDrop: 170,
		offsetInDrop: true
	});

	miDxD.fncTrueDrop = function(drag, drop) {
		if (solucion[drag.Ind]== drop.Ind%2) return true;
		else return false;
	};

	miDxD.addEvent ('trueDrop', function (drag, drop) {
		cant--;
		if (!cant) actOk ();
	});

	var actOk = function () {
		$('soundbox').setStyle ('display', 'none');
		$('actOk').setStyle ('display', 'block');

		miDxD.drags.each (function (drag, iD) {
			drag.setStyle ('display', 'block');
			drag.fxDrag.options.duration = 800;
			drag.setPosition ({x: ajusteDays[iD].x, y: 0});

			(function () {drag.fxDrag.start ({
				left: ajusteDays[iD].x,
				top: ajusteDays[iD].y,
				opacity: 1
			})}).delay (120 * iD);
		});
	};
			
});

