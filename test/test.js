'use strict';

var Bitly = require('../libs/Bitly');
var assert = require('assert');

describe('Bitly', function() {

    it('shorten test', function(done) {
        new Bitly('f6d8b8c4fac30062943ced3d7fff1798e97494ae')
            .shorten('http://www.hfworks.cn/about')
            .then(function(data) {
                assert.equal('http://bit.ly/1N9Wr1j', data.url);
                done();
            })
            .catch(function(err) {
                done(err);
            });
    });

    it('expand test', function(done) {
        new Bitly('f6d8b8c4fac30062943ced3d7fff1798e97494ae')
            .expand('http://bit.ly/1N9Wr1j', '1N9Wr1j')
            .then(function(data) {
                assert.equal('http://www.hfworks.cn/about', data.long_url);
                done();
            })
            .catch(function(err) {
                done(err);
            });
    });

    it('exception test', function(done) {
        new Bitly()
            .expand('http://bit.ly/1N9Wr1j', '1N9Wr1j')
            .catch(function(err) {
                assert(!!err);
                done();
            });
    });

});
