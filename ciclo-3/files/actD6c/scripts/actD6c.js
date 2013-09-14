// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

var sonidos = aPlayer.Base ();
	confMenu (1, 0, 1, 1, 0);
	var flags = $$('#flags div');
	var setCircular = function (obj, options) {
		var angulo = 2 * Math.PI / obj.length;
		var arrTmp = new Array (obj.length);
		obj.each (function (el, iE) {
			// Efectos
			el.Fx = el.effects({wait: false, duration: 500});
			var alfa = angulo * iE;
			// Generamos array temporal con propiedades de ubicacion espacial		
			arrTmp[iE] = {
				left: (Math.sin(alfa) * (-options.width / 2) + options.left).toInt(),
				top: (Math.cos(alfa) * (-options.height / 2) + options.top).toInt()
			};
		});

	// ahora desordenamos array
	arrTmp.randomize ();

	obj.each (function (el, iE) {
		el.setOpacity (0);
		el.setStyles (arrTmp[iE]);
		
		(function () {el.Fx.start ({
			opacity: 1
		})}).delay (100*iE);
	}, this);
};	
	flags.each(function(flag,iFlag){
		flag.setStyle('background-position', iFlag * (- 156));
		});

var opciones = {
	width: 800,
	height: 430,
	left: 400,
	top: 230
};
setCircular (flags, opciones);

});