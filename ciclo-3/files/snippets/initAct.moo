/*
	category: mooTools
	name: initAct2 ()
	toolTip: Script de Inicio de Actividad
	
	toolbar: true
	icon: com.aptana.ide.snippets/icons/comment_block.png
	language: text/css
	
	prompt(objeto): Nombre del objeto
	prompt(delay): Delay de Animaciones de Drags
*/

	// function initAct() de ${objeto}
	var initAct2 = function () {
		${objeto}.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ${objeto}.options.adjDrags[iD].y],
				opacity: 1
			})}).delay (${delay}*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();