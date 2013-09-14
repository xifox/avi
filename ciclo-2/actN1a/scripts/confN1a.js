var confImg = new Array (8);

confImg = [
	{left: 0, top: 0},
	{left: 0, top: 130},
	{left: 0, top: 260},
	{left: 0, top: 390},
	
	{right: 0, top: 0},
	{right: 0, top: 130},
	{right: 0, top: 260},
	{right: 0, top: 390}
]
var ans=new Array(6);

ans=[0,0,1,0,0,0];

var posPals=new Array(6);

posPals=[1,3,5,4,0];

var dimSopa=[10,10];

var palabras=new Array(8);

palabras=[
		{
			fila: 3,
			columna: 0,
			palabra:'wash',
			horizontal:1
		},
		
		{
			fila: 0,
			columna: 1,
			palabra:'cook',
			horizontal:1
		},
		{
			fila: 0,
			columna: 1,
			palabra:'clean',
			horizontal:0
		},
		{
			fila: 1,
			columna: 9,
			palabra:'open',
			horizontal:0
		},
		{
			fila: 5,
			columna: 4,
			palabra:'close',
			horizontal:0
		},
		{
			fila: 2,
			columna: 6,
			palabra:'standup',
			horizontal:0
		},
		{
			fila: 6,
			columna: 2,
			palabra:'falldown',
			horizontal:1
		},
		{
			fila: 2,
			columna: 6,
			palabra:'stop',
			horizontal:1
		}
		
	];

