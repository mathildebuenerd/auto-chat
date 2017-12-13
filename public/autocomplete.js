let listOfWords = [];

let sayInput = document.querySelector('.inputSay');

setup();

function setup() {

    // on regarde quand l'utilisateur appuie sur la touche espace pour faire une proposition en fonction du dernier mot en train d'être tapé et pas de l'ensemble de la chaîne de caractère
    sayInput.addEventListener('keypress', (e) => {
        // console.log(e);
        let key = e.key;
        console.log(key);
        let query = sayInput.value + key;
        let allowedLetters = new RegExp('[a-z, ,\',Space,Backspace]', 'gi');
        let lastSpaceIndex = findLastSpaceIndex(query); // on récupère l'index du dernier espace pour pouvoir slicer correctement le dernier mot
        console.log("lastSpaceIndex " + lastSpaceIndex);
        function findLastSpaceIndex(query) {
            for (let i=query.length; i>0; i--) {
                if(query[i] === " ") {
                    return i+1; // on renvoie l'index qui correspond à la lettre qui se situe juste après l'espace
                }
            }
            return 0;
        }

        if (allowedLetters.exec(key)) { // on ne prend en compte que les lettres et l'espace
            console.log("letter allowed! " + key);

            if (key === "Backspace") {
                key = '';
            }
            console.log("sayInput value " + sayInput.value);
            let lastWord = (sayInput.value).substring(lastSpaceIndex) + key; // on ajoute 1 à lastSpaceIndex pour ne pas compter l'espace

            console.log("lastWord " + lastWord);
            console.log('key ' + key);
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

                // Si aucun mot ne correspond, on rempli avec d'autres mots
                while (matchedWords.length < 3) {
                    let randomIndex = Math.floor(Math.random()*listOfWords.length);
                    matchedWords.push(listOfWords[randomIndex]);
                    // console.log("matched words");
                    // console.log(matchedWords);
                }


                for (let i=0; i<suggestions.length; i++) { // on parcoure le nombre de suggestions
                    // let randomIndex = Math.floor(Math.random()*matchedWords.length);
                    suggestions[i].textContent = matchedWords[i];
                }

                console.log("suggestions");
                console.log(matchedWords);


            }
        }
    });

    addAutocompleteOptions(3);
    fillAutocompleteWithJson('data');

}




// getWords();


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