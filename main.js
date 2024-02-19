log = console.log;
const inText = document.getElementById("input");
const position = document.querySelector(".statusPosition");

inText.addEventListener("keyup", () => {});
inText.addEventListener("click", () => {});
inText.addEventListener("select", () => {});
function positionStatus() {
  const text = inText.value;
  const position = inText.selectionStart;
  var charsCount = 0;
  const textArray = text.substring(0, position).split("\n");
  for (var i = 0; i < textArray.length - 1; i++)
    charsCount += textArray[i].length + 1;
  return {
    lin: textArray.length,
    col: position - charsCount + 1,
  };
}
