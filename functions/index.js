const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.onPlayerPositionChanged = functions.firestore
    .document('world-default-player-position/{user}').onWrite(event => {
        console.log(event.params.user);
        var document = event.data.data();
        console.log(document);
        console.log(event);
    });