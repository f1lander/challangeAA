"use strict";

const pichetio = require("request"),
    uuid = require('node-uuid'),
    async = require('async'),
    baseUrl = 'http://internal-devchallenge-2-dev.apphb.com/',
    Encoded = require('./Encoded'),
    Avengers = require('./Avengers');

let _guid = uuid.v1();
let encFunc = new Encoded(); // all of the encoded functions
let interVal = 1;

let main = () => {

    pichetio.get({
        url: baseUrl + 'values/' + _guid,
        headers: {
            'Accept': 'application/json'
        }
    }, (error, response, body) => {
        console.log(response);
        if (!error && response.statusCode == 200) {
         

            let encodedValues = [];

            let res = JSON.parse(body);

            let avengers = new Avengers(res.words, _guid);

            let url = `${baseUrl}values/${_guid}/`;

            let _encodedd, encodedValue;
            console.log('algorithm Name', res.algorithm);
            switch (res.algorithm.toLowerCase()) {
                case 'ironman':
                    encodedValue = avengers.ironMan();
                    _encodedd = encFunc.encoded(url, encodedValue);
                    encodedValues.push(_encodedd);
                    console.log(url, encodedValue, _encodedd);
                    break;
                case 'thor':
                    encodedValue = avengers.thor();
                    _encodedd = encFunc.encoded(url, encodedValue);
                    encodedValues.push(_encodedd);
                    console.log(url, encodedValue, _encodedd);
                    break;
                case 'theincrediblehulk':
                    encodedValue = avengers.hulk();
                    _encodedd = encFunc.encoded(url, encodedValue);
                    encodedValues.push(_encodedd);
                    console.log(url, encodedValue, _encodedd);
                    break;
                default: //default is for elCapi
                console.log(res.startingFibonacciNumber);
                    encodedValue = avengers.capitan(res.startingFibonacciNumber);
                    _encodedd = encFunc.encoded(url, encodedValue);
                    encodedValues.push(_encodedd);
                    console.log(url, encodedValue, _encodedd);
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

let postito = (encon) => {
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

main();
interVal = setInterval(main, 1000);
