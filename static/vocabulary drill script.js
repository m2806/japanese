document.addEventListener('DOMContentLoaded', function() {
	
	const tbodies = document.getElementById('data').getElementsByTagName('tbody');
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
	
	let portrait_table = document.getElementById('portrait_table');
	const original_portrait_table_innerHTML = document.getElementById('portrait_table').innerHTML;
	
	function display_question (integer) {
		kanji_index = generate_data_kanji_index (integer);
		
		//Landscape table
		document.querySelector('#landscape_question_body').style.display = 'table-row-group';
		document.querySelector('#landscape_answer_body').style.display = 'none';
		document.querySelector('#landscape_kanji_field').textContent = document.querySelector(kanji_index).textContent;
		
		//Portrait table
		portrait_table.innerHTML = original_portrait_table_innerHTML;
		document.querySelector('#portrait_kanji_data').textContent = document.querySelector(kanji_index).textContent;
		document.querySelector('#portrait_kana_header').setAttribute('rowspan', 1);
		document.querySelector('#portrait_english_header').setAttribute('rowspan', 1);
		document.querySelector('#portrait_spanish_header').setAttribute('rowspan', 1);
	}
	
	function display_answer (integer) {
		tbody_index = generate_tbody_index (integer);
		kanji_index = generate_data_kanji_index (integer);
		kana_index = generate_data_kana_index (integer);
		english_index = generate_data_english_index (integer);
		spanish_index = generate_data_spanish_index (integer);
		kana_elements = document.querySelectorAll(kana_index);
		english_elements = document.querySelectorAll(english_index);
		spanish_elements = document.querySelectorAll(spanish_index);
		
		//Landscape table
		document.querySelector('#landscape_question_body').style.display = 'none';
		document.querySelector('#landscape_answer_body').style.display = 'table-row-group';
		document.querySelector('#landscape_answer_body').innerHTML = document.querySelector (tbody_index).innerHTML;
		
		//Portrait table
		document.querySelector('#portrait_kana_header').setAttribute('rowspan', kana_elements.length);
		document.querySelector('#portrait_english_header').setAttribute('rowspan', english_elements.length);
		document.querySelector('#portrait_spanish_header').setAttribute('rowspan', spanish_elements.length);
		for (let i = 0; i < kana_elements.length; i++) {
            if (i == 0) {
				document.querySelector('#portrait_kana_data').textContent += kana_elements [i].innerHTML;
			} else {
				document.querySelector('#portrait_kana_body').innerHTML += `<tr><td>${kana_elements[i].innerHTML}</td></tr>`;
			}
        }
		for (let i = 0; i < english_elements.length; i++) {
            if (i == 0) {
				document.querySelector('#portrait_english_data').textContent += english_elements [i].innerHTML;
			} else {
				document.querySelector('#portrait_english_body').innerHTML += `<tr><td>${english_elements[i].innerHTML}</td></tr>`;
			}
        }
		for (let i = 0; i < spanish_elements.length; i++) {
            if (i == 0) {
				document.querySelector('#portrait_spanish_data').textContent += spanish_elements [i].innerHTML;
			} else {
				document.querySelector('#portrait_spanish_body').innerHTML += `<tr><td>${spanish_elements[i].innerHTML}</td></tr>`;
			}
        }
	}
	
	display_question (integer);
	
	document.querySelector('#next').onclick = function() {
		if (flow_state) { //show answer -> show question
			flow_state = false;
			integer = generate_random_index();
			display_question (integer);
		} else { //show question -> show answer
			flow_state = true;
			display_answer(integer);
		}
	};
});