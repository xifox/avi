window.onDomReady (function () {
	confMenu (0, 0, 0, 1, 0);

	var sounds = $$('#clocks div span');

		var parlantes = new aPlayer.speakers (sounds, {
		sounds: 6,
		basicSounds: false
	});
});