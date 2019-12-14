var randomNumber1 = Math.floor(Math.random() * 6 + 1);
var randomNumber2 = Math.floor(Math.random() * 6 + 1);

console.log(randomNumber1);
console.log(randomNumber2);

var imgURL1 =
    document.body.getElementsByClassName('img1')[0].getAttribute('src');
var imgURL2 =
    document.body.getElementsByClassName('img2')[0].getAttribute('src');
// console.log(imgURL1);
var regex = /[1 - 6]/g;
imgURL1 = imgURL1.replace(regex, randomNumber1);
imgURL2 = imgURL1.replace(regex, randomNumber2);

// console.log(imgURL1);
document.body.getElementsByClassName('img1')[0].setAttribute('src', imgURL1);
document.body.getElementsByClassName('img2')[0].setAttribute('src', imgURL2);

var titleMessage = document.body.getElementsByTagName('h1')[0].innerText;
if (randomNumber1 > randomNumber2) {
  titleMessage = '🚩Player 1 win!';
} else if (randomNumber1 == randomNumber2) {
  titleMessage = 'Draw!';
} else {
  titleMessage = 'Player 2 win! 🚩';
}
document.body.getElementsByTagName('h1')[0].innerText = titleMessage;