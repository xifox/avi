// function initAct() de 
var initAct = function () {
	reLoad ();
};

var pala = new Array ();
var celdas;

window.onDomReady(function(){
	var sonidos = new aPlayer.Base ();
	confMenu (1, 1, 0, 1, 0);
	
	var pictures = $$('#pictures div');
	
	pictures.each (function (picture, iP){
		
		picture.setStyles (adjImgs[iP]);
		picture.setStyle ('background-position', (-200)*iP.toString() + 'px top');
	});
	
	var posLetras = new Array ();

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


	for (i= 0; i < 7; i++) {

		var letra = '';

		for (j; j < 11; j++) {
			if (posLetras[ind] != undefined) letra = posLetras[ind];
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
