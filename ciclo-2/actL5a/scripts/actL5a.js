// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu(1, 0, 0, 1, 0);
	var sonidos = new aPlayer.Base ();

	var blocks = $$('#swapWords div');
	var signoQ = $$('#signoQ div');
	var toDrops = $$('#toDrops div');
	var forDrags = $$('#forDrag div');
	
	signoQ.each (function (signo, iS){
		signo.setStyles (confSignoQ[iS]);
		
		toDrops[iS].setStyles ({
			left: confSignoQ[iS].left + 60,
			top: confSignoQ[iS].top
		});
	});
	
	
	var misDxD = new Array (5);
	blocks.each (function (block, iB) {
		
		drags = block.getElements('.drag');
		drops = []

		misDxD [iB] = new DxD.Swap (drags, drops, {
			container: $('content'),
			sendToBack: 'toDrop',
			adjDrags: ajusteDrags[iB],
			textInDrop: false,
			cssClass: 'actL5a',
			textInDrop: true
		});
		
		misDxD[iB].addEvent ('dragOverDrag', function (drag, drags) {
			var swordOk = true;

			var tempo;
			tempo = drags[0].indDrop;
			drags[0].indDrop = drags[1].indDrop;
			drags[1].indDrop = tempo;
			
			misDxD[iB].drags.each (function (drag, iD){
//				frase = frase + drag.getText();
				if (ans[iB][iD] != drag.indDrop) swordOk = false;
			});
			if (swordOk) fncSwordOk (iB);
		});
	});
	
	var fncSwordOk = function (idBloque) {
		signoQ[idBloque].remove();
		blocks[idBloque].setStyles ({
			'background-color': '#EFF',
			'border-color': '#AEE'
		});
		blocks[idBloque].setHTML (frases[idBloque]);
	};
	
	/* objeto actL5a tipo DxD.Base  */
	var actL5a = new DxD.Base (forDrags, toDrops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags2,
		cssClass: 'actL5a'
	});
	
	actL5a.fncTrueDrop = function (drag, drop) {
		if (drag.Ind == 0 && drop.Ind == 3) return false;
		else return true;
	};

// function initAct() de miDxD
	initAct2 = function () {
		toDrops.each (function(tDrop){
			tDrop.setText('');
		});
		actL5a.reset();
		actL5a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				opacity: 1
			})}).delay (200*iD);
		});
	};

	// Llamamos inicio de Actividad
	initAct2();

}); // end onDomReady