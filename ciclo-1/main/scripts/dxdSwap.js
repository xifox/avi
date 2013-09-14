function dxdSwap (dyds) {

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
				'left': iDrag * (confClass[0] + 3), 
				'z-index': 35,
				'background-position': (-confClass[2] - confClass[0] * 1) + 'px -' + confClass[3] + 'px'
			});
			
			new Drag.Move (drag, {
				droppables: drops
			});

			drag.addEvents ({
				
				'mousedown': function () {
				
					drag.allowedBlock = true;

					this.setStyles ({
						'z-index': 50,
						'background-position': (-confClass[2] - confClass[0] * 3) + 'px -' + confClass[3] + 'px'
						});
						
					indDrag = iDrag;
						
					iniDrop = posDrag.indexOf(iDrag);

					fxDragVa = drag.effects({
						duration: 200,
						onComplete: function () {
//							fxDragViene.start ();
							// Desboqueamos desk
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
						'left': iDrag * (confClass[0] + 3),
						'top': 10
					});
				},
				
				'mouseenter': function () {
					this.setStyle ('background-position', (-confClass[2] - confClass[0] * 2) + 'px -' + confClass[3] + 'px');
					soundManager.play('sndTic');
				},
				
				'mouseleave': function () {
					this.setStyle ('background-position', (-confClass[2] - confClass[0] * 1) + 'px -' + confClass[3] + 'px');
				}
			});
		});

		drops.each (function (drop, iDrop) {
			drop.setStyles ({
				'left': iDrop * (confClass[0] + 3),
				'z-index': 0,
				'background-position': (-confClass[2] - confClass[0] * 0) + 'px -' + confClass[3] + 'px'
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
							'left': iniDrop * (confClass[0] + 3),
							'top': 10
						}).chain (function () {
							fxDragVa.start ({
								'left': iDrop * (confClass[0] + 3),
								'top': 10
							}).chain (function () {
								var number = '';
								(drags.length).times (function (i) {
									letra = drags[posDrag[i]].getText();
									if(letra == '') letra=' ';
									number = number +letra;

								});

								if (number == ans[iDyD]) {
									dyd.setHTML ('<div class="solOk"></div>');

									dyd.getElement('div').setStyles ({
										'cursor': 'default',
										'width': '0px'
									});

									var fxOk = new Fx.Styles(dyd.getElement('div'), {duration:200, wait:false});
									dyd.getElement('div').setText(number);

									dyd.getElement('div').setStyles ({
										'color': '#000',
										'background-image': 'none',
										'border-width': 1,
										'background-color': '#FFF'
									});
									
									fxOk.start ({
										'width': number.length * 26

									}).chain (function () {
										soundManager.play('sndOk');
										dyd.getElement('div').setStyle('border-color', '#8A8');   
									});
								};
							});
					});
				}
			});
		});
	});
};
