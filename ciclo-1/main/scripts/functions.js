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
	$('bloqueo').setStyle ('opacity', 0.01);
	
		switch (estado) {
			case 0:
				$('bloqueo').setStyle ('display', 'none');
			break;

			case 1:
				$('bloqueo').setStyle ('display', 'block');
			break;

			}
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