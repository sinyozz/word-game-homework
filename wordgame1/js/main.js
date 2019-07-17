
function showWord(wordDiv, wordToGuess, usedLetters) {
    var textToShow = "";
    var letter;
    var result = true;
   
    for (letterIndex in wordToGuess) {
        letter = wordToGuess[letterIndex];
        if (usedLetters.includes(letter.toLowerCase()) || usedLetters.includes(letter.toUpperCase())) {
            textToShow+=letter;
        } else {
            textToShow+="_";
            result = false;
        }
        textToShow+=" ";
    }
    wordDiv.innerHTML = textToShow;
   
    return result;
}


function showCounter(turnDiv, counter) {
   
    turnDiv.style.fontSize = 1+(8-counter)/8+"em";
    turnDiv.innerHTML = "Turns: "+counter;
}


function showUsedLetters(usedLettersDiv, usedLetters) {
    var textToShow = "Used letters: ";
    usedLetters.forEach(function(elem) {
        textToShow += elem + " ";
    });
    usedLettersDiv.innerHTML = textToShow;
}


function checkEmptyOrDuplicates(letter, usedLetters) {
    if (!letter || letter.length!=1 || letter.toLowerCase()==letter.toUpperCase()) {
        return false;
    }
    if (usedLetters.includes(letter.toLowerCase()) || usedLetters.includes(letter.toUpperCase())) {
        return false;
    }
    return true;
}


document.addEventListener("DOMContentLoaded", function () {
   
    var wordToGuess = commonWords[Math.floor(Math.random() * commonWords.length)];
    var wordDiv = window["word-to-guess"];
    var turnDiv = window["turn-counter"];
    var usedLettersDiv = window["used-letters"];
    var inputElem = document.body.getElementsByTagName("input")[0];
    var usedLetters = [];
    var counter = 8;
    
    inputElem.focus();
    showWord(wordDiv, wordToGuess, usedLetters); 
    showCounter(turnDiv, counter);

 
 function process() {
     
    if (checkEmptyOrDuplicates(inputElem.value,usedLetters)) {
       
        usedLetters.push(inputElem.value);
        counter --;
       
        var result = showWord(wordDiv, wordToGuess, usedLetters); 
        showCounter(turnDiv, counter);
        showUsedLetters(usedLettersDiv, usedLetters);
        
        if (result) {
            document.body.getElementsByClassName("form-content")[0].innerHTML = "<h1 style='color: red;'>You win!<h1>"
        } else if (counter==0) {
            document.body.getElementsByClassName("form-content")[0].innerHTML = "<h1 style='color: pink;'>You loose(((<h1>"
        }
        inputElem.focus();
    } else {
        
        alert("Invalid input: invalid input value or duplicate input");
    }
    
    inputElem.value = "";
    }    
    
    document.body.getElementsByTagName("button")[0].onclick = process;
    
    inputElem.onkeydown = function(event) {
        
        var keyCode = event.keyCode || event.which;
        if (keyCode == '13'){
            process();
        }   
    };
    

});