var buttons = document.getElementsByClassName("drum");

for (e of buttons) {
  e.addEventListener("click", clicked);
}

document.addEventListener("keydown", keyPressed);

function clicked() {
  blinkButton(this.innerText);
  console.log(this.innerText);
  playSound(this.innerText);
}

function keyPressed(evt) {
  blinkButton(evt.key);
  console.log(evt.key);
  playSound(evt.key);
}

function playSound(key) {
  var audio;
  var validKey = false;
  switch (key) {
    case "w":
      audio = new Audio("sounds/crash.mp3");
      validKey = true;
      break;
    case "a":
      audio = new Audio("sounds/kick-bass.mp3");
      validKey = true;
      break;

    case "s":
      audio = new Audio("sounds/snare.mp3");
      validKey = true;
      break;

    case "d":
      audio = new Audio("sounds/tom-1.mp3");
      validKey = true;
      break;

    case "j":
      audio = new Audio("sounds/tom-2.mp3");
      validKey = true;
      break;

    case "k":
      audio = new Audio("sounds/tom-3.mp3");
      validKey = true;
      break;

    case "l":
      audio = new Audio("sounds/tom-4.mp3");
      validKey = true;
      break;
    default:
      audio = new Audio("sounds/tom-1.mp3");
      break;
  }
  if (validKey) {
    audio.play();
  }
}

function blinkButton(char) {
  if (
    char == "w" ||
    char == "a" ||
    char == "s" ||
    char == "d" ||
    char == "j" ||
    char == "k" ||
    char == "l"
  ) {
    var num_blinks = 6;
    setInterval(
      function() {
        if (num_blinks > 0) {
          var btn = document.querySelector("." + char);
          btn.classList.toggle("button-clicked");
          num_blinks--;
        }
      },
      100,
      char,
      num_blinks
    );
  }
}
