window.onDomReady(function(){
	initSounds (0, false);
	initIcon ();

	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops div');

	// objeto act2e tipo DxD.Base
	var act2e = new DxD.Film (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'act2e'
	});


	act2e.fncTrueDrop = function (drag, drop) {
		if (drag.Ind == ans[drop.Ind]) return true
		else return false;
	}
	
	act2e.addEvent ('trueDrop', function (drag, drop) {
		imgUrl = 'images/act25-e' + drag.Ind + '.gif';
		
		drop.setStyles ({
			'background-image': 'url(' + imgUrl + ')',
			'background-position': 'left top'
		})
	})
});