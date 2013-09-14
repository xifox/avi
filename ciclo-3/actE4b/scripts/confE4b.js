var ajusteDrags = new Array(7);
ajusteDrags = [
	{x:0,y:460},
	{x:0,y:460},
	{x:0,y:460},
	{x:0,y:460},
	{x:0,y:500},
	{x:0,y:500},
	{x:0,y:500}
];
	

ajusteDrags.each(function (elem,iElem){
	elem.x = (iElem%4)*157 + (iElem/4).toInt()*75 + 150; 
});