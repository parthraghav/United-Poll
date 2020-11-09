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

const collection = 'Question';

export const webApi = functions.https.onRequest(main);

interface Quest{ 
    id: String; 
    name: String; 
    views: number;
    shares: number;
    answers: Array<String>;
    answer_count: number 
}



// Add new Quest
app.post('/Question', async (req, res) => {
    try {
        const Quest: Quest = {
            id: req.body['id'],
            name: req.body['name'],
            country: req.body['country'],
            state: req.body['state'],
            city: req.body['city'],
            district: req.body['district'],
            year: req.body['year'],
            tags: req.body['tags'],
        }

        const newDoc = await firebaseHelper.firestore
            .createNewDocument(db, collection, Quest);
        res.status(201).send(`Created a new Question: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`Make sure data model is correct!`)
    }
})

// Update new Quest
app.patch('/Question/:documentId', async (req, res) => {
    const updatedDoc = await firebaseHelper.firestore
        .updateDocument(db, collection, req.params.documentId, req.body);
    res.status(204).send(`Update a new Quest: ${updatedDoc}`);
})

// View a Quest
app.get('/Question/:documentId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.documentId)
        .then(Quest => res.status(200).send(Quest))
        .catch(error => res.status(400).send(`Cannot get Question: ${error}`));
})

// View all Question
app.get('/Question', (req, res) => {
    firebaseHelper.firestore
        .backup(db, collection)
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(`Cannot get Question: ${error}`));
})

// Delete a Quest 
app.delete('/Question/:documentId', async (req, res) => {
    const deletedDocument = await firebaseHelper.firestore
        .deleteDocument(db, collection, req.params.documentId);
    res.status(204).send(`Question is deleted: ${deletedDocument}`);
})

export { app };
