/*
	category: sopaDeLetras
	name: script
	toolTip: Esquema basico de la sopa de letras
	
	toolbar: true
	icon: com.aptana.ide.snippets/icons/comment_block.png
	language: text/css
	
	prompt(filas): Cantidad de filas
	prompt(columnas): Cantidad de columas
*/



	var pala = new Array ();

window.onDomReady(function(){
	initSounds (0, false);
	
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


	for (i= 0; i < ${columnas}; i++) {

		var letra = '';

		for (j; j < ${filas}; j++) {
			if (posLetras[ind] != undefined) letra = posLetras[ind];
			else letra = String.fromCharCode((Math.random()*26).toInt() + 65);
			sopaTD = sopaTD  + '<td>' + letra + '</td>';
			ind++;
		}

		j=0;
		sopaTR = sopaTR + '<tr>' + sopaTD + '</tr>';
		sopaTD = '';

	};

	sopaTR = '<table>' + sopaTR + '</table>';

	$('sopa').setHTML (sopaTR);

});

function startDrop (drag, drop) {
	drag.remove ();

	if (posPals.indexOf(drag.Ind) != (-1)) {
		(pala[posPals.indexOf(drag.Ind)]).each (function (posicion, iLetra) {
			($$ ('#sopa td')[posicion]).addClass ('palabraOk');
		});
	}
};
