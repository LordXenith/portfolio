function change()
{
	let element = document.getElementById("person"); 
	element.src = 'images/Elaine/hmm.gif';
}
function overwrite(number)
{
	let element = document.getElementById("guess");
	element.innerHTML = `<p class='speech-bubble'> Is ${number} your number? </p>`;
}
function win()
{
	document.body.innerHTML = `<h1> YAY I GOT IT ^~^ </h1> <img src=images/Elaine/hooray.gif height="500" width="500"> <button class='button button1' style='color: blue;' onclick="location.reload(true)";width: 300px; margin: 0 auto;"> Play again? </button>`;
}