window.addEvent('load', function() {

	var fxOPC2 = new Array (16);
	var menuSection = $$('#menu-section div');
	var sections = $$('#menu-activities table');

	menuSection.each (function (opcion, iOPC) {
		opcion.setStyle ('background-position', iOPC * (-280) + 'px 0px');
	});
	
	// Acomodamos Teacher's Notes
	menuSection[menuSection.length - 1].setStyles ({
		position: 'absolute',
		left: 333,
		bottom: 4,
		color: '#000'
	});
});
