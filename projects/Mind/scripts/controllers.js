let button1 = document.getElementById("yes");
button1.addEventListener("click", correct);

let button2 = document.getElementById("low");
button2.addEventListener("click",small);

let button3 = document.getElementById("high");
button3.addEventListener("click",big)

function correct() {
	win();
}

function small() {
	max = mid - 1;
	guessNumber(min, max);
}
function big(){
	min = mid + 1;
	guessNumber(min, max);
}