const generateHTML = require("./src/generateHTML") 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const fs = require('fs'); 
const inquirer = require('inquirer');
const Employee = require("./lib/Employee");

const teamArray = [];
const addManager = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Who will be managing this team?",
            validate: nInput => {
                if (nInput) {
                    return true;
                } else {
                    console.log("Please enter the name of the manager")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What's their ID number?",
            validate: idInput => {
                if (isNaN(idInput)) {
                    console.log("Please enter their Id number");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: "email",
            message: "What's a good email to contact them at?",
            validate: eInput => {
                valid =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (valid) {
                    return true;
                } else {
                    console.log("Please enter an email")
                    return false;
                }
            }
        }, 
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the managers office number?',
            validate: oInput => {
                if (isNaN(oInput)) {
                    console.log("Please provide the Managers office Number")
                    return false
                } else {
                    return true;
                }      
            }
        }
    ])
    .then(managerInput => {
        const { name, id, email, officeNumber } = managerInput;
        const manager = new Manager (name, id, email, officeNumber)

        teamArray.push(manager)
        console.log(manager)
    })
}

const addEmployee = () => {
    console.log(`
    =================
    Adding Employee to team
    ==================
    `);

    return inquirer.prompt([
    {
        type: 'list',
        name: 'role',
        message: "Please choose a role for this employee",
        choices: ['Engineer', 'Intern']
    },
    {
        type: 'input',
        name: 'name',
        message: 'what is the name of the employee',
        validate: nInput => {
            if(nInput) {
                return true;
            } else {
                console.log("Please enter a name for this employee")
                return false;
            }
        }
    },
    {
        type: "input",
        name: 'id',
        message: "Please provide the employee's Id Number",
        validate: idInput => {
            if (isNaN(idInput)) {
                console.log("Please provide a Id NUMBER")
            } else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is a good Email to contact this employee?",
        validate: eInput => {
            valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(valid) {
                return true
            } else {
                console.log("Please enter an email")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: "Please enter the Employee's GitHub username",
        when: (input) => input.role === "Engineer",
        validate: ghInput => {
            if (ghInput) {
                return true;
            } else {
                console.log("Please enter the employee's GitHub username")
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: "What school does the intern go to?",
        when: (input) => input.role === "Intern",
        validate: sInput => {
            if (sInput) {
                return true
            } else {
                console.log("Please enter a school")
            }
        }
    },
    {
        type: 'confirm',
        name: 'addAnotherEmployee',
        message: 'Would you like to add another team member?',
        default: 'false'
    },
    ])
    .then(data => {
        let { name, id, email, role, github, school, addAnotherEmployee } = data
        let employee
        if(role === "Engineer") {
            employee = new Engineer(name, id, email, github);
            console.log(employee)
        } else if (role === "Intern") {
            employee = new Intern(name, id, email, school)
            console.log(employee)
        }
        teamArray.push(employee);

        if(addAnotherEmployee) {
            return addEmployee(teamArray)
        } else {
            return teamArray;
        }
    })
}
const writeFile = (data) => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return
        } else {
            console.log("Your team profile has been created checkout the index.html ")
        }
    })
}

addManager()
    .then(addEmployee)
    .then(teamArray => {
    return generateHTML(teamArray)
})
.then(pageHTML => {
    return writeFile(pageHTML)
})
.catch(err => {
    console.log(err);
})