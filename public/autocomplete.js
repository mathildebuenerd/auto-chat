let listOfWords = [];

let sayInput = document.querySelector('.inputSay');

setup();

function setup() {

    // on regarde quand l'utilisateur appuie sur la touche espace pour faire une proposition en fonction du dernier mot en train d'être tapé et pas de l'ensemble de la chaîne de caractère
    // sayInput.addEventListener('keydown', (e) => {
    //     // console.log(e);
    //     const keyCode = e.which || e.char;
    //     let key = e.key;
    //
    //     console.log(keyCode);
    //
    //     if (key === "Unidentified") {
    //         console.log("unidentified !");
    //         key = String.fromCharCode(keyCode);
    //     }
    //     console.log(key);
    //     let query = sayInput.textContent + key;
    //     let allowedLetters = new RegExp('[a-z, ,\',Space,Backspace]', 'gi');
    //     let lastSpaceIndex = findLastSpaceIndex(query); // on récupère l'index du dernier espace pour pouvoir slicer correctement le dernier mot
    //     console.log("lastSpaceIndex " + lastSpaceIndex);
    //     function findLastSpaceIndex(query) {
    //         for (let i=query.length; i>0; i--) {
    //             if(query[i] === " ") {
    //                 return i+1; // on renvoie l'index qui correspond à la lettre qui se situe juste après l'espace
    //             }
    //         }
    //         return 0;
    //     }
    //
    //     if (allowedLetters.exec(key)) { // on ne prend en compte que les lettres et l'espace
    //         console.log("letter allowed! " + key);
    //
    //         let lastWord = "";
    //
    //         if (key === "Backspace") {
    //             // si c'est la touche backspace qui a été pressée sayInput.textContent garde en mémoire la touche qui vient d'être effacée
    //             // pour éviter ça on ne compte pas la dernière lettre
    //             lastWord = (sayInput.textContent).substring(lastSpaceIndex, sayInput.textContent.length-1);
    //         } else {
    //             lastWord = (sayInput.textContent).substring(lastSpaceIndex) + key; // on ajoute 1 à lastSpaceIndex pour ne pas compter l'espace
    //
    //         }
    //
    //         fillAutocompleteOptions(lastWord);
    //         function fillAutocompleteOptions(query) {
    //
    //             console.log("query dans fillautocomplete " + query);
    //
    //             let matchedWords = [];
    //             for (let i=0; i<listOfWords.length; i++) {
    //                 if(listOfWords[i].indexOf(query) !== -1) { // si le pattern match, on ajoute le mot dans le tableau
    //                     // console.log("j'ai trouvé une correspondance! " + listOfWords[i]);
    //                     matchedWords.push(listOfWords[i]);
    //                 }
    //             }
    //
    //             let suggestions = document.querySelectorAll('.suggestion');
    //
    //             // Si trop peu de mots correspondent, on rempli avec d'autres mots
    //             while (matchedWords.length < suggestions.length) {
    //                 let randomIndex = Math.floor(Math.random()*listOfWords.length);
    //                 matchedWords.push(listOfWords[randomIndex]);
    //                 // console.log("matched words");
    //                 // console.log(matchedWords);
    //             }
    //
    //
    //             for (let i=0; i<suggestions.length; i++) { // on parcoure le nombre de suggestions
    //
    //                 // s'il y a trop de mots qui correspondent, on choisi au hasard
    //                 if (matchedWords.length > suggestions.length) {
    //                     let randomIndex = Math.floor(Math.random()*matchedWords.length);
    //                     suggestions[i].textContent = matchedWords[randomIndex];
    //                 } else {
    //                     suggestions[i].textContent = matchedWords[i];
    //                 }
    //
    //
    //             }
    //
    //             console.log("suggestions");
    //             console.log(matchedWords);
    //
    //
    //         }
    //     }
    // });

    addAutocompleteOptions(8);
    fillAutocompleteWithJson('data');

}



// change toutes les options toutes les 3 secondes
// setInterval( () => {
//     fillAutocompleteOptions();
// }, 3000);


// change les options une par une selon un timing random
// setInterval(() => {
//     randomFill();
//     time = getRandomInt(500, 5000);
// }, time);



// ('data/output/demain-cest-loin.json');
// function getWords(jsonFile) {
//     let data = JSON.parse(jsonFile);
//     console.log(data);
// }

function randomFill() { // change une seule suggestion à la fois
    let suggestions = document.querySelectorAll('.suggestion');
    let nbOfProposals = listOfWords.length;

    let randomSuggestion = Math.floor(Math.random() * suggestions.length); // on sélectionne une suggestion au hasard
    let indexWord = Math.floor(Math.random() * nbOfProposals);
    suggestions[randomSuggestion].textContent = listOfWords[indexWord];

}


function addAutocompleteOptions(quantity) { // d'abord on crée un nombre de places disponibles pour accueillir les mots

    let autocompleteAera = document.querySelector('.autocomplete-aera');

    for (let i = 0; i < quantity; i++) {
        let suggestion = document.createElement('p');
        suggestion.setAttribute('class', 'suggestion');
        suggestion.addEventListener('click', addWordToInputAera); // on ajoute un listener pour que quand on clique sur le mot ça remplace le mot en train d'être tapé
        autocompleteAera.appendChild(suggestion);
    }

    function addWordToInputAera(e) {

        console.log("j'ai touché le listener");
        console.log(e.target.textContent);

        let selectedWord = e.target.textContent;
        let inputQuery = document.querySelector(".inputSay");

        let lastSpaceIndex = findLastSpaceIndex(inputQuery.textContent); // on récupère l'index du dernier espace pour pouvoir ajouter le mot sélectionné au bon endroit
        console.log("lastSpaceIndex " + lastSpaceIndex);
        function findLastSpaceIndex(query) {
            for (let i=query.length; i>0; i--) {
                if(query[i] === " ") {
                    return i+1; // on renvoie l'index qui correspond à la lettre qui se situe juste après l'espace
                }
            }
            return 0;
        }

        let initialQuery = inputQuery.textContent;
        let wordToRemove = initialQuery.substring(lastSpaceIndex);
        console.log("wordToRemove " + wordToRemove);
        let newQuery = initialQuery.replace(wordToRemove, '') + selectedWord + " ";
        inputQuery.textContent = newQuery;


    }

}
function fillAutocompleteWithJson(jsonFile) {

    $.getJSON(jsonFile, (json) => {
        console.log(json[0].word);
        for(let i=0; i<json.length; i++) {
            listOfWords.push(json[i].word);
        }
        console.log('words');
        console.log(listOfWords);
        // $( ".inputSay" ).autocomplete({
        //     source: listOfWords
        // });
    });




}



// renvoie un int random dans une fourchette donnée
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}