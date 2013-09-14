window.onload = function () {
	var indActividad = {
		'a': 0,
		'b': 1,
		'c': 2,
		'd': 3,
		'e': 4,
		'f': 5,
		'j': 6,
		'h': 7,
		'i': 8,
		'k': 9,
		'g': 10
	};
	
	var tipoSeccion = linkUrlSecction();

	var fxOPC2 = new Array (11);
	var opcsMenu2 = $$('#menuOPC div', '#menuOPC span');
	var opts = $$('#mainActvs table tr');
	var actvs = $$('#mainActvs table');

	var tabla = $$('#mainActvs table tr td');
	for (var i = 0;i< tabla.length; i++){
		j = i % 4;
		switch (j) {
			case 0: tabla[i].setStyle('width','10px');
				break;		
			case 1: tabla[i].setStyle('width','175px');
				break;
			case 2: tabla[i].setStyle('width','450px');
				break;
			case 3: tabla[i].setStyle('width','365px');
				break;
		};
	};

	if (tipoSeccion != '') {
		actvs[indActividad[tipoSeccion]].setStyle('display', 'block');
		opcsMenu2.setStyle('display', 'none');

		$('mainMenu').setStyle('display', 'block');
		$('cartelAct').setStyles ({
			'display': 'block',
			'background-position': indActividad[tipoSeccion] * (-450) + 'px 0px'
		});

		$('ciclo').setStyle('display','none');
		$$('#MacmillanTit').setStyle('display', 'none');
		$('header').setStyle('background-image', 'url(main/images/cene_' + tipoSeccion + '.gif)');
	};

	opcsMenu2.each (function (opcion, iOPC) {
		opcion.setStyles ({
			'background-position': iOPC*(-280) + 'px 0px'
		});
		
		fxOPC2[iOPC] = new Fx.Styles(opcion, {
			duration: 1000,
			wait:false
		});
	});

		var colorFila = true;
		
		opts.each (function (opt, idOpt) {
			
			if (colorFila) {
				opt.toggleClass('filaCebra0');
				colorFila = false;
			}
			else {
				opt.toggleClass('filaCebra1');
				colorFila = true;
			};

			var bgcolor;
			opt.addEvents ({
			 	'mouseenter': function () {
			 		bgcolor = this.getStyle('background-color');
					this.setStyles ({
						'background-color': '#ff9'
					});
				},
		
				'mouseleave': function () {
					this.setStyles ({
						'text-decoration': 'none',
						'background-color': bgcolor
					});
				},

				'click': function () {
					openWin('act' + this.getProperty('act') + '/act' + this.getProperty('act') + '.html', 'act' + this.getProperty('act'));
				}
			});
		});
};

function sizeScreen () {
	var sizeSc = new Array (2);
	sizeSc = [window.screen.width, window.screen.height];
	return sizeSc;
};

function openWin (urlWin, titWin) { 
	var size = new Array(2);
	size = sizeScreen();
	var optsWin = "width=" + size[0] + ",height=" + size[1] + ",left=0,top=0,resizable=YES, scrollbar=YES"; 
//	window.open(urlWin, titWin, optsWin);
	location.href= urlWin;
};

function linkUrlSecction() {
	uri = (location.href).substr(location.href.length - 1, 1);

	if (uri != 'm') return uri;
	else return '';
};
