window.addEvent ('load', function () {
	confMenu (1, 0, 0, 1, 0);

	var drags = $$('#wordsDrag div');
	var drops = $$('#drops div');

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		zIndexBottom: 400,
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		cssClass: 'DxD',
		soundsActive: false,
		dragDelete: 'none',
		opacity: {
			'drop': 0.5,
			'dragDrag': 0.4,
			'overDrag': 0.2
		}
	});
	
	confINI ();
	

	miDxD.addEvent ('trueDrop', function (drag, drop) {
		var check = true;
		
		this.drops.each (function (drop, iD) {
			if (drop.getQttDrops () == 0) check = false;
		});
		if (check) checkAct ();
	});
	

}); // end onDomReady

var initAct = function () {
	reLoad ();
},

confINI = function () {
	
	miDxD.drops.each (function (drop, iD){
		drop.setStyles ({
			'z-index': ajusteDrops[iD].zInd
		});
		drop.setText ('');
		drop.removeClass ('ok');
		drop.removeClass ('error');
	})
	
		miDxD.drags.each (function (drag, iD){
		drag.setStyle ('display', 'block');
		drag.setOpacity (0);
		
	
		(function () {drag.fxDrag.start ({
			top: [0, ajusteDrags[iD].y],
			opacity: 1
		})}).delay (150*iD);
		
	})

}

var checkAct = function () {

	$$('#menuBar div')[1].setStyles ({
		'background-position': '-300px top',
		'cursor': 'pointer'
	});
	
	
	$$('#menuBar div')[1].addEvent ('mousedown', function () {
		miDxD.drags.each (function (drag, iD){

			$('desk').setOpacity (0.2);
			$('under').setOpacity (0);
			
			miDxD.drops[drag.indDrop].removeClass (miDxD.options.cssClass + '-trueDrop');
		
			if (solution[drag.Ind] == drag.indDrop) miDxD.drops[drag.indDrop].addClass ('ok');
			else miDxD.drops[drag.indDrop].addClass ('error');
		});
	});

};
