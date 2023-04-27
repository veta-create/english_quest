import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);

const PORT = process.env.PORT || 3001;

const app = express();
// запросы от веб-сайта, который хостится в одном домене, к серверу в другом домене
app.use(cors());
app.use(express.json());

app.get('/api/fields', async function (req, res) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("fieldsdb");
        const collection = db.collection("fields");
        const results = await collection.find().toArray();
        res.send(results);
        return results;
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    };
});

app.get('/api/settings', async function (req, res) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("fieldsdb");
        const collection = db.collection("settings");
        const results = await collection.find().toArray();
        res.send(results);
        return results;
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    };
});

app.post('/api/fields', async function (req, res) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("fieldsdb");
        const collection = db.collection("fields");
        await collection.insertOne(req.body);
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    };
});

app.post('/api/settings', async function (req, res) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("fieldsdb");
        const collection = db.collection("settings");
        await collection.replaceOne({}, req.body);
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    };
});

app.listen(PORT, () => {
    console.log("Server started on PORT " + PORT);
});