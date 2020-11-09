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

const collection = 'User';

export const webApi = functions.https.onRequest(main);

interface Usr {
    id: String;
    name: String;
    location: String; 
    starredElections: Array<String>; 
    auth_token: String;
}


// Add new Usr
app.post('/User', async (req, res) => {
    try {
        const Usr: Usr = {
            id: req.body['id'], 
            name: req.body['name'],
            location: req.body['location'], 
            starredElections: req.body['starredElections'], 
            auth_token: req.body['auth_token'],
            }
            
        const newDoc = await firebaseHelper.firestore
            .createNewDocument(db, collection, Usr);
        res.status(201).send(`Created a new User: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`Make sure data model is correct!`)
    }
})

// Update new Usr
app.patch('/User/:documentId', async (req, res) => {
    const updatedDoc = await firebaseHelper.firestore
        .updateDocument(db, collection, req.params.documentId, req.body);
    res.status(204).send(`Update a new Usr: ${updatedDoc}`);
})

// View a Usr
app.get('/User/:documentId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.documentId)
        .then(Usr => res.status(200).send(Usr))
        .catch(error => res.status(400).send(`Cannot get User: ${error}`));
})

// View all User
app.get('/User', (req, res) => {
    firebaseHelper.firestore
        .backup(db, collection)
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(`Cannot get User: ${error}`));
})

// Delete a Usr 
app.delete('/User/:documentId', async (req, res) => {
    const deletedDocument = await firebaseHelper.firestore
        .deleteDocument(db, collection, req.params.documentId);
    res.status(204).send(`User is deleted: ${deletedDocument}`);
})

export { app };
