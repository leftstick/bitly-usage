'use strict';

var request = require('request');

var Bitly = function(token) {
    this.access_token = token;
};

Bitly.prototype.setAccessToken = function(token) {
    this.access_token = token;
};

Bitly.prototype.expand = function(shortUrl, hash) {
    var _this = this;
    return new Promise(function(resolve, reject) {

        request.get({
            url: 'https://api-ssl.bitly.com/v3/expand',
            qs: {
                access_token: _this.access_token,
                shortUrl: shortUrl,
                hash: hash
            }
        }, function(e, response, body) {
            if (e || response.statusCode !== 200) {
                reject(new Error('Bitly system error: ' + response.statusMessage ? response.statusMessage : ''));
                return;
            }
            var _ = require('lodash');
            var result = JSON.parse(body);
            var merged = _.merge.apply(undefined, result.data.expand);
            if (merged.error) {
                reject(new Error('Bitly convert error: ' + merged.error));
                return;
            }
            resolve(merged);
        });

    });
};

Bitly.prototype.shorten = function(longUrl) {
    var _this = this;
    return new Promise(function(resolve, reject) {

        request.get({
            url: 'https://api-ssl.bitly.com/v3/shorten',
            qs: {
                access_token: _this.access_token,
                longUrl: longUrl
            }
        }, function(e, response, body) {
            if (e || response.statusCode !== 200) {
                reject(new Error('Bitly system error: ' + response.statusMessage ? response.statusMessage : ''));
                return;
            }
            var result = JSON.parse(body);
            resolve(result.data);
        });

    });
};

module.exports = Bitly;
