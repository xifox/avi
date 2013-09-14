window.onDomReady(function(){
	initIcon();

var drags = $$('#drags div');
var drops = $$('#drops div');

var iDrag = '';

	$$('#pomos div').each (function (pomo, iPomo) {
		pomo.setStyles ({
			'left': iPomo*245,
			'background-position': -iPomo*250

		});

		pomo.addEvent ('mousedown', function () {
			pomo.setStyle ('background-color', color[iPomo]);
		});
	});

	drags.each(function(drag,i) {

		drag.setStyles ({
			'top': xyDrag[i][0],
			'left': xyDrag[i][1]
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
					});
			},

			'mouseleave': function (el, obj) {
				this.setStyles ({
					'border-color': '#AAA',
					'color': '#555'
					});
			},

			'mousedown': function(el, obj) {
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
			'left': xyDrop[i][1]
		});
	
		drop.addEvents({
			'drop': function(drg, drp) {

				if (ans[i] != -1) {
					
					if (iDrag == ans[i]) {
						ans[i] = -1;
						drags[iDrag].remove();
						this.setText (this.getText().substring (0, this.getText().length - 3) + drags[iDrag].getText() + '!');
						this.setStyles ({
							'color': color[i],
							'border-color': color[i]
						});
					}
					else {
						drags[iDrag].fireEvent ('emptydrop');
					};
				};
		   	},

			'over' : function () {this.setStyle ('border-color', '#800')},
			
			'leave': function () {this.setStyle ('border-color', '#AAA')}
		});
	});
});
