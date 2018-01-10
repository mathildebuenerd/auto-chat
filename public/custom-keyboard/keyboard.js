/**
 * Created by mathi on 04/01/2018.
 */

setup();

function setup() {

    let customKeyboard = document.querySelector('#custom-keyboard');
    let allKeys = customKeyboard.querySelectorAll('li'); // array with all the keys
    let textInput = document.querySelector('.inputSay'); // input area
    textInput.addEventListener('focus', () => {
        textInput.blur(); // if input is an input tag, it prevents the native android keyboard to shows
    });
    textInput.addEventListener('click', (e) => {
        showKeyboard(e, textInput)
    });

    write(textInput, allKeys);
    displayHiddenCharacters(allKeys);

}
// the keyboard is shown when the input area is triggered
function showKeyboard(e, textInput) {
    console.log(e);

    // we need to add a fake pipe, because we use a div element instead of an input to prevent the native keyboard to show, and change the size of the area more easily
    // before adding it we check if it's not already here
    if ((textInput.textContent)[textInput.textContent.length-1] !== '|') {
        showPipe();
        function showPipe() {
            let pipe = "<span class='pipe'>|</span>";
            textInput.innerHTML += pipe;
        }
    }

    let customKeyboard = document.querySelector('#custom-keyboard');
    customKeyboard.classList.add('active');
    textInput.parentNode.classList.add('active'); // we want to move the section#controls element, and it's the textInput parentNode
    calculateConversationHeight(window.innerWidth, window.innerHeight);
}



// when someone touch a key, it's printed in the input aeraa
function write(textInput, allKeys) {

    for (let i=0; i<allKeys.length; i++) {
        allKeys[i].addEventListener('click', (e) => { // add the listener on each key
            let contentInput = textInput.textContent;
            let character = "";
            let isLetter = false;
            let regexLetters = '/[a-z,. ]/gi';

            if (e.target.classList.contains('letter')) { // if the character is a letter or a space or punctuation
                character = e.target.textContent;
                isLetter = true;
                // console.log('je suis un caractère');

            } else if (e.target.classList.contains('capslock')) {
                let allLetters = document.querySelectorAll('.letter');
                if (allLetters[0].textContent === allLetters[0].textContent.toLowerCase()) { // if the letters are lowercase
                    for (let i=0; i<allLetters.length; i++) {
                        allLetters[i].textContent = allLetters[i].textContent.toUpperCase();
                    }
                } else {
                    for (let i=0; i<allLetters.length; i++) {
                        allLetters[i].textContent = allLetters[i].textContent.toLowerCase();
                    }
                }

            } else if (e.target.classList.contains('delete')) {
                // console.log(contentInput);
                contentInput = contentInput.slice(0, -1); // we remove the last character
                textInput.textContent = contentInput;
            } else {
                // console.log('je ne reconnais pas le caractère');
            }

            // remove the pipe
            if (contentInput[contentInput.length-1] === "|") {
                let newContent = contentInput.replace(contentInput[contentInput.length-1], '');
                contentInput = newContent;
            }

            if (isLetter === true) { // if the key is a letter, we add it to the current string, but we don't want to do it if it is a 'return' or 'caps' key for example
                textInput.textContent = contentInput + character;
            }

            autocomplete(textInput.textContent[textInput.textContent.length-1]);
            function autocomplete(lastKey) {

                // let key = lastKey;
                // console.log('key ' + key);

                let query = sayInput.textContent;
                let allowedLetters = new RegExp('[a-z\', ]', 'gi');
                let lastSpaceIndex = findLastSpaceIndex(query); // on récupère l'index du dernier espace pour pouvoir slicer correctement le dernier mot, qui est celui qui sert à l'autocomplétion
                // console.log('query ' + query);
                // console.log("lastSpaceIndex " + lastSpaceIndex);
                function findLastSpaceIndex(query) {
                    console.log(query.length);
                    let space = /\s/;
                    for (let i=query.length; i>0; i--) {
                        console.log('query[i] ' + query[i]);
                        if(space.exec(query[i])) {
                            return i+1; // on renvoie l'index qui correspond à la lettre qui se situe juste après l'espace
                        }
                    }
                    return 0;
                }

                if (allowedLetters.exec(lastKey)) { // we check that the last key is normal character
                    // console.log("letter allowed! " + lastKey);

                    let lastWord = (sayInput.textContent).substring(lastSpaceIndex); // on ajoute 1 à lastSpaceIndex pour ne pas compter l'espace

                    fillAutocompleteOptions(lastWord);
                    function fillAutocompleteOptions(query) {

                        console.log("query dans fillautocomplete " + query);

                        let matchedWords = [];
                        for (let i=0; i<listOfWords.length; i++) {
                            if(listOfWords[i].indexOf(query) !== -1) { // si le pattern match, on ajoute le mot dans le tableau
                                // console.log("j'ai trouvé une correspondance! " + listOfWords[i]);
                                matchedWords.push(listOfWords[i]);
                            }
                        }

                        let suggestions = document.querySelectorAll('.suggestion');

                        // Si trop peu de mots correspondent, on rempli avec d'autres mots
                        while (matchedWords.length < suggestions.length) {
                            let randomIndex = Math.floor(Math.random()*listOfWords.length);
                            matchedWords.push(listOfWords[randomIndex]);
                            // console.log("matched words");
                            // console.log(matchedWords);
                        }

                        for (let i=0; i<suggestions.length; i++) { // on parcoure le nombre de suggestions

                            // s'il y a trop de mots qui correspondent, on choisi au hasard
                            if (matchedWords.length > suggestions.length) {
                                let randomIndex = Math.floor(Math.random()*matchedWords.length);
                                suggestions[i].textContent = matchedWords[randomIndex];
                            } else {
                                suggestions[i].textContent = matchedWords[i];
                            }
                        }

                        console.log("suggestions");
                        console.log(matchedWords);


                    }
                }

                calculateConversationHeight(window.innerWidth, window.innerHeight);

            }

        });
    }
    

    


}

// display the other characters on multiple character keys
function displayHiddenCharacters(allKeys) {

    let multipleCharactersKeys = [];
    for (let i=0; i<allKeys.length; i++) {
        console.log(allKeys[i].children.length);
        if (allKeys[i].children.length > 0) {
            multipleCharactersKeys.push(allKeys[i]);
        }
    }

    console.log(multipleCharactersKeys);
}