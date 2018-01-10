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
    customKeyboard.setAttribute('class', 'active');
}



// when someone touch a key, it's printed in the input aeraa
function write(textInput, allKeys) {

    for (let i=0; i<allKeys.length; i++) {
        allKeys[i].addEventListener('click', (e) => { // add the listener on each key

            console.log(e.target.classList);
            let contentInput = textInput.textContent;
            let character = "";
            let isLetter = false;
            let regexLetters = '/[a-z,. ]/gi';
            console.log('typeof ' + typeof e.target.textContent);
            if ((e.target.textContent).search(regexLetters) && !e.target.classList.contains('capslock')) { // if the character is a letter or a space or punctuation
                character = e.target.textContent;
                isLetter = true;
                console.log('je suis un caractère');

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

            } else {
                console.log('je ne reconnais pas le caractère');
            }

            // remove the pipe
            if (contentInput[contentInput.length-1] === "|") {
                let newContent = contentInput.replace(contentInput[contentInput.length-1], '');
                contentInput = newContent;
            }

            if (isLetter === true) { // if the key is a letter, we add it to the current string, but we don't want to do it if it is a 'return' or 'caps' key for example
                textInput.textContent = contentInput + character;
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