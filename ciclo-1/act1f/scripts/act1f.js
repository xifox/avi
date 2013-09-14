window.onDomReady(function() {
	initSounds ( 4, false);
	initIcon();

var drag = $('drag');
var drops = $$('#drops div');
var vectorSnd = $$('#sound div');
var iSonido;
	vectorSnd.each(function(snd, iSnd){	
		snd.addEvents({
			'mousedown': function(el, obj) {
				soundManager.play('snd' + iSnd);
				iSonido = iSnd;
			}
		});
	});

		new Drag.Move (drag, {
			droppables: drops,
			container: $('content')
		});

		drag.addEvents({
			'mousedown': function(el, obj) {
				this.setStyle ('z-index', 40);

				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
					drag.setStyle ('z-index', 30);
					}
				});
			},

			'emptydrop': function(){
				fxDrag.start({
					top: 400,
					left: 400
				});
			}
		});

	drops.each(function(drop,i){

	var urlImg = 'images/e'+ i + 'h.gif';
	var arrImgs = new Array (drops.length);
	arrImgs[i] = new Image();
	arrImgs[i].src = urlImg;

		drop.setStyles ({
			'top': xyDrop[i][0],
			'left': xyDrop[i][1],
			'background-image': 'url(images/e' + i + '.gif)'
		});
	
		drop.addEvents({
			'drop': function(drg, drp) {
				var imgUrl = '';

				if (ans[iSonido] == i) {

					imgUrl = 'images/e' + i + 'h.gif';
					this.setStyle ('background-image', 'url('+ imgUrl +')');
					vectorSnd[iSonido].remove();
					soundManager.play('sndOk');
					drg.fireEvent ('emptydrop');
				}

				else drg.fireEvent ('emptydrop');
		   	}
		})
	})
})
