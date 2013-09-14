// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.addEvent ('load', function () {
	confMenu (1, 0, 0, 1, 0);
	
	var sonidos = new aPlayer.Base ();
	
	var wordDrags = $$('#wordDrags div');
	var toDrops = $$('#toDrops div');
	
	/* objeto actK3a tipo DxD.Base  */
	var actK3a = new DxD.Base (wordDrags, toDrops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		cssClass: 'actK3a'
	});
	
	
	actK3a.fncTrueDrop = function (drag, drop) {
		if (drag.Ind == drop.Ind) return true
		else return false;
	}

	var confINI = function () {
		actK3a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);

			(function () {drag.fxDrag.start ({
				top: [300, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};
	
	confINI ();

}); // end onDomReady

