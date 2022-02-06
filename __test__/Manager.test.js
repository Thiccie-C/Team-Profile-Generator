const { test, expect } = require("@jest/globals");
const Manager = require("../lib/Manager")

test("Creates a manager object", () => {
    const manager = new Manager('John', 40, 'John.smith@gmail.com', 2);

    expect(manager.officeNumber).toEqual(expect.any(Number))
})
test('gets role of employee', () => {
    const manager = new Manager('John', 40, 'John.smith@gmail.com', 2)
    expect(manager.getRole()).toEqual("Manager")
})