window.addEvent('load', function() {

	var fxOPC2 = new Array (16);
	var menuSection = $$('#menu-section div');
	var sections = $$('#menu-activities table');

	menuSection.each (function (opcion, iOPC) {
		opcion.setStyle ('background-color', bgColorMenu[iOPC]);
	});
	
	// Acomodamos Teacher's Notes
	menuSection[menuSection.length - 1].setStyles ({
		position: 'absolute',
		left: 333,
		bottom: 50,
		color: '#000'
	});
});

var bgColorMenu = new Array(12);
bgColorMenu = ['#54a6cf', '#ff7f00', '#7851ac', '#975829', '#0c0cfb', '#03a563', '#8a94ef', '#ea4b40', '#ffa500', '#a8d2e5', '#fd0713', '#db7990'];