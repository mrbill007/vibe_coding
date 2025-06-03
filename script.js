const result = document.getElementById("result");
let currentInput = "";

function appendNumber(num) {
  currentInput += num;
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput === "") return;

  const lastChar = currentInput[currentInput.length - 1];
  if (["+", "-", "*", "/", "%"].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  updateDisplay();
}

function deleteLastChar() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    // Replace × with * for calculation
    const expression = currentInput.replace(/×/g, "*");
    const answer = eval(expression);

    if (isNaN(answer) || !isFinite(answer)) {
      throw new Error("Invalid calculation");
    }

    currentInput = answer.toString();
    updateDisplay();
  } catch (error) {
    currentInput = "Error";
    updateDisplay();
    setTimeout(clearDisplay, 1500);
  }
}

function updateDisplay() {
  result.value = currentInput;
}
