var DxD = {};
/*
Script: dxd.class.js
autor: Damian Suarez
email: damian.suarez@xifox.net

Contiene las clases <DxD.Base>, <DxD.Film> y <DxD.Swap>



Class: DxD.Base
	Clase Base para implementar comportamientos Drag And Drops.

Note:
DxD.Base requiere un doctype XHTML.

License:
	Licencia MIT-style.
	
Argumentos:
	drags - Conjunto de Elementos Draggeables
	drops - Conjunto de Elementos Droppeables
	options - Opciones de configuracion.

options:

	var: adjDrags
	Vector de configuracion en formato JSon para los elementos drags. {x: , y: }.
	*default* = []. 

	var: adjDrops
	Vector de configuracion en formato JSon para los elementos drops. {x: , y: }.
	*default* = []. 



	var: autoLevel
	Habilita (o deshabilita) el comportamiento de elevacion de capas automatico de los drags.
	*default* = true.
	Ver Tambien <zIndexBottom>, <zIndexTop>.

	var: zIndexTop
	Valor z-index al cual se 'elevan' los elementos drags sobre un evento mouseenter y mousedown.
	*default* = 1000.
	Ver tambien <zIndexBottom>, <autoLevel>.

	var: zIndexBottom
	Valor z-index del elemento drag mas bajo.
	
	*default* = 0. 
	Los otros elementos drags que configuran con un z-index ascendente en una unidad.
	Ver tambian <zIndexTop>, <autoLevel>.



	var: dragDelete
	Elimina u oculta el drag cuando este 'droppea' exitosamente (evento onTrueDrop).
	*default* = false.
	Puede tomar los siguientes valores:
		false - no hace nada.
		true - elimina el nodo/elemento drag
		string 'none' - Aplica la propiedad de css display:none al elemento drag.


	var: multidrop
	*default* = false. Permite realizar multiples Drops. Su valor puede ser:

	booleano (false) - Solo permite un solo drop.
	entero - define la cantidad de eventos drops que se pueden hacer en cada elemento drop.
	array - donde se especifique la cantidad de eventos drops por cada uno de los drops. (alpha)-
	string 'infinity' - Puede realizar infinitos drops.



var: sendToBack
*default* = false.
Propiedad que define el modo de _volver_ de un elemento drag cuando no se producen ciertas condiciones al realizar un drop. Puede tomar los siguientes valores:
	false - No realiza ninguna accion.
	'ini' - Vuelve a la posicion inicialmente configurada en <adjDrags> tanto en un <emptydrop> como en un <emptyTrueDrop>.
	'back' - Vuelve a la posicón inicial anterior al intentar hacer un <trueDrop>.
	'toDrop' - Vuelve a la posicion del drop de donde salió. Se utiliza para modo Swap.

var: cssClass
*defaul* = false. Definimos la cabecera del nombre de la clase CSS que se aplica tanto a los drags como a los drops. Automaticamente se defefinen 6 clases CSS

	iniDrag - clase CSS aplicada inicialmente a los elementos Drags.
	enterDrag - clase CSS que se aplica a los drags elementos cuando se produce un evento 'mouseenter'
	dragDrag - clase CSS que se aplica a los drags elementos cuando se los draguea.
	
	iniDrop - clase CSS aplicada inicialmente a los elementos Drops.
	overDrop - clase CSS que se aplica al drop al producirse evento 'drop'.
	trueDrop - clase CSS que se aplica al drop al producirse un drop verdadero.
	

var: optionsFxDrag
Parametros de configuracion del efecto que se produce en los drags
*default* : {
			wait: false,
			duration: 500,
			transition: Fx.Transitions.Back.easeOut
		}

var: optionsFxDrop
Parametros de configuracion del efecto que se produce en los drops.
*default*: Idem a <optionsFxDrag>.

	Eventos:
	La clase incorpora una cantidad considerable de eventos.
	
	Eventos heredados de Drag-Move:
	
	onEmptyDrop:
	onDrop:
	
	onDragComplete:
	onDragOverDrag: Se dispara cuando hemos droppeado un drag sobre otro drag.
	onEmptyOverDrag:
	onBeforeDrag: 
	
	onTrueDrop: Se dispara cuando se produce un drop verdadero; esto es, cuando se dropea validando la logica definida en <fncTrueDrop>.
	onEmptyTrueDrop: Se dispara cuando, a pesar de producrise un evento drop, este es incorrecto en funcion de <fncTrueDrop>.
	onMultiDrop: Se dispara cuando se ha llegado al numero de <multiDrop> definido.

	nota: Es importante notar que los eventos se disparan tanto en el objeto que se instancia de DxD.Base y, dependiendo de la naturaleza del mismo, tambien se disparan en los elemento/objetos Drags o Drops.
*/

