function sizeScreen () {
	var sizeSc = new Array (2);
	sizeSc = [window.screen.width, window.screen.height];
	return sizeSc;
}

function openWin (urlWin, titWin) { 
	var size = new Array(2);
	size = sizeScreen();
	var optsWin = "width=" + size[0] + ",height=" + size[1] + ",left=0,top=0,resizable=YES, scrollbar=YES"; 
	window.open(urlWin, titWin, optsWin);
}

window.onDomReady (function () {
	
	var sizeSc = new Array (2);
	sizeSc = sizeScreen();
	$('impRes').setText (sizeSc[0] + ' x ' + sizeSc[1]);

	var szNormal = 94, szSmall  = 74, szFull   = 280;
	
	var kwicks = $$("#actMenu div");
	var fx = new Fx.Elements(kwicks, {
		wait: false,
		duration: 300
		});


kwicks.each(function(kwick, i) {

	var bgcolor = new Array (10);
	bgcolor = ['#BFA', '#FFC', '#EEE', '#BAF', '#FAA', '#CAF', '#BBF', '#FFD', '#BBE', '#F99', '#FBE']

	var urlImg = 'main/images/menu' + i + '.gif';
	kwick.setStyles ({
		'background-image': 'url(' + urlImg + ')',
		'background-color': bgcolor[i]
	});

	kwick.setOpacity (0.4);
	
	kwick.addEvent("mouseenter", function(event) {
		var o = {};
		o[i] = {width: [kwick.getStyle("width").toInt(), szFull]}
		kwicks.each(function(other, j) {
			if(i != j) {
				var w = other.getStyle("width").toInt();
				if(w != szSmall) o[j] = {width: [w, szSmall]};
			}
		});
		fx.start(o);

		kwick.setOpacity (1)

	});

	kwick.addEvent ('mouseleave', function () {
		kwick.setOpacity (0.4)
	});

});
 
$('actMenu').addEvent("mouseleave", function(event) {
	var o = {};
	kwicks.each(function(kwick, i) {
		o[i] = {width: [kwick.getStyle("width").toInt(), szNormal]}
	});
	fx.start(o);
})

	var opts = $$('#actMenu div span');

		opts.each (function (opt, idOpt) {
			opt.addEvents ({
			 	'mouseenter': function () {
					this.setStyles ({
						'color': '#A05',
						'font-weight': 'bold',
						'text-decoration': 'underline'
					});
				},
		
				'mouseleave': function () {
					this.setStyles ({
						'color': 'black',
						'font-weight': 'normal',
						'text-decoration': 'none'
					});
				},

				'click': function () {
					openWin('act' + this.getProperty('act') + '/act' + this.getProperty('act') + '.html', 'act' + this.getProperty('act'));
				}
			});
		});
});
