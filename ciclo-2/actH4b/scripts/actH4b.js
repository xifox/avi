// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 1, 1, 0);
	
	var sonidos = new aPlayer.Base ();
	
	var drags = $$('#months div');
	var drops = $$('#blocks div');

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actH4b',
		textInDrop: false,
		multiDrop: [4,1,7,1]
	});

	miDxD.fncTrueDrop = function(drag, drop){
		if (solution[drag.Ind] == drop.Ind) return true;
		else if (drag.Ind == 1 && drop.Ind == 3) return true;
		else return false;
	};
	
	miDxD.addEvent ('trueDrop', function (drag, drop) {
		drop.setHTML (drop.innerHTML + '<br />' + drag.getText ());
		if (drag.Ind != 1) drag.setStyle ('display', 'none');
		else {
			if (this.drops[1].getQttDrops () == 1 && this.drops[3].getQttDrops () == 1) drag.setStyle ('display', 'none');
		};
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

	miDxD.drops.each (function (drop, iD){
		drop.setStyles ({
			'background-position': drop.Ind*(-228).toString () + 'px top'
		});
	});
};