DxD.Base = new Class ({

	// Opciones de nuestra clase
	options: {
		adjDrags: [],
		adjDrops: [],
		autoLevel: true,
		zIndexTop: 1000,
		zIndexBottom: 100,
		dragDelete: false,
		multiDrop: false,
		sendToBack: false,
		cssClass: false,
		textInDrop: true,
		optionsFxDrag: {
			wait: false,
			duration: 500,
			transition: Fx.Transitions.Back.easeOut
		},
		optionsFxDrop: {
			wait: false,
			duration: 800,
			transition: Fx.Transitions.Back.easeOut
		},
		onTrueDrop: Class.empty,
		onEmptyTrueDrop: Class.empty,
		onMultiDrop: Class.empty,
		onBeforeDrag: Class.empty,
		onDragComplete: Class.empty,
		onDropsComplete: Class.empty,
		onReady: Class.empty,
		opacity: {
			'drag': 1,
			'drop': 1,
			'dragDrag': 0.8,
			'overDrag': 0.3,
			'overDrop': 0.8,
			'trueDrop': 1
		}
	},

	// Constructor
	initialize: function (drags, drops, options) {

		// Seteamos elementos de la clase.
		this.setOptions (options);

		// Vector de drags del objeto (Propiedades).
		this.drags = [];

		// Vector de drops.
		this.drops = [];
		
		// dragAct. Variable que contiene el elemento Drag activo.
		this.dragAct = false;
		
		// Orden de los drags
		this.ordDrag = [];
		this.arrOvered = [];

		// Drag in Drop. Esta variable booleana define si el drag estuvo o no estuvo sobre un drop.
		this.dragInDrop = false;

		// Generamos Drags y Drops gracias a <Drag.Move>
		this.setIniBase (drags, drops);
	},


	/*
	method - setIniBase
	Se generan comportamiento Drag and Drop Base

	parametros:
		drags - Conjuntno de elementos Drags.
		drops - Conjunto de elementos Drops.

	ver Tambien:
		<addDrag>
	*/
	setIniBase: function (drags, drops) {

		// Vemos comportamiendo de clase de estilos
		if (this.options.cssClass) {
			this.cssClass = {};

			this.cssClass = {
				iniDrag:	this.options.cssClass + '-iniDrag',
				enterDrag:	this.options.cssClass + '-enterDrag',
				dragDrag:	this.options.cssClass + '-dragDrag',

				iniDrop:	this.options.cssClass + '-iniDrop',
				overDrop:	this.options.cssClass + '-overDrop',

				trueDrop:	this.options.cssClass + '-trueDrop'
			}
		}

		// Redefimos multiDrop en caso de que sea false. Esto es porque si es false, es lo mismo que se permita UN (1) solo drop.
		if (!this.options.multiDrop) this.options.multiDrop = 1;


		// Recorremos Drops
		drops.each (function (drop, iDrop) {

			// agregamos clase SS
			if (this.options.cssClass) drop.addClass (this.cssClass.iniDrop);
			
			// definimos opacidad
			drop.setOpacity (this.options.opacity.drop);

			// Agregamos propiedad Ind a los drops. A veces es necesario saber el indice del drop.
			drop.Ind = iDrop;

			// Definimos numero de drops actual en cada elemento. Inicialmente 1 (uno) por decreto (pfff ...). qtt: quantity
			drop.qttDrops = 1;

			// Definimos un indice del Drag que se posa sobre el drop. Inicialmente vale -1.
			drop.indDrag = -1;
			
			// Ahora definirmos una propiedad de cada drop denominada 'numDrops'.
			// Esta propiedad define la candidad de drops que se pueden realizar en cada uno de ellos.
			if ($type(this.options.multiDrop) == 'number') drop.numDrops = this.options.multiDrop;
			else if ($type(this.options.multiDrop) == 'array') drop.numDrops = this.options.multiDrop[iDrop];

			drop.getQttDrops = function () {
				return (drop.qttDrops - 1);
			},

			// Agregamos cada elemento de drop a nuestro vector this.drops
			this.drops.include ($(drop));

			// Agregamos array de coordenada de cada Drop.
			drop.Pos = [];
			
			// Efecto de los Drops
			drop.fxDrop = drop.effects(this.options.optionsFxDrop);
			
			// Almacenamos el texto en el drop.
			drop.text = drop.getText();

			// Definimos comportamientos en evento onDrop
			drop.addEvents ({
				'drop': function (drag, drags) {
					this.dropComplete (drag, drags);
				
					// Tenemos un drag en un drop, entonces ...
					this.dragInDrop = true;
				}.bind(this),

				'over': function (drag) {
					if ((drop.qttDrops <= drop.numDrops) || this.options.multiDrop == 'infinity') {
//						drag.fxDrag.start ({opacity: this.options.opacity.overDrag});
//						drop.fxDrop.start ({opacity: this.options.opacity.overDrop});
						drag.setOpacity (this.options.opacity.overDrag);
						drop.setOpacity (this.options.opacity.overDrop);
						
						if (this.options.cssClass) drop.addClass (this.cssClass.overDrop);
						if (this.options.textInDrop) {
							drop.setText(drag.getText());	// Seteamos el texto del drop con el texto que tiene el drag.
						}
					}
				}.bind (this),

				'leave': function (drag) {
					if ((drop.qttDrops <= drop.numDrops) || this.options.multiDrop == 'infinity') {
//						drag.fxDrag.start ({opacity: this.options.opacity.dragDrag});
//						drop.fxDrop.start ({opacity: this.options.opacity.drop});
						drag.setOpacity (this.options.opacity.dragDrag);
						drop.setOpacity (this.options.opacity.drop)
						
						if (this.options.cssClass) drop.removeClass (this.cssClass.overDrop);
						if (this.options.textInDrop) drop.setText (drop.text);
					}

				}.bind (this)
			});

		}, this);
		
		// Recorremos Drags
		drags.each(function (drag, iDrag) {

			// definimos clase CSS
			if (this.options.cssClass) drag.addClass (this.cssClass.iniDrag);
			
			// definimos opacidad
			drag.setOpacity (this.options.opacity.drag);

			// Agregamos cada elemento de drag a nuestro array de clase this.drags
			this.drags.include ($(drag));

			// Agregamos Indice de Drag. Hay que analizar si este dato es necesario.
			drag.Ind = iDrag;

			// Definimos un indice de Drop; indica el indice del drop en el cual fue droppeado el drag.
			drag.indDrop = -1;

			// Agregamos array de coordenada de cada Drag.
			drag.Pos = [];

			// Nivelamos los drags con los z-index.
			drag.setStyle ('z-index', iDrag + this.options.zIndexBottom);

			// Definimos el vector que nos da el indice del drag en funcion de su _nivel_
			this.ordDrag [iDrag] = iDrag;

			// Efecto de los Drags
			drag.fxDrag = drag.effects(this.options.optionsFxDrag);

			
			// Hacemos los Drags Drag.Move
			var DragMove = new Drag.Move ($$(drags)[iDrag], {
					droppables: this.drops,
					container: this.options.container,
					onBeforeStart: this.beforeStartDrag.bind (this),
					onComplete: function (drag) {

						// Recuperamos Array de drags solapados.
						var arrTmp = DragMove.out ? false : this.drags.filter (DragMove.checkAgainst, DragMove);
						this.arrOvered = arrTmp ? arrTmp.copy() : false;

						// Llamamos a metodo privado dragComplete
						this.dragComplete (drag);

					}.bind(this)
				});

			// autoLevel ?.
			if (this.options.autoLevel) {
				drag.addEvents ({
					'mouseenter': this.raseUpDrag.bind (this, drag),
					'mouseleave': this.levelDrags.bind (this, drag)
				});
			};
			
			if (this.options.cssClass) {
				drag.addEvents ({
					'mouseenter': function () {
						drag.addClass (this.cssClass.enterDrag);
					}.bind (this),

					'mouseleave': function () {
						drag.removeClass (this.cssClass.enterDrag);
					}.bind (this)
				});
			}
			
			drag.addEvent('emptydrop', function () {
				// Disparamos evento sobre la clase principal
				this.fireEvent ('emptyDrop', drag);

				// Comportamientos de los Drags en 'emptydrag'
				if (this.options.sendToBack) {

					switch (this.options.sendToBack) {
					
						case 'ini':
							// Reasignamos coordenadas solo por las dudas.
							drag.Pos.x = this.options.adjDrags[drag.Ind].x;
							drag.Pos.y = this.options.adjDrags[drag.Ind].y;
							this.sendToBack(drag);
						break;
						
						// Redefinimos nuevas coordenadas
						case 'back':
							//drag.Pos.x = drag.getStyle ('left').toInt();
							//drag.Pos.y = drag.getStyle ('top').toInt();
						break;


						case 'toDrop':
							if (drag.indDrop != -1) {
								// Enviamos pal'drop. Ya previamente asignado en dropComplete.
								this.sendToBack(drag);
							}
						
						break;
					}
				};
			}.bind(this));


		}, this); // end Drags

		// Ajustamos coordenadas de Drags y Drops
		if ((this.options.adjDrags).length) this.adjustDrags();
		if ((this.options.adjDrops).length) this.adjustDrops();
	},
	/*
	esta funcion es llamada cuando se ha completadp el proceso de drag.
	*/
	dragComplete: function (drag) {

		if (this.options.cssClass) drag.removeClass (this.cssClass.dragDrag);
	
		drag.fireEvent ('dragComplete', drag);
		this.fireEvent ('dragComplete', drag);

		// Si el drag estaba en un drop ... y es modo sendToBack = back ... hacemos efecto de opacidad.
		if (!this.dragInDrop && this.options.sendToBack == 'back') {
//			drag.fxDrag.start ({opacity: this.options.opacity.drag});
			drag.setOpacity (this.options.opacity.drag);
		}

		// autoLevel ?. Si es asi, los nivelamos.
		if (this.options.autoLevel) this.levelDrags (drag);
		
		// disparamos evento dragOverDrag ?
		if (this.arrOvered.length > 1) {
			var arrTmp = [];
			this.arrOvered.each (function (drg, iDrg) {
				arrTmp[this.ordDrag[drg.Ind]] = drg;
			}.bind(this));
			arrTmp.remove (undefined);
			arrTmp.reverse ();

			// Disparamos evento onDragOverDrag
			this.fireEvent ('dragOverDrag', [drag, arrTmp]);
		}
		// Disparamos evento onEmptyDragOverDrag
		else this.fireEvent ('emptyOverDrag', drag);

		// Ya no tenemos drag Activo (candidato a ser obsoleto)
		this.dragAct = false;
	},
	
	// Antes de que comience el drag
	beforeStartDrag: function (drag) {

		if (this.options.cssClass) drag.addClass (this.cssClass.dragDrag);
	
		// Disparamos envento en clase y en drag
		drag.fireEvent ('beforeDrag', drag);
		this.fireEvent ('beforeDrag', drag);

		this.dragInDrop = false;
		
		// Definimos Drag Activo
		this.dragAct = drag;

		// Opacidad
//		drag.fxDrag.start ({opacity: this.options.opacity.dragDrag});
		drag.setOpacity (this.options.opacity.dragDrag);

	
		// Reasignacion de posiciones del Drag
		switch (this.options.sendToBack) {
			case 'back':
				drag.Pos.x = drag.getStyle ('left').toInt();
				drag.Pos.y = drag.getStyle ('top').toInt();
			break;
		}

		// autoLevel ?. Si es asi ... levantanamos el drag.
		if (this.options.autoLevel) this.raseUpDrag (drag);
	},
/*
	method: fncTrueDrop
	Tipo: funcion ()
	*defaul* = function (drag, drop) {return true};

	Esta funcion sirve para evaluar la condicion de drop verdadero (onTrueDrop). En funcion de la definicion programda dependeran los eventos <onTrueDrop>, <onEmptyTrueDrop>, <onMultiDragComplete>.

	ejemplo:
		(start code)
		// Creamos Objeto Drag&Drop
		miDxD = ($$('#drags div'), $$('#drops div'));

		// Definimos funcion de Validacion
		miDxD.fncTrueDrop = function (drag, drop) {
				if (drag.Ind == drop.Ind) return true
				else false;
			};

		// Luego ... programamos comportamiento del evento onTrueDrop.
		miDxD.addEvent ('trueDrop', function (drag, drop) {
			alert ('Has dropeado con Exito el elemento ' + drag.Ind + ' !!!');
		});
		(end)
	*/
	fncTrueDrop: function (drag, drop) {
		return true;
	},
	
	/*
	Function: dropComplete

	Definimos el comportamiento cuando se realiza un drop comun y corriente.
	*/
	dropComplete: function (drag, drags) {
		
		this.fireEvent ('drop', [drag, drags.overed]);

		// Asignamos al drag.indDrop el indice al cual fue droppeado

		// Damos 100% de opacidad al drop
//		console.log ((drags.overed).getStyle ('color'));
		
		// Definimos indice de Drag sobre Drop
		drag.indDrop = (drags.overed).Ind;
	
		// Condiciones de vuelta sendToBack. Definimos coordenadas del elemento drag.
		switch (this.options.sendToBack) {
			case 'ini':
				drag.Pos.x = this.options.adjDrags[drag.Ind].x;
				drag.Pos.y = this.options.adjDrags[drag.Ind].y;
			break;
					
			case 'back':
				//drag.Pos.y = this.options.adjDrops[drags.overed.Ind].y;
			break;

			case 'toDrop':
				drag.Pos.x = this.options.adjDrops[drag.indDrop].x;
				drag.Pos.y = this.options.adjDrops[drag.indDrop].y;
			break;
		}

		// Checqueo De MultiDrops ...
		if (((drags.overed).qttDrops <= (drags.overed).numDrops) || this.options.multiDrop == 'infinity') {

			// Chequemos condicion de trueDrop mediante el valor que retorna la funcion this.fndTrueDrop
			if (this.fncTrueDrop (drag, (drags.overed))) {

				if (this.options.cssClass) {
					(drags.overed).addClass (this.cssClass.trueDrop);
					(drags.overed).removeClass (this.cssClass.overDrop);
				}

				// Opacidad ?
//				(drags.overed).fxDrop.start ({'opacity': this.options.opacity.trueDrop});
				(drags.overed).setOpacity (this.options.opacity.trueDrop);

	
				// No hay multiDrop ?
				if (this.options.multiDrop == 'infinity') {
					// Eliminamos drag en evento drop ?
					if (this.options.dragDelete) this.deleteDrag(drag);
					else this.sendToBack(drag);

				}

				else if ((drags.overed).qttDrops == (drags.overed).numDrops) {

					// Disparamos evento onmultiDrop en objeto DxD.Base
					this.fireEvent ('multiDrop', [drag, drags.overed]);

					// Eliminamos drag en evento multiDrop ?
					if (this.options.dragDelete) this.deleteDrag(drag);
					else this.sendToBack(drag);
				};

				// Incrementamos la cantidad de drops
				(drags.overed).qttDrops++
				
				// Asignamos el indice de drag que esta sobre el drop en drop.indDrag
				(drags.overed).indDrag = drag.Ind;
				
				// Disparamos evento onTrueDrop en objeto DxD.Base
				this.fireEvent ('trueDrop', [drag, drags.overed]);

				// ... y tambien lo disparamos en cada drop.
				(drags.overed).fireEvent ('trueDrop', [drag, drags.overed]);
				
				// Disparamos onDropsComplete ?
				for (var i = 0, elementos = this.drops.length, str = ""; i < elementos; str += ((this.drops[i].indDrag) + 1) ? "" : "*", i++) {};
				str != "";
				if (!str) this.fireEvent ('dropsComplete');

				soundManager.play ('sndGood');
			}

			else {
				// SendToBack ?
				if (this.options.sendToBack) this.sendToBack(drag, this.drops);

				// Disparamos evento onEmptyTrueDrop en objeto DxD.Base
				this.fireEvent ('emptyTrueDrop', [drag, drags.overed]);
				soundManager.play ('sndError');
				
				if (this.options.cssClass) (drags.overed).removeClass (this.cssClass.trueDrop);

				// ... y tambien lo disparamos en cada drop.
				(drags.overed).fireEvent ('emptyTrueDrop', [drag, drags.overed]);

				// Opacidad ?
//				(drags.overed).fxDrop.start ({'opacity': this.options.opacity.drop});
				(drags.overed).setOpacity (this.options.opacity.drop);
				

				if (this.options.cssClass) (drags.overed).removeClass (this.cssClass.overDrop);
				if (this.options.textInDrop) {
					(drags.overed).setText((drags.overed).text);
				}
			};
		}
		else {
			// SendToBack ?
			if (this.options.sendToBack) this.sendToBack(drag, this.drops);
			if (this.options.cssClass) (drags.overed).removeClass (this.cssClass.overDrop);
		}

	},
	
	reset: function () {
		// Conf Ini Drags
		this.drags.each (function (drag, iD){
			drag.removeClass (this.options.cssClass+'-enterDrag');
			drag.removeClass (this.options.cssClass+'-dragDrag');
			drag.setDisplay (true);
			drag.setOpacity (this.options.opacity.drag);

			drag.indDrop = -1;
				
		}.bind (this));

		// Conf Ini Drags
		this.drops.each (function (drop, iD){
			drop.removeClass (this.options.cssClass+'-overDrop');
			drop.removeClass (this.options.cssClass+'-trueDrop');
			drop.setOpacity (this.options.opacity.drop);

			drop.qttDrops = 1;

		}.bind (this));
		
		// Ajustamos coordenadas de Drags y Drops
//		if ((this.options.adjDrags).length) this.adjustDrags();
//		if ((this.options.adjDrops).length) this.adjustDrops();
	},
	
	/*
	method: addDrag
	Agregamos un Drag mas al conjunto de Drags. (_Experimental_)
	
	parametros:
		drag - Elemento que agregamos al conjunto de Drags And Drops

	ver Tambien:
	<setIniBase>
	*/
	addDrag: function (drag) {
		this.setIniBase ([drag]);
	},

	raseUpDrag: function (drag) {
		drag.setStyle ('z-index', this.options.zIndexTop);
	},


	/*
	method - levelDrags
	Eleva los Drags al hace un _mousedown_ y los reacomoda sobre el mismo. Luego los _baja_

	La finalidad de este metodo es poder _elevar_ y _bajar_ los drags en al clickaer sobre los mismos. Trabaja basicamente con el z-index del elemento drag. Este evento se ejecuta siempre y cuando <autoLevel> este seteado a true.
	
	parametros:
		drag - elemento drag.

	ver Tambien:
	var <autoLevel>, Method <setIniBase>
	*/

	levelDrags: function (drag) {

		// Nivelamos Drags mediante z-index. Acomodamos this.ordDrag
		var levelDrag = this.ordDrag[drag.Ind];

		for (var nvlDrag = levelDrag + 1; nvlDrag <= (this.drags.length - 1); nvlDrag++) {
			iDrag = this.ordDrag.indexOf(nvlDrag);
			this.ordDrag[iDrag] = nvlDrag - 1;
			this.drags[iDrag].setStyle ('z-index', this.options.zIndexBottom + nvlDrag - 1);
		}

		this.ordDrag [drag.Ind] = this.drags.length - 1;
		drag.setStyle ('z-index', this.options.zIndexBottom + this.drags.length - 1);
	},


	/*
	method - adjustDrags
	Ajustgamos los drags en funcion del array de configuracion <adjDrags>.
	
	parametros:
		coords - Array de coordenadas x / y de cada elemento. Se utiliza la notacion JSon, similar a la entregada por <Element.getPosition>, <setPosition>, etc

	ver Tambien:
	<adjDrags>
	*/
	adjustDrags: function () {

		// Recorremos todos los elementos Drags
		(this.drags).each(function(drag, iDrag) {

			// Asignamos posicion inicial de los drags como propiedad de los mismos. drag.Pos
			drag.Pos.x = this.options.adjDrags[iDrag].x; 
			drag.Pos.y = this.options.adjDrags[iDrag].y; 

			// Ahora definimos su posición
			drag.setPosition (this.options.adjDrags[iDrag]);

		},this);
	},
	
	/*
	method - adjustDrops
	Ajustgamos los drops en funcion del array de configuracion <adjDrops>.
	
	parametros:
		coords - Array de coordenadas x / y de cada elemento. Se utiliza la notacion JSon, similar a la entregada por <Element.getPosition>, <setPosition>, etc

	ver Tambien:
	<adjDrops>
	*/
	adjustDrops: function () {
		
		// Recorremos todos los elementos Drags
		(this.drops).each(function(drop, iDrop) {

			// Asignamos Posicion Absoluta
//			drop.setStyle ('position', 'absolute');

			// Asignamos posicion inicial de los drags como propiedad de los mismos. drag.Pos
			drop.Pos.x = (this.options.adjDrops[iDrop].x); 
			drop.Pos.y = (this.options.adjDrops[iDrop].y); 

			// Ahora definimos su posición
			drop.setPosition (this.options.adjDrops[iDrop]);

		},this);
	},

	deleteDrag: function (drag) {
		if (this.options.dragDelete) {
			if ($type(this.options.dragDelete) == 'boolean') drag.remove ();
			else drag.setDisplay (false); 
		}
	},

	sendToBack: function (drag) {
		// Enviamos al Drag a donde sea.
		drag.fxDrag.start({
			'left': drag.Pos.x,
			'top': drag.Pos.y,
			'opacity': this.options.opacity.drag
		});
	}
});

