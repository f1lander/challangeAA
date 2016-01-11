var pichetio = require("request"),
        uuid = require('node-uuid'),                      
        _ = require('underscore'),
        baseUrl = 'http://internal-devchallenge-2-dev.apphb.com/'

var guid = uuid.v1();

var wordlist = require('./words.json');
var optionsGET = {
  url: baseUrl + 'values/',
  headers: {
    'Accept': 'appliication/json'
  }
};

var optionsPOST = {
  url: baseUrl + 'values/',
  headers: {
    'Accept': 'appliication/json'
  }
};

/* All FUNCTIONS FOR ALGORITHMS ************************************* */
var replaceAt=function(index, character, array, i) {
    array[i] =  array[i].substr(0, index) + character +  array[i].substr(index+character.length);
    
};
//Order words in alphabeticall order
var orderArray =  function (arrayWords, reverse) {
    
    arrayWords.sort(function(a, b){
        
            a = a.toLowerCase();
            b = b.toLowerCase();
            if (a < b) return (-1 * reverse);
            if (a > b) return reverse;
            return 0;

        });    
     return arrayWords;  
}
//Vowel and Capital check
function vowelCheck(c) {
       var result = "AEIOUYaeiouy".indexOf(c);
       if(result < 0)
       {      
         return {isV:false,isC:false} 
       }else{
            if(result < 6){
                return {isV:true,isC:true}
            }else{
                return {isV:true,isC:false}
            }
       }              
    }
//Move Vowels
var moveVowels = function(arrayWords){
  var lenght = arrayWords.length;
    for (var i = 0; i < lenght; i++) {       
        for (var j = 0; j < arrayWords[i].length; j++) {        
            //first check it's a vowel and second one           
            //save the result for vowelCheck and the char
            var char1 = arrayWords[i][j];
            var first_vowelChar = vowelCheck(char1);
            //If it's a vowel && is not be the last char
            if(first_vowelChar.isV && j < arrayWords[i].length - 1){   
                var char2 = arrayWords[i][j+1];            
                var second_vowelChar = vowelCheck(char2);
                //check the second one is v
                if(second_vowelChar.isV){
                  //it is check if one of both is C, this 
                  if(first_vowelChar.isC || second_vowelChar.isC){                      
                      replaceAt(j, char2, arrayWords, i);                     
                      replaceAt(j + 1, char1,arrayWords, i);                     
                      j++;
                  }                 
                }else{
                      replaceAt(j, char2, arrayWords, i);                     
                      replaceAt(j + 1, char1,arrayWords, i);                      
                      j++;
                }
                
            //Check it is vowel and is the last one char
            }else if(first_vowelChar.isV && j == arrayWords[i].length - 1){                                               
                 arrayWords[i] = char1 + arrayWords[i].substr(0,arrayWords[i].length - 1); 
            }
        }
        
    }    
    return arrayWords;
}
//Step 3 code ASCII
var asciiCode = function(originalArray) {
    
    var lengthArray = originalArray.length;
    var firstCode = originalArray[0][0].charCodeAt();
    var concatArray = originalArray[0];
    for (var i = 0; i < lengthArray; i++) {
        
        if(i + 2 >= lengthArray ){
            concatArray += firstCode + originalArray[lengthArray -1 ] + originalArray[1][0].charCodeAt();            
            break;
        }
            
        concatArray += originalArray[i + 2][0].charCodeAt() + originalArray[i + 1];
        
    }
    
    return concatArray;
}
//Step4 base64 encoded
var base64Encode = function (concatArray) {
    
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

    var encoded = Base64.encode(concatArray);
    
    return encoded;
}

//Delimited with *
var concatAsterik = function(originalArray) {
    
    var lengthArray = originalArray.length;   
    var concatArray = '';
    for (var i = 0; i < lengthArray; i++) {
        
        if(i + 1 == lengthArray ){
            concatArray += originalArray[i];
            break;
        }            
        concatArray += originalArray[i] + '*';        
    }    
    return concatArray;
}

