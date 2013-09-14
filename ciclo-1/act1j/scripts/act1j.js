window.onDomReady(function(){
	initSounds (6, false);	
	initIcon();

var sounds = $$('#sounds div');
var desks = $$('#desks div');
var clicks = $$('#click div');
var lSounds = 550;

var idSound=-1;

	sounds.each(function(sound, iSound) {

		sound.setStyles ({
			'top': iSound * 65,
			'left': lSounds
		});

		sound.addEvents({
			'mousedown': function(el, obj) {
				soundManager.play ('snd' + iSound);
				idSound = iSound;
			},

			'mouseenter': function () {
				sound.setStyle ('color', '#44F');
			},

			'mouseleave': function () {
				sound.setStyle ('color', '#000');
			}

		});
	});  // fin Sound

	clicks.each(function(click, iClick) {

		click.setStyles ({
			'left': confClicks[iClick][0],
			'top': confClicks[iClick][1],
			'width': confClicks[iClick][2],
			'height': confClicks[iClick][3]
		});

		desks[iClick].setStyles ({
			'left': confClicks[iClick][0],
			'top': confClicks[iClick][1],
			'width': confClicks[iClick][2],
			'height': confClicks[iClick][3]
		});

		click.addEvents ({
			'mousedown': function () {
				//var fndFx = new Fx.Styles (desks[iClick]);
				var fndFx = desks[iClick].effects();

				if (ans[iClick] == idSound) {
					ans[iClick] = -1;
					fndFx.start ({'background-color': clrClicks[iClick]});
				};
			},

			'mouseenter': function () {
				if (ans[iClick] != -1) {
					desks[iClick].setStyle ('background-color', '#FFF');
				}
			},

			'mouseleave': function () {
				if (ans[iClick] != -1) {
					desks[iClick].setStyle ('background-color', '#AAA');
				}
			}
		});

	});  // fin Clicks

});
