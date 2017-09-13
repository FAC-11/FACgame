var interval = 3000;
var switching = setInterval("toggleSlide(true)", interval);
window.paused = false;
function toggleInterval() {
  var button = document.getElementById("pauseButton");
  if (!window.paused) {
    clearInterval(switching);
    button.value = "Resume";
  } else {
    switching = setInterval("toggleSlide(true)", interval);
    button.value = "Pause";
  }
  window.paused = !(window.paused);
}
function toggleSlide(direction) {
  var elements = document.getElementsByClassName("hideable");
  var visibleID = getVisible(elements);
  elements[visibleID].style.display = "none";
  if (!direction) {
    var makeVisible = prev(visibleID, elements.length);
  } else {
    var makeVisible = next(visibleID, elements.length);
  }
  elements[makeVisible].style.display = "block";
  var sn = document.getElementById("slideNumber");
  sn.innerHTML = (makeVisible + 1);
}
function getVisible(elements) {
  var visibleID = -1;
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].style.display == "block") {
      visibleID = i;
    }
  }
  return visibleID;
}
function prev(num, arrayLength) {
  if (num == 0) return arrayLength - 1;
  else return num - 1;
}
function next(num, arrayLength) {
  if (num == arrayLength - 1) return 0;
  else return num + 1;
}
function goToEdge(where) {
  var elements = document.getElementsByClassName("hideable");
  var visibleID = getVisible(elements);
  var firstButton = document.getElementById("firstButton");
  var lastButton = document.getElementById("lastButton");
  var sn = document.getElementById("slideNumber");
  elements[visibleID].style.display = "none";
  if (!where) {
    elements[0].style.display = "block";
    sn.innerHTML = 1;
  } else {
    elements[elements.length - 1].style.display = "block";
    sn.innerHTML = elements.length;
  }
}

              function selectleader(event){
                var sn = document.getElementById("slideNumber");
                console.log(sn);
                   var image = document.getElementsByTagName("img")[sn];
                   console.log("image", image);
                   return image.src;
               };