// Implementamos la clase son sus propiedades y eventos
DxD.Base.implement(new Events, new Options);


/*
Class: DxD.Film
Clase extendida de <DxD.Base>. Utilizada para comportamientos Drags And Drops donde su utiliza tecnica de film en los backgrounds tanto de los drags como de los drops.

Argumentos:
drags - Conjunto de Elementos Draggeables
drops - Conjunto de Elementos Droppeables
options - Opciones de configuracion. Todas las options de DxD.Base mas las listadas abajo.

options:

var: bgOffsetDrag
*default* = false. Si su valor no es false, produce un desplazamiento del background-position de cada elemento drag. Esto es util cuando se utilizan fondos en los drags tipo film.

var: bgOffsetDrop
*default* = false. Similar a <bgOffsetDrag> pero en los elementos drops.

var: offsetInDrop
*default* = false.  Si su valor no es false , setea el background-position del elemento drop con el valor del background-position del elemento drag.

var: offsetInOver
*default* = true. Dependiendo del valor configurado, puede tener los siguientes comportamientos:

	true (boolean) - toma el desplazamiento (background-position) del Drag que pasa (over)  por sobre el elemento Drop. En definitiva, sigue el Drag.
	toDrop (string) - Toma el desplazamiento configurado en this.optios.bgOffsetDrop. En definitiva, sigue al Drop. (pendiente ...).
	integer - suma un desplazamiento adicional al desplazamiento del drag. Esta pensado por si el film esta construido con las casillas del over. (casi nunca, pendiente ...).
*/
DxD.Film = DxD.Base.extend ({

	options: {
		bgOffsetDrag: false,
		bgOffsetDrop: false,
		offsetInDrop: false,
		offsetInOver: true,
		textInDrop: false
	},

	initialize: function (drags, drops, options) {
		// Ejecutamos metodo constructor padre
		this.parent(drags, drops, options);
		
		// Seteamos las configuraciones iniciales del film
		this.setIniFilm ();
	},

	setIniFilm: function () {
	
		// Configuramos Drags
		this.drags.each (function (drag, iDrag) {

			// Hacemos desplazamiento en los drags (background-position) siempre y cuando this.options.bgOffsetDrag sea distinto de false
			if (this.options.bgOffsetDrag) drag.setStyle ('background-position', this.options.bgOffsetDrag*iDrag);

		}, this);
		
		// Configuramos Drops
		(this.drops).each (function (drop, iDrop) {

			// Hacemos desplazamiento en los drops (background-position) siempre y cuando this.options.bgOffsetDrop sea distinto de false		
			if (this.options.bgOffsetDrop) drop.setStyle ('background-position', this.options.bgOffsetDrop*iDrop);

			// Modificamos el background-position en los Drop ?. Esto se hace solo en el evento 'trueDrop'.
			if (this.options.offsetInDrop) drop.addEvent ('trueDrop', function (drag, drags) {
				this.setStyle ('background-position', drag.getStyle ('background-position'));
			});

			// Modificamos el background-position de los Drop en Over ?. Puede tomar 4 valores:
			// false - No hace nada
			// true (boolean) - toma el desplazamiento del Drag que overea.
			// toDrop - Toma el desplazamiento configurado en this.optios.bgOffsetDrop (pendiente ...)
			// integer - suma un desplazamiento adicional al desplazamiento del drag. Esta pensado por si el film esta construido con las casillas del over. (casi nunca)



			if (this.options.offsetInOver) {
				var despOver;

				drop.addEvents ({
					'over': function (drag, drags) {
						// Chequeo De MultiDrops ... Si se ha llegado al limite no se hace nada
						if ((drop.qttDrops <= drop.numDrops) || this.options.multiDrop == 'infinity') {

							// Guardamos esta Propiedad. Nos va a servir para el evento 'leave' del drop
//							drop.bgOffSet = drop.getStyle ('background-position');	// no se captura, no se porque !. Problemas de MooTools

							// Opacidad al haver over
//							drop.fxDrop.start ({opacity: this.options.opacity.overDrop});
							drop.setOpacity (this.options.opacity.overDrop);

							// Definimos el desplazamiento de las imagenes en funcion del tipo de variable de this.options.offsetInOver
							if ($type(this.options.offsetInOver)) 
									drop.setStyle ('background-position', drag.getStyle ('background-position'));
						}
					}.bind(this),

					'leave': function (drag, drags) {
						// Chequeo De MultiDrops ... Si se ha llegado al limite no se hace nada
						if ((drop.qttDrops <= drop.numDrops) || this.options.multiDrop == 'infinity') {
							if (this.options.offsetInOver) drop.setStyle ('background-position', this.options.offsetInOver.toString () + 'px top');

//							drop.fxDrop.start ({opacity: this.options.opacity.drop});
							drop.setOpacity (this.options.opacity.drop);
						};
					}.bind(this),

					'emptyTrueDrop': function () {

						if (this.options.offsetInOver) drop.setStyle ('background-position', this.options.offsetInOver.toString () + 'px top');
//						drop.fxDrop.start ({opacity: 1});
					}.bind (this)
				});
			}
		}, this);
	}
	
});



