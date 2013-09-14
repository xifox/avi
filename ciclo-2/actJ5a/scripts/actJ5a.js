window.onDomReady (function () {
	confMenu (0, 0, 0, 1, 0);
	var pharses = $$('#pharses div');

	var step = 0;
	pharses.each (function (pharse, iP){
		step = (iP/3).toInt()*35;
		var bgColor = [step, 20, 100].hsbToRgb();
		var fontColor = [step, 100, 30].hsbToRgb();
		var borderColor = [step, 80, 40].hsbToRgb();

		pharse.setStyles ({
			'background-color': bgColor,
			'color': fontColor,
			'border-color': borderColor
		});
	});
});
