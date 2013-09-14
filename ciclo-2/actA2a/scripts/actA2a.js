// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){

	confMenu (1, 0, 0, 1, 0);

	var fichaJuega = 0;	
	var cantFichas = 2;
	var fichas = $$('#fichas div');
	var onFinish = false;
	var game_started = false;
	$('goBack').enabled = false;
	
	for (i=0; i<cantFichas; i++) {
		fichas[i].setStyle('display', 'block');
	};

	fichas.each(function(ficha,iFicha){
		ficha.casilla = -1;
		ficha.onFinish= false;
		ficha.Ind = iFicha;
		
		// Posicionamos las fichas
		ficha.setStyles({
					'top': '455px',
					'left': 45 * ficha.Ind + 300,
					'background-position': ficha.Ind * -40
		});

		ficha.setText(ficha.Ind + 1);
		ficha.fxFicha = ficha.effects({
			duration: 1200,
			wait:true,
			transition: Fx.Transitions.Back.easeOut,
			onStart: function () {
				ficha.blocked = true;
			},
			onComplete: function (){
				if (!ficha.onFinish ) ficha.blocked = false;
			}
		});
				

		if (ficha.Ind != fichaJuega) {
			fichas[ficha.Ind].blocked = true;
			ficha.setOpacity(0.7);
		};
	});

	
	$('play').addEvent('mousedown',function(){
		if (!game_started) {
			game_started = true;
			$('newPlayer').setOpacity(0.7);
		};

		ficha = fichas[fichaJuega];
			if (!onFinish) {
				if ((!ficha.blocked) && (!ficha.onFinish) && (ficha.Ind == fichaJuega) && !(onFinish)) {
					$('goBack').setStyle('opacity', 1);
					$('goBack').enabled = true;
					//Aumentamos l ficha que juega. 
					fichaJuega++;
					if (fichaJuega >= cantFichas) fichaJuega = 0;

					while (fichas[fichaJuega].onFinish) {
						fichaJuega++;
						if (fichaJuega >= cantFichas) fichaJuega = 0;
					};
					
					if (ficha.casilla >= 0) casillaOcupada[ficha.casilla]--;

					ficha.casilla += $random(1, 6);
					
					if (ficha.casilla >= 26) {
						ficha.casilla = 26;
						ficha.onFinish = true;
						onFinish = true;
					};

					if (casillaOcupada[ficha.casilla] == 0) 
						ficha.fxFicha.start(coorFx[ficha.casilla]);
					else 
						ficha.fxFicha.start({
							'left': coorFx[ficha.casilla].left + 25 * casillaOcupada[ficha.casilla],
							'top': coorFx[ficha.casilla].top
						});
					
					casillaOcupada[ficha.casilla]++;
					for (i = 0; i <= fichas.length - 1; i++) {
						if (i == fichaJuega) {
							fichas[i].setOpacity(1);
							fichas[i].blocked = false;
						}
						else {
							fichas[i].blocked = true;
							fichas[i].setOpacity(0.7);
						};
					};
					$('play').setStyle('background-position', fichaJuega * -100);
				};
			if (onFinish) parpadeo.periodical(2500,ficha);
		};
	});

	$('newPlayer').addEvent('mousedown',function() {
		if (!game_started) {
			if (cantFichas < 6) {
				fichas[cantFichas].setStyle('display', 'block');
				cantFichas++;
			};
		};
	});

	$('goBack').addEvent('mousedown',function () {
	$('goBack').setStyle('opacity', 0.7);

	if (this.enabled && !onFinish) {
		$('goBack').enabled = false;
		var fichaTmp = fichaJuega - 1;
		
		if (fichaTmp < 0) fichaTmp = cantFichas - 1;
		
		var ficha = fichas[fichaTmp];
		
		casillaOcupada[ficha.casilla]--;
		
		var ficha = fichas[fichaTmp];
		
		ficha.casilla -= 2;
		casillaOcupada[ficha.casilla]++;
		
		
		if (ficha.casilla < 0) {
			ficha.fxFicha.start({
				'top': '455px',
				'left': 45 * ficha.Ind + 300
			});
			ficha.casilla = -1;
		}
		else {
		
			if (casillaOcupada[ficha.casilla] == 0) 
				ficha.fxFicha.start(coorFx[ficha.casilla]);
			else 
				ficha.fxFicha.start({
					'left': coorFx[ficha.casilla].left + 25 * casillaOcupada[ficha.casilla],
					'top': coorFx[ficha.casilla].top
				});
		};
	};
	});

	function parpadeo () {
			this.fxFicha.start({
				'opacity': [0,1]
			}).chain(function(){
					this.fxFicha.start({'opacity': [1,0]});
			}.bind(this));	
	};
});