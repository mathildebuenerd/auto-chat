# auto-chat

## Description
auto-chat is an autocomplete system intended to be integrated in an instant messaging chat.

## Chat application
The chat works with socket.io and is very basic, the intent is to make testings on the autocomplete interface and the feeding of the autocomplete system.

## Text analysis
In the server.js file, there's a `setupAnalysis` function. It takes as parameter the name of an html file that is into a data folder.
This function creates a json file from a text (that has to be in html format), with the list of the words used in the texte and the number of time they are used.



