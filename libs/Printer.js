'use strict';

var Printer = function() {
    var Table = require('cli-table');
    this._table = new Table({
        style: {
            head: [
                'cyan'
            ]
        }
    });
};

Printer.prototype.push = function(key, value) {
    var obj = {};
    obj[key] = value;
    this._table.push(obj);
};

Printer.prototype.print = function() {
    console.log(this._table.toString());
};

module.exports = Printer;
