let max = 1000;
let min = 1;
let mid = Math.floor((max + min) / 2);
let guess = mid;
let gameover = false;
function guessNumber(arg1, arg2)
{
	mid = Math.floor((arg1 + arg2) / 2);
	overwrite(mid);
}