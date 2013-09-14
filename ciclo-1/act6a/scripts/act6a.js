window.onDomReady(function(){

	initSounds (0, false);
	initIcon();

var brocha = $$('#drags div');
var circ = $$('#circ div');
var casillas = $$('#desk div');
var fondos = $$('#fondo div');
var iDrg = -1;

var lCirc = 290;

//Configuramos los colores
	circ.each(function(circ, i) {
		circ.setStyles ({
			'top': i*50 + 0,
			'left': lCirc,
			'background-position': -40 * i
		});
		circ.addEvents({
			'mousedown': function(el, obj) {
				brocha.setStyles({
					'background-position': (i * (-60)).toString() + 'px top'
				});
				iDrg = i;
			}
		});
	});
	
	miDxD = new DxD.Base (brocha, casillas, {
		container: $('content'),
		adjDrags: confDrags,
		sendToBack: 'ini'
		});
	

	miDxD.addEvent ('beforeDrag', function (drag) {
		// Tenemos que traer al frente todos los divs del tablero del color del pincel 
		if (iDrg != -1 ) {
			fichaClr[ans[iDrg]].each (function (indFicha) {
				casillas[indFicha].setStyles ({
					'z-index': 300,
					'display': 'block'
				});
			});
		}
	});
	
	miDxD.addEvent ('dragComplete', function (drag) {
		// Y Ahora se van para atrars
		if (iDrg != -1 ) {
			fichaClr[ans[iDrg]].each (function (indFicha) {
				casillas[indFicha].setStyle ('z-index', 0);
			});
		}
	});

		
	casillas.each (function (casilla, iC) {
		// configuramos casillas
		casilla.setStyles ({
			'opacity': 0
		});

		casilla.addEvents ({
			'over': function (drag) {
				if (clrFicha[casilla.Ind] == ans[iDrg]) {
					// Se va pal fondo !!!
					var urlImg = 'images/act21-e' + iC + 'h.gif';
					casilla.setStyles ({
						'background-image': 'url(' + urlImg + ')',
						'z-index': 0
					});
					
					casilla.fxDrop.start({
						'opacity': '1'
					}).chain (function () {
						casilla.remove();
						fondos[casilla.Ind].setStyles ({
							'background-image': 'url(' + urlImg + ')',
							display: 'block'
						});
					});
				
				}
			}
		});

	
	});
});
