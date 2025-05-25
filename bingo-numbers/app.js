// Referencias a los elementos del DOM
const getNumberButton = document.getElementById("get_number");
const restartButton = document.getElementById("restart");
const numberSelected = document.getElementById("number_selected");
const oldNumbersList = document.getElementById("old_numbers");
const findItemInput = document.getElementById("find_item");

// Letras de Bingo y números generados
const bingoLetters = ["B", "I", "N", "G", "O"];
let generatedNumbers = new Set();
let spinCount = 0;

// Función para generar un número aleatorio con letra
function generateBingoNumber() {
  if (generatedNumbers.size >= 75) {
    alert("Todos los números ya han sido generados.");
    return;
  }

  let letter, number, bingoNumber;
  do {
    letter = bingoLetters[Math.floor(Math.random() * bingoLetters.length)];
    number =
      Math.floor(Math.random() * 15) + 1 + bingoLetters.indexOf(letter) * 15;
    bingoNumber = `${letter}${number}`;
  } while (generatedNumbers.has(bingoNumber));

  generatedNumbers.add(bingoNumber);
  
  // Verificar si el número ya está en la lista y resaltarlo
  const existingItem = Array.from(oldNumbersList.children).find(
    (item) => item.textContent === bingoNumber
  );

  // Animar la rueda
  spinCount++;
  const spinWheel = document.getElementById("spin_wheel");
  spinWheel.style.transform = `rotate(${Math.floor(spinCount * 360)}deg)`;

  // Mostrar el número seleccionado
  setTimeout(() => {
    numberSelected.textContent = bingoNumber;
  }, 600);

  const colorValidation =
    letter === "B"
      ? "#5459AC"
      : letter === "I"
      ? "#F564A9"
      : letter === "N"
      ? "#129990"
      : letter === "G"
      ? "#FF9B45"
      : "#222222";

  if (existingItem) {
    highlightItem(existingItem);
  } else {
    // Agregar el número a la lista de números generados
    const listItem = document.createElement("li");
    listItem.textContent = bingoNumber;
    listItem.style.color = colorValidation;
    listItem.style.fontWeight = 600;
    oldNumbersList.appendChild(listItem);
  }
}

// Función para resaltar un elemento de la lista
function highlightItem(item) {
  item.style.backgroundColor = "yellow";
  setTimeout(() => {
    item.style.backgroundColor = "";
  }, 2000); // Resaltar por 2 segundos
}

// Función para reiniciar el juego
function restartGame() {
  generatedNumbers.clear();
  numberSelected.textContent = "0";
  oldNumbersList.innerHTML = "";
}

// Funcion para buscar item
function findItem() {
  const searchValue = findItemInput.value.trim().toUpperCase();
  oldNumbersList.querySelectorAll("li").forEach((item) => {
    if (searchValue && item.textContent.includes(searchValue)) {
      item.classList.add("highlight");
    } else {
      item.classList.remove("highlight");
    }
  });
}

// Event listeners
getNumberButton.addEventListener("click", generateBingoNumber);
restartButton.addEventListener("click", restartGame);
findItemInput.addEventListener("input", findItem);
