import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from "body-parser";

const db = admin.firestore();

const app = express();
const main = express();

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use('/api/v1', app);

const collection = 'Video';

export const webApi = functions.https.onRequest(main);

interface Vid {
    id: String;
    link: String;
    timestamp: String;
    thumbnail: String;
    annotations: Array<String>;
    politicianId: String;
    rating: Number;
    userId: String;
}


// Add new Vid
app.post('/Video', async (req, res) => {
    try {
        const Vid: Vid = {
            id: req.body['id'],
            link: req.body['link'],
            timestamp: req.body['timestamp'],
            thumbnail: req.body['thumbnail'],
            annotations: req.body['annotations'],
            politicianId: req.body['politicianId'],
            rating: req.body['rating'],
            userId: req.body['userId'],
            }
            
        const newDoc = await firebaseHelper.firestore
            .createNewDocument(db, collection, Vid);
        res.status(201).send(`Created a new Video: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`Make sure data model is correct!`)
    }
})

// Update new Vid
app.patch('/Video/:documentId', async (req, res) => {
    const updatedDoc = await firebaseHelper.firestore
        .updateDocument(db, collection, req.params.documentId, req.body);
    res.status(204).send(`Update a new Vid: ${updatedDoc}`);
})

// View a Vid
app.get('/Video/:documentId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.documentId)
        .then(Vid => res.status(200).send(Vid))
        .catch(error => res.status(400).send(`Cannot get Video: ${error}`));
})

// View all Video
app.get('/Video', (req, res) => {
    firebaseHelper.firestore
        .backup(db, collection)
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(`Cannot get Video: ${error}`));
})

// Delete a Vid 
app.delete('/Video/:documentId', async (req, res) => {
    const deletedDocument = await firebaseHelper.firestore
        .deleteDocument(db, collection, req.params.documentId);
    res.status(204).send(`Video is deleted: ${deletedDocument}`);
})

export { app };
