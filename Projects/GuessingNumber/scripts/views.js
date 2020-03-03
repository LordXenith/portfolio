let image_tracker = 'f'
function change()
{
	let image = document.getElementById("person")
	if(image_tracker=='f')
	{
		image.src = './images/Elaine/blink1.png';
		image_tracker = 't';
	}
	else
	{
		image.src = './images/Elaine/base.png';
		image_tracker='f';
	}
}
	let timer = setInterval("change()",1100);
function stopTimer()
{
	clearInterval(timer);
}
function overwrite(number)
{
	let element = document.getElementById("guess");
	element.innerHTML = `<p class='speech-bubble'> Is ${number} your number? </p>`;
}
function win()
{
	document.body.innerHTML = `<h1> YAY I GOT IT ^~^ </h1> <img src=images/Elaine/hooray.png> <button onclick="location.reload(true)"> Play again? </button>`;
}