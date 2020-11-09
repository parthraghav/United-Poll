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

const collection = 'Election';

export const webApi = functions.https.onRequest(main);

interface Elec {
    id: String;
    name: String;
    country: String;
    state: String;
    city: String;
    district: String;
    year: number;
    tags: Array<string>;
   }
   


// Add new Elec
app.post('/Election', async (req, res) => {
    try {
        const Elec: Elec = {
            id: req.body['id'],
            name: req.body['name'],
            country: req.body['country'],
            state: req.body['state'],
            city: req.body['city'],
            district: req.body['district'],
            year: req.body['year'],
            tags:req.body['tags'],
           }

        const newDoc = await firebaseHelper.firestore
                .createNewDocument(db, collection, Elec);        
            res.status(201).send(`Created a new Elec: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`Make sure data model is correct!`)
    }        
})

// Update new Elec
app.patch('/Election/:documentId', async (req, res) => {
    const updatedDoc = await firebaseHelper.firestore
        .updateDocument(db, collection, req.params.documentId, req.body);
    res.status(204).send(`Update a new Elec: ${updatedDoc}`);
})

// View a Elec
app.get('/Election/:documentId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.documentId)
        .then(Elec => res.status(200).send(Elec))
        .catch(error => res.status(400).send(`Cannot get Election: ${error}`));
})

// View all Election
app.get('/Election', (req, res) => {
    firebaseHelper.firestore
        .backup(db, collection)
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(`Cannot get Election: ${error}`));
})

// Delete a Elec 
app.delete('/Election/:documentId', async (req, res) => {
    const deletedDocument = await firebaseHelper.firestore
        .deleteDocument(db, collection, req.params.documentId);
    res.status(204).send(`Document is deleted: ${deletedDocument}`);
})

export { app };
