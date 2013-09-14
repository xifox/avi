// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	var Player = new aPlayer.rePro ({
		audioPlayerName: 'doing_things.mp3'
	});

	confMenu (1, 0, 0, 1, 0);
	var drags = $$('#images div');
	var drops = $$('#boxes div div');

	var ajusteDrags = new Array (6);
	ajusteDrags = [
		{x: 60, y: 240},
		{x: 780, y: 360},
		{x: 155, y: 350},
		{x: 330, y: 230},
		{x: 500, y: 350},
		{x: 620, y: 215}
	];

	ajusteDrags.randomize ();

	solution = [4, 2, 1, 0, 3, 5];

	miDxD = new DxD.Film (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		bgOffsetDrag: -120,
		offsetInOver: false,
		bgPosDrop: 100,
		adjDrags: ajusteDrags
	});

	miDxD.fncTrueDrop = function(drag, drop) {
		if (solution[drop.Ind] == drag.Ind) return true;
		else false;
	};

	var bgTemp;
	miDxD.drops.each (function (drop, iDrop) {
		drop.addEvents ({
			'over': function (drag, drags) {
				if (drop.indDrag == -1) {
					bgTemp = drop.getStyle('background-position');
					drop.setStyle('background-position', drag.Ind * (-100).toString() + 'px top');
				};
			},
			'leave': function (drag, Drags) {
				if (drop.indDrag == -1) {
					drop.setStyle('background-position', '-700px top');
				};
			}
		});
	});
	
	miDxD.addEvent ('emptyTrueDrop', function (drag, drop){
		if (drop.indDrag == -1) drop.setStyle ('background-position', '-700px top');
	});
	
	var confINI = function () {
		miDxD.drags.each (function (drag, iD){

			drag.setStyle ('display', 'block');
			drag.setOpacity (0);

			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (100*iD);
		});
	};

	confINI ();

}); // end onDomReady

