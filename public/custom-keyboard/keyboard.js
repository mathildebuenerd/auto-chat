/**
 * Created by mathi on 04/01/2018.
 */

setup();

function setup() {

    let customKeyboard = document.querySelector('#custom-keyboard');
    let allKeys = customKeyboard.querySelectorAll('li');
    let textInput = document.querySelector('.inputSay');
    write(textInput, allKeys);
    displayHiddenCharacters(allKeys);

}

// when someone touch a key, it's printed in the input aera
function write(textInput, allKeys) {

    for (let i=0; i<allKeys.length; i++) {
        allKeys[i].addEventListener('click', (e) => {
            let character = "";
            if(e.target.textContent !== '') {
                character = e.target.textContent;
            } else {
                console.log('hey, e.target.textContent est vide');
            }

            textInput.value+= character;

        })
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