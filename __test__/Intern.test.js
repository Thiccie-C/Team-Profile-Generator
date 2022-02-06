const Intern = require('../lib/Intern')
test('creates an Intern Object', () => {
    const intern = new Intern('John', 40, 'John.smith@gmail.com' ,'UofM')

    expect(intern.school).toEqual(expect.any(String))
})
test('gets employee school', () => {
    const  intern = new Intern('John', 40, 'John.smith@gmail.com' ,'UofM')

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()))
})
test('gets role of employee', () => {
    const intern = new Intern('John', 40, 'John.smith@gmail.com' ,'UofM')

    expect(intern.getRole()).toEqual("Intern")
})