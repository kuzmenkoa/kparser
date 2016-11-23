function changeTab() {
	var tabWords  = document.querySelector('.form-addon-tabs__tab--words');
	var tabFilter = document.querySelector('.form-addon-tabs__tab--filter');
	var allWrapper    = document.querySelector('.form-addon');
	var wrapperWords  = document.querySelector('.form-addon__words');
	var wrapperFilter = document.querySelector('.form-addon__filter');
	tabWords.onclick = function() {
		allWrapper.classList.add('form-addon--words');
		tabWords.classList.add('form-addon-tabs__tab--active');
		wrapperWords.classList.add('form-addon--show');
		allWrapper.classList.remove('form-addon--filter');
		tabFilter.classList.remove('form-addon-tabs__tab--active');
		wrapperFilter.classList.remove('form-addon--show');
	}
	tabFilter.onclick = function() {
		allWrapper.classList.add('form-addon--filter');
		tabFilter.classList.add('form-addon-tabs__tab--active');
		wrapperFilter.classList.add('form-addon--show');
		allWrapper.classList.remove('form-addon--words');
		tabWords.classList.remove('form-addon-tabs__tab--active');
		wrapperWords.classList.remove('form-addon--show');
	}
}