log = console.log;
const notification = document.querySelector(".container--notification");
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

window.addEventListener("resize", () => {
  if (window.innerWidth > 600 && window.innerWidth <= 940) {
    notification.style.display = "none";
  } else if (window.innerWidth > 940) {
    notification.style.display = "";
  } else if (window.innerWidth < 600) {
    notification.style.display = "";
  }
});

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
      }
    });
  });
})("click", "keyup");

modeCheckBox.addEventListener("change", () => {
  if (modeCheckBox.checked) {
    mode.textContent = "Modo: DES-ENCRIPTAR";
    sphereNotification("\u25c9 .DES-ENCRIPTAR. \u25c9 configurado ", 2000);
  } else {
    mode.textContent = "Modo: ENCRIPTAR";
    sphereNotification("\u25c9  .ENCRIPTAR.   \u25c9 configurado ", 2000);
  }
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

function clean() {
  inputText.value = "";
  outputText.value = "";
  columnNumber.textContent = "";
  lineNumber.textContent = "";
}

function getException() {
  const re1 = /\w*[A-Z]\w*/g;
  const re2 = /\w*[àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛäëïöüÿÄËÏÖÜŸ]\w*/g;
  const uppercaseString = inputText.value.match(re1);
  const acptString = inputText.value.match(re2);
  log(uppercaseString);
  log(acptString);

  return [uppercaseString, acptString];
}

function codeMake() {
  const [uppercaseString, acptString] = getException();
  if (uppercaseString !== null && acptString !== null) {
    sphereNotification(
      "\u26A0 EJECUCIÓN DENEGADA! \u26A0 No se permiten combinación de mayúsculas y acentos",
      4000
    );
  } else if (uppercaseString !== null) {
    sphereNotification(
      "\u26A0 EJECUCIÓN DENEGADA! \u26A0 No se permiten mayúsculas",
      4000
    );
  } else if (acptString !== null) {
    sphereNotification(
      "\u26A0 EJECUCIÓN DENEGADA! \u26A0 No se permiten acentos",
      4000
    );
  } else {
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
  const msnBox = document.querySelector(".message");
  const promiseAnimation = new Promise((resolve, reject) => {
    if (!statusAnimation) {
      if (window.innerWidth > 600 && window.innerWidth <= 940) {
        notification.style.display = "";
      }

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
          if (window.innerWidth > 600 && window.innerWidth <= 940) {
            setTimeout(() => {
              notification.style.display = "none";
            }, 600);
          }
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