/*
Class: DxD.Swap
Clase extendida de <DxD.Base>. Se utiliza en actividades donde se intercambian (swap) los drags entre si.
*/
DxD.Swap = DxD.Film.extend ({

	options: {
	},

	initialize: function (drags, drops, options) {
		// Ejecutamos metodo constructor padre
		this.parent(drags, drops, options);

		// Por ahora, y solo por ahora, nos parece que los drags no estan sobre los drops.
		this.DragOverDrop = true;

		// Si no tenemos definido el ajuste de los drops ... lo ponemos abajo de los drags
		if (!(this.options.adjDrops.length)) {

			// Efectivamente, los drags estan sobre los drops
			this.DragOverDrop = true;

			// Copiamos las coordenadas de los drags a las coordenadas de los drops
			this.options.adjDrops = this.options.adjDrags.copy ();

			// y ajustamos los Drops
			this.adjustDrops ();
		}

			
		// Recorremos los Drags
		this.drags.each (function (drag, iDrag) {
			// Si los drags inicialmente estan sobre los drops, definimos por convencion que los drags estan sobre los drops en forma ordenada; o sea el drag con indice 0 esta sobre el drop del mismo íncide y así con todos.
			if (this.DragOverDrop) drag.indDrop = iDrag;
		}.bind (this));
		
		this.addEvent ('emptyOverDrag', function (drag) {
				switch (this.options.sendToBack) {
					case 'back':
						/*
							El comportamiento 'back' en DxD.Swap es el sigueinte:
							Cuando el drag se deja fuera de un drop (emptydrag) entonces se deberian reasignar las nuevas corrdenadas al drag.
							El problema reside que cuando se hace un dragOverDrag TAMBIEN se produce un emptyDrop. Eso no está bien.
							Entonces ... lo que tenemos que hacer es antes de asignar coordenadas sobre el drag en un 'emptydrop', aserciorarnos si no se esta produciendo un dragOverDrag. (que quilombo !).
							Contamos entonces con este evento denominado emptyOverDrag y una propiedad de la clase que se llama this.dragInDrop 
						*/
						// Redefinimos valores de Pos.x y Pos.y siempre y cuando el drag no halla producido un drop
						if (!this.dragInDrop) {
							drag.Pos.x = drag.getStyle ('left').toInt();
							drag.Pos.y = drag.getStyle ('top').toInt();
						};
					break;
				}
				
		}.bind(this));

		// oversDrags ?
		this.addEvent ('dragOverDrag', this.swapDrags.bind (this));
	},

	/*
	funcion - swapDrags
	Nos permite intercambiar los drags de posicion entre si.
	*/

	swapDrags: function (drag, overDrags) {
		
		// Definos las coordenadas del elemento que se draguea con las coordenadas del elemento que queda consecutivamnte por debajo.
		if (!this.dragInDrop) {

			// Definimos nuevas coordenadas.
			var coorTmp = [];

			coorTmp.x = overDrags[0].Pos.x;
			coorTmp.y = overDrags[0].Pos.y;
		
			overDrags[0].Pos.x = overDrags[1].Pos.x;
			overDrags[0].Pos.y = overDrags[1].Pos.y;

			overDrags[1].Pos.x = coorTmp.x;
			overDrags[1].Pos.y = coorTmp.y;

			// Disparamos efectos
			overDrags[1].fxDrag.start ({
				'left': overDrags[1].Pos.x,
				'top': overDrags[1].Pos.y
			});
		
			overDrags[0].fxDrag.start ({
				'left': overDrags[0].Pos.x,
				'top': overDrags[0].Pos.y
			});
		} else {
		
		// Si estamos en esta parte del codigo ... sifnifica que se ha producido un swap pero tambien se ha producido un drop.
		
		//console.log ('this.drags.overed', this.drags.overed);
		this.drags.overed = this.dropSwap;
		
		// Llamamos a la fuerza a un drop Complete !
		this.dropComplete (overDrags[1], this.drags);

		}
	},
	
	beforeStartDrag: function (drag) {
	
		// Guardamos ind del Drop del drag que tal vez produzca un swap
		this.dropSwap = this.drops[drag.indDrop];
		
		// Ejecutamos comportamiendo de metodo padre
		this.parent(drag);
	}
});


Element.extend({
/*
section: Propiedades, Metodos y Eventos Adicionales.

Method: setPosition
Setter de la posicion de un elemento.

	Argumentos:
		options - vector de coordenadas asociativo {x: valorX, y: valorY}.

	Metodos Relacionados:
		<Element.getPosition>
*/
	setPosition: function(options) {
			this.setStyles ({
				'left': options.x,
				'top': options.y
			});
	},

/*

Method: setDisplay
Establece la propiedad CSS display a 'none' o 'block' en funcion del valor de verdad pasado como parametro.

	Argumentos:
		display (boolean) - Si es true, se estable display: block, si es false display: none.

*/	
	setDisplay: function (display) {
		if (!display) this.setStyle ('display', 'none');
		else this.setStyle ('display', 'block');
	},

	Id: function (id) {
		if (id == undefined) return this.id
		else this.id = id;
	},


	makeDxD: function(drags, drops, options){
		return new DxD.Base (drags, drops, options);
	}
});