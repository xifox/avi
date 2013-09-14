// function initAct() de 
var initAct = function () {
	reLoad ();
};


var pala = new Array ();


window.onDomReady(function(){
	
	var sonidos = new aPlayer.Base ();
	
	confMenu (1, 0, 0, 1, 0);

	
	// DxD.Text | Drags y Drops
	var drags = $$('#swords div');
	var drops = $$('#sentences');
	
	var txtDrops = $$('#sentences p');
	
	// Construccion de objeto 'actL3a' tipo DxD.Text
	var actL3a = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		cssClass: 'actL3a',
		opacity: {
			drag: 0.4
		}
	});

	// Evento TrueDrop
	actL3a.addEvent ('trueDrop', function (drag, drop) {
		txtDrops[drop.Ind].setStyles ({
			color: '#2A4'
		});
	});

	// Animacion Inicial 'ini_actL3a ()
	var ini_actL3a = function () {
		actL3a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, actL3a.options.adjDrags[iD].y],
				opacity: actL3a.options.opacity.drag
			})}).delay (150*iD);
		});
	};

	// Llamamos a la animacion inicial 'ini-actL3a'.
	ini_actL3a ();

	// Sopa de letras.
	var posLetras = new Array ();
	

	// 'palabras' es el array de configuracion.
	// Generamos dos arrays.
	//		'posLetras' es un vector donde el indice es el numero de celda (td) de la tabla.
	//		'pala' es una matriz donde el primer elemento es el numero o id de la palabra, y el segundo elemento es otro array con la ubicacion de cada una de las letras.

	palabras.each (function (palabra, iP) {
		pala[iP] = new Array() ;

		//Separo la palabra en letras
//		((palabra.palabra).split ('')).each (function (letra, iLetra) {
		for (var iLetra = 0; iLetra < palabra.palabra.length; iLetra++) {

			letra = (palabra.palabra).charAt (iLetra);

			var fila = palabra.fila;
			var columna = palabra.columna;
			var horizontal = palabra.horizontal;
			posLetras [ (1-horizontal)*iLetra + fila + iLetra * horizontal * dimSopa[0] + dimSopa[0]* columna ]= letra;
			pala[iP][iLetra] =  ((1-horizontal)*iLetra + fila + iLetra * horizontal * dimSopa[0] + dimSopa[0]* columna);
		};


	});
	
	// Construimos tabla
	var i = 0; var j = 0;
	var sopaTR = '';
	var sopaTD = '';
	var ind = 0;

	for (i= 0; i < dimSopa[0]; i++) {
		var letra = '';

		for (j; j < dimSopa[1]; j++) {
			var strClass = '';
			if (posLetras[ind] != undefined) {
				letra = posLetras[ind];
				strClass = ' class="charInWord" ';
			}
			else {
				letra = String.fromCharCode((Math.random() * 26).toInt() + 65);
				strClass = ' class="tdNormal" ';
			}

			sopaTD = sopaTD  + '<td' + strClass + '>' + letra + '</td>';
			ind++;
		}

		j=0;
		sopaTR = sopaTR + '<tr>' + sopaTD + '</tr>';
		sopaTD = '';
	};
	sopaTR = '<table>' + sopaTR + '</table>';
	
	sopaTR = '<table>' + sopaTR + '</table>';
	
	// Imprimos HTML
	$('sopa').setHTML (sopaTR);
	
	// Eventos de la sopa
	celdas = $$('#sopa td');

	celdas.each (function (celda, iC){

		celda.pick = false;
		celda.enb = true;

		celda.addEvents ({
			'mouseenter': function () {
				if (celda.enb) celda.addClass ('tdHover');
			},

			'mouseleave': function () {
				if (celda.enb) celda.removeClass ('tdHover');
			},

			'mousedown': function () {
				if (celda.enb) {
					celda.pick = !celda.pick;
					celda.toggleClass('tdClick');
					ctrlTable();
				};
			}
		});
	});
	
/*
	// Metodo de control de palabras en tabla.
	// Metodo tonto. Verificamos letra a letra
	var ctrlTable = function () {
		//recorremos palabras
		for (var i = 0; i < posLetras.length; i ++ ) {
			if (posLetras[i] != undefined) {
				var letra = posLetras[i];
				console.log(i, letra, celdas[i].pick);
			}
		};
	};
	*/
		
	// Metodo de control de palabras en tabla.
	// Metodo tonto. Verificamos palabra a palabra, letra a letra.
	var ctrlTable = function () {
		//recorremos palabras
		for (var i = 0; i < pala.length; i++) {
		
			var palabra = pala[i];
			// palabra.checked = false;

			if (palabra.check != false) {
				// Suponemos que la palabra ha sido completada
				var palabraOk = true;
				var txtDrag = '';
				
				// recorremos cada letra sabiendo que el valor es el indice de cada una
				for (var j = 0; j < palabra.length; j++) {
					var celda = celdas[palabra[j]];
					txtDrag = txtDrag + celda.getText();
					if (!celda.pick) 
						palabraOk = false;
				};
				
				// Que hacemos si esta OK ... ?
				if (palabraOk) {
					palabra.check = false;
					if (txtDrag == 'cdrom') txtDrag = 'CD-ROM';

				
					for (var j = 0; j < palabra.length; j++) {
						var indLetra = palabra[j];
						celdas[indLetra].enb = false;
						celdas[indLetra].addClass('tdOk');
						celdas[indLetra].removeClass('tdClick');
						celdas[indLetra].removeClass('tdHover');
						celdas[indLetra].removeClass('charInWord');
					};
					
					actL3a.options.opacity.drag = 1;
					
					var fxAnt = actL3a.drags[i].fxDrag.options.transition;
					var drag = actL3a.drags[i];
					
					drag.fxDrag.options.transition = Fx.Transitions.Back.easeIn;
					
					soundManager.play('sndGood');
					drag.setText(txtDrag);
					drag.fxDrag.start({
						opacity: 1,
						top: [200, actL3a.options.adjDrags[i].y]
					}).chain(function () {
						drag.fxDrag.options.transition = fxAnt;
					});
				};
			};
		};
	};
});

function startDrop (drag, drop) {
	drag.remove ();
	if (posPals.indexOf(drag.Ind) != (-1)) {
		(pala[posPals.indexOf(drag.Ind)]).each (function (posicion, iLetra) {
			($$ ('#sopa td')[posicion]).addClass ('palabraOk');
		});
	};
};