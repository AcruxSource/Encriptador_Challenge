log = console.log;
const inputText = document.getElementById("text__box");
const lineNumber = document.querySelector(".box__input--lin");
const columnNumber = document.querySelector(".box__input--col");
const maxLength = 48;

(function x(...typeEvent) {
  typeEvent.forEach((element) => {
    inputText.addEventListener(element, (ev) => {
      switch (ev.type) {
        case "keyup":
        case "click":
          var handler = cursorPosition();
          columnNumber.textContent = handler.column()[0];
          lineNumber.textContent = handler.line;
          break;
        case "input":
          wordWrap();
      }
    });
  });
})("click", "keyup", "select", "input");

function cursorPosition() {
  const position = inputText.selectionStart;
  const subText = inputText.value.substring(0, position).split(/\n/);

  return {
    column: () => {
      let charsCount = 0;
      for (let i = 0; i < subText.length - 1; i++) {
        var textLength = subText[i].length;
        charsCount += textLength + 1;
      }
      return [position - charsCount + 1, charsCount];
    },
    line: subText.length,
  };
}
function wordWrap() {
  // debugger;
  const textArea = {
    text: null,
    buffer: [],
  };
  textArea.text = inputText.value.split(/\n/);
  textArea.text.forEach((element) => {
    if (element.length > maxLength) {
      const index = textArea.text.indexOf(element);
      const indexLastSpace = element.lastIndexOf(" ");
      textArea.buffer.push(element.substring(0, indexLastSpace));
      textArea.buffer.push(element.substring(indexLastSpace + 1));
      textArea.text[index] = textArea.buffer[0];
      if (textArea.text[index + 1] != undefined) {
        textArea.text[index + 1] =
          textArea.buffer[1] + " " + textArea.text[index + 1];
      } else {
        textArea.text.push(textArea.buffer[1]);
      }
    }
  });
  log(textArea.text);
  inputText.value = textArea.text.join().replace(/[,]/g, "\n");
}

function clean() {
  inputText.value = "";
}

function getUppercase() {
  let re = /\w*[A-Z]\w*/g;
  log(inputText.value.match(re));
}
