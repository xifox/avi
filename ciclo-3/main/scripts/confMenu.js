window.addEvent('load', function() {

	var colorFila = true;
	var activities = $$('#menu-activities table tr');
	activities.each (function (opt, idOpt) {
		
		if (colorFila) {
			opt.toggleClass('filaCebra0');
			colorFila = false;
		}
		else {
			opt.toggleClass('filaCebra1');
			colorFila = true;
		}

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
});



function sizeScreen () {
	var sizeSc = new Array (2);
	sizeSc = [window.screen.width, window.screen.height];
	return sizeSc;
}

function openWin (urlWin, titWin) { 
	var size = new Array(2);
	size = sizeScreen();
	var activitiesWin = "width=" + size[0] + ",height=" + size[1] + ",left=0,top=0,resizable=YES, scrollbar=YES";
	location.href= urlWin;
}

function linkUrlSecction() {
	uri = (location.href).substr(location.href.length -1, 1);
	
	if (uri != 'l')
		return uri;
	else return '';
}
