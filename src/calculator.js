#!/usr/bin/env node

/*
 * Supported operations:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*, x, X, ×)
 * - division (/, ÷)
 */

function add(left, right) {
  return left + right;
}

function subtract(left, right) {
  return left - right;
}

function multiply(left, right) {
  return left * right;
}

function divide(left, right) {
  if (right === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return left / right;
}

function normalizeOperation(operationInput) {
  if (operationInput === "×") {
    return "*";
  }
  if (operationInput === "÷") {
    return "/";
  }
  return operationInput.toLowerCase() === "x" ? "*" : operationInput;
}

function calculate(left, operationInput, right) {
  const operation = normalizeOperation(operationInput);
  switch (operation) {
    case "+":
      return add(left, right);
    case "-":
      return subtract(left, right);
    case "*":
      return multiply(left, right);
    case "/":
      return divide(left, right);
    default:
      throw new Error("Operation must be one of: +, -, *, /");
  }
}

function runCli() {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    console.error("Usage: node src/calculator.js <number> <operation> <number>");
    console.error("Example: node src/calculator.js 8 '*' 4");
    process.exit(1);
  }

  const [leftInput, operationInput, rightInput] = args;
  const left = Number(leftInput);
  const right = Number(rightInput);

  if (Number.isNaN(left) || Number.isNaN(right)) {
    console.error("Both operands must be valid numbers.");
    process.exit(1);
  }

  try {
    console.log(calculate(left, operationInput, right));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  normalizeOperation,
  calculate,
  runCli
};
