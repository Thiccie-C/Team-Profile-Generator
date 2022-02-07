const { test, expect } = require('@jest/globals');
const Engineer = require('../lib/Engineer.js')

test('creates an Engineer object', () => {
    const engineer = new Engineer('John', 40, 'John.smith@gmail.com' ,"johnnyboy1969")
    expect(engineer.github) .toEqual(expect.any(String));
});
test('gets an engineer github value', () => {
    const engineer = new Engineer('John', 40, 'John.smith@gmail.com', 'johnnyboy1969')
    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()))
})
test('gets role of employeet', () => {
    const engineer = new Engineer('John', 40, 'John.smith@gmail.com' ,'johnnyboy1969')
    expect(engineer.getRole()).toEqual("Engineer")
});