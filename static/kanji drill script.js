document.addEventListener('DOMContentLoaded', function() {
	
	const tbodies = document.getElementsByTagName('tbody');
	const tbodies_length = tbodies.length;
	const generate_random_index = () => Math.floor(Math.random() * tbodies_length) + 1;
	const generate_data_question_index = (integer) => `#row_index_${integer} .question`;
	const generate_data_answer_index = (integer) => `#row_index_${integer} .answer`;
	//Because it is '#row_index_X .question', with an space, it searches for a descendant.
	//If you do     '#row_index_X.question', without an space, it searches for an element with that id and that class.
	const generate_tbody_index = (integer) => `#row_index_${integer}`;
	
	let flow_state = false; //false-> show question, true-> show answer	
	let integer = generate_random_index();
	let tbody_index;
	let question_index;
	let answer_index;
	
	let question_elements;
	let answer_elements;
	
	function display_question (integer) {
		tbody_index = generate_tbody_index (integer);
		question_index = generate_data_question_index (integer);
		answer_index = generate_data_answer_index (integer);
		document.querySelector(tbody_index).style.display = 'table-row-group';
		question_elements = document.querySelectorAll(question_index);
		answer_elements = document.querySelectorAll(answer_index);
		question_elements.forEach(function(element) {
			element.style.display = 'table-cell';
		});
		answer_elements.forEach(function(element) {
			element.style.display = 'none';
		});
	}
	
	function display_answer (integer) {
		tbody_index = generate_tbody_index (integer);
		question_index = generate_data_question_index (integer);
		answer_index = generate_data_answer_index (integer);
		document.querySelector(tbody_index).style.display = 'table-row-group';
		question_elements = document.querySelectorAll(question_index);
		answer_elements = document.querySelectorAll(answer_index);
		question_elements.forEach(function(element) {
			element.style.display = 'table-cell';
		});
		answer_elements.forEach(function(element) {
			element.style.display = 'table-cell';
		});
	}
	
	display_question (integer);
	
	document.querySelector('#next').onclick = function() {
		if (flow_state) { //show answer -> show question
			flow_state = false;
			document.querySelector(tbody_index).style.display = 'none';
			integer = generate_random_index();
			display_question (integer);
		} else { //show question -> show answer
			flow_state = true;
			display_answer (integer);
		}
	};
});