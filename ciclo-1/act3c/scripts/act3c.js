window.onDomReady(function(){

initIcon();

var drags = $$('#drags div');
var drops = $$('#drops div');
var iDrag = '';

	$$('#frases p').each (function (texto, iTxt) {
		texto.setStyle ('top', iTxt*30);
	});

	drags.each(function(drag,i) {
		drag.setStyles ({
			'top': xyDrag[i][0],
			'left': xyDrag[i][1],
			'background-position': '-150px -'+ (100*i).toString() + 'px'
		});
	
		new Drag.Move (drag, {
			droppables: drops,
			container: $('content')
		});

		drag.addEvents({
			'mouseenter': function (el, obj) {
				this.setStyle ('background-position', '-300px -'+ (100*i).toString() + 'px');
			},
			'mouseleave': function (el, obj) {
				this.setStyle ('background-position', '-150px -'+ (100*i).toString() + 'px');
			},
			'mousedown': function(el) {
				iDrag = i;
		
				this.setStyle ('z-index', 50);

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
			'left': xyDrop[i][1],
			'background-position': '0 -'+ (100*i).toString() + 'px'
		});
	
		drop.addEvents({
			'drop': function(drg, drp) {

				if (ans[i] != -1) {
					if (iDrag == ans[i]) {
						ans[i] = -1;
						this.setStyle ('background-position', '-450px -'+ (100*iDrag).toString() + 'px');
						drags[iDrag].remove();
						$$('#frases p')[iDrag].setStyles ({
							'font-weight': 'bold'
						});
						var frases = $$('#frases p');
						var txtDrag = frases[iDrag].effects({transition:Fx.Transitions.Back.easeOut});

						txtDrag.start ({
							'top': xyDrop[i][0]
						});
					} else {
						this.fireEvent ('leave');
						drags[iDrag].fireEvent ('emptydrop');
					};
				};
		   	},
			'over': function(el, obj) {
				if (ans[i] != -1) this.setStyle ('background-position', '-600px -'+ (100*i).toString() + 'px');
			},
			'leave': function(el, obj) {
				if (ans[i] != -1) this.setStyle ('background-position', '0px -'+ (100*i).toString() + 'px');
			}
		});
	});
});
