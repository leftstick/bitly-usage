'use strict';

var Question = function(questions) {
    this.questions = questions;
};

Question.prototype.ask = function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
        if (!_this.questions || _this.questions.length === 0) {
            process.nextTick(function() {
                resolve({});
            });
            return;
        }
        var inquirer = require('inquirer');

        inquirer.prompt(_this.questions, function(answers) {
            resolve(answers);
        });
    });
};

module.exports = Question;
