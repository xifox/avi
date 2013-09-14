window.onDomReady(function() {
	initSounds (6, false);
	initIcon();

	var imgs = $$('#snd div');

	imgs.each (function (img, iM) {

	if (iM > 2) {
		var pos = iM - 3;
		var posH = 1;
	}
	else {
		var pos = iM;
		var posH = 0;
	}

		img.setStyles ({
			left: pos*300 + 10,
			top: posH*250
		})
		
		img.addEvent ('click', function () {
			soundManager.play ('snd' + iM);
			
		});
	});


	var cuadros = $$('#cuadros div');
	var casillas = $$('#casillas div');

	miDxD = new DxD.Swap (cuadros, casillas, {
		multiDrop: 200,
		adjDrags: dydsLT,
		bgOffsetDrag: -250,
		sendToBack: 'toDrop',
		offsetInOver: false
	});

	miDxD.fncTrueDrop = function (drag, drop) {
		i = 0;
		while ((miDxD.drags[i].Ind == ans[miDxD.drags[i].indDrop]) && (i < (miDxD.drags.length - 1))) {
			i++;
		}
			
		if (i == (miDxD.drags.length - 1)) return true
		else return false;
	}

	miDxD.addEvent ('trueDrop', function (drag, drop) {

		miDxD.drags.each (function (drg, iD) {

			miDxD.drops[iD].setStyles ({
				'background-position': -250*ans[iD],
				'background-color': '#AFA',
				top: -500
			});

			miDxD.drops[iD].fxDrop.options.duration = 400*iD;

			miDxD.drops[iD].fxDrop.start ({
				opacity: 100,
				top: dydsLT[iD].y
			});

			drg.remove();
		})
	});







});
