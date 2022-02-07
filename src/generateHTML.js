// create a card for the inputted Manager
const generateManager = function (manager) {
    return `
    <div class="col-6 mt-4">
        <div class="card h-100">
            <div class="card-header">
                <h3>${manager.name}</h3>
                <h4>Manager</h4>
                <i class="gg-awards"></i>
            </div>
            <div class="card-body">
                <p class="id">ID: ${manager.id}</p>
                <p class="email">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
                <p class="office">Office Number: ${manager.officeNumber}</p>
            </div>
        </div>
    </div>
    `;
}

// creates a card for the inputted Engineer
const generateEngineer = function (engineer) {
    return `
    <div class="col-6 mt-4">
        <div class="card h-100">
            <div class="card-header">
                <h3>${engineer.name}</h3>
                <h4>Engineer</h4>
                <i class="gg-organisation"></i>
            </div>
            <div class="card-body">
                <p class="id">ID: ${engineer.id}</p>
                <p class="email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
                <p class="github">Github: <a href="https://github.com/${engineer.github}">${engineer.github}</a></p>
            </div>
        </div>
    </div>
    `
}

// creates a card from the inputted Intern
const generateIntern = function (intern) {
    return `
    <div class="col-6 mt-4">
        <div class="card h-100">
            <div class="card-header">
                <h3>${intern.name}</h3>
                <h4>Intern</h4>
                <i class="gg-copy"></i>
            </div>
            <div class="card-body">
                <p class="id">ID: ${intern.id}</p>
                <p class="email">Email:<a href="mailto:${intern.email}">${intern.email}</a></p>
                <p class="school">School: ${intern.school}</p>
            </div>
    </div>
</div>
    `
};

// generates an HTML based on the inputted information
generateHTML = (data) => {
    const htmlArray = [];
    console.log(data)
    for (var i =0; i < data.length; i++){
        const employee = data[i]
        const role = employee.getRole();


        if(role=== "Manager") {
            const managerCard = generateManager(employee);

            htmlArray.push(managerCard);
        }


        if(role === "Engineer") {
            const engineerCard = generateEngineer(employee);

            htmlArray.push(engineerCard);
        }

        if(role === "Intern") {
            const internCard = generateIntern(employee);

            htmlArray.push(internCard)
        }
    }

    const employeeCards = htmlArray.join('')

    const generateTeam = generateTeamPage(employeeCards)
    return generateTeam;
}

const generateTeamPage = function (employeeCards) {   
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link href="https://css.gg/css?=|awards|copy|organisation" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header>
            <nav class="navbar" id="navbar">
                <span class="navbar-brand mb-0 h1 w-100 text-center" id="navbar-text">Team Profile</span>
            </nav>
        </header>
        <main>
            <div class="container">
                <div class="row justify-content-center" id="team-cards">
                    <!--Team Cards-->
                    ${employeeCards}
                </div>
            </div>
        </main>
        
    </body>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    </html>
  `;
  }

  module.exports = generateHTML;