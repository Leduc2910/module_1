let newCalc = true;
let inputHuge = document.getElementById('input');
let inputTiny = document.getElementById('input-two');

function calculate() {
	let value = inputHuge.innerHTML;
	let result = eval(value);
	if(result){
		inputHuge.innerHTML = result;
		//inputTiny.value = (`${input} = `);
		inputTiny.value = value + " = ";
	}
	newCalc = true;
}

function addInput(value) {
	// valid: value 0
	// valid: new calc
	if(newCalc){
		if(value != '.'){
			inputHuge.innerHTML = '';
		}
		newCalc = false;
	}
	inputHuge.innerHTML += value;
	inputLengthScale();
}

function clearInput() {
	inputHuge.innerHTML = '';
	inputTiny.value = '';
	defaultInput();
}

function canbacHai() {
	let value = inputHuge.innerHTML;
	let result = Math.sqrt(value);
	inputHuge.innerHTML = result;
	inputTiny.value = (`√/(${value})`);
}

function motChia() {
	let value = inputHuge.innerHTML;
	let result = 1/value;
	inputHuge.innerHTML = result;
	inputTiny.value = (`1/(${value})`);
}


// shady

function markNegative(){
	let value = inputHuge.innerHTML;
	try {
		let number = parseFloat(value);
		number *= (-1);
		inputHuge.innerHTML = number;
	} catch (error) {
		inputHuge.innerHTML = "0";
	}
}

function defaultInput(){
	let value = inputHuge.innerHTML;
	if(value.trim() == 0){
		inputHuge.innerHTML = '0';
		newCalc = true;
	}
	inputLengthScale();
	
}
function deleteChar(){
	let value = inputHuge.innerHTML;
	value = value.slice(0,-1);
	inputHuge.innerHTML = value;
	defaultInput();
}

function inputLengthScale(){
	// check value input lenght
	let inputWrap = document.getElementsByClassName("input-main-wrap")[0];
	let inputSize = inputHuge.clientWidth;
	let wrapSize = inputWrap.clientWidth;
	let scale = wrapSize/inputSize;
	if(scale < 1){
		inputHuge.style.scale = scale;
	}
	else{
		inputHuge.style.scale = 1;
	}
}