document.addEventListener('DOMContentLoaded', function() {
	
	const tbodies = document.getElementsByTagName('tbody');
	const tbodies_length = tbodies.length;
	const generate_random_index = () => Math.floor(Math.random() * tbodies_length) + 1;
	const generate_data_kanji_index = (integer) => `#row_index_${integer} .data_kanji`;
	const generate_data_kana_index = (integer) => `#row_index_${integer} .data_kana`;
	const generate_data_english_index = (integer) => `#row_index_${integer} .data_english`;
	const generate_data_spanish_index = (integer) => `#row_index_${integer} .data_spanish`;
	//Because it is '#row_index_X .data_row_kanji', with an space, it searches for a descendant.
	//If you do     '#row_index_X.data_row_kanji', without an space, it searches for an element with that id and that class.
	const generate_tbody_index = (integer) => `#row_index_${integer}`;
	
	let flow_state = false; //false-> show question, true-> show answer	
	let integer = generate_random_index();
	let tbody_index;
	let kanji_index;
	let kana_index;
	let english_index;
	let spanish_index;
	
	let kana_elements;
	let english_elements;
	let spanish_elements;
	
	function display_kanji (integer) {
		tbody_index = generate_tbody_index (integer);
		kanji_index = generate_data_kanji_index (integer);
		kana_index = generate_data_kana_index (integer);
		english_index = generate_data_english_index (integer);
		spanish_index = generate_data_spanish_index (integer);
		document.querySelector(tbody_index).style.display = 'table-row-group';
		document.querySelector(kanji_index).style.display = 'table-cell';
		kana_elements = document.querySelectorAll(kana_index);
		english_elements = document.querySelectorAll(english_index);
		spanish_elements = document.querySelectorAll(spanish_index);
		kana_elements.forEach(function(element) {
			element.style.display = 'none';
		});
		english_elements.forEach(function(element) {
			element.style.display = 'none';
		});
		spanish_elements.forEach(function(element) {
			element.style.display = 'none';
		});
	}
	
	function display_tbody (integer) {
		tbody_index = generate_tbody_index (integer);
		kanji_index = generate_data_kanji_index (integer);
		kana_index = generate_data_kana_index (integer);
		english_index = generate_data_english_index (integer);
		spanish_index = generate_data_spanish_index (integer);
		document.querySelector(tbody_index).style.display = 'table-row-group';
		document.querySelector(kanji_index).style.display = 'table-cell';
		kana_elements = document.querySelectorAll(kana_index);
		english_elements = document.querySelectorAll(english_index);
		spanish_elements = document.querySelectorAll(spanish_index);
		kana_elements.forEach(function(element) {
			element.style.display = 'table-cell';
		});
		english_elements.forEach(function(element) {
			element.style.display = 'table-cell';
		});
		spanish_elements.forEach(function(element) {
			element.style.display = 'table-cell';
		});
	}
	
	display_kanji (integer);
	
	document.querySelector('#next').onclick = function() {
		if (flow_state) { //show answer -> show question
			flow_state = false;
			document.querySelector(tbody_index).style.display = 'none';
			integer = generate_random_index();
			display_kanji (integer);
		} else { //show question -> show answer
			flow_state = true;
			display_tbody (integer);
		}
	};
});