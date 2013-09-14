// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 1, 1, 1);
	
var blocks = $$('#swapWords div');
	
	var toDrops = $$('#toDrops div');
	var forDrags = $$('#forDrag div');
	


	
	
	var misDxD = new Array (4);
	blocks.each (function (block, iB) {
		
		drags = block.getElements('.drag');
		drops = []

		misDxD [iB] = new DxD.Swap (drags, drops, {
			container: $('content'),
			sendToBack: 'toDrop',
			adjDrags: ajusteDrags[iB],
			textInDrop: false,
			cssClass: 'actG4b',
			textInDrop: true
		});
		
		misDxD[iB].addEvent ('dragOverDrag', function (drag, drags) {
			var swordOk = true;

			var tempo;
			tempo = drags[0].indDrop;
			drags[0].indDrop = drags[1].indDrop;
			drags[1].indDrop = tempo;
			
			misDxD[iB].drags.each (function (drag, iD){
			//console.log ('ans['+iB+']['+iD+']: ' + ans[iB][iD], 'El drag ' + drag.Ind + ' esta en la casilla ' + drag.indDrop);
//				frase = frase + drag.getText();
				if (ans[iB][iD] != drag.indDrop) swordOk = false;
			});
		//	console.log ('-----------------------------------------');
			if (swordOk) fncSwordOk (iB);
		});
	});
	
	var fncSwordOk = function (idBloque) {
		
		blocks[idBloque].setStyles ({
			'background-color': '#EFF',
			'border-color': '#AEE',
			position: 'absolute',
			top: posAns[idBloque]
		});
		blocks[idBloque].setHTML (frases[idBloque]);
		sonidos.Good();
	};
	
	/* objeto actG4b tipo DxD.Base  */
	var actG4b = new DxD.Base (forDrags, toDrops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actG4b'
	});
	
	actG4b.fncTrueDrop = function (drag, drop) {
		if (drag.Ind == 0 && drop.Ind == 3) return false;
		else return true;
	};

// function initAct() de miDxD
	initAct2 = function () {
		toDrops.each (function(tDrop){
			tDrop.setText('');
		});
		actG4b.reset();
		actG4b.drags.each (function (drag, iD){
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