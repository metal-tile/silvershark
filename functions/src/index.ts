import * as functions from "firebase-functions";
import admin from "firebase-admin";
import PubSub from "@google-cloud/pubsub";

const pubsub = PubSub();

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
console.log(firestore);

export const onPlayerPositionChanged = functions.firestore
    .document("world-default-player-position/{user}")
    .onWrite(event => {
        console.log(event.params!.user);
        const document = event.data.data();
        console.log(document);
        console.log(event);

        const topic = pubsub.topic("projects/metal-tile-dev1/topics/player-position");
        console.log(topic);

        const data = {
            message: event,
        };
        const publisher = topic.publisher();
        return publisher.publish(Buffer.from(JSON.stringify(data)));
    });
