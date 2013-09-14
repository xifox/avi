// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){

	var sonidos = new aPlayer.rePro ({
		audioPlayerName: 'jobsong.mp3',
		basicSounds: true
		});
 
	confMenu (1, 0, 0, 1, 0);

	// Drags y Drops
	var drags = $$('#drags div');
	var drops_img = $$('#drops_img div');
	var drops_txt = $$('#drops_txt div');
	
	var images = $$('#images div');
	// objeto actH2a tipo DxD.Base
	var actH2a_img = new DxD.Base (drags, drops_img, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		textInDrop: false,
		adjDrags: ajusteDrags,
		cssClass: 'actH2a_img'
	});
	// objeto actH2a tipo DxD.Base
	var actH2a_txt = new DxD.Base (drags, drops_txt, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actH2a_txt'
	});
	// function initAct() de actH2a
	var initAct2= function () {
		actH2a_img.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (100*iD);
		});
		drops_img.each(function(drop, iDrop) {
			drop.setStyles({
				'left':ajusteDrops_img[iDrop].x,
				'top':ajusteDrops_img[iDrop].y
			});	
		});

		drops_img.each (function (drop,iDrop){
			drop.addEvents({
				'over': function () { 
					if (drop.indDrag ==-1) images[this.Ind].setStyle('background-position',this.Ind  * -500);
				 },
				'leave': function () {
					if (drop.indDrag ==-1) images[this.Ind].setStyle('background-position','-3000px');
				},
				'emptyTrueDrop': function () {
					if (drop.indDrag ==-1) images[this.Ind].setStyle('background-position','-3000px');					
				}
			});
		}); 		
	};
	actH2a_img.fncTrueDrop= function (drag,drop) {
		if (drag.Ind == drop.Ind) {
			drop.setText (drag.getText());
			return true;
		}
		else 
			return false;
	}
	
	actH2a_txt.fncTrueDrop= function (drag,drop){
		if (drag.Ind  >=4 ) return true;
		else return false;
	}
	
	// Llamamos inicio de Actividad
	initAct2();
});