// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	confMenu (1, 0, 1, 1, 0);
	
	var sonidos = new aPlayer.Base ();

	var pictures = $$('#col1 div span');
	var col2 = $$('#col2 div');
	var col3 = $$('#col3 div');
	
	var columna1 = $('col1');
	var columna2 = $('col2');
	var columna3 = $('col3');
	
	// vector de habilitación para las columnas
	var col2Act = true;
	var col3Act = true;


/*	columna1.setOpacity (1);
	columna2.setOpacity (1);
	columna3.setOpacity (0.2);
*/
	
	var strOk = new Array (3);

	// Primer columna
	pictures.each (function (picture, iP){

		// Habilitamos todos los animales
		picture.state = 0;

		picture.getParent().setStyle('background-position', '-1200px top');

		picture.setStyles ({
			'background-position': iP*(-200).toString() +'px top',
			opacity: 0.7
		});

		picture.addEvents ({
			'mouseenter': function () {
				if (picture.state == 0) {
					picture.setStyles({
						opacity: 1
					});
				};
			},

			'mouseleave': function () {
				if (picture.state == 0) {
					picture.setStyles({
						opacity: 0.7
					});
				};
			},
			
			'mousedown': function () {
				pictures.each(function(pic, iP){
					if (pic.state == 1) {
						pic.getParent().setStyle('background-position', '-1200px top');
						pic.setOpacity (0.7);
						pic.state = 0;
					};
				});

				if (picture.state == 0) {

					picture.state = 1;
					picture.setStyles({
						opacity: 1
					});

					picture.getParent().setStyle('background-position', ((-200) * iP - 600).toString() + 'px top');

					strOk.a = iP.toString();
					control01();
				};
			}
		});
	});
	
	
	
	
	
	
	
	
	col2.each (function (circ, iC){
		circ.setStyles ({
			color: '#333'
		});

		// Habilitamos todos los circulos iniciales
		circ.state = 0;

		circ.addEvents ({
			'mouseenter': function () {
				if (circ.state == 0) {
					circ.setStyles({
						color: '#900'
					});
				};
			},

			'mouseleave': function () {
				if (circ.state == 0) {
					circ.setStyles({
						color: '#333'
					});
				};
			},
			
			'mousedown': function () {
				col2.each(function(circ, iP){

					if (circ.state == 1) {
						circ.state = 0;
						circ.setStyles({
							color: '#333'
						});
					};
				});

				if (circ.state == 0) {
					circ.state = 1;

					circ.setStyles({
						color: '#FA0'
					});

					strOk.b = (iC + 3).toString();
					control01();
				};
			}
		});
	});
	
	// Tercer Columna
	col3.each (function (circ, iC){
		circ.setStyles ({
			color: '#333'
		});

		// Acá tambien habilitamos los circulos
		circ.state= 0;
		
		circ.addEvents ({
			'mouseenter': function () {
				if (circ.state == 0) {
					circ.setStyles({
						color: '#A00'
					});
				};
			},

			'mouseleave': function () {
				if (circ.state == 0) {
					circ.setStyles({
						color: '#333'
					});
				};
			},
			
			'mousedown': function(){
				col3.each(function(circ, iP){

					if (circ.state == 1) {
						circ.state = 0;
						circ.setStyles({
							color: '#333'
						});
					};
				});

				if (circ.state == 0) {
					circ.state = 1;

					circ.setStyles({
						color: '#FA0'
					});

					strOk.c = (iC + 6).toString();
					control01();
				};
			}
		});
	});


	var control01 = function(){
		for (var i = 0; i < 3; i++) {

			if (pictures[i].state == 1) {
				if (col2[ans1[i]].state) {
					pictures[i].state = 2;
					$$('#content div')[i].setStyle ('visibility', 'visible');
					soundManager.play ('sndGood');
				};
			};
			
			if (col2[i].state == 1) {

				if (col3[ans2[i]].state) {
					col3[ans2[i]].state = 2;
					
					col3[ans2[i]].setStyle ('color', '0AF');

					$$('#content div')[i+3].setStyle ('visibility', 'visible');
					soundManager.play ('sndGood');
				};
			};
			
		};
	};
});
