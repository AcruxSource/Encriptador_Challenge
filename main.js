log = console.log;
const inputText = document.getElementById("text__box");
const lineNumber = document.querySelector(".box__input--lin");
const columnNumber = document.querySelector(".box__input--col");

inputText.addEventListener("keyup", () => {
  lineNumber.textContent = positionStatus().lin;
  columnNumber.textContent = positionStatus().col;
});
inputText.addEventListener("click", (ev) => {
  lineNumber.textContent = positionStatus().lin;
  columnNumber.textContent = positionStatus().col;
});
inputText.addEventListener("select", () => {
  lineNumber.textContent = "";
  columnNumber.textContent = "";
});

function positionStatus() {
  const text = inputText.value;
  const position = inputText.selectionStart;
  var charsCount = 0;
  const textArray = text.substring(0, position).split("\n");
  for (var i = 0; i < textArray.length - 1; i++)
    charsCount += textArray[i].length + 1;
  return {
    lin: textArray.length,
    col: position - charsCount + 1,
  };
}
