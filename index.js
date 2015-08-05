'use strict';

var inquirer = require('inquirer');

inquirer.prompt([
    {
        type: 'list',
        name: 'oper',
        message: 'Choose operation you preferred: ',
        choices: [
            'Shorten',
            'Expand'
        ]
    }
], function(answers) {
    require('./' + answers.oper)();
});
