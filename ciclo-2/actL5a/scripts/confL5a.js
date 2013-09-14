var ajusteDrags = new Array ();

ajusteDrags [0] = [
	{x:20, y: 20},
	{x:152, y: 20},
	{x:284, y: 20}
];

ajusteDrags [1]= [
	{x:20, y: 120},
	{x:152, y: 120},
	{x:284, y: 120},
	{x:416, y: 120}
];

ajusteDrags [2]= [
	{x:20, y: 220},
	{x:152, y: 220},
	{x:284, y: 220}
];

ajusteDrags [3]= [
	{x:20, y: 320},
	{x:152, y: 320},
	{x:284, y: 320}
];

ajusteDrags [4]= [
	{x:20, y: 420},
	{x:152, y: 420},
	{x:284, y: 420},
	{x:416, y: 420},
	{x: 548, y: 420}
];

var confSignoQ = new Array (5);
	confSignoQ = [
		{left: 416, top: 20},
		{left: 548, top: 120},
		{left: 416, top: 220},
		{left: 416, top: 320},
		{left: 680, top: 420}
	];
	
var ans = new Array ();
	ans[0] = [1, 0 , 2];
	ans[1] = [3, 0, 2, 1];
	ans[2] = [0, 2, 1];
	ans[3] = [2, 0, 1];
	ans[4] = [0, 3, 4, 1, 2];


var frases = new Array ();
	frases = [
		'Can you jump ?',
		'Can you speak English ?',
		'Can you cook ?',
		'Can you fly ?',
		'Can you play computer games ?'
	];


var ajusteDrags2 = new Array (2);
ajusteDrags2 = [
	{x: 200, y: 500},
	{x: 620, y: 500}
];