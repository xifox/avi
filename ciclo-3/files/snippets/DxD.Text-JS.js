/*
	category: DxD.Text
	name: codigo basico JS
	toolTip: Configuración Básica para una crear un objeto tipo DxD.Text
	
	toolbar: true
	icon: com.aptana.ide.snippets/icons/comment_block.png
	language: text/css
	
	prompt(objeto): Nombre del objeto
	prompt(drags): filtro HTML de los Drags
	prompt(drops): filtro HTML de los Drops

	prompt(cantidad_drags): cantidad de elementos
	prompt(x): coordenada X.
	prompt(y): coordenada Y.

*/

	// DxD.Text | Drags y Drops
	var drags = $$('#${drags} div');
	var drops = $$('#${drops} div');

	// Array de coordenadas Drags 'adjDrags_${objeto}'
	var adjDrags_${objeto} = new Array (${cantidad_drags});
	adjDrags_${objeto} = [
		{x: ${x}, y: ${y}},
	];
	
	// Desordenamos Objetos
	adjDrags_${objeto}.randomize ();
	
	// Construccion de objeto '${objeto}' tipo DxD.Text
	var ${objeto} = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: adjDrags_${objeto},
		cssClass: '${objeto}'
	});
	
	// Evento TrueDrop
	${objeto}.addEvent ('trueDrop', function (drag, drop) {

	});

	// Animacion Inicial 'ini_${objeto} ()
	var ini_${objeto} = function () {
		${objeto}.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, adjDrags_${objeto}[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};

	// Llamamos a la animacion inicial 'ini-${objeto}'.
	ini_${objeto} ();