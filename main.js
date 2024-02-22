log = console.log;
const inputText = document.getElementById("text__box");
const lineNumber = document.querySelector(".box__input--lin");
const columnNumber = document.querySelector(".box__input--col");
const text = {} || undefined;

(function x(...typeEvent) {
  typeEvent.forEach((element) => {
    inputText.addEventListener(element, (ev) => {
      elementCatch(this);
      lineNumber.textContent = this.txt.length;
      // lineNumber.textContent = positionStatus().lin;
      // columnNumber.textContent = positionStatus().col;

      if (ev.type === "input") {
        // positionStatus();
      }
      if (ev.type === "select") {
        lineNumber.textContent = " -";
        columnNumber.textContent = "-";
      }
    });
  });
}).apply(text, ["click", "keyup", "select", "input"]);

function elementCatch(text) {
  const text1 = inputText.value;
  text.txt = inputText.value;
  const position = inputText.selectionStart;
  var charsCount = 0;

  const textArray = text1.substring(0, position).split("\n");
  log(textArray);
  for (let i = 0; i < textArray.length - 1; i++) {
    var textLength = textArray[i].length;
    charsCount += textLength + 1;
  }
  log(position, charsCount);
}
function clean() {
  inputText.value = "";
}
