var solutions = new Array(8);
solutions =  [0,1,2,3,4,5,6,7,8];

var ajusteDrops_img = new Array (4);
ajusteDrops_img = [
	{x:410, y:100},
	{x:407, y:265},
	{x:765, y:290},
	{x:760, y:110},
];

var ajusteDrags = new Array(8);
ajusteDrags = [
	{x:0,y:465},
	{x:0,y:465},
	{x:0,y:465},
	{x:0,y:465},
	{x:0,y:505},
	{x:0,y:505},
	{x:0,y:505},
	{x:0,y:505}
];

ajusteDrags.each(function(elem, iElem){
	ajusteDrags[iElem].x = ajusteDrags[iElem].x + (iElem%4 * 160 ) + 350;
});
ajusteDrags.randomize();


