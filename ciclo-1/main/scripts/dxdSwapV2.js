function dxdSwapV2 (dyds) {

	if (dyds == undefined ) var dyds = $$('#dyds .dyd');

	var nameClass = dyds.getParent().getProperty ('class')[0];
	var confClass =  ((nameClass.substring( 5, nameClass.length)).split('x'));

	confClass.each (function (el, iEl) {
		confClass[iEl] = el.toInt();
	});

	dyds.each (function (dyd, iDyD) {

		dyd.setStyles ({
			'left': dydsLT [iDyD][0],
			'top': dydsLT [iDyD][1]
		});

		var elems = dyd.getElements ('div');
		
		var drags = new Array (elems.length / 2);
	
		var drops = new Array (elems.length / 2);

		var indDrag;

		var iniDrop;

		var posDrag = new Array (elems.length / 2);

		var fxDragVa;
		var fxDragViene;

		for (i=0; i < elems.length / 2; i++) {
			drags[i] = elems[i];
			drops[i] = elems[i + elems.length / 2];
			posDrag [i] = i;
		};

		drags.each (function (drag, iDrag) {
			
			drag.setStyles ({
				'left': dydsLT [iDrag][0], 
				'top': dydsLT [iDrag][1],
				'z-index': 35,
				'background-position': (-250)*iDrag + 'px 0px',
				'cursor': 'pointer'
			});
			
			new Drag.Move (drag, {
				container: $('content'),
				droppables: drops
			});

			drag.addEvents ({
				'mousedown': function () {
				
					drag.allowedBlock = true;

					this.setStyles ({
						'z-index': 50
//						'background-position': (-confClass[2] - confClass[0] * 3) + 'px -' + confClass[3] + 'px'
						});
						
					indDrag = iDrag;

					iniDrop = posDrag.indexOf(iDrag);

					fxDragVa = drag.effects({
						duration: 200,
						onComplete: function () {
//							fxDragViene.start ();
							contentBlock (0);
						}
					});
				},
				
				'mouseup': function () {
					if (drag.allowedBlock) {
						this.setStyle ('z-index', 35);
						contentBlock (1);
						drag.allowedBlock = false;
					};
				},
				
				'emptydrop': function () {
					fxDragVa.start ({
						'left': dydsLT [iDrag][0], 
						'top': dydsLT [iDrag][1]
					});
				},
				
				'mouseenter': function () {
//					this.setStyle ('background-position', (-confClass[2] - confClass[0] * 2) + 'px -' + confClass[3] + 'px');
					soundManager.play('sndTic');
				}
			});
		});

		drops.each (function (drop, iDrop) {
			drop.setStyles ({
				'left': dydsLT [iDrop][0], 
				'top': dydsLT [iDrop][1],
				'z-index': 0,
				'background-image': 'none'
			});
		
			drop.addEvents ({
				'drop': function () {

					var dragVa = posDrag [iDrop];

					posDrag[iDrop] = indDrag;
					posDrag[iniDrop] = dragVa;

					fxDragViene = drags[dragVa].effects({
						transition:Fx.Transitions.Back.easeOut
					});

					drags[indDrag].setStyle ('z-index', 35);

					fxDragViene.start ({
							'left': dydsLT [iniDrop][0], 
							'top': dydsLT [iniDrop][1]
						}).chain (function () {
							fxDragVa.start ({
								'left': dydsLT [iDrop][0], 
								'top': dydsLT [iDrop][1]
							}).chain (function () {

								if (indDrag == ans[iDrop]) {

									drags[indDrag].setStyles ({
										'background-color': '#AFA'
									});

									soundManager.play('sndGood');
								}
								else {
										drags[indDrag].setStyles ({
										'background-color': 'transparent'
									});
								};

								if (dragVa == ans[iniDrop]) {

									soundManager.play('sndGood');
								}
								else {
										drags[dragVa].setStyles ({
										'background-color': 'transparent'
									});
								};
								
							});
					});
				}
			});
		});
	});
};
