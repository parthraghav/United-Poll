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

const collection = 'Annotation';

export const webApi = functions.https.onRequest(main);

interface Ant {
    verified: Boolean;
    author: string;
    sourceLink: String;
    description: String;
    type: String;
    reputation: number;
}


// Add new Ant
app.post('/Annotation', async (req, res) => {
    try {
        const Ant: Ant = {
            verified: req.body['verified'],
            author: req.body['author'],
            sourceLink: req.body['sourceLink'],
            description: req.body['description'],
            type: req.body['type'],
            reputation: req.body['reputation'],
            }
            
        const newDoc = await firebaseHelper.firestore
            .createNewDocument(db, collection, Ant);
        res.status(201).send(`Created a new Annotation: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`Make sure data model is correct!`)
    }
})

// Update new Ant
app.patch('/Annotation/:documentId', async (req, res) => {
    const updatedDoc = await firebaseHelper.firestore
        .updateDocument(db, collection, req.params.documentId, req.body);
    res.status(204).send(`Update a new Ant: ${updatedDoc}`);
})

// View a Ant
app.get('/Annotation/:documentId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.documentId)
        .then(Ant => res.status(200).send(Ant))
        .catch(error => res.status(400).send(`Cannot get Annotation: ${error}`));
})

// View all Annotation
app.get('/Annotation', (req, res) => {
    firebaseHelper.firestore
        .backup(db, collection)
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(`Cannot get Annotation: ${error}`));
})

// Delete a Ant 
app.delete('/Annotation/:documentId', async (req, res) => {
    const deletedDocument = await firebaseHelper.firestore
        .deleteDocument(db, collection, req.params.documentId);
    res.status(204).send(`Annotation is deleted: ${deletedDocument}`);
})

export { app };
