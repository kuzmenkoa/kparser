function toggleTableCheckbox() {
	var table = document.getElementsByClassName('result')[0];
	table.onclick = function(event) {
		var target = event.target;
		var className;
		while (target != table) {
			className = target.className.split(' ')[0];
			if (className === 'result__row') {
				var checkbox = target.querySelectorAll('input')[0];
				checkbox.checked = !checkbox.checked;
				target.classList.toggle('result__row--selected');
				return;
			}
			target = target.parentNode;
		}
	}
}