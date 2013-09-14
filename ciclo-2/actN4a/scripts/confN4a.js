var ajusteDrags = new Array ();

ajusteDrags [0] = [
	{x:20, y: 20},
	{x:152, y: 20},
	{x:284, y: 20},
	{x:416, y: 20},
	{x:548, y: 20},
	{x:680, y: 20}
];

ajusteDrags [1]= [
	{x:20, y: 120},
	{x:152, y: 120},
	{x:284, y: 120},
	{x:416, y: 120},
	{x:548, y: 120},
	{x:680, y: 120}
];

ajusteDrags [2]= [
	{x:20, y: 220},
	{x:152, y: 220},
	{x:284, y: 220},
	{x:416, y: 220},
	{x:548, y: 220},
	{x:680, y: 220}
];

ajusteDrags [3]= [
	{x: 20, y: 320},
	{x:152, y: 320},
	{x:284, y: 320},
	{x:416, y: 320},
	{x:548, y: 320},
	{x:680, y: 320}
];

ajusteDrags [4]= [
	{x: 20, y: 420},
	{x:152, y: 420},
	{x:284, y: 420},
	{x:416, y: 420},
	{x:548, y: 420},
	{x:680, y: 420}
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
	ans[0] = [5, 0 , 2, 4, 1, 3];
	ans[1] = [5, 2, 0, 4, 3, 1];
	ans[2] = [4, 5, 0 , 2, 3, 1];
	ans[3] = [1, 5 , 3, 0, 2, 4];
	ans[4] = [1, 4, 2, 0, 5, 3];

var frases = new Array ();
	frases = [
		'I start school at nine o\'clock.',
		'I listen to my English Teacher.',
		'I have lunch at two o\'clock.',
		'I read books in the library.',
		'I play basketball with my friends.'
	];