const {
  add,
  subtract,
  multiply,
  divide,
  normalizeOperation,
  calculate
} = require("../calculator");

describe("calculator core functions", () => {
  test("adds numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("subtracts numbers", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("multiplies numbers", () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test("divides numbers", () => {
    expect(divide(20, 5)).toBe(4);
  });

  test("throws on division by zero", () => {
    expect(() => divide(20, 0)).toThrow("Division by zero is not allowed.");
  });
});

describe("operation normalization", () => {
  test("normalizes x, X, and × to *", () => {
    expect(normalizeOperation("x")).toBe("*");
    expect(normalizeOperation("X")).toBe("*");
    expect(normalizeOperation("×")).toBe("*");
  });

  test("normalizes ÷ to /", () => {
    expect(normalizeOperation("÷")).toBe("/");
  });

  test("keeps standard operators unchanged", () => {
    expect(normalizeOperation("+")).toBe("+");
    expect(normalizeOperation("-")).toBe("-");
    expect(normalizeOperation("*")).toBe("*");
    expect(normalizeOperation("/")).toBe("/");
  });
});

describe("calculate", () => {
  test("handles basic operations from examples", () => {
    expect(calculate(2, "+", 3)).toBe(5);
    expect(calculate(10, "-", 4)).toBe(6);
    expect(calculate(45, "*", 2)).toBe(90);
    expect(calculate(20, "/", 5)).toBe(4);
  });

  test("accepts alternate multiply and divide symbols", () => {
    expect(calculate(9, "x", 3)).toBe(27);
    expect(calculate(8, "X", 2)).toBe(16);
    expect(calculate(7, "×", 2)).toBe(14);
    expect(calculate(18, "÷", 3)).toBe(6);
  });

  test("throws on invalid operation", () => {
    expect(() => calculate(4, "%", 2)).toThrow("Operation must be one of: +, -, *, /");
  });
});
