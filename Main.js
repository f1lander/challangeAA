"use strict";

const pichetio = require("request"),
    uuid = require('node-uuid'),
    async = require('async'),
    baseUrl = 'http://internal-devchallenge-2-dev.apphb.com/',
    Encoded = require('./Encoded'),
    Avengers = require('./Avengers');
    
let interVal = 1;
let encodedValues = [];

class Main {

    constructor() {
        this.main();
        interVal = setInterval(this.main, 1000);
    }

    main() {

        const postito = (encodedValues) => {
            async.map(encodedValues, (url, callback) => {
                // iterator function
                pichetio(url, (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        var bodyu = JSON.parse(body);
                        console.log(bodyu);
                    } else {
                        console.log('Error');
                    }
                });
            }, (err, results) => {
                if (err)
                    console.log('Error');
            });
        };

        let encFunc = new Encoded(); // all of the encoded functions
        let _guid = uuid.v1();
        const url = `${baseUrl}values/${_guid}`;
        pichetio.get({
            url: url,
            headers: {
                'Accept': 'application/json'
            }
        }, (error, response, body) => {

            if (!error && response.statusCode == 200) {

                let res = JSON.parse(body);

                let avengers = new Avengers(res.words, _guid);

                let _encodedd, encodedValue;

                switch (res.algorithm.toLowerCase()) {
                    case 'ironman':
                        encodedValue = avengers.ironMan();
                        _encodedd = encFunc.encoded(url, encodedValue);
                        encodedValues.push(_encodedd);
                        break;
                    case 'thor':
                        encodedValue = avengers.thor(res.startingFibonacciNumber);
                        _encodedd = encFunc.encoded(url, encodedValue);
                        encodedValues.push(_encodedd);
                        break;
                    case 'theincrediblehulk':
                        encodedValue = avengers.hulk();
                        _encodedd = encFunc.encoded(url, encodedValue);
                        encodedValues.push(_encodedd);
                        break;
                    default: //default is for elCapi

                        encodedValue = avengers.capitan(res.startingFibonacciNumber);
                        _encodedd = encFunc.encoded(url, encodedValue);
                        encodedValues.push(_encodedd);
                        break;
                }
                if (encodedValues.length == 20) {
                    clearInterval(interVal);
                    postito(encodedValues);
                }
                console.log(`Encoded Values: ${encodedValues.length}`);
            }
        });
    }

}

module.exports = Main;
