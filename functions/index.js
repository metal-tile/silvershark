'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const PubSub = require('@google-cloud/pubsub');

const pubsub = PubSub();

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.onPlayerPositionChanged = functions.firestore
    .document('world-default-player-position/{user}').onWrite(event => {
        console.log(event.params.user);
        var document = event.data.data();
        console.log(document);
        console.log(event);

        const topic = pubsub.topic("projects/metal-tile-dev1/topics/player-position");
        console.log(topic);

        const  data = {
            message: event
        };
        const publisher = topic.publisher();
        return publisher.publish(Buffer.from(JSON.stringify(data)))
            .then(() => res.status(200).send('Message published.'))
            .catch((err) => {
                console.error(err);
                res.status(500).send(err);
                return Promise.reject(err);
            });
    });