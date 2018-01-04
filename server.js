// met ne place le serveur
let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let server = app.listen(port);
// let bodyParser = require('body-parser'); // pour contourner le Content Security Policy
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

let fs = require('fs'); // pour lire le texte à analyser et écrire le json avec le tableau des mots

app.use(express.static('public')); // quand l'user va sur le site il va voir ce qu'il y a dans le dossier public


// met en place le socket
let socket = require('socket.io');
let io = socket(server);


// crée un tableau qui contient tous les utilisateurs
let users = [];
let maxUsers = 4;
let colors = ['blue', 'red', 'green', 'pink'];

// si j'ai une connection, exécute la fonction newConnection
// io.sockets.on('connection', newConnection);
io.sockets.on('connection', newCo);

function newCo(socket) {
    console.log('newCo');
    socket.emit('newCo', 'Nouvelle connection');
    socket.on('new-user', (data) => {
        console.log(data);
        console.log('adduser');

        managePlayers(socket.id); // attribue un nom au nouvel utilisateur s'il reste encore de la place
        function managePlayers(id) {
            console.log('managePlayers');
            if (users.length > maxUsers) {
                console.log("il y déjà trop d'utilisateurs");
                return;
            } else {
                let isUserNew = checkIfUserIsNew(id); // on vérifie si l'utilisateur est nouveau ou pas
                if (isUserNew) {
                    let randomIndex = Math.floor(Math.random() * maxUsers);
                    let randomColor = colors[randomIndex];
                    console.log("random color " + randomIndex);
                    colors.splice(randomIndex[1], 1); // on retire la couleur de la liste
                    let user = { // on crée l'utilisateur
                        'id': id,
                        'name': data.username,
                        'color': randomColor
                    };
                    users.push(user);// on l'ajoute à la liste de tous les utilisateurs
                    maxUsers--;
                }
            }
        }

        // on crée une fonction anonyme pour pouvoir faire passer l'id du socket en paramètre de la fonction
        // voir https://stackoverflow.com/questions/19342999/how-to-pass-more-parameters-for-socket-on
        socket.on('newSay', (data) => {
            console.log("data");
            console.log(users);
            sendBubble(socket, socket.id, data); // data.say correspond à la phrase écrite par l'user
        }); // quand l'user a appuyé sur "envoyer"

        function sendBubble(socket, id, data) { // data correspond aux deuxième parametre de la fonction emit
            // socket.broadcast.emit('newSay', data); // envoyer le même message back aux autres clients
            // socket.emit('newSay', data); // envoyer le message à celui qui l'a envoyé
            console.log("sendbubble id");
            console.log(users);
            let infos = findUserInfos(id);
            let name = data.username; // cherche le nom d'utilisateur associé à l'id
            let color = infos.color; // cherche
            console.log(infos);
            function findUserInfos(id) {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].id === id) {
                        return {
                            name: data.username,
                            color: users[i].color
                        }
                    }
                }
                return "aucun name ne correspond à cet id";
            }

            io.sockets.emit('newSay', {say: data.say, username: data.username, color: color}); // envoyer le même message back à tous les clients dont celui qui a emit ne premier lieu
        }

    });
}
function checkIfUserIsNew(id) {
    for (let i = 0; i < users.length; i++) {
        if (id === users[i].id) {
            return false;
        }
    }
    return true;
}

// setupAnalysis('demain-cest-loin');

function setupAnalysis(htmlFile) {
    let text = fs.readFileSync('data/input/' + htmlFile + '.html', 'utf-8'); //readFileSync empêche la ligne suivante s'exécuter avant que celle-ci ne soit finie
    // let text = document.querySelector('body').textContent;
    let words = splitWords(text);
    function splitWords(text) {

        let separation = new RegExp('\\s', 'g'); // \s correspond aux caractères "blancs" = espace, saut de ligne, tab etc..

        let textArray = [];
        let start = 0;

        text = removePunctuation(text);
        function removePunctuation(text) { // on supprime la ponctuation
            let punctuation = new RegExp('[=_+.,;!?:@#$%^&*();\/\\|<>"0-9]', 'g');
            let newText = text.replace(punctuation, '');
            // console.log(newText);
            return newText;
        }

        // tant qu'on trouve des mots dans le texte, on les ajoute dans un tableau
        while ((separation.exec(text)) !== null) {

            let indexInit = text.substr(start).search(separation);
            // console.log("indexInit " + indexInit);

            let word = text.slice(start, start + indexInit);
            word = word.toLowerCase();

            if (word !== "") { //on ne prend pas en compte quand le mot est vide
                let isNew = isWordNew(word);
                function isWordNew() {
                    // si le mot n'est pas déjà dans le tableau on retourne true, s'il l'est déjà on retourne fals
                    for (let i = 0; i < textArray.length; i++) {
                        if (word === textArray[i].word) {
                            // console.log(word + " is not new");
                            return {
                                isThere: false,
                                index: i
                            }
                        }
                    }
                    // console.log(word + " is new");
                    return {
                        isThere: true,
                        index: null
                    }
                }

                if (isNew.isThere) { // si le mot est nouveau on l'ajoute avec un coef de 1
                    textArray.push({word: word, coef: 1});
                } else { // si le mot n'est pas nouveau on augmente juste son coef
                    textArray[isNew.index].coef++;
                }
            }
           // text.replace(textArray[textArray.length - 1], ""); // une fois analysé, on retire le mot du texte
           //  console.log(indexInit);
            if (indexInit !== 0) {
                start += indexInit;
            } else {
                console.log(start);
                start++;
            }

        }

        return textArray;
    }
    // console.log(words);
    createFile(words, htmlFile);
    function createFile(arrayOfWords, filename) {
        let data = JSON.stringify(arrayOfWords, null, 2); // comme on a parser le json, il faut renvoyer du texte et pas un objet, "2" signifie qu'on ajoute 2 tabulations pour le formatage, sinon tout serait minifié sur la même ligne
        fs.writeFile('data/output/' + filename + '.json', data, finished); // crée un fichier local
        function finished(err) {
            console.log("all set");
        }
    }

}

app.get('/data', createServerFile);

// envoie le fichier json sur le serveur pour pouvoir y accedér facilement depuis le client
function createServerFile(request, response) {
    // let data = fs.readFileSync('data/output/demain-cest-loin.json');
    //     data = JSON.parse(data);
    //     let reply = data;
    //     response.send(reply); // envoie le json à la route /data

    let data = fs.readFile('data/output/proust.json', (err, data) => {
        if (err) throw err;

        data = JSON.parse(data);
        let reply = data;
        response.send(reply); // envoie le json à la route /data
    });

}


console.log('je tourne');