//search words
var searchWords =  function(arrayWords) {
    var newWordsArray = [];    
    var length = arrayWords.length;   
    var concatWord = '';
    
    for (var i = 0; i < length; i++) {
        
      for (var h = 0; h < arrayWords[i].length; h++) {  
                                             
            concatWord += arrayWords[i][h];
            
            var searchIt = _.find(wordlist.words, function(word){                
                return word == concatWord.toLowerCase(); 
            });  
            
            if(typeof searchIt !=='undefined'){
                newWordsArray.push(concatWord);                                           
                concatWord = '';                                   
            }
           if(h == arrayWords[i].length -1 && concatWord != ''){                
                newWordsArray.push(concatWord);              
                concatWord = '';
            };
      }       
       
    }
   return newWordsArray;
}
//ALternate for All consonant
var consonant = function (wordsArray) {
    var isCap = wordsArray[0][0] == wordsArray[0][0].toUpperCase();
    var _letterCounter = 0;
    var length = wordsArray.length
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < wordsArray[i].length; j++) {   
            if(_letterCounter == 0){
                 _letterCounter++;
                 isCap = !isCap;
                 continue;        
            }
            
            if(!vowelCheck(wordsArray[i][j]).isV){                
                 var leta = isCap ? wordsArray[i][j].toUpperCase() : wordsArray[i][j].toLowerCase();                      
                 wordsArray[i] = wordsArray[i].replace(wordsArray[i][j], leta); 
                 isCap = !isCap;               
            }                          
           
        }
    }
    
}

//REplace vowels with fibonnaci numbers order
var replaceFibonnacci = function (wordsArray, _sfn) {
    var sfn = _sfn;
    
    var bsfn = 0;
        var f0 = 0;
        var f1 = 1;
        var fn = 0;   
        while(_sfn!= fn){
            fn = f0 + f1;
            f0 = f1;
            f1 = fn;         
        };       
       bsfn = f0;
    
  
    var length = wordsArray.length
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < wordsArray[i].length; j++) {   
            if(vowelCheck(wordsArray[i][j]).isV){
                // console.log(wordsArray[i][j]);
      
                 wordsArray[i] = wordsArray[i].replace(wordsArray[i][j], sfn);
                 var tempBsfn = sfn; 
                 sfn = bsfn + sfn;
                 bsfn = tempBsfn;
               //  console.log(wordsArray[i][j]);
            }                          
           
        }
    }
    return wordsArray;
};
/* All FUNCTIONS FOR ALGORITHMS ************************************* */
var listByGuid = [];
var interval = 1;

var main = function() {
    optionsGET.url += guid;
        pichetio.get(optionsGET, function(error, response, body){
            if (!error && response.statusCode == 200) {
                var res = JSON.parse(body);
                listByGuid.push({guid: guid, words: res.words}); 
                console.log(res);
                switch(res.algorithm.toLowerCase()) {
                    case 'ironman':
                        ironMan(res.words, guid);
                        break;
                    case 'thor':
                        thor(res.words,guid, res.startingFibonacciNumber);
                        break;
                    case 'theincrediblehulk':
                        hulk(res.words, guid);
                        break;
                    default: //default is for elCapi
                        elCapi(res.words, guid);
                        break;
                }
            //hulk(res.words, guid);
                
            }
        });
    
    /*if(interval >= 20){clearInterval(intervalObject); return;}; 
    interval++;*/  
};
//Call the main method to start the app
main();
//console.log(replaceFibonnacci(['dog', 'cat','bird'], 5));
//consonant(['DoG', 'CaT','BiRd']);
//var intervalObject = setInterval(main,10000);

//Iron Man Algortihm
var ironMan = function(arrayWords, guid) {
 
 var originalArray = arrayWords.slice(); 
    //Step 1
    console.log(orderArray(arrayWords, -1));
    //Step 2 move letters
    console.log(moveVowels(arrayWords));
    //Step 3
    var ascII = asciiCode(originalArray);
    console.log(ascII);
    //Step 4 Base64 encoded
    console.log(base64Encode(ascII));
};
//Thor Algortihm
var thor = function (arrayWords, guid, sfn) {
    
    searchWords(arrayWords, guid);
    //Step 2
    var alphabetized = orderArray(arrayWords, -1);
    console.log(alphabetized);
    //Step 3
    consonant(alphabetized);
    //Step 4
    console.log(replaceFibonnacci(arrayWords, sfn))
    //Step 5
    var concat = concatAsterik(arrayWords);
    console.log(concat);
    //Step 6 Base64 encoded
    console.log(base64Encode(concat));
    
};
//The Incredible Hulk Algortihm
var hulk = function(arrayWords, guid) {
    
 var originalArray = arrayWords.slice();
 
    console.log(wordlist.words[0]);
    //Step 1
    console.log(moveVowels(arrayWords));
    //Step 2 move letters this sort is not reverse so we send -1 for reverse and -1 for normal order
    console.log(orderArray(arrayWords, -1));
    //Step 3
    var concat = concatAsterik(originalArray);
    console.log(concat);
    //Step 4 Base64 encoded
    console.log(base64Encode(concat));
    
};
//Captain America Algortihm
var elCapi = function(arrayWords, guid) {
    //Step1
    console.log(moveVowels(arrayWords));
    //Step2
    console.log(orderArray(arrayWords, 1));
    //Step4
    console.log(asciiCode(arrayWords));
    //Step 5
    console.log(base64Encode(arrayWords));
};