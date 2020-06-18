const inquirer = require('inquirer');
const { join } = require('path');
const fs = require('fs');

inquirer.prompt([
    {
        type: 'input',
        name: 'appName',
        message: 'Enter appName',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter a valid appName';
            }
        }
    }
    // 57
]).then(answers => {
    var fs = require('fs');
    var dir = `./src/apps/${answers.appName}`;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        fs.writeFileSync(join(dir, 'commonEntry.js'), '');
        
        fs.mkdirSync(join(dir, '/components'));
        fs.mkdirSync(join(dir, '/layouts'));
        fs.mkdirSync(join(dir, '/pages'));
        fs.mkdirSync(join(dir, '/pages', '/home'));
        fs.writeFileSync(join(dir, '/pages', '/home', 'home.page.js'));
        fs.writeFileSync(join(dir, '/pages', '/home', 'home.page.scss'));
        fs.writeFileSync(join(dir, '/pages', '/home', 'home.page.pug'));
        fs.writeFileSync(join(dir, 'commonEntry.js'), '');

        fs.mkdirSync(`./src/mockData/${answers.appName}`);
        fs.writeFileSync(join(`./src/mockData/${answers.appName}`, '/home.page.data.js'), 'exports.data = {}; \nexports.serverData = {}');

    } else {
        console.log(`App "${answers.appName}" already exists`)
    }
});