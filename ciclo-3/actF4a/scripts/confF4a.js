	// vector de coordenadas
	var vectXY = new Array ();
	for (var i = 0, x = 12, y = 4; i < 25; i++, x = i%5*128 + 12, y = (i/5).toInt()*92 + 4 ) vectXY[i] = {x: x, y: y};

	// Offset de cada Ficha	
	var posXY = new Array ();
	posXY = [
			{x: 4, y: 0},
			{x: 68, y: 0},
			{x: 4, y: 45},
			{x: 68, y: 45},
		];

	txtColor = new Array ('#600', '#006', '#060', '#660');
	txtPlayer = new Array ('red', 'blue', 'green', 'yellow');
	txtBGColor = new Array ('#FEE', '#EEF', '#EFE', '#FFE');
	
	way = new Array ();
	way [0] = [12, 11, 10, 5, 0, 1, 2, 3, 4, 9, 14, 19, 24, 23, 22, 21, 20, 15, 10, 11, 12];
	way [1] = [12, 7, 2, 3, 4, 9, 14, 19, 24, 23, 22, 21, 20, 15, 10, 5, 0, 1, 2, 7, 12];
	way [2] = [12, 13, 14, 19, 24, 23, 22, 21, 20, 15, 10, 5, 0, 1, 2, 3, 4, 9, 14, 13, 12];
	way [3] = [12, 17, 22, 21, 20, 15, 10, 5, 0, 1, 2, 3, 4, 9, 14, 19, 24, 23, 22, 17, 12];
	
	var paisajes = new Array (0, 2, 4, 10, 14, 20, 22, 24);
	var vacio = new Array (1, 3, 7, 11, 13, 17, 21, 23);
	
	
