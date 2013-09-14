// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	confMenu (1, 0, 1, 1, 0);

	var imgs = $$('#bloques1 span', '#bloques2 span');

	imgs.each (function (img, iM){
		img.setStyle ('background-position', ((-125)*iM - 500).toString () + 'px top');
	});
});