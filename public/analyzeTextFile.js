/**
 * Created by mathi on 27/11/2017.
 */

setupAnalysis();
function setupAnalysis() {
    let text = document.querySelector('body').textContent;
    let words = splitWords(text);
    console.log(words);
}
function splitWords(text) {

    //console.log(text);
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
                        console.log(word + " is not new");
                        return {
                            isThere: false,
                            index: i
                        }
                    }
                }
                console.log(word + " is new");
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

        text.replace(textArray[textArray.length - 1], ""); // une fois analysé, on retire le mot du texte

        if (indexInit !== 0) {
            start += indexInit;
        } else {
            start++;
        }

        // console.log(separation.exec(text));

    }

    return textArray;
}