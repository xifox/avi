window.onDomReady(function(){
	var pala = new Array ();
	
	initSounds (0, false);
	initIcon();

	var posLetras = new Array ();

	palabras.each (function (palabra, iP) {

		pala[iP] = new Array ;

		(palabra[2].split ('')).each (function (letra, iLetra) {
			posLetras [((1-palabra[3])*iLetra + palabra[0] + iLetra * palabra[3] * dimSopa[0] + dimSopa[0]*palabra[1])] = letra;

		pala[iP][iLetra] =  ((1-palabra[3])*iLetra + palabra[0] + iLetra * palabra[3] * dimSopa[0] + dimSopa[0]*palabra[1]);
		});
	});

	var i = 0; var j = 0;
	var sopaTR = '';
	var sopaTD = '';

	var ind = 0;


	for (i; i < dimSopa[1]; i++) {

		var letra = '';

		for (j; j < dimSopa[0]; j++) {
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

	$('answers').addEvents({
		'mousedown': function() {
			pala.each(function(gs, i){
				gs.each (function (posicion, iLetra) {
					$$('#sopa td')[posicion].setStyles({
						'color': 'white',
						'background-color': '#2aa'
					});
				});
			});
		}
	});

});
