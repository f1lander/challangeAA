"use strict";

const Encoded = require('./Encoded')
const encFunc = new Encoded();
class Avengers {

    constructor(arrayWords, guid) {
        this.arrayWords = arrayWords;
        this.guid = this.guid;
    }

    //Iron Man Algortihm
    ironMan() {
 
        //Step 1
        const a = encFunc.orderArray(this.arrayWords, 1);
        //Step 2 move letters
        const b = encFunc.moveVowels(a);
        //Step 3
        const ascII = encFunc.asciiCode(b);    
        //Step 4 Base64 encoded
        return encFunc.base64Encode(ascII);
    
    }
    //Thor Algortihm
    thor(sfn) {

        const a = encFunc.searchWords(this.arrayWords, this.guid);
        //Step 2
        const alphabetized = encFunc.orderArray(a, 1);
        //Step 3
        const b = encFunc.consonant(alphabetized);
        //Step 4
        const c = encFunc.replaceFibonnacci(b, sfn);
        //Step 5
        const concat = encFunc.concatAsterik(c);
        //Step 6 Base64 encoded
        return encFunc.base64Encode(concat);

    };
    //The Incredible Hulk Algortihm
    hulk() {

        //Step 1
        const a = encFunc.moveVowels(this.arrayWords);
        //Step 2 move letters this sort is not reverse so we send -1 for reverse and -1 for normal order
        const b = encFunc.orderArray(a, -1);
        //Step 3
        const concat = encFunc.concatAsterik(b);
        //Step 4 Base64 encoded
        return encFunc.base64Encode(concat);  

    };
    //Captain America Algortihm
    capitan(sfn) {

        //Step1
        const a = encFunc.moveVowels(this.arrayWords);
        //Step2
        const b = encFunc.orderArray(a, -1);
        const c = encFunc.replaceFibonnacci(b, sfn);
        //Step 5
        const ascII = encFunc.asciiCode(c);

        return encFunc.base64Encode(ascII);
    
    };

};

module.exports = Avengers;