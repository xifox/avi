window.onDomReady(function() {
	initSounds (2, false);
	initIcon();

	var drags = $$('#drags div');
	var drops = $$('#drops div');
	var sounds = $$('#sound div');

	sounds.each (function (snd, iSnd) {
		snd.setStyles({'left': iSnd * 500 + 400});
		snd.addEvent('click', function() {
			soundManager.play('snd' + iSnd);
		});
	});

	drags.each (function (drag, iDrag) {

		new Drag.Move (drag, {
			droppables: drops,
			container: $('content')
		});

		drag.setStyles ({
			'left': xyDrag [iDrag][0],
			'top': xyDrag [iDrag][1],
			'background-position': (xyDrag [iDrag][2]*(-1)).toString() + 'px top',
			'width': xyDrag [iDrag][3],
			'padding-top':xyDrag[iDrag][4] * 30 + 12,
			'height': 62 - xyDrag[iDrag][4] * 30

		});

		drag.addEvents({
			'mousedown': function(el, obj) {

				this.setStyles ({
					'z-index': 40
				});

				drag.id = iDrag;

				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
					drag.setStyle ('z-index', 30);
					}
				});
			},


			'emptydrop': function(a, b, c) {
				drag.setStyle ('background-position', (xyDrag [iDrag][2]*(-1)).toString() + 'px top');
			
				fxDrag.start({
					'left': xyDrag[iDrag][0],
					'top': xyDrag[iDrag][1]
				});
			},

			'mouseenter': function () {
				drag.setStyle (
					'background-position', (xyDrag [iDrag][2]*(-1) - 1030).toString() + 'px top'
				);
				
			},

			'mouseleave': function () {
				drag.setStyle (
					'background-position', (xyDrag [iDrag][2]*(-1)).toString() + 'px top'
				);
				
			}
		});
	});

	drops.each(function(drop, iDrop){

		drop.setStyles ({
			'left': xyDrop[iDrop][0],
			'top': xyDrop[iDrop][1],
			'width': xyDrag[iDrop][3],
			'padding-top':xyDrag[iDrop][4] * 30 + 12,
			'height': xyDrop[iDrop][2]

		});
	
		drop.addEvents({
			'drop': function(drag, drp) {
				var imgUrl = '';

				if (ans[drag.id] == iDrop) {
					soundManager.play('sndOk');

					this.setHTML (drag.innerHTML);
					this.setStyle ('background-position', (xyDrag [iDrop][2]*(-1)).toString() + 'px top');

					drag.remove();
				}

				else {
					drag.fireEvent ('emptydrop');
					drop.fireEvent('leave');
				}
			}
		})
	})

})
