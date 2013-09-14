window.onDomReady (function() {
	initIcon();

	var imgDrags = $$('#imgDrags div');
	var txtDrags = $$('#txtDrags div');
	var imgDrop = $('imgDrop');
	var txtDrop = $('txtDrop');
	var indDrop;

	initAct ();

	$('restart').addEvent ('mousedown', function () {
		reInitAct();
	});

	function reInitAct () {
		txtDrop.setText ('');
		imgDrop.setStyle ('background-position', -900);
		imgDrop.droped=false;
		indDrop=undefined;
		txtDrags.each (function (txtDrag, i) {
			txtDrag.setStyles ({
				'top': xytxtDrags[i][0],
				'left': xytxtDrags[i][1],
				'display': 'block'
			});
		});
	};

	function initAct () {
		imgDrags.each (function (imgDrag, i) {
			imgDrag.setStyles ({
				'top': xyimgDrags[i][0] + 230,
				'left': xyimgDrags[i][1] + 30,
				'background-position': -150 * i
			});

			new Drag.Move (imgDrag, {
				droppables: $('imgDrop'),
				container: $('content')
			});

			imgDrag.addEvents ({
				
				'mouseenter': function (el, obj) {
					this.setStyle ('border-color', '#fc3');
				},

				'mouseleave': function (el, obj) {
					this.setStyle ('border-color', '#aaa');
				},

				'mousedown': function(el, obj) {
					imgDrag.Ind = i;
			
					this.setStyle ('z-index', 400);

					fxDrag = imgDrag.effects({
						transition:Fx.Transitions.Back.easeOut,
						onComplete: function () {
							imgDrag.setStyle ('z-index', 300);
						}
					});
				},

				'emptydrop': function(){
					this.setStyle ('border-color', '#aaa');

					fxDrag.start({
						'top': xyimgDrags[i][0] + 230,
						'left': xyimgDrags[i][1] + 30
					});
				}
			});
		});
			
		imgDrop.addEvents ({
			
			'drop': function(drag, drp) {
				if(!this.droped) {
					this.setStyle ('background-position', -150 * drag.Ind);
					indDrop = drag.Ind;
					txtDrop.setText('');
					this.droped = true;
				}
				drag.fireEvent ('emptydrop');

		   	},
			
			'over': function(drag,drp){
				if(!this.droped) {
					this.setStyle('background-position',-150 * drag.Ind);
				}
			},
			'leave': function(drag,drp) {
				if(!this.droped) {
					this.setStyle('background-position',-900);
				}
			}
		});

		txtDrags.each (function (txtDrag, i) {
			txtDrag.setStyles ({
				'top': xytxtDrags[i][0],
				'left': xytxtDrags[i][1],
				'display': 'block'
			});

		new Drag.Move (txtDrag, {
			droppables: $('txtDrop'),
			container: $('content')
		});

		txtDrag.addEvents ({
			'mouseenter': function (el, obj) {
				this.setStyle ('border-color', '#fc3');
			},

			'mouseleave': function (el, obj) {
				this.setStyle ('border-color', 'silver');
			},

			'mousedown': function (el, obj) {
				this.setStyle ('z-index', 400);
				fxDrag = txtDrag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
						txtDrag.setStyle ('z-index', 300);
					}
				});
			},

			'emptydrop': function(){
				this.setStyle ('border-color', 'silver');
				fxDrag.start({
					'top': xytxtDrags[i][0],
					'left': xytxtDrags[i][1]
				});
			}
		});
	});

	txtDrop.addEvents ({
		'drop': function(drag, drp) {
			if (indDrop!=undefined) {
				this.setText (this.getText() + ' ' + drag.getText());
				drag.setStyle('display', 'none');
		
				var texto = (txtDrop.getText()).trim();
				frase = ans[indDrop];
					if ((texto.length <= frase.length) && (texto == frase.substring(0,texto.length) )) {
						correcto = true;
						this.setStyle('color', 'green');
							
						if (texto == frase) {
							this.setText(frase + '.');
						};										
					}
	
					else {
						correcto = false;
						if (texto.length > frase.length) fraseCompleta = false;
						this.setStyle('color', 'red');
					};
			} else drag.fireEvent('emptydrop');	   	
		}
	});
	};
});
