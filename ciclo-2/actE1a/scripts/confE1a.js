var fchs=new Array(16);

var fchsTxt=new Array(8);

var i=0;

while(i<16) {
	var numero=(Math.random()*16).toInt();
	if(!fchs.contains(numero)){fchs[i]=numero;i++}
}

fchsTxt = ['','','','','','', '', '', 'jeans', 'hat', 'jumper', 'scarf', 'skirt', 'socks', 'trainers', 'T-shirt'];