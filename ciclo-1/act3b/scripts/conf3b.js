var ans = new Array (6);
	ans = ['grandma' ,'mum' ,'dad' ,'sister' ,'brother' ,'grandpa'];

	var xyDrop = new Array(6);
	xyDrop = [
		[280, 70],
		[280, 370],
		[280, 670],
		[340, 90],
		[340, 390],
		[340, 690]
	];

	var xyDrag = new Array(6);
	xyDrag = [
		[420, 200],
		[420, 300],
		[420, 400],
		[420, 500],
		[420, 600],
		[420, 700],
		[420, 800],
		[480, 150],
		[480, 250],
		[480, 350],
		[480, 450],
		[480, 550],
		[480, 650],
		[480, 750],
		[480, 850]
	];

var arrImgs = new Array (1);
	arrImgs[0] = new Image();
	arrImgs[0].src = '../main/images/vtn01.png';

var sndFile = 'audio/fact3.mp3';

var tiempos = new Array (100);
	tiempos = [	64, 69, 72, 74, 78, 82,			// This is my mum and dad,
			97, 100, 103, 106, 109, 114,		// this is my brother and sister,
			128, 132, 135, 138, 144, 148,		//this is my grandma and grandpa,
			160, 163, 164, 167, 171, 176,		//this is my big, black cat.
			192, 200, 207, 215,					//I love you, yeah. 
			223, 231, 239, 247,					//I love you, yeah.
			254, 265, 268, 272, 288				//I love you very much.
			];
