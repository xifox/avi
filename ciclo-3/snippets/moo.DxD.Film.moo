/*
	category: mooTools
	name: DxD.Film
	toolTip: Configuración Básica para una crear un objeto tipo DxD.Film
	
	toolbar: true
	icon: com.aptana.ide.snippets/icons/comment_block.png
	language: text/css
	
	prompt(objeto): Nombre del objeto
	prompt(drags): filtro HTML de los Drags
	prompt(drops): filtro HTML de los Drops
*/

	// Drags y Drops
	var drags = $$('#${drags} div');
	var drops = $$('#${drops} div');

	// objeto ${objeto} tipo DxD.Film
	var ${objeto} = new DxD.Film (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: '${objeto}'
	});