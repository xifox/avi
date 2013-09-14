window.onDomReady (function() {

	initSounds (0, false);
	initIcon();

	var drags = $$('#drags div');
	var txtDrop = $('txtDrop');
	var correcto = false;
	var fraseCompleta = false;
	var dragsFijos = $$('#dragsFijos div');
	var nameClass = drags.getParent().getProperty ('class')[0];
	 confClassDrag =  ((nameClass.substring(5,nameClass.length)).split('x'));

	confClassDrag.each (function (el, iEl) {
		confClassDrag[iEl] = el.toInt();
	});

	drags.each (function (drag, iDrag) {
		drag.setStyles ({
			'left': xyDrags[iDrag][0],
			'top': xyDrags[iDrag][1]
		});

		dragsFijos[iDrag].setStyles ({
			'left': xyDrags[iDrag][0],
			'top': xyDrags[iDrag][1]
		});

		new Drag.Move (drag, {
			droppables: txtDrop,
			container: $('content')
		});

		drag.addEvents ({
			'mouseenter': function () { 
				this.setStyle('background-position', (-confClassDrag[2] - confClassDrag[0] * 2  )+ 'px ' + -1 * confClassDrag[3] + 'px');
				soundManager.play('sndTic');
			},

			'mouseleave': function () {
				this.setStyle('background-position', (-confClassDrag[2] - confClassDrag[0] * 1  )+ 'px ' + -1 * confClassDrag[3] + 'px');
			},


			'mousedown': function(el, obj) {
			
				this.setStyle ('z-index', 400);

				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
						drag.setStyle ('z-index', 300);
					}
				});
			},

			'emptydrop': function(){
				this.setStyle ('border-color', '#aaa');
				fxDrag.start({
					'left': xyDrags[iDrag][0],
					'top': xyDrags[iDrag][1]
				});
			}
		});
	});

	txtDrop.addEvents ({
		'drop': function(drag, objDrops) {
			drag.fireEvent ('emptydrop');
			txtDrop.fireEvent ('leave');
			txtDrop.setText (txtDrop.getText() + ' ' + drag.getText());
			var texto = (txtDrop.getText()).trim();
			for (var i =0; i<=11; i++) {
				frase = ans[i];
				if ((texto.length <= frase.length) && (texto == frase.substring(0,texto.length) )) {
						if (texto == frase) {
							txtDrop.setText (texto + '.');
							contentBlock (1);
							soundManager.play ('sndGood');
						}
					correcto = true;
					break;
				} else {
					correcto = false;
					if (texto.length > frase.length) fraseCompleta = false;
				}
			};
			if (correcto) {
				//contentBlock (1);
				txtDrop.setStyle('color', 'green');
			}
			else txtDrop.setStyle('color', 'red');
			

	   	},
		'over': function(drag, objDrops) {
				this.setStyle ('background-position', -820);
		},
		'leave': function(drag, objDrops) {
				this.setStyle ('background-position', 0);
		}
	});

	$('btnReinicio').addEvents ({
		'mousedown': function () {
			contentBlock (0);
			txtDrop.setText('');
			},
		'mouseenter': function () {$('btnReinicio').setStyle('background-color', '#AFA');},
		'mouseleave': function () {$('btnReinicio').setStyle('background-color', '#DFF');}
	});
});
