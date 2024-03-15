log = console.log;
const inputText = document.querySelector(".text__box--in");
const outputText = document.querySelector(".text__box--out");
const lineNumber = document.querySelector(".box__input--lin");
const columnNumber = document.querySelector(".box__input--col");
const modeCheckBox = document.getElementById("toggle");
const mode = document.querySelector(".title--modo");
const btnSave = document.getElementById("btn--save");
const btnOpen = document.getElementById("btn--open");
const modal = document.querySelector(".dialog");
const boxSave = document.getElementById("container--save");
const boxOpen = document.getElementById("container--open");
const inputSave = document.querySelector(".input");
const tbBody = document.querySelector("tbody");
let statusAnimation = false;
const maxLength = 48;
const textArea = {
  text: null,
  buffer: [],
};

btnSave.addEventListener("click", () => {
  const count = getListNames().length;
  if (count > 0) {
    sphereNotification("que bien!... otro secreto para guardar", 3000);
  } else {
    sphereNotification("Un nuevo secreto para tu historia", 3000);
  }
  modal.style.display = "flex";
  boxSave.style.display = "block";
  inputSave.value = "";
});

btnOpen.addEventListener("click", () => {
  const count = getListNames().length;
  if (count > 0) {
    sphereNotification(`Excelente tienes ${count} archivos disponibles`, 3000);
  } else {
    sphereNotification("Hasta el momento no tenemos archivos", 3000);
  }

  modal.style.display = "flex";
  boxOpen.style.display = "block";
  createTable(getListNames());
});

tbBody.addEventListener("click", (ev) => {
  const target = ev.currentTarget;
  const child = ev.target.parentElement;
  const rowIndex = child.rowIndex;
  const rowCount = target.childElementCount;

  for (let i = 0; i < rowCount; i++) {
    if (i === rowIndex - 1) {
      target.childNodes[i].style.background = "#5603bd";
      target.childNodes[i].select = true;
      continue;
    }
    target.childNodes[i].style.background = "";
    target.childNodes[i].select = false;
  }
});

((...typeEvent) => {
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
          // wordWrap();
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

function getListNames() {
  let nameArray = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i).split(".");
    if (key[2] === "crp") {
      key.pop();
      nameArray.push(key);
    }
  }
  return nameArray;
}

function createTable(list) {
  const tb = document.querySelector("table");
  tbBody.innerText = "";

  list.forEach((element) => {
    let tr = document.createElement("tr");

    element.forEach((data) => {
      let td = document.createElement("td");
      let cellText = document.createTextNode(data);
      td.appendChild(cellText);
      tr.appendChild(td);
    });
    tbBody.appendChild(tr);
  });
  tb.appendChild(tbBody);
}

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
  inputText.value = textArea.text.join().replace(/[,]/g, "\n");
}

function clean() {
  inputText.value = "";
  outputText.value = "";
}

async function getUppercase() {
  let re = /\w*[A-Z]\w*/g;
  const uppercaseString = inputText.value.match(re);
  log(uppercaseString);
  await sphereNotification("Bienvenidos");
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
      if (!inputText.value) {
        sphereNotification("OK... ?", 2000);
      } else {
        sphereNotification("OK... ENCRIPTADO", 2000);
      }
    } else {
      let re = new RegExp(element[1], "g");
      code = code.replace(re, element[0]);
      if (!inputText.value) {
        sphereNotification("OK... ?", 2000);
      } else {
        sphereNotification("OK... DES-ENCRIPTADO", 2000);
      }
    }
  });
  outputText.value = code;
}

function save() {
  sphereNotification();
  if (inputSave.value !== "") {
    const objDate = new Date();
    const dateNow =
      objDate.getDate() +
      "-" +
      (objDate.getMonth() + 1) +
      "-" +
      objDate.getFullYear();

    const name = inputSave.value + "." + dateNow + ".crp";
    localStorage.setItem(name, outputText.value);
    closeM();
  }
}
function getKey() {
  const rowCount = tbBody.childElementCount;
  for (let i = 0; i < rowCount; i++) {
    if (tbBody.childNodes[i].select) {
      return getListNames()[i][0] + "." + getListNames()[i][1] + ".crp";
    }
  }
  return null;
}

function openFile() {
  const key = getKey();
  if (key !== null) {
    outputText.value = localStorage.getItem(key);
    sphereNotification(`Archivo ${key.split(".")[0]}... listo`, 3000);
    closeM();
  }
}
function closeM() {
  modal.style.display = "none";
  boxSave.style.display = "none";
  boxOpen.style.display = "none";
}
function deleteFile() {
  const key = getKey();
  const updateTable = createTable;
  if (key !== null) {
    localStorage.removeItem(key);
    updateTable(getListNames());
    sphereNotification(`${key.split(".")[0]} eliminado`, 3000);
  }
}

async function sphereNotification(message, duration) {
  const notification = document.querySelector(".container--notification");
  const msnBox = document.querySelector(".message");

  const promiseAnimation = new Promise((resolve, reject) => {
    if (!statusAnimation) {
      statusAnimation = true;
      setTimeout(() => {
        const animation = msnBox.animate(
          [
            { opacity: "0" },
            { opacity: "0" },
            { opacity: "1" },
            { opacity: "1" },
            { opacity: "1" },
            { opacity: "0" },
          ],
          {
            duration: duration,
          }
        );

        animation.finished.then(() => {
          msnBox.textContent = "";
          statusAnimation = false;
          notification.style.width = "120px";
          resolve(true);
        });
        animation.ready.then(() => {
          notification.style.width = "400px";
          msnBox.textContent = message;
        });
      }, 500);
    }
  });
  await promiseAnimation;
}
// (async () => {
//   await sphereNotification("Bienvenido!...Soy KRIPT", 3000);
//   await sphereNotification("mensajes secretos encriptados", 3000);
// })();
