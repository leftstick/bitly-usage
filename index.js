'use strict';

var Question = require('./libs/Question');

new Question([
    {
        type: 'list',
        name: 'oper',
        message: 'Choose operation you preferred: ',
        choices: [
            'Shorten',
            'Expand'
        ]
    }
])
    .ask()
    .then(function(answers) {
        require('./' + answers.oper)();
    });
