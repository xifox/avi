// Arrays de Soluciones (answers)
// Cada Index representa un drop y cada valor representa el drag correspondiente
var ans = new Array (10);
ans = [1, 1 , 0, 0, 0, 0, 0, 0, 1, 0];

var posPals = new Array (7);
posPals = [3, 9, 2, 6, 7, 4, 5];

var dimSopa = [10, 8];

var palabras = new Array (4);

palabras = [
		[0, 1, 'ORANGE', 1],
		[5, 4, 'WHITE', 0],
		[9, 1, 'GREEN', 1],
		[2, 2, 'BROWN', 1],
		[7, 3, 'PINK', 1],
		[1, 0, 'PURPLE', 0],
		[2, 2, 'BLUE', 0]
	];

//Definimos el array para posicionar los drags
//confDrags[i]= LEFT, TOP

var confDrags = new Array (5);
confDrags = [
	[50,50], [200, 50],
	[50,150], [200, 150], 
	[50,250], [200, 250], 
	[50,350], [200, 350], 
	[50,450], [200, 450]
	];
