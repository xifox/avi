
// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	var sonidos = new aPlayer.rePro ({
		audioPlayerName: 'yeti.mp3'
	});

	confMenu (1, 0, 0, 1, 0);


// Drags y Drops
	var drags = $$('#drags');
	var drops = $$('#drops div');
	var image = $$('#image div');

	// objeto actK2a tipo DxD.Base
	var actK2a = new DxD.Base (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		cssClass: 'actK2a'
	});


// function initAct() de actK2a
	var initAct2 = function () {
		actK2a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (200*iD);
		});
	};
	
	var indOgro = 0;

	(actK2a.drops).each (function (drop, iD) {
		drop.addEvents ({
			'over': function (drag, drags) {
				if (drop.indDrag) {
					image[drop.Ind].setStyles({
						opacity: 0.6,
						'background-position': ((-1000) * drop.Ind).toString() + 'px top'
					});
				}
			},

			'leave': function (drag, drags) {
				if (drop.indDrag) {
					image[drop.Ind].setStyles({
						'background-position': '1000px top'
					});
				}
			}
		});
	});
	
	actK2a.fncTrueDrop = function (drag, drop) {
		if (indOgro == drop.Ind) {
			indOgro++;
			return true;
		}
		else {
			return false;
		}
	};
	
	actK2a.addEvent ('trueDrop', function (drag, drop){
		image[drop.Ind].setStyles ({
			opacity: 1
		});
		if (indOgro == 4) {
			$('image').setStyle ('background-position', '-1000px top');
			$('yeti').setStyle ('display', 'block');
		};
		
	});

	actK2a.addEvent ('emptyTrueDrop', function (drag, drop){
		image[drop.Ind].setStyles ({
			'background-position': '1000px top'
		});
		soundManager.setPosition ('rePro', 0);
	});
	
	// Llamamos inicio de Actividad
	initAct2();



});

