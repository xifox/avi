window.onDomReady(function() {

	initSounds (0, false);
	initIcon();  //Iniciamos el icono de las instrucciones para el profesor

	//	Variables Globales
	var drags = $$('#drags div');
	var drops = $$('#drops div');
	// Configuraciones Iniciales

	// Recuperamos los parametros de los drags y drops en funcion del nombre de clase
	var nameClass = drags.getParent().getProperty ('class')[0];
	confClassDrag =  ((nameClass.substring(5,nameClass.length)).split('x'));

	confClassDrag.each (function (el, iEl) {
		confClassDrag[iEl] = el.toInt();
	})

	nameClass = drops.getParent().getProperty ('class')[0];
	confClassDrop =  ((nameClass.substring(5,nameClass.length)).split('x'));

	confClassDrop.each (function (el, iEl) {
		confClassDrop[iEl] = el.toInt();
	})
	/************
	*   DRAGS   *
	*************/

	drags.each (function (drag, iDrag) {
		//Decidimos que drags son validos
		if (ans[iDrag] !=0) drag.state = true;
		// Hacemos los elementos Dragables
		new Drag.Move (drag, {
			droppables: drops,
			container: $('content')
		});

		drag.setStyles ({
			'left': xyDrags [iDrag][0],
			'top': xyDrags [iDrag][1]
		});

		drag.addEvents({
			'mouseenter': function () { 
				this.setStyle('background-position', (-confClassDrag[2] - confClassDrag[0] * 2  )+ 'px ' + -1 * confClassDrag[3] + 'px');
				soundManager.play('sndTic');
			},

			'mouseleave': function () {
				this.setStyle('background-position', (-confClassDrag[2] - confClassDrag[0] * 1  )+ 'px ' + -1 * confClassDrag[3] + 'px');
			},
			'mousedown': function(el, obj) {

				// Elevamos el drag
				this.setStyles ({
					'z-index': 40
				});

				// Memorizamos indice de Drag
				drag.id = iDrag;

				//	Efecto visual del drag
				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
					drag.setStyle ('z-index', 30);
					}
				});
			},
			'emptydrop': function(a, b, c) {
				fxDrag.start({
					'left': xyDrags[iDrag][0],
					'top': xyDrags[iDrag][1]
				});
			}


		});
	});

	/************
	*   DROPS   *
	*************/

	drops.each(function(drop, iDrop){

		drop.setStyles ({
			'left': xyDrops[iDrop][0],
			'top': xyDrops[iDrop][1]
		});
	
		drop.addEvents({
			'drop': function(drag, drp) {
				// Decidimos solucion
				if ((ans[iDrop] != -1) && (drag.state)) {
					//Anulamos el Drop
					drag.state  = false;
					ans[iDrop] = -1;
					soundManager.play('sndOk');
					// Copiamos el html del drag y se lo ponemos al Drop
					this.setHTML (drag.innerHTML);
					this.setStyle ('border-color','#dd8');
					// Eliminamos drag
					drag.remove();
					
				}
				// Si la comparación falla, el drag vuelve con Efecto
				else {
					soundManager.play('sndError');
					drop.fireEvent('leave');
					drag.fireEvent ('emptydrop');
					}
				},
			'over': function(drag) {
				if(ans[iDrop] !=-1) {
					this.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 1  )+ 'px ' + -1 * confClassDrop[3] + 'px');
				}
			},
			'leave': function (drag) {
				if(ans[iDrop] !=-1) {
					this.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 0  )+ 'px ' + -1 * confClassDrop[3] + 'px');
				}
			}
		})
	})
})