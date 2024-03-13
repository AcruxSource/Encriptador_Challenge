log = console.log;
const inputText = document.querySelector(".text__box--in");
const outputText = document.querySelector(".text__box--out");
const lineNumber = document.querySelector(".box__input--lin");
const columnNumber = document.querySelector(".box__input--col");
const modeCheckBox = document.getElementById("toggle");
const mode = document.querySelector(".title--modo");
const btnSave = document.getElementById("btn--save");
const modal = document.querySelector(".dialog");
const boxSave = document.getElementById("container--save");
const inputSave = document.querySelector(".input");
const maxLength = 48;
const textArea = {
  text: null,
  buffer: [],
};

btnSave.addEventListener("click", () => {
  modal.style.display = "flex";
  boxSave.style.display = "block";
  inputSave.value = "";
});

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
          getUppercase();
      }
    });
  });
})("click", "keyup", "select", "input");

modeCheckBox.addEventListener("change", () => {
  modeCheckBox.checked
    ? (mode.textContent = "Modo: DES-ENCRIPTAR")
    : (mode.textContent = "Modo: ENCRIPTAR");
});

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
  // log(textArea.text);
  inputText.value = textArea.text.join().replace(/[,]/g, "\n");
}

function clean() {
  inputText.value = "";
}

function getUppercase() {
  let re = /\w*[A-Z]\w*/g;
  const uppercaseString = inputText.value.match(re);
  log(uppercaseString);
}

function codeMake() {
  let patterns = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];
  let code = inputText.value;
  patterns.forEach((element) => {
    if (!modeCheckBox.checked) {
      let re = new RegExp(element[0], "g");
      code = code.replace(re, element[1]);
    } else {
      let re = new RegExp(element[1], "g");
      code = code.replace(re, element[0]);
    }
  });
  outputText.value = code;
}

function save() {
  if (inputSave.value !== "") {
    localStorage.setItem(inputSave.value, outputText.value);
    modal.style.display = "none";
    boxSave.style.display = "none";
  }
}
function closeM() {
  modal.style.display = "none";
  boxSave.style.display = "none";
}
