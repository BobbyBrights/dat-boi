$(document).ready(function () {
	function uhg() {
		document.getElementById('loading-bar').setAttribute('value', Math.random().toString());
		document.getElementById('loading-bar').setAttribute('max', '1');

		var progressbar = $('#loading-bar'),
			max = progressbar.attr('max'),
			value = progressbar.val();

		var loading = function () {
			value += 0.0001;
			addValue = progressbar.val(value);

			$('.progress-value').html(value + '%');

			if (value > max) {
				clearInterval(animate);
				progressbar.removeAttr('value');
				progressbar.removeAttr('max');
			}
		};

		var animate = setInterval(function () {
			loading();
		}, 0.0001);
	}

	uhg();

	setInterval(function () {
		uhg();
	}, 42000);
});