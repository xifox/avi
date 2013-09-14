/*var vtnConsola;

window.onDomReady (function () {
	// Creamnos nodos HTML
	var consoleEl = new Element ('div', {
		id: 'consola'
	});

	consoleEl.injectBefore ('footer');
	consolaHTML = $('consola');
	
	consolaHTML.setHTML ('<h3>Consola 1.0</h3><div id="vtnConsola"></div>');
	vtnConsola = $('vtnConsola');
	
	
	new Drag.Move(consolaHTML, {
		handle: consolaHTML.getElement ('h3')
	});
	
});

var consola = function (texto) {
	vtnConsola.setHTML (vtnConsola.innerHTML + '<p>' + texto  + '</p>');
};

*/
Array.prototype.randomize = function () {
	// Array temporal, copia del original.
	var arrTmp = new Array (this.length);
	arrTmp = this.copy ();

	// Quitar y poner (los grosos le dice 'Pick and Drop')
	for (var i = 0; arrTmp.length; i ++) {
		var rndNum = $random (0, (arrTmp.length -1));
		this[i] = (arrTmp[rndNum]);
		arrTmp.splice (rndNum, 1);
	};
}

Array.prototype.setCircular = function (options) {

	options.alphaIni = (options.alphaIni) ? (2 * Math.PI/360)*options.alphaIni : 0;
	options.alphaFin = (options.alphaFin) ? (2 * Math.PI/360)*options.alphaFin : 2 * Math.PI;
	
	var angulo = (options.alphaFin - options.alphaIni) / this.length;
	for (var iE = 0, el = this[iE]; iE < this.length; iE ++) {
		var alfa = angulo * iE + options.alphaIni;

		this[iE] = {
			x: (Math.sin(alfa) * (options.width / 2) + options.left).toInt(),
			y: (Math.cos(alfa) * (-options.height / 2) + options.top).toInt()
		}
	};
};



window.onDomReady (function () {
	// Inicializamos ventana de info para el profe gay.
	initIcon ();
})

var vtn_p1 = new Image;
vtn_p1.src = "../main/images/vtn_p1.png"

var vtn_p2 = new Image;
vtn_p2.src = "../main/images/vtn_p2.png"

var vtn_p3 = new Image;
vtn_p3.src = "../main/images/vtn_p3.png"

function initIcon() {
	
	var ventana = $('vtn01');
	var boton = $('btnCR');
	
	var fxVtn = ventana.effects();
	var fxBtn = boton.effects();
 
 
	boton.addEvent('mousedown', function() {
		boton.setDisplay (0);
		ventana.setDisplay (1);
	});
	
	ventana.addEvent('mousedown', function() {
		boton.setDisplay (1);
		ventana.setDisplay (0);
	});
}

function contentBlock (estado) {
		
	switch (estado) {

		case 0:
			$('bloqueo').setStyle ('display', 'none');
		break;

		case 1:
			$('bloqueo').setStyle ('display', 'block');
		break;

	}
}

function btnsMenu (idBtn, functionBtn) {
	var menuBar = $$('#menuBar div');

	// Habilitamos Boton
	menuBar[idBtn].setStyles({
		'background-position': '-150px top',
		'cursor': 'pointer'
	});
	
	// Agregamos eventos
	menuBar[idBtn].addEvents ({
		'mouseenter': function () {menuBar[idBtn].setStyle('background-position', '-300px top')},
		'mouseleave': function () {menuBar[idBtn].setStyle('background-position', '-150px top')},
		'mousedown': functionBtn 
	});
}

function confMenu () {
	
	var menuBar = $$('#menuBar div');
	
	if (arguments[0]) btnsMenu (0, initAct);


	if (arguments[1]) btnsMenu (1, checkAct);


	if (arguments[2]) {
		btnsMenu (2, function () {
			var link = (document.location).toString ();
			var arrlink = link.split ('/');
			var letraNext = String.fromCharCode (arrlink[arrlink.length-1].charCodeAt(5) - 1);
			var actNext = arrlink[(arrlink.length) -1].substr (0, 5) + letraNext;
				
			var linkNext = link.substr (0, link.length - arrlink[(arrlink.length)-1].length - arrlink[(arrlink.length)-2].length - 1) + actNext + '/' + actNext + '.html';
			document.location = linkNext;
		});
	}


	if (arguments[3]) {
		btnsMenu (3, function () {
				var link = (document.location).toString ();
				var arrlink = link.split ('/');
				var letraAct = arrlink[arrlink.length-1].substring (3, 4);
				
				var menuAct = link.substr (0, link.length - arrlink[(arrlink.length)-1].length - arrlink[(arrlink.length)-2].length - 1) + 'menu' + letraAct + '.html';
				document.location = menuAct;
			});
	}


	if (arguments[4]) {
		btnsMenu (4, function () {
			var link = (document.location).toString ();
			var arrlink = link.split ('/');
			var letraNext = String.fromCharCode (arrlink[arrlink.length-1].charCodeAt(5) + 1);
			var actNext = arrlink[(arrlink.length) -1].substr (0, 5) + letraNext;
				
			var linkNext = link.substr (0, link.length - arrlink[(arrlink.length)-1].length - arrlink[(arrlink.length)-2].length - 1) + actNext + '/' + actNext + '.html';
			document.location = linkNext;
		});
	}
}

var reLoad = function () {
	var link = (document.location).toString ();
	var arrLink = link.split ('/');
	var linkURI = arrLink [arrLink.length - 1];
	document.location = linkURI;
}


Element.extend({
/*
section: Propiedades, Metodos y Eventos Adicionales.

Method: setPosition
Setter de la posicion de un elemento.

	Argumentos:
		options - vector de coordenadas asociativo {x: valorX, y: valorY}.

	Metodos Relacionados:
		<Element.getPosition>
*/
	setDisplay: function (state) {
		if (!state) this.setStyle ('display', 'none');
		else this.setStyle ('display', 'block');
	}
});