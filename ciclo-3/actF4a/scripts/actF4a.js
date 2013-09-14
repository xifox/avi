// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 0);

	// Fichas
	var fichas = $$('#fichas div');
	var idFichaAct = 0;
	
	fichas.each (function (ficha, iF) {
		// Configuraciones Iniciales
		ficha.pos = 0;
		ficha.fx = ficha.effects({
			wait: false,
			duration: 400,
			transition: Fx.Transitions.Back.easeOut
		});

		ficha.setStyles ({
			opacity: 0.3,
			'background-position': iF*(-40).toString() + 'px top',
			left: 700 + iF*60,
			color: txtColor [iF],
			display: 'block'
		});
		
		ficha.setText ((iF + 1).toString());

		(function(){
			sonidos.Pop();
			ficha.fx.start({
				top: 220
			});
		}).delay (iF*150);
	});
	
	// Player Turn
	var playerTurn = $('playerTurn');
	playerTurn.fx = playerTurn.effects({
		wait: false,
		duration: 300,
		transition: Fx.Transitions.Quad.easeIn
	});

	
	// Cartel de Mensaje
	var message = $('message');
	message.setStyles ({
		display: 'block',
		opacity: 0
	});
	
	message.fx = message.effects({
		wait: false,
		duration: 3500,
		transition: Fx.Transitions.Quad.easeOut
	});

	// Respuesta del Maestro
	var teachResponse = $ ('teacherResponse');
	teachResponse.setStyles ({
		display: 'block',
		opacity: 0
	});
	
	teachResponse.fx = teachResponse.effects({
		wait: false,
		duration: 500,
		transition: Fx.Transitions.Quad.easeIn
	});
	
	// Botones de respues del maestro
	var btnsTeacher = teachResponse.getElements ('span');
	
	btnsTeacher.each (function (btn, iB){
		var colorAnt;

		btn.setStyles ({
			color: (iB == 0) ? '#2A2' : '#A22',
			'background-color': (iB == 0) ? '#EFE' : '#FEE'
		});
		
		btn.addEvents ({
			'mouseenter': function () {
				btn.setStyles ({
					'border-color': '#999'
				});
			},
			
			'mouseleave': function () {
				btn.setStyles ({
					'border-color': '#EEE'
				});
			},
			
			'mousedown': function () {
				playerResult (1 - iB);
				//fichas[idFichaAct].setOpacity (0.3);
				teachResponse.fx.start ({
					opacity: 0
				});
			}
		});		
	});
	
	// DADO
	var dado = $('dado');
	var puedo = new Boolean (true);

	var idT;	// Temporizador
	playerTurn.addEvents ({
		'mousedown': function () {
			if (puedo) {
				contaDado = 0;
				dado.setOpacity(0.7);
				idT = setInterval("tiraDado ()", 200);
			};
		}
	});


	// Funcion que imprime un numero aleatorio en el dado
	tiraDado = function () {
		puedo = false;
		var nuevoNum = $random (0, 5);
		dado.setStyle ('background-position', ((idFichaAct*(-1050)) + (-150)*nuevoNum).toString() + 'px top');
		contaDado++;
		soundManager.play ('sndTic');
		if (contaDado > 10) {
			soundManager.play ('sndOk');
			dado.setOpacity (1);
			idT = $clear(idT);
			puedo = true;
			dadoOk (nuevoNum + 1);
		};

		return nuevoNum;
	};
	
	// Temporizador de movimiento de ficha de casilla a casilla
	var idMueveFicha;

	function dadoOk (num) {
		// Cartel
		playerTurn.fx.start ({
			opacity: 0
		});

		fichaAct = fichas[idFichaAct];

		fichaAct.posAnt = fichaAct.pos;
		fichaAct.posFin = fichaAct.pos + num;
		
		// Movemos la Ficha !
		fichaAct.fx.options.transition = Fx.Transitions.Quad.easeIn;
		idMueveFicha = mueveFicha.periodical(600, this, true);

	};
	
	var teacherResponde = function () {
		message.fx.start ({
			opacity: 1
		}).chain (function () {
			message.fx.options.duration = 1000;
			message.fx.start ({
				opacity: 0
			}).chain (function () {
				teachResponse.fx.start ({
					opacity: 1
				});
			});
		});
	};


	var mueveFicha = function (estado) {
		fichaAct = fichas[idFichaAct];

		sonidos.Tic ();
			
		//Incrementamos posicion de ficha
		if (estado) fichaAct.pos++;
		else fichaAct.pos--;
		
		if (fichaAct.pos >= 20) {
			// Quitamos el dado
			dado.setStyle ('display', 'none');
			
			sonidos.Good ();

			// Definimos texto del Cartel
			playerTurn.setText ('... and the winner is the ' + txtPlayer[idFichaAct] + ' player !');

			idMueveFicha = $clear (idMueveFicha);

			playerTurn.setStyles ({
				'white-space': 'normal',
				'background-image': 'none'
			});

			playerTurn.fx.start ({
				'background-color': txtBGColor[idFichaAct],
				height: 150,
				opacity: 1, 
				'line-height': 50,
				'padding-top': 50,
				'padding-bottom': 50
			});
		};

		// Llegamos a la casilla
		if (fichaAct.pos >= fichaAct.posFin) {
			idMueveFicha = $clear (idMueveFicha);
			
			var casillaActual = way[idFichaAct][fichaAct.pos];

			// Vamos a un paisaje ?
			if (paisajes.contains(casillaActual)) {
				teacherResponde();
			};

			// Vacio Papa !!!
			if (vacio.contains(casillaActual)) {
				(function(){
					fichaAct.setOpacity (0.3);
					idFichaAct++;
					if (idFichaAct == 4) idFichaAct = 0;
					playPlayer();
				}).delay (1000);
			};
			

			// Yanquis Go HOME !!! ( ... llevenos con ustedes.)
			if ((casillaActual == 19) || (casillaActual == 5)) {
				sonidos.Error ();
				(function () {
					fichaAct.setOpacity (0.3);
					fichaAct.pos = [0];

					fichaAct.fx.start ({
						left: vectXY[way[idFichaAct][fichaAct.pos]].x + posXY[idFichaAct].x,
						top: vectXY[way[idFichaAct][fichaAct.pos]].y + posXY[idFichaAct].y
					});
					idFichaAct++;
					if (idFichaAct == 4) idFichaAct = 0;
					playPlayer();
				}).delay (500);
			};


			// ... a pezcar !!!
			if (casillaActual == 9) {
			
				(function () {
					var retrocede = (fichaAct.pos - fichaAct.posAnt);

					// Redefinimos nueva posicion en funcion del indice devuelto
					fichaAct.pos = way[idFichaAct].indexOf (10);
				
					fichaAct.posAnt = ((fichaAct.pos - retrocede) < 0) ? 0 : fichaAct.pos - retrocede;
					fichaAct.posFin = fichaAct.pos;
					
					fichaAct.fx.start ({
						left: vectXY[way[idFichaAct][fichaAct.pos]].x + posXY[idFichaAct].x,
						top: vectXY[way[idFichaAct][fichaAct.pos]].y + posXY[idFichaAct].y
					});

					teacherResponde();
				}).delay (1000);
			};
			
			// ... una birra por favor !!!
			if (casillaActual == 15) {
				(function () {
					var retrocede = (fichaAct.pos - fichaAct.posAnt);

					// Redefinimos nueva posicion en funcion del indice devuelto
					fichaAct.pos = way[idFichaAct].indexOf (4);
					
					fichaAct.posAnt = ((fichaAct.pos - retrocede) < 0) ? 0 : fichaAct.pos - retrocede;
					fichaAct.posFin = fichaAct.pos;

					fichaAct.fx.start ({
						left: vectXY[way[idFichaAct][fichaAct.pos]].x + posXY[idFichaAct].x,
						top: vectXY[way[idFichaAct][fichaAct.pos]].y + posXY[idFichaAct].y
					});

					teacherResponde();
				}).delay (1000);
			};
		};

		// Volvimos a la casilla inicial
		if (fichaAct.pos <= fichaAct.posAnt) {
			idMueveFicha = $clear (idMueveFicha);

			(function(){
				fichaAct.setOpacity (0.3);

				idFichaAct++;
				if (idFichaAct == 4) 
					idFichaAct = 0;
				playPlayer();
			}).delay (1000);
		};

		// Movemos la ficha casilla a casilla
		fichaAct.fx.start ({
			left: vectXY[way[idFichaAct][fichaAct.pos]].x + posXY[idFichaAct].x,
			top: vectXY[way[idFichaAct][fichaAct.pos]].y + posXY[idFichaAct].y
		});
	};

	function playPlayer () {
		fichaAct = fichas[idFichaAct];

		if (!fichaAct.pos) {
			fichaAct.fx.start ({
				left: vectXY[way[idFichaAct][fichaAct.pos]].x + posXY[idFichaAct].x,
				top: vectXY[way[idFichaAct][fichaAct.pos]].y + posXY[idFichaAct].y
			});
		};

		// Cartel
		playerTurn.setStyles ({
			opacity: 0,
			display: 'block',
			color: txtColor[idFichaAct],
			'background-position': idFichaAct*(-270).toString () + 'px top'
		});

		var bgPos = (idFichaAct*(-1050) - 900).toString() + 'px top';

		// Ponemos signo de Interrogacion
		dado.setStyle ('background-position', (idFichaAct*(-1050) - 900).toString() + 'px top');

		// Definimos texto del Cartel
		playerTurn.setText ('Player turn ' + txtPlayer[idFichaAct]);

		playerTurn.fx.start ({
			opacity: 1
		});
		
		fichaAct.setOpacity (1);
	};


	// definimos el resultado del jugador
	function playerResult (result) {
		fichaAct = fichas[idFichaAct];

		if (result) {
			sonidos.Good();
			fichaAct.setOpacity (0.3);
			
			idFichaAct++;
			if (idFichaAct == 4) idFichaAct = 0;
			playPlayer.delay (1000);
		}
		else {
			sonidos.Error();
			var tempo;

			// fichaAct.posFin = fichaAct.posAnt;
			idMueveFicha = mueveFicha.periodical(450, this, false);
		};
	};
	
	// Juega jugador !
	playPlayer.delay (1000);
});