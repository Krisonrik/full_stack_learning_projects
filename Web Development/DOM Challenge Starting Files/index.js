var cur_node = document.body;
function changeToBig(cur_node) {
  if (cur_node != null) {
    cur_node.classList.toggle('huge');
    if (cur_node.hasChildNodes()) {
      cur_node = cur_node.firstElementChild;
      changeToBig(cur_node)
    } else {
      cur_node = cur_node.nextElementSibling;
      changeToBig(cur_node)
    }
  }
}

for (var i = 0; i < 9; i++) {
  changeToBig(cur_node);
  cur_node = document.body;
}
