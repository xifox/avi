// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.addEvent ('load', function () {
	confMenu (1, 0, 0, 1, 0);
	
	var drags = $$('#forDrags div');
	var drops = $$('#toDrops div');
	var sounds = $$('#sounds div');

	var sonidos = new aPlayer.speakers (sounds, {
		sounds: 6,
		adjSpeakers: posSnds
	});
	
	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actF2a'
	});
	
	confINI ();
	
	miDxD.fncTrueDrop = function (drag, drop) {
		if (solution[drag.Ind] == drop.Ind) return true;
		else return false;
	};

	miDxD.addEvent ('trueDrop', function (drag, drop) {
		sounds[drop.Ind].remove();
		drop.setStyle ('background-position', (-150*drop.Ind).toString () + 'px top');
		drop.setText ('');
	});
});


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