let listOfWords = [
    "abomine",
    "Abongo",
    "aboon",
    "aborad",
    "aboral",
    "absolvitor",
    "absolvitory",
    "absonant",
    "absonous",
    "absorb",
    "agistor",
    "agitable",
    "agitant",
    "agitate",
    "agitatedly",
    "agitation",
    "Aitkenite",
    "Aitutakian",
    "aiwan",
    "Aix",
    "aizle",
    "Aizoaceae",
    "aizoaceous",
    "Aizoon",
    "Ajaja",
    "ajaja",
    "ajangle",
    "ajar",
    "ajari",
    "Ajatasatru",
    "ajava",
    "ajhar",
    "ajivika",
    "ajog",
    "ajoint",
    "ajowan",
    "Ajuga",
    "ajutment",
    "ak",
    "Aka",
    "aka",
    "Akal"
];


// getWords();
addAutocompleteOptions(3);

// change toutes les options toutes les 3 secondes
// setInterval( () => {
//     fillAutocompleteOptions();
// }, 3000);


// change les options une par une selon un timing random
let time = 1000;
setInterval(() => {
    fillOneAutocompleteOption();
    time = getRandomInt(500, 5000);
}, time);


// ('data/demain-cest-loin.json');
// function getWords(jsonFile) {
//     let data = JSON.parse(jsonFile);
//     console.log(data);
// }

function fillOneAutocompleteOption() { // change une seule suggestion à la fois
    let suggestions = document.querySelectorAll('.suggestion');
    let nbOfProposals = listOfWords.length;

    let randomSuggestion = Math.floor(Math.random() * suggestions.length); // on sélectionne une suggestion au hasard

    let indexWord = Math.floor(Math.random() * nbOfProposals);
    suggestions[randomSuggestion].textContent = listOfWords[indexWord];

}

function fillAutocompleteOptions() { // puis on rempli les places créées avec la fonction addAutocompleteOptions

    let suggestions = document.querySelectorAll('.suggestion');
    let nbOfProposals = listOfWords.length;

    for (let i = 0; i < suggestions.length; i++) {
        let index = Math.floor(Math.random() * nbOfProposals);
        suggestions[i].textContent = listOfWords[index];
    }
}

function addAutocompleteOptions(quantity) { // d'abord on crée un nombre de places disponibles pour accueillir les mots

    let autocompleteAera = document.querySelector('.autocomplete-aera');

    for (let i = 0; i < quantity; i++) {
        let suggestion = document.createElement('p');
        suggestion.setAttribute('class', 'suggestion');
        suggestion.addEventListener('click', addWordToInputAera);
        autocompleteAera.appendChild(suggestion);
    }

    function addWordToInputAera(e) {

        console.log("j'ai touché le listener");
        console.log(e.target.textContent);

        let selectedWord = e.target.textContent;
        let inputAera = document.querySelector(".inputSay");
        inputAera.value += selectedWord + " ";


    }

}

fillAutocompleteWithJson('data');
function fillAutocompleteWithJson(jsonFile) {

    $.getJSON(jsonFile, (json) => {
        console.log(json[0].word);
        let words = [];
        for(let i=0; i<json.length; i++) {
            words.push(json[i].word);
        }
        console.log('words');
        console.log(words);
        $( ".inputSay" ).autocomplete({
            source: words
        });
    });
    // for (let i=0; i<json.length; i++) {
    //
    // }
    // let data = JSON.parse(jsonFile);



}



// renvoie un int random dans une fourchette donnée
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}