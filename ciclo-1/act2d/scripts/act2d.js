window.onDomReady(function(){
	initSounds (0, false);

	var fxVtn = new Fx.Styles($('vtn01'), {
					'duration': 500,
					'wait': false,
					'onComplete': function (el) {
						if (el.getStyle('opacity') == '0.01') el.setStyle ('display', 'none');
					}
				});
 
	$('btnCR').addEvent('click', function() {
		fxVtn.start({
			'opacity': 1,
			'filter': 'alpha(opacity=10)',
			'-moz-opacity': 0.1
		});
		$('vtn01').setStyle ('display', 'block');
	});
 
	$('vtn01').addEvent('click', function(){
		fxVtn.start({
			'opacity': 0.01,
			'filter': 'alpha(opacity=1)',
			'-moz-opacity': 0.01
		});

	});

var drags = $$('#drags div');
var drops = $$('#drops div');



var iDrag = '';

	drags.each(function(drag,i) {
	var urlDrag = 'images/dg' + i + '.gif';

		drag.setStyles ({
			'top': xyDrag[i][0],
			'left': xyDrag[i][1],
			'background-image': 'url('+ urlDrag +')'
		});
		
		new Drag.Move (drag, {
			droppables: drops,
			container: $('content')
		});

		drag.addEvents({
			'mouseenter': function (el, obj) {
				this.setStyles ({
					'border-color': 'green',
					'color': '#040'
					})
			},

			'mouseleave': function (el, obj) {
				this.setStyles ({
					'border-color': 'white',
					'color': '#555'
					})
			},

			'mousedown': function(el, obj) {
				iDrag = i;
				
				this.setStyle ('z-index', 40);

				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
						drag.setStyle ('z-index', 30);
					}
				});
			},

			'emptydrop'  : function(){
				fxDrag.start({
					'top': xyDrag[i][0],
					'left': xyDrag[i][1]
				});
			}
		});
	});

	drops.each(function(drop,i){

		drop.setStyles ({
			'top': xyDrop[i][0],
			'left': xyDrop[i][1]
		});
	
		drop.addEvents({
			'drop': function(drag, drp) {
				var imgUrl = '';

				if (ans[i] != -1) {
					
					if (iDrag == ans[i]) {
						soundManager.play('sndOk');
						imgUrl = 'images/dg' + iDrag + '.gif';
						ans[i] = -1;
						drags[iDrag].remove();
						this.setText (drags[iDrag].getText());
						this.setStyle ('background-image', 'url('+ imgUrl +')'); 
					} else {
						soundManager.play('sndError');
						drag.fireEvent('emptydrop');
						this.fireEvent('leave');
						this.setStyle('background-image', 'url(images/imgCir.gif)');
					}

				};
		   	},

			'leave': function(drg,drp) {
				if (ans[i] != -1) {
					this.setStyle('background-image', 'url( images/imgCir.gif)');
				}
		 	},

			'over': function(drg,drp) {
				if (ans[i] != -1) {

					this.setStyle('background-image', 'url(images/hovCir.gif)');
				}
		 	}
		});
	});
});
