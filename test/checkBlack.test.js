const { checkBlack } = require("../js/main"); // Import the function from your main.js file

describe("checkBlack", () => {
  it("should return an array of valid scopes for 'o'", () => {
    const values = "0 0 0 o 0 0 0 0 0 0 0 0 0 0 0 0".split(" ");
    const n = 3; // Index of 'o' in the values array
    const result = checkBlack(n, values);
    expect(result).toEqual([2, 4, 10, 3]);
  });

  it("should return an array of valid scopes for 't'", () => {
    const values = "0 0 0 0 0 t 0 0 0 0 0 0 0 0 0 0".split(" ");
    const n = 5; // Index of 't' in the values array
    const result = checkBlack(n, values);
    expect(result).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);
  });

  // Add more test cases for other piece types
});
