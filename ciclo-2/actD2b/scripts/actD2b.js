// function initAct() de 
var initAct = function () {
	reLoad ();
};



window.onDomReady (function () {
	confMenu (1, 0, 1, 1, 1)
	
	var drags = $$('#textsDrag div');
	var drops = $$('#toDrop div');

	var sounds = new aPlayer.rePro ({
		audioPlayerName: 'snd0.mp3'
	});

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: true,
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		textInDrop: true,
		cssClass: 'actD2j'
	});

	miDxD.fncTrueDrop = function (drag,drop) {
		if (solution [drop.Ind] == drag.Ind) return true;
		else return false;
	};

	initAct2 = function () {
		miDxD.drags.each (function (drag, iD) {
			(function () {drag.fxDrag.start ({
				top: [-200, ajusteDrags[iD].y]
			})}).delay (200*iD);
		})
		
		$('images').setOpacity (1);
		miDxD.dragInDrop = false;		


		(miDxD.drops).each (function (drop, iD) {
			drop.setText ('');
			drop.setStyles ({
				'left':ajusteDrops[iD].x,
				'top':ajusteDrops[iD].y
			});
		});
	};
	
	initAct2 ();
}); // end onDomReady
