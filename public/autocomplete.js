let listOfWords = [];

let sayInput = document.querySelector('.inputSay');
sayInput.addEventListener('keypress', (e) => {
    console.log(e);
    let key = e.key;
    let allowedLetters = new RegExp('[a-z, ,\',Backspace]', 'gi');
    if (allowedLetters.exec(key)) { // on ne prend en compte que les lettres et l'espace
        console.log("letter allowed!");

        let query = '';
        if (key === 'Backspace') {
            query = (sayInput.value).slice(0, -1);
        } else {
            query = sayInput.value + key;
        }

        console.log(query);
        fillAutocompleteOptions(query);
    }
});

function fillAutocompleteOptions(query) {

    // s'il y a plusieurs mots, ne se base que sur le dernier
    let espace = new RegExp('\\s', 'g'); // caractère blanc, s'il y en a au moins un c'est que l'on a plus d'un mot
    if (espace.exec(query) !== null) {
        let lastWord = findLastWord(query);
        function findLastWord(query) {
            let i = (query.length)-1;
            let finished = false;
            // /while (i>=0) {
                if (espace.exec(query) !== null) {
                    return i;
                }
                i--;
            // }
            console.log(i);
        }
        for (let i=(query.length)-1; i>=0; i--) { // on part de la dernière lettre et on s'arrête quand on rencontre un espace
            console.log('1 query : ' + query[i]);

        }

    }
    // console.log("query " + query);

    let matchedWords = [];
    for (let i=0; i<listOfWords.length; i++) {
        if(listOfWords[i].indexOf(query) !== -1) { // si le pattern match, on ajoute le mot dans le tableau
            // console.log("j'ai trouvé une correspondance! " + listOfWords[i]);
            matchedWords.push(listOfWords[i]);
        }
    }

    let suggestions = document.querySelectorAll('.suggestion');

    while (matchedWords.length <= 10) {
        let randomIndex = Math.floor(Math.random()*listOfWords.length);
        matchedWords.push(listOfWords[randomIndex]);
        // console.log("matched words");
        // console.log(matchedWords);
    }


    for (let i=0; i<suggestions.length; i++) { // on parcoure le nombre de suggestions
        let randomIndex = Math.floor(Math.random()*matchedWords.length);
        suggestions[i].textContent = matchedWords[randomIndex];
    }


}
// getWords();
addAutocompleteOptions(3);


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