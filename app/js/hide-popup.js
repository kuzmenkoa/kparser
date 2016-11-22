function hidePopup() {
	var btn = document.getElementsByClassName('hint__btn')[0];
	btn.onclick = function() {
		this.parentNode.style.display = 'none';
	}
}