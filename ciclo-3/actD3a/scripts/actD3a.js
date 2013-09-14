// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){
	confMenu (1, 0, 0, 1, 0);
	var sonidos = new aPlayer.rePro ({
		audioPlayerName: 'actD3a.mp3'
	});

	// Drags y Drops
	var drops = $$('#drops div');
	var drags = $$('#drags div');
	var images = $$('#images div');
	// objeto actD3a tipo DxD.Base
	var actD3a = new DxD.Base (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		cssClass: 'actD3a',
		textInDrop: false,
		multiDrop: false,
		dragDelete: true,
		opacity: {
			drop: 100,
			overDrop: 0,
			trueDrop: 0
		}
	});
// function initAct() de actD3a
	var initAct2 = function () {
		actD3a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (100*iD);
		});
	};
	drops.each(function(drop,iDrop){
		drop.setStyles({
			'width': ajusteDrops[iDrop].width,
			'height': ajusteDrops[iDrop].height
		});
	});
	// Llamamos inicio de Actividad
	initAct2();
		actD3a.drops.each (function (drop, iD){
		drop.addEvents ({
			over: function () {
				if (drop.indDrag ==-1) 
				
				images[iD].setStyle ('background-position', iD * -540);
			},
			
			leave: function () {
				if (drop.indDrag ==-1) 
					images[iD].setStyle ('background-position', '540px');
			},
			emptyTrueDrop: function () {
				if (drop.indDrag== -1) 
					images[iD].setStyle ('background-position', '540px');
			},
			
			trueDrop: function () {
				images[iD].setStyle ('background-position', iD * -540);
			}
			
		});
	});
		actD3a.fncTrueDrop = function (drag, drop) {
			if (drag.Ind == drop.Ind) return true;
			else return false;
	};
});