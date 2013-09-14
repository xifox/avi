var pala = new Array ();
var celdas;
var posLetras;


// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	
	confMenu (1, 1, 0, 1, 0);
	
	var images = $$('#images div');
	images.each(function(img,iImg) {
		img.setStyles({
			'background-position': iImg * -130,
			'left': confImages[iImg].x,
			'top': confImages[iImg].y
		} );

	});
	
	var posLetras = new Array ();

	palabras.each (function (palabra, iP) {

		pala[iP] = new Array() ;
		//Separo la palabra en letras
		((palabra.palabra).split ('')).each (function (letra, iLetra) {
			var fila = palabra.fila;
			var columna = palabra.columna;
			var vertical = palabra.vertical;
/*
 * Armamos un vector con n*n elementos, donde cada elemento representa una letra de la sopa
 * recorrida de izquierda a  derecha y de arriba a abajo.
 * Es decir el elemento (i,j) sera  ( i * n + j).
 * Si la palabra es vertical, ( vertical * iLetra* dimSopa[0]) sera siempre 0  
  */
		posLetras [ fila * dimSopa[0] + columna + vertical * iLetra* dimSopa[0] + iLetra * (1-vertical) ]= letra;
		pala[iP][iLetra] = fila * dimSopa[0] + columna + vertical * iLetra* dimSopa[0] + iLetra * (1-vertical) ;
	});
	});

	var i = 0; var j = 0;
	var sopaTR = '';
	var sopaTD = '';

	var ind = 0;


	for (i= 0; i < dimSopa[1]; i++) {

		var letra = '';

		for (j; j < dimSopa[0]; j++) {
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
