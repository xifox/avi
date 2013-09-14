// function initAct() de 
var initAct = function () {
	reLoad ();
};

var pala = new Array ();
var celdas;
var posLetras;

window.onDomReady(function(){

	confMenu (1, 1, 0, 1, 0);
	
	var images = $$('#images div');
	
	var sonidos = new aPlayer.Base ();
		
	images.each(function (image, iM){
		image.setStyles (confImg[iM])
		image.setStyle ('background-position', iM * (-150).toString() + 'px top');
	})
	
	posLetras = new Array ();

	palabras.each (function (palabra, iP) {

		pala[iP] = new Array() ;
		//Separo la palabra en letras
		((palabra.palabra).split ('')).each (function (letra, iLetra) {
			var fila = palabra.fila;
			var columna = palabra.columna;
			var horizontal = palabra.horizontal;
			posLetras [ (1-horizontal)*iLetra + fila + iLetra * horizontal * dimSopa[0] + dimSopa[0]* columna ]= letra;
			pala[iP][iLetra] =  ((1-horizontal)*iLetra + fila + iLetra * horizontal * dimSopa[0] + dimSopa[0]* columna);
		});
	});

	var i = 0; var j = 0;
	var sopaTR = '';
	var sopaTD = '';

	var ind = 0;


	for (i= 0; i < 10; i++) {

		var letra = '';

		for (j; j < 10; j++) {
			if (posLetras[ind] != undefined) letra = posLetras[ind];
			//if (posLetras[ind] != undefined) letra = '<span style="color:red">' + posLetras[ind] + '</span>';
			else letra = String.fromCharCode((Math.random()*26).toInt() + 65);
			sopaTD = sopaTD  + '<td>' + letra + '</td>';
			ind++;
		};

		j=0;
		sopaTR = sopaTR + '<tr>' + sopaTD + '</tr>';
		sopaTD = '';
	};

	sopaTR = '<table>' + sopaTR + '</table>';
	$('sopa').setHTML (sopaTR);
	celdas = $$('#sopa td');

});

function startDrop (drag, drop) {
	drag.remove ();

	if (posPals.indexOf(drag.Ind) != (-1)) {
		(pala[posPals.indexOf(drag.Ind)]).each (function (posicion, iLetra) {
			($$ ('#sopa td')[posicion]).addClass ('palabraOk');
		});
	};
};

var checkAct = function () {
	pala.each (function (palabra, iP){
		palabra.each (function (letra, iL){
			celdas[letra].setStyles ({
				color: '#FFF',
				'background-color': '#06A'
			});
		});
	});
	
};