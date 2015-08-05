'use strict';
var Shorten = function() {
    var Question = require('./libs/Question');

    new Question([
        {
            type: 'input',
            name: 'longUrl',
            message: 'Please type an complete url: ',
            validate: function(longUrl) {
                var urlRex = /^((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/;
                return urlRex.test(longUrl) ? true : 'Error long url';
            }
        }
    ])
        .ask()
        .then(function(answers) {
            var Bitly = require('./libs/Bitly');
            return new Bitly('f6d8b8c4fac30062943ced3d7fff1798e97494ae')
                .shorten(answers.longUrl);
        })
        .then(function(data) {
            var printer = new (require('./libs/Printer'))();
            printer.push('Long URL', data.long_url);
            printer.push('Short URL', data.url);
            printer.push('Hash', data.hash);
            printer.push('Global Hash', data.global_hash);
            printer.print();
        })
        .catch(function(error) {
            console.log(error);
        });

};

module.exports = Shorten;
