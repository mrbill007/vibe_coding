const result = document.getElementById("result");
let currentInput = "";

function appendNumber(num) {
  currentInput += num;
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput === "") return;

  const lastChar = currentInput[currentInput.length - 1];
  if (["+", "-", "*", "/", "%", "^", "(", ")"].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  updateDisplay();
}

function calculateFunction(func) {
  try {
    let value = parseFloat(currentInput);
    let result;

    switch (func) {
      case "sin":
        result = Math.sin((value * Math.PI) / 180); // Convert to radians
        break;
      case "cos":
        result = Math.cos((value * Math.PI) / 180);
        break;
      case "tan":
        result = Math.tan((value * Math.PI) / 180);
        break;
      case "log":
        result = Math.log10(value);
        break;
      case "sqrt":
        result = Math.sqrt(value);
        break;
    }

    if (isNaN(result) || !isFinite(result)) {
      throw new Error("Invalid calculation");
    }

    currentInput = result.toString();
    updateDisplay();
  } catch (error) {
    currentInput = "Error";
    updateDisplay();
    setTimeout(clearDisplay, 1500);
  }
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
    // Replace × with * and ^ with ** for calculation
    let expression = currentInput.replace(/×/g, "*").replace(/\^/g, "**");

    // Handle parentheses and ensure proper operator precedence
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
