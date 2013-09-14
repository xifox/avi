// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady (function () {
	confMenu(1, 0, 0, 1, 0);
	var sonidos = new aPlayer.Base ();

	var blocks = $$('#swapWords div');
	var signoQ = $$('#signoQ div');
	var forDrags = $$('#forDrag div');
	
	
	
	signoQ.each (function (signo, iS){
		signo.setStyles (confSignoQ[iS]);
		toDrops[iS].setStyles ({
			left: confSignoQ[iS].left + 60,
			top: confSignoQ[iS].top
		});
	});
	
	
	var misDxD = new Array (4);
	blocks.each (function (block, iB) {
		drags = block.getElements('.drag');
		drops = [];

		misDxD [iB] = new DxD.Swap (drags, drops, {
			container: $('content'),
			sendToBack: 'toDrop',
			adjDrags: ajusteDrags[iB],
			textInDrop: false,
			cssClass: 'actJ4a',
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
			'border-color': '#AEE'
		});
		
		sonidos.Good ();
		
		blocks[idBloque].setHTML (frases[idBloque]);
	}
}); // end onDomReady