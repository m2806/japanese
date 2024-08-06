document.addEventListener('DOMContentLoaded', function() {
	
	const tbodies = document.getElementById('data').getElementsByTagName('tbody');
	const tbodies_length = tbodies.length;
	const generate_random_index = () => Math.floor(Math.random() * tbodies_length) + 1;
	const generate_data_index = (integer) => `#row_index_${integer} .data_index`;
	const generate_data_kanji_index = (integer) => `#row_index_${integer} .data_kanji`;
	const generate_data_kanji_yomikata_index = (integer) => `#row_index_${integer} .data_kanji_yomikata`;
	const generate_data_word_kanji_index = (integer) => `#row_index_${integer} .data_word_kanji`;
	const generate_data_word_kana_index = (integer) => `#row_index_${integer} .data_word_kana`;
	const generate_data_word_english_index = (integer) => `#row_index_${integer} .data_word_english`;
	const generate_data_word_spanish_index = (integer) => `#row_index_${integer} .data_word_spanish`;
	//Because it is '#row_index_X .data_kanji', with an space, it searches for a descendant.
	//If you do     '#row_index_X.data_kanji', without an space, it searches for an element with that id and that class.
	const generate_tbody_index = (integer) => `#row_index_${integer}`;
	
	let flow_state = false; //false-> show question, true-> show answer	
	let integer = generate_random_index();
	let tbody_index;
	let index;
	let kanji_index;
	let kanji_yomikata_index;
	let word_kanji_index;
	let word_kana_index;
	let word_english_index;
	let word_spanish_index;
	
	let kanji_yomikata_elements;
	let word_kanji_elements;
	let word_kana_elements;
	let word_english_elements;
	let word_spanish_elements;
	
	let portrait_table = document.getElementById('portrait_table');
	const original_portrait_table_innerHTML = document.getElementById('portrait_table').innerHTML;
	
	function display_question (integer) {
		index = generate_data_index (integer);
		kanji_index = generate_data_kanji_index (integer);
		
		//Landscape table
		document.querySelector('#landscape_question_body').style.display = 'table-row-group';
		document.querySelector('#landscape_answer_body').style.display = 'none';
		document.querySelector('#landscape_index_field').textContent = document.querySelector(index).textContent;
		document.querySelector('#landscape_kanji_field').textContent = document.querySelector(kanji_index).textContent;
		
		//Portrait table
		portrait_table.innerHTML = original_portrait_table_innerHTML;
		document.querySelector('#portrait_index_data').textContent = document.querySelector(index).textContent;
		document.querySelector('#portrait_kanji_data').textContent = document.querySelector(kanji_index).textContent;
		document.querySelector('#portrait_word_kanji_header').setAttribute('rowspan', 1);
		document.querySelector('#portrait_word_kana_header').setAttribute('rowspan', 1);
		document.querySelector('#portrait_word_english_header').setAttribute('rowspan', 1);
		document.querySelector('#portrait_word_spanish_header').setAttribute('rowspan', 1);
	}
	
	function display_answer (integer) {
		tbody_index = generate_tbody_index (integer);
		index = generate_data_index (integer);
		kanji_index = generate_data_kanji_index (integer);
		kanji_yomikata_index = generate_data_kanji_yomikata_index (integer);
		word_kanji_index = generate_data_word_kanji_index (integer);
		word_kana_index = generate_data_word_kana_index (integer);
		word_english_index = generate_data_word_english_index (integer);
		word_spanish_index = generate_data_word_spanish_index (integer);
		kanji_yomikata_elements = document.querySelectorAll(kanji_yomikata_index);
		word_kanji_elements = document.querySelectorAll(word_kanji_index);
		word_kana_elements = document.querySelectorAll(word_kana_index);
		word_english_elements = document.querySelectorAll(word_english_index);
		word_spanish_elements = document.querySelectorAll(word_spanish_index);
		
		//Landscape table
		document.querySelector('#landscape_question_body').style.display = 'none';
		document.querySelector('#landscape_answer_body').style.display = 'table-row-group';
		document.querySelector('#landscape_answer_body').innerHTML = document.querySelector (tbody_index).innerHTML;
		
		//Portrait table
		document.querySelector('#portrait_kanji_yomikata_header').setAttribute('rowspan', kanji_yomikata_elements.length);
		document.querySelector('#portrait_word_kanji_header').setAttribute('rowspan', word_kanji_elements.length);
		document.querySelector('#portrait_word_kana_header').setAttribute('rowspan', word_kana_elements.length);
		document.querySelector('#portrait_word_english_header').setAttribute('rowspan', word_english_elements.length);
		document.querySelector('#portrait_word_spanish_header').setAttribute('rowspan', word_spanish_elements.length);
		for (let i = 0; i < kanji_yomikata_elements.length; i++) {
            if (i == 0) {
				document.querySelector('#portrait_kanji_yomikata_data').textContent += kanji_yomikata_elements [i].innerHTML;
			} else {
				document.querySelector('#portrait_kanji_yomikata_body').innerHTML += `<tr><td>${kanji_yomikata_elements[i].innerHTML}</td></tr>`;
			}
        }
		for (let i = 0; i < word_kanji_elements.length; i++) {
            if (i == 0) {
				document.querySelector('#portrait_word_kanji_data').textContent += word_kanji_elements [i].innerHTML;
			} else {
				document.querySelector('#portrait_word_kanji_body').innerHTML += `<tr><td>${word_kanji_elements[i].innerHTML}</td></tr>`;
			}
        }
		for (let i = 0; i < word_kana_elements.length; i++) {
            if (i == 0) {
				document.querySelector('#portrait_word_kana_data').textContent += word_kana_elements [i].innerHTML;
			} else {
				document.querySelector('#portrait_word_kana_body').innerHTML += `<tr><td>${word_kana_elements[i].innerHTML}</td></tr>`;
			}
        }
		for (let i = 0; i < word_english_elements.length; i++) {
            if (i == 0) {
				document.querySelector('#portrait_word_english_data').textContent += word_english_elements [i].innerHTML;
			} else {
				document.querySelector('#portrait_word_english_body').innerHTML += `<tr><td>${word_english_elements[i].innerHTML}</td></tr>`;
			}
        }
		for (let i = 0; i < word_spanish_elements.length; i++) {
            if (i == 0) {
				document.querySelector('#portrait_word_spanish_data').textContent += word_spanish_elements [i].innerHTML;
			} else {
				document.querySelector('#portrait_word_spanish_body').innerHTML += `<tr><td>${word_spanish_elements[i].innerHTML}</td></tr>`;
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