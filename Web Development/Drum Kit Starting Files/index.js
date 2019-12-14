var buttons = document.getElementsByClassName('drum');

for (e of buttons) {
  e.addEventListener('click', clicked);
}

function clicked() {
  console.log('I\'m clicked!');
}
