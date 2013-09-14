// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 1);
	
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
			cssClass: 'actC6a',
			textInDrop: true
		});
		
		misDxD[iB].addEvent ('dragOverDrag', function (drag, drags) {
			var swordOk = true;

			var tempo;
			
			sonidos.Pop ();

			// Intercambiamos los indices de los drags
			tempo = drags[0].indDrop;
			drags[0].indDrop = drags[1].indDrop;
			drags[1].indDrop = tempo;

			misDxD[iB].drags.each (function (drag, iD){
//				frase = frase + drag.getText();
//				console.log ('ans[iB][iD]: ', ans[iB][iD],  'drag.indDrop: ', drag.indDrop);
				if (iB == 0 || iB == 3) {
					if (ans[iB][iD] != drag.indDrop) swordOk = false;
				};
				
				if (iB == 1 || iB == 2) {
					if (ans[iB][iD] != drag.indDrop) swordOk = false;
					if (ans[iB][iD] == 8 && drag.indDrop == 2) swordOk = true;
					if (ans[iB][iD] == 2 && drag.indDrop == 8) swordOk = true;
				};
			});
			//console.log ('-------------------------');
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
}); // end onDomReady