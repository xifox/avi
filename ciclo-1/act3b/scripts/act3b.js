window.onDomReady(function(){

initIcon();

var drags = $$('#drags div');
var dragsFijos = $$('#dragsFijos div');
var drops = $$('#drops div');
var iDrag = '';

	drags.each(function(drag,i) {

		drag.setStyles ({
			'top': xyDrag[i][0],
			'left': xyDrag[i][1]
		});

		dragsFijos[i].setStyles ({
			'top': xyDrag[i][0],
			'left': xyDrag[i][1]
		});
		
		new Drag.Move (drag, {
			droppables: drops,
			container: $('content')
		});

		drag.addEvents({
			'mouseenter': function (el, obj) {
				this.setStyle ('border-color', 'green');
			},

			'mouseleave': function (el, obj) {
				this.setStyle ('border-color', '#fc3');
			},

			'mousedown': function(el, obj) {
			
				this.setStyle ('z-index', 400);

				iDrag = i;

				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
						drag.setStyle ('z-index', 300);
					}
				});
			},

			'emptydrop': function(){
				this.setStyle ('border-color', '#fc3');
				fxDrag.start({
					'top': xyDrag[i][0],
					'left': xyDrag[i][1]
				});
			}
		});
	});

	drops.each(function(drop,i){

	var urlImg = 'images/e'+ i + '.gif';
	var arrImgs = new Array (drops.length);
	arrImgs[i] = new Image();
	arrImgs[i].src = urlImg;

		drop.setStyles ({
			'top': xyDrop[i][0],
			'left': xyDrop[i][1],
			'background-image': 'url("images/e' + i + '.gif")'
		});
	
		drop.addEvents({
			'drop': function(drg, drp) {
					var imgUrl = 'images/e' + i + '.gif';
					if (drags[iDrag].getText() == ans[i].charAt(this.getText().length)) {
						this.setText (this.getText() + drags[iDrag].getText());

						drags[iDrag].setStyles ({
							'top': xyDrag[iDrag][0],
							'left': xyDrag[iDrag][1]
						});

					}
					else drags[iDrag].fireEvent ('emptydrop');

					if (this.getText() == ans[i]) {
						this.setStyles ({
							'color': 'blue'
						});
					};
		   	},

			'leave': function(drg,drp) {
				if (!(this.getText() == ans[i])) {
					var imgUrl = 'images/e' + i + '.gif';
					this.setStyles ({
						'background-image': 'url(' + imgUrl + ')'
					});
				};
		 	},

			'over': function(drg,drp) {
					var imgUrl = 'images/e' + i + '.gif';
					this.setStyles ({
						'background-image': 'url(' + imgUrl + ')'
					});
		 	}
		});
	});
});
