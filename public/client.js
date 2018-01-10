// met en place le socket côté client

// il faut dire dans le script client que l'on s'attend à recevoir quelque chose du socket
let socket = io();
let userInfos = "";

let submitButton = document.querySelector('[data-type="reponse"]');
submitButton.addEventListener('click', () => {
    let sayInput = document.querySelector('.inputSay');
    let say = sayInput.textContent;
    // console.log("say envoyé au server " + say);
    socket.emit('newSay', {say: say, username: userInfos.name}); // on envoie un message de type newSay qui contient la phrase qui vient d'être écrite
    sayInput.textContent = "";
});

//submitButton.addEventListener('keypress', ())

socket.on('newSay', addBubble);
socket.on('tooMuchPlayers', tooMuch);
socket.on('newCo', enterUsername);

function enterUsername() {
    // console.log("enter user name");
    // let name = prompt("Entre ton nom!");
    let name = prompt("Entre ton nom!", "math");
    userInfos = {name: name};
    // console.log("userInfos " + userInfos.name);
    // socket.emit("new-user", name);
    socket.emit("new-user", {username: userInfos.name});
}

function addBubble(data) {

    // console.log(data);

    if (typeof data.say === "string") {
        let say = data.say; // contenu textuel

        let bubble = document.createElement('p');
        bubble.setAttribute('class', 'say');
        bubble.setAttribute('data-username', (data.username).toLowerCase()); // on ajoute le username comme data pour pouvoir l'ajouter dynamiquement en css avec ::before

        let textBubble = document.createTextNode(say);
        bubble.appendChild(textBubble);

        let blockUsername = document.createElement('div');
        let username = document.createElement('p');
        blockUsername.setAttribute('class', 'blockname');
        blockUsername.style.backgroundColor = data.color;
        username.setAttribute('class', 'name ' + (data.username).toLowerCase());
        username.textContent = data.username;
        blockUsername.appendChild(username);

        let blockSay = document.createElement('div'); // le blocksay regroupe la réplique et le nom de le username
        blockSay.setAttribute('class', 'blockSay');
        if (userInfos.name === data.username) { // check if the bubble is from the user itself or from his spokesperson
            blockSay.classList.add('me');
        } else {
            blockSay.classList.add('others');
        }
        blockSay.appendChild(blockUsername);
        blockSay.appendChild(bubble);


        let conversation = document.querySelector('.conversation');
        conversation.appendChild(blockSay);
    } else {
        console.log("data.say n'est pas de type string! Il est de type " + typeof data.say);
    }

}

//envoie un message pour dire qu'il y a déjà trop d'utilisateurs
function tooMuch() {
    let warning = document.createElement('p');
    warning.setAttribute('class', 'warning');
    let textWarning = document.createTextNode("Il y a déjà trop d'utilisateurs!!");
    warning.appendChild(textWarning);
    document.body.appendChild(warning);
}