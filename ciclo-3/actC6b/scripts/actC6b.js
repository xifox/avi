// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 1, 1, 0);
	
var blocks = $$('#swapWords div');
	
	var toDrops = $$('#toDrops div');
	var forDrags = $$('#forDrag div');
	

	
	
	
	var misDxD = new Array (4);
	blocks.each (function (block, iB) {
		
		drags = block.getElements('.drag');
		drops = [];
		
		
		misDxD [iB] = new DxD.Swap (drags, drops, {
			container: $('content'),
			sendToBack: 'toDrop',
			adjDrags: ajusteDrags[iB],
			textInDrop: false,
			cssClass: 'actC6b',
			textInDrop: true
		});
		
		misDxD[iB].addEvent ('dragOverDrag', function (drag, drags) {
			var swordOk = true;

			var tempo;
			
			sonidos.Pop ();
			
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
		
		blocks[idBloque].setStyles ({
			'background-color': '#EFF',
			'border-color': '#AEE',
			position: 'absolute',
			top: idBloque * 80 + 200
		});
		blocks[idBloque].setHTML (frases[idBloque]);
		sonidos.Good();
	};
	
	/* objeto actC6b tipo DxD.Base  */
	var actC6b = new DxD.Base (forDrags, toDrops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actC6b'
	});
	

	
	actC6b.fncTrueDrop = function (drag, drop) {
		if (drag.Ind == 0 && drop.Ind == 3) return false;
		else return true;
	};

// function initAct() de miDxD
	initAct2 = function () {
		toDrops.each (function(tDrop){
			tDrop.setText('');
		});
		actC6b.reset();
		actC6b.drags.each (function (drag, iD){
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