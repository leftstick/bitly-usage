'use strict';

var Expand = function() {
    var Question = require('./libs/Question');

    new Question([
        {
            type: 'input',
            name: 'shortUrl',
            message: 'Please type a short url: ',
            validate: function(shortUrl) {
                var urlRex = /^((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/;
                return urlRex.test(shortUrl) ? true : 'Error short url';
            }
        },
        {
            type: 'input',
            name: 'hash',
            message: 'Please type hash generated while shorten the long URL: ',
            validate: function(shortUrl) {
                return shortUrl ? true : 'Hash cannot be empty';
            }
        }
    ])
        .ask()
        .then(function(answers) {

            var Bitly = require('./libs/Bitly');
            return new Bitly('f6d8b8c4fac30062943ced3d7fff1798e97494ae')
                .expand(answers.shortUrl, answers.hash);
        })
        .then(function(data) {

            var printer = new (require('./libs/Printer'))();
            printer.push('Long URL', data.long_url);
            printer.push('Short URL', data.short_url);
            printer.push('Hash', data.hash);
            printer.push('Global Hash', data.global_hash);
            printer.push('User Hash', data.user_hash);
            printer.print();

        })
        .catch(function(error) {
            console.log(error);
        });

};

module.exports = Expand;
