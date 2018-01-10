/**
 * Created by mathi on 10/01/2018.
 */

function calculateConversationHeight(deviceWidth, deviceHeight) {

    let conversation = document.querySelector('.conversation');
    let autocomplete = document.querySelector('.autocomplete-aera');
    let controls = document.querySelector('.controls');
    let keyboard = document.querySelector('#custom-keyboard');

    let autocompleteHeight = autocomplete.clientHeight + autocomplete.style.marginTop + autocomplete.style.marginBottom;
    let controlsHeight = controls.clientHeight + controls.style.marginTop + controls.style.marginBottom;
    let keyboardHeight = keyboard.clientHeight + keyboard.style.marginTop + keyboard.style.marginBottom;

    conversation.style.maxHeight = deviceHeight - autocompleteHeight - controlsHeight - keyboardHeight + 'px';
    console.log('maxheight ' + conversation.style.maxHeight);


}