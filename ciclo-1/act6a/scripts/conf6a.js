/********************************
 * Soluciones del Tablero	*
 ********************************

/* En este Array se define al indice como el indice de la ficha del tablero.
 * Y Se le asigna a cada uno de ellos el color de la ficha, o sea, el indice de color.
 
 ********************************
 * clrFicha[ficha] = color	*
 * -----------------------------*
 * 0: Red			*
 * 1: Yellow			*
 * 2: Green			*
 * 3: Oranfe			*
 * 4: Purple			*
 * 5: Blue			*
 * 6: Brown			*
 * 7: Pink			*
 * 8: Black			*
 * 9: White			*
 ********************************/




var clrFicha = new Array (51);

//      	0  1  2  3  4  5  6  7  8  9
clrFicha = [
		5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
		5, 2, 2, 2, 2, 2, 2, 2, 2, 6,
		6, 6, 2, 6, 6, 6, 2, 6, 2, 2,
		9, 9, 9, 9, 2, 2, 4, 7, 7, 0,
		3, 2, 3, 3, 8, 1, 1, 6, 2, 8,
		5
		];


/* EN este array se define como indice el indice de la paleta de colores.
 * Y contiene las posiciones de los indices de ls fichas.
 * Es un Array de dos dimensiones.
 */

var fichaClr = new Array (10);

fichaClr[0] = [ 39];
fichaClr[1] = [ 45, 46];
fichaClr[2] = [ 11, 12, 13, 14, 15, 16, 17, 18, 22, 26, 28, 29, 34, 35, 41, 48];
fichaClr[3] = [ 40, 42, 43];
fichaClr[4] = [ 36];
fichaClr[5] = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 50];
fichaClr[6] = [ 19, 20, 21, 23, 24, 25, 27, 47];
fichaClr[7] = [ 37, 38];
fichaClr[8] = [ 44, 49];
fichaClr[9] = [ 30, 31, 32, 33];


var ans=new Array(10);

var clrs=new Array(10);

var fnd=new Array(10);

ans=[4,7,8,5,1,9,6,2,0,3];


clrs=['purple','pink','black','blue','yellow','white','brown','green','red','orange'];

var confDrags = new Array();
confDrags = [
	{x: 180, y: 450}
	];


