var fchs=new Array(12);

var fchsTxt=new Array(12);

var i=0;

while(i<12){var numero=(
	Math.random()*12).toInt();
	if(!fchs.contains(numero)){fchs[i]=numero;i++};
};
	
fchsTxt=[
	'', '', '', '', '', '',
	'island', 'cave', 'lake', 'desert', 'river', 'mountains'
	];

