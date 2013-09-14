// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){
	
	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 1);

	var adjetives = $$('#adjetives div');
	var comparatives = $$('#comparatives div');
	var sword = $$('#sword');
	

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
		
			obj.petAct = -1;


			el.addClass('actC1a-Ini');

			// Eventos
			el.addEvents ({
				'mouseenter': function () {el.addClass ('actC1a-enter')},
				'mouseleave': function () {el.removeClass ('actC1a-enter')},
				'mousedown': function () {

					if (obj.petAct == iE) {
					el.removeClass('actC1a-Act');
						obj.petAct = -1;
					}
					else {
						if (obj.petAct != -1) obj[obj.petAct].removeClass('actC1a-Act');
						el.addClass('actC1a-Act');
						obj.petAct = iE;
					};

					fireEvent (control());
				}
			});
		});

	var control = function () {
		if (adjetives.petAct == comparatives.petAct) {
			$('sword').fxDrag.start ({
				top: [200, 0]
			});
			sword.setText (comparatives[comparatives.petAct].getText());
			soundManager.play ('sndOk');
		};
	};

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

	var opciones = {
		width: 300,
		height: 200,
		left: 200,
		top: 150
	};
	setCircular (adjetives, opciones);

	var opciones = {
		width: 300,
		height: 200,
		left: 700,
		top: 150
	};
	setCircular (comparatives, opciones);

	var drops = $$('#texts');

	// objeto actC1a tipo DxD.Base
	var actC1a = new DxD.Text (sword, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: [{x: 425, y: 0}],
		cssClass: 'sword'
	});
	
	actC1a.addEvent ('trueDrop', function (drag, drop){
		drag.setText ('?');
		
	});
	
	sword.setOpacity (0);
	
	// function initAct() de actC1b
	var initAct2 = function () {
		(function () {$('sword').fxDrag.start ({
			top: [200, 0],
			opacity: 1
		})}).delay (1000);
	};

	// Llamamos inicio de Actividad
	initAct2();
	
	
});