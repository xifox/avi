/*
	category: MemoTest (4x4)
	toolTip: Esquema basico de la sopa de letras
	
	toolbar: true
	icon: com.aptana.ide.snippets/icons/comment_block.png
	language: text/javascript
	
	prompt(word1): Cantidad de filas
	prompt(word2): Cantidad de filas
	prompt(word3): Cantidad de filas
	prompt(word4): Cantidad de filas
	
	prompt(word5): Cantidad de filas
	prompt(word6): Cantidad de filas
	prompt(word7): Cantidad de filas
	prompt(word8): Cantidad de filas
	
*/
var fchs=new Array(16);

var fchsTxt=new Array(8);

var i=0;

while(i<16) {
	var numero=(Math.random()*16).toInt();
	if(!fchs.contains(numero)){fchs[i]=numero;i++}
}

fchsTxt = ['','','','','','', '', '', '${word1}', '${word2}', '${word3}', '${word4}', '${word5}', '${word6}', '${word7}', '${word8}']