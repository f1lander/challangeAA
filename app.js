var pichetio = require("request"),
        uuid = require('node-uuid'),                      
        _ = require('underscore'),
       // base64 = require('base-64'),
        baseUrl = 'http://internal-devchallenge-2-dev.apphb.com/'

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
var wordlist = require('./words.json');
var optionsGET = {
  url: baseUrl + 'values/',
  headers: {
    'Accept': 'application/json'
  }
};


var optionsPOST = {
  url: baseUrl + 'values/',
  headers: {
    'Accept': 'application/json'
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
    var firstCode = 0; ///originalArray[0][0].charCodeAt();
    var concatArray = originalArray[0];
    for (var i = 0; i < lengthArray; i++) {
        
        if(i == 0){
            firstCode = originalArray[lengthArray -1 ][0].charCodeAt();
            concatArray += firstCode;            
            //break;
        }else{
        concatArray += originalArray[i]+ originalArray[i - 1][0].charCodeAt();     
        }
            
       
        
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
}/* ___ */
//ALternate for All consonant
var consonant = function (wordsArray) {
    var isCap = wordsArray[0][0] == wordsArray[0][0].toUpperCase();
    var _letterCounter = 0;
    var length = wordsArray.length
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < wordsArray[i].length; j++) {   
            if(_letterCounter == 0){
                 _letterCounter++;
                     isCap = !vowelCheck(wordsArray[i][j]).isV ?!isCap : isCap;
                 continue;        
            }
            
            if(!vowelCheck(wordsArray[i][j]).isV){                
                 var leta = isCap ? wordsArray[i][j].toUpperCase() : wordsArray[i][j].toLowerCase();                      
                 wordsArray[i] = wordsArray[i].replaceAt(j, leta); 
                 isCap = !isCap;               
            }                       
           
        }
    }
    console.log(wordsArray);
    return wordsArray;
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
    console.log(wordsArray);
    return wordsArray;
};
/* All FUNCTIONS FOR ALGORITHMS ************************************* */
var listByGuid = [];
var interval = 1;
var postit = function (guid, algorithm, encoded) {
     
   pichetio.post({
            url: baseUrl + 'values/' + guid +'/'+algorithm,
            formData:{
            encodedValue:encoded,
            emailAddress:"filanderucles@hotmail.com",
            name:"Edax",
            webhookUrl:"https://protected-savannah-1372.herokuapp.com/api/tablitas",
            repoUrl:"https://github.com/f1lander/challangeAA"
  },
  headers: {
    'Accept': 'application/json'
  }}, function(error, response, body){
       var res = JSON.parse(body);    
        console.log(res);
       // getGuid(guid, algorithm, encoded );
        });
};

var getGuid = function (xguid, algorithm, encoded) {
     
pichetio.get({
  url: baseUrl + 'encoded/' + xguid +'/'+algorithm,
  headers: {
    'Accept': 'application/json'
  }}, function(error, response, body){
        var res = JSON.parse(body);
         console.log(res.encoded);
          console.log(encoded);
           console.log('==========================================================');              
            console.log(res.encoded == encoded);
          
                        
        });
}

var main = function() {
    var _guid = uuid.v1();
        pichetio.get({
  url: baseUrl + 'values/' + _guid,
  headers: {
    'Accept': 'application/json'
  }}, function(error, response, body){
            if (!error && response.statusCode == 200) {
                var res = JSON.parse(body);                
            //     for (var index = 0; index < listByGuid.length; index++) {
            //         var ii = _.difference(listByGuid[index].words, res.words);
            //         if(ii.length == 0 && listByGuid[index].usedGUid < 1 ){
            //             console.log('Encontrado');
            //             guid = listByGuid[index].guid;
            //         }                                             
            //     }                
            //    
               // listByGuid.push({guid: guid, words: res.words, usedGuid: 0}); 
                console.log(res);
                switch(res.algorithm.toLowerCase()) {
                    case 'ironman':
                        ironMan(res.words, _guid, res.algorithm);
                        break;
                    case 'thor':
                        thor(res.words,_guid, res.startingFibonacciNumber, res.algorithm);
                        break;
                    case 'theincrediblehulk':
                        hulk(res.words, _guid, res.algorithm);
                        break;
                    default: //default is for elCapi
                        elCapi(res.words, _guid, res.algorithm, res.startingFibonacciNumber);
                        break;
                }
              
               
            //hulk(res.words, guid);
                
            }
        });
    
    if(interval >= 20){clearInterval(intervalObject); return;}; 
    interval++;  
};


//Call the main method to start the app
main();
var intervalObject = setInterval(main,9000);


//Iron Man Algortihm
var ironMan = function(arrayWords, guid, algorithmName) {
 
 //var originalArray = arrayWords.slice(); 
    //Step 1
      var a = orderArray(arrayWords, 1);
    console.log(a);
    console.log('____________________________________');
    //Step 2 move letters
    var b = moveVowels(a);
    console.log(b);
    console.log('____________________________________');
    //Step 3
    var ascII = asciiCode(b);
    console.log(ascII);
    //Step 4 Base64 encoded
    var encoded = base64Encode(ascII)
    console.log(encoded);
    
    //getGuid(guid, algorithmName, encoded );
     postit(guid, algorithmName, encoded);
};
//Thor Algortihm
var thor = function (arrayWords, guid, sfn, algorithmName) {
    
    var a = searchWords(arrayWords, guid);
    console.log(a);
    console.log('____________________________________');
    //Step 2
    var alphabetized = orderArray(a, 1);
    console.log(alphabetized);
    //Step 3
    var b = consonant(alphabetized);
    console.log(b);
    console.log('____________________________________');
    //Step 4
   var c =replaceFibonnacci(b, sfn);
    //Step 5
    var concat = concatAsterik(c);
    console.log(concat);
    //Step 6 Base64 encoded
     var encoded = base64Encode(concat)
    console.log(encoded);
  //getGuid(guid, algorithmName, encoded );
  postit(guid, algorithmName, encoded);
    
};
//The Incredible Hulk Algortihm
var hulk = function(arrayWords, guid, algorithmName) {
    
 //var originalArray = arrayWords.slice();
     
    //Step 1
    var a = moveVowels(arrayWords);
         console.log(a);
      console.log('____________________________________');
    //Step 2 move letters this sort is not reverse so we send -1 for reverse and -1 for normal order
    var b = orderArray(a, -1);
     console.log(b);
      console.log('____________________________________');
    //Step 3
    var concat = concatAsterik(b);
    console.log(concat);
    //Step 4 Base64 encoded
    var encoded = base64Encode(concat)
    console.log(encoded);
    //getGuid(guid, algorithmName, encoded );
    postit(guid, algorithmName, encoded);
    
};
//Captain America Algortihm
var elCapi = function(arrayWords, guid, algorithmName, sfn) {
    //Step1
    var a = moveVowels(arrayWords);
        console.log(a);
      console.log('____________________________________');
    //Step2
    var b = orderArray(a, -1);
        console.log(b);
      console.log('____________________________________');
    var c = replaceFibonnacci(b, sfn);
    
    //Step 5
    var ascII = asciiCode(c);
    console.log(ascII);
    var encoded = base64Encode(ascII)
    console.log(encoded);
  //getGuid(guid, algorithmName, encoded );
 postit(guid, algorithmName, encoded);
};