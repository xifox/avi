var fchs=new Array(12);

var fchsTxt=new Array(12);

var i=0;

while(i<12){var numero=(Math.random()*12).toInt();
if(!fchs.contains(numero)){fchs[i]=numero;i++}};

fchsTxt=[
	'Do you like', 'I like going', 'I don’t like doing', 'I don’t', 'Do you', 'Do',
	'playing computer games?', 'shopping.', 'homework.', 'like watching films.', 'like having picnics?', 'you like dancing?'
	];
	
var colores = new Array (6);
colores =	['#24A', '#2A2', '#A22', '#2AA', '#AA2', '#A2A']