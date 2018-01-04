/**
 * Created by mathi on 04/01/2018.
 */

setup();

function setup() {

    let customKeyboard = document.querySelector('#custom-keyboard');
    let allKeys = customKeyboard.querySelectorAll('li');
    let textInput = document.querySelector('.inputSay');
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
    customKeyboard.style.display = 'block';
}



// when someone touch a key, it's printed in the input aera
function write(textInput, allKeys) {

    for (let i=0; i<allKeys.length; i++) {
        allKeys[i].addEventListener('click', (e) => {
            let contentInput = textInput.textContent;
            let character = "";
            if(e.target.textContent !== '') {
                character = e.target.textContent;
            } else {
                console.log('hey, e.target.textContent est vide');
            }

            // remove the pipe
            if (contentInput[contentInput.length-1] === "|") {
                let newContent = contentInput.replace(contentInput[contentInput.length-1], '');
                contentInput = newContent;
            }
            textInput.textContent = contentInput + character;

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