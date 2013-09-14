// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);
	
	var drags = $$('#images div');
	var drops = $$('#toDrop div');
	var sounds = $$('#sounds div');

	var sonidos = new aPlayer.speakers (sounds, {
		sounds: 7
	});
   
	miDxD = new DxD.Film (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		bgOffsetDrag: -100,
		bgPosDrop: -700
	});

	miDxD.fncTrueDrop = function (drag, drop){
		if (solution[drag.Ind] == drop.Ind) return true;
		else false;
	};

	miDxD.addEvent ('trueDrop', function (drag, drop) {
			sounds[drop.Ind].remove();
	});
	
	sounds.each(function(snd, iSnd){
		snd.setStyles({
			'left': ajusteDrops[iSnd].x -50 ,
			'top': ajusteDrops[iSnd].y 
		});
	});

	confINI ();

}); // end onDomReady

confINI = function () {
		miDxD.drags.each (function (drag, iD){
		drag.setStyle ('display', 'block');
		drag.setOpacity (0);

		(function () {drag.fxDrag.start ({
			top: [0, ajusteDrags[iD].y],
			opacity: 1
		})}).delay (150*iD);
	});
};