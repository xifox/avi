// function initAct() de 
var initAct = function () {
	reLoad ();
};
function checkAct () {};

window.onDomReady(function(){


	var sonidos = new aPlayer.Base ();
	
	confMenu (1, 1, 0, 1, 1);
	var	questions = $$('#questions div');
	var images = $$('#images div');
	questions.each(function(quest, iQuest){
		quest.answers = quest.getElements('p');
		
		quest.answers.each(function(ans, iAns){
			ans.addEvents({
				'mousedown': function(){
					this.getParent().answers.each( function (a,i){
						a.setStyle('color', 'blue');
					});	
					this.setStyle('color', 'red');
	 				this.getParent().selected = this.getText();
				}
			});
		});

	});
	images.each(function(img,iImg){
		img.setStyles({
			'left': confImg[iImg].x,
			'top': confImg[iImg].y
		});
	});
	$('btn02').addEvent('mousedown', function (){
		questions.each(function (quest,iQuest) {
			if (quest.selected == solutions[iQuest] ) images[iQuest].setStyle('background-position', '0px');
				else images[iQuest].setStyle('background-position', '-95px');
		});
	});

});