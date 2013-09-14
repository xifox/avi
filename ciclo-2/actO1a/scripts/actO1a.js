// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady (function () {
	
	confMenu (1, 0, 0, 1, 0);
	
	var drags = $$('#foods div');
	var drops = $$('#drops div span');
	var sounds = $$('#estrofas div div');
	var ans = new Array ();
	
	var sonidos = new aPlayer.speakers (sounds, {
		sounds: 2
	});
	
	miDxD = new DxD.Film (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		bgOffsetDrag: -80,
		bgPosDrop: 80,
		gbOffsetDrop: false,
		adjDrags: ajusteDrags
	});

	miDxD.fncTrueDrop = function(drag, drop) {

		indAns = (drop.Ind/3).toInt();
		if (ans[indAns].contains(drag.Ind)) {
			ans[indAns].remove (drag.Ind);
			return true;
		}
		else return false;
	};
	
	// function initAct() de miDxD
	initAct2 = function () {
		ans[0] = ansIni[0].copy ();
		ans[1] = ansIni[1].copy ();
		ans[2] = ansIni[2].copy ();
		ans[3] = ansIni[3].copy ();

		drops.each(function(drop){
			drop.setStyle('background-position', 'left 500px');
			drop.qttDrops = 1;
		});
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
});