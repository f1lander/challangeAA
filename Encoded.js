"use strict"

const _ = require('underscore'),
wordlist = require('./resources/words.json');

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

class EncodedFunctions {

    encoded(_url, _encoded) {
        
        return {
            
            method : 'POST',
            url : _url,
            formData : {
                encodedValue: _encoded,
                emailAddress: "filanderuclez@gmail.com",
                name: "Edax",
                webhookUrl: "https://protected-savannah-1372.herokuapp.com/api/tablitas",
                repoUrl: "https://github.com/f1lander/challangeAA"
            }
        }

    }

    /* All FUNCTIONS FOR ALGORITHMS ************************************* */
    replaceAt(index, character, array, i) {
        array[i] = array[i].substr(0, index) + character + array[i].substr(index + character.length);
    };
    //Order words in alphabeticall order
    orderArray(arrayWords, reverse) {

        arrayWords.sort(function (a, b) {

            a = a.toLowerCase();
            b = b.toLowerCase();
            if (a < b) return (-1 * reverse);
            if (a > b) return reverse;
            return 0;

        });
        return arrayWords;
    }
    //Vowel and Capital check
    vowelCheck(c) {
        const pos = "AEIOUYaeiouy".indexOf(c);
        let result = { isV: false, isC: false }

        if (result < 6) {
            result = { isV: true, isC: true }
        } else if(result > 5) {
            result = { isV: true, isC: false }
        }

        return result;
    }
    //Move Vowels
    moveVowels(arrayWords) {
        const lenght = arrayWords.length;

        for (let i = 0; i < lenght; i++) {
            for (let j = 0; j < arrayWords[i].length; j++) {
                //first check it's a vowel and second one           
                //save the result for this.vowelCheck and the char
                const char1 = arrayWords[i][j];
                const first_vowelChar = this.vowelCheck(char1);
                //If it's a vowel && is not be the last char
                if (first_vowelChar.isV && j < arrayWords[i].length - 1) {
                    const char2 = arrayWords[i][j + 1];
                    const second_vowelChar = this.vowelCheck(char2);
                    //check the second one is v
                    if (second_vowelChar.isV) {
                        //it is check if one of both is C, this 
                        if (first_vowelChar.isC || second_vowelChar.isC) {
                           
                            replaceAt(j, char2, arrayWords, i);
                            replaceAt(j + 1, char1, arrayWords, i);
                            j++;
                        }
                    } else {
                      
                        replaceAt(j, char2, arrayWords, i);
                        replaceAt(j + 1, char1, arrayWords, i);
                        j++;
                    }

                    //Check it is vowel and is the last one char
                } else if (first_vowelChar.isV && j == arrayWords[i].length - 1) {
                    arrayWords[i] = char1 + arrayWords[i].substr(0, arrayWords[i].length - 1);
                }
            }

        }
        return arrayWords;
    }
    //Step 3 code ASCII
    asciiCode(originalArray) {

        const lengthArray = originalArray.length;
        let firstCode = 0; ///originalArray[0][0].charCodeAt();
        let concatArray = originalArray[0];
        for (let i = 0; i < lengthArray; i++) {

            if (i == 0) {
                firstCode = originalArray[lengthArray - 1][0].charCodeAt();
                concatArray += firstCode;
                //break;
            } else {
                concatArray += originalArray[i] + originalArray[i - 1][0].charCodeAt();
            }
        }

        return concatArray;
    }
    //Step4 base64 encoded
    base64Encode(concatArray) {

        const Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

        const encoded = Base64.encode(concatArray);

        return encoded;
    }

    //Delimited with *
    concatAsterik(originalArray) {

        const length = originalArray.length;
        let concatArray = '';
        for (let i = 0; i < length; i++) {

            if (i + 1 == length) {
                concatArray += originalArray[i];
                break;
            }
            concatArray += originalArray[i] + '*';
        }
        return concatArray;
    }

    //search words
    searchWords(arrayWords) {
        let newWordsArray = [];
        const length = arrayWords.length;
        let concatWord = '';

        for (let i = 0; i < length; i++) {

            for (let h = 0; h < arrayWords[i].length; h++) {

                concatWord += arrayWords[i][h];

                const searchIt = _.find(wordlist.words, function (word) {
                    return word == concatWord.toLowerCase();
                });

                if (typeof searchIt !== 'undefined') {
                    newWordsArray.push(concatWord);
                    concatWord = '';
                }
                if (h == arrayWords[i].length - 1 && concatWord != '') {
                    newWordsArray.push(concatWord);
                    concatWord = '';
                };
            }

        }
        return newWordsArray;
    }

    //Alternate for All consonant
    consonant(wordsArray) {
        let isCap = wordsArray[0][0] == wordsArray[0][0].toUpperCase();
        let _letterCounter = 0;
        const length = wordsArray.length
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < wordsArray[i].length; j++) {
                if (_letterCounter == 0) {
                    _letterCounter++;
                    isCap = !this.vowelCheck(wordsArray[i][j]).isV ? !isCap : isCap;
                    continue;
                }

                if (!this.vowelCheck(wordsArray[i][j]).isV) {
                    let leta = isCap ? wordsArray[i][j].toUpperCase() : wordsArray[i][j].toLowerCase();
                    wordsArray[i] = wordsArray[i].replaceAt(j, leta);
                    isCap = !isCap;
                }

            }
        }
        //  console.log(wordsArray);
        return wordsArray;
    }

    //REplace vowels with fibonnaci numbers order
    replaceFibonnacci(wordsArray, _sfn) {
        let sfn = _sfn;

        let bsfn = 0;
        let f0 = 0;
        let f1 = 1;
        let fn = 0;
        while (_sfn != fn) {
            fn = f0 + f1;
            f0 = f1;
            f1 = fn;
        };
        bsfn = f0;

        const length = wordsArray.length
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < wordsArray[i].length; j++) {
                if (this.vowelCheck(wordsArray[i][j]).isV) {
                    // console.log(wordsArray[i][j]);

                    wordsArray[i] = wordsArray[i].replace(wordsArray[i][j], sfn);
                    let tempBsfn = sfn;
                    sfn = bsfn + sfn;
                    bsfn = tempBsfn;
                    //  console.log(wordsArray[i][j]);
                }

            }
        }
        //console.log(wordsArray);
        return wordsArray;
    };

}

module.exports = EncodedFunctions;