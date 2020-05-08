let correct = 0;
let wrongCount = 6;
let wins = 0;
let loses = 0;
let mistakes = 0;
let tracker = 'light';

// Creates a new game
document.getElementById('newGame_button').onclick = function(){
document.getElementById("newGame").setAttribute('hidden',true);
document.getElementById('guessString').style.color = "#00b0ff";

//Changes buttons not being disabled
$('.btn-light').prop('disabled',false);
var buttons = document.getElementsByClassName('btn-light');
for(button of buttons)
{
	button.style.background = "white";
}
//Resets the correct counter and wrong counter and the mistakes
correct = 0;
wrongCount = 6;
mistakes = 0;
updateHangmanPicture();
getWord();
};

// Gets the word that the user will guess
function getWord()
{
	let xhr = new XMLHttpRequest();
	const key = "ab0d5274c4e036127a40d059f3c06ea27056d56b0e0300d75"
	const url = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key="+key;
	xhr.open('GET',url,true);

	xhr.onload = function()
	{
    	if(this.status == 200)
    	{
    		let data = JSON.parse(this.responseText);
    		if(checkWord(data["word"]))
    		{
        		playGame(data["word"]);
    		} 
    		else 
    		{
        		getWord();
    		}
    	}
    	else 
    	{
    		console.log("Connection Error");
    	}
	}
 	xhr.send();
}

// The game being played
function playGame(word)
{
	document.getElementById('panel_1').innerHTML = `<h1>Guesses: ${wrongCount}</h1>`;
	let wordArray = word.toUpperCase().split("");
	let guessArray = [];
  
	for(let i in word)
	{
    	guessArray.push("_");
	}
	setGuess(guessArray);
	var letters = document.getElementsByClassName('btn-light');
	for(let letter of letters)
	{
		letter.onclick = function(){
    	letter.disabled = true;
    	let guess = this.firstChild.nodeValue;
    	if(word.toUpperCase().indexOf(guess) > -1)
    	{
	      	checkGuess(guess, wordArray, guessArray)
	        this.style.background = "green";
    	} 
    	else 
    	{
	        this.style.background = "red";
	        wrongCount--;
	        mistakes++;
	        updateHangmanPicture();
    	}
	    	document.getElementById('panel_1').innerHTML = `<h1> Guesses: ${wrongCount}</h1>`;
	    	if(correct == wordArray.length){endGame(true, word);}
	    	else if(wrongCount <= 0) {endGame(false, word);}
    	}//end of onclick function
	}//end of for loop
}

function updateHangmanPicture()
{
	document.getElementById('hangmanPic').src = 'images/' + mistakes + '.png';
}

// Checks if the word is valid and playable
function checkWord(word){
	if(word.length > 12)
	{
		return false;
	}
	let badChars = [" ","-",",",".","/"];
	
	for(let char of badChars)
	{
    	if(word.indexOf(char) > -1)
    	{
    		return false;
    	}
    }
    return true;
}

// Checks if the guessed letter is in the word
function checkGuess(guess, wordArray, guessArray)
{
	for(let i in wordArray)
	{
    	if(wordArray[i] == guess)
    	{
    		guessArray[i] = guess;
    		correct++;
    	}
	}
	setGuess(guessArray);
}

// Places correctly guessed letters into the correct spaces
function setGuess(guessArray)
{
	let output = "";
	for(let char of guessArray)
	{ 
		output += char + " ";
	}
	document.getElementById('guessString').innerHTML = `${output}`;
}

// Called when the game is over. 'New Game' button is now visible
function endGame(result, word)
{
	$('.btn-light').prop('disabled',true);
	document.getElementById("newGame").removeAttribute('hidden');
	
	if(result)
	{
    document.getElementById('panel_1').innerHTML = `<h1>GAME OVER!</h1> <h1> You Win! </h1> <img class='shrink' src='https://78.media.tumblr.com/a7fc299158bd339466147ba3ca7a8a34/tumblr_o2pnzvp41R1sk1rjvo1_500.gif'>`;
    wins++;
    document.getElementById('winCount').innerHTML = `Games Won: ${wins}`;
	} 
	
	else 
	{
    document.getElementById('panel_1').innerHTML = `<h1>GAME OVER!</h1> <h1> You Lose! </h1> <img class='shrink' src='https://i0.kym-cdn.com/photos/images/original/001/230/774/9b2.gif'>`;
    loses++;
    document.getElementById('loseCount').innerHTML = `Games Lost: ${loses}`;
    document.getElementById('guessString').innerHTML = `${word.toUpperCase()}`;
	}
}

// Changes the theme with a click of a button
function changeTheme()
{
	if(tracker == 'dark')
	{
		document.getElementById('header').style.background = "black";
		document.getElementById('keyboard').style.background = "black";
		document.getElementById('panel_1').style.background = "black";
		document.getElementById('panel_2').style.background = "black";
		document.body.style.background = "#313030"
		tracker = 'light';
	}
	else
	{
		document.getElementById('header').style.background = "#566573";
		document.getElementById('keyboard').style.background = "#566573";
		document.getElementById('panel_1').style.background = "#566573";
		document.getElementById('panel_2').style.background = "#566573";
		document.body.style.background = "#ABB2B9"
		tracker = 'dark';
	}
}