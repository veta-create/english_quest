import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);

const app = express();

const PORT = 3001;

app.use('/api/audios', express.static(path.join(__dirname, 'audios')));
app.use('/api/videos', express.static(path.join(__dirname, 'videos')));
// запросы от веб-сайта, который хостится в одном домене, к серверу в другом домене
app.use(cors());
app.use(express.json());
// промежуточный слой для загрузки медиа
// app.use(fileUpload());

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

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

app.use(fileUpload({}))

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

app.get('/api/audioKeys', async function (req, res) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("fieldsdb");
        const collection = db.collection("audioKeys");
        const results = await collection.find().toArray();
        res.send(results);
        return results;
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
});

app.get('/api/videoKeys', async function (req, res) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("fieldsdb");
        const collection = db.collection("videoKeys");
        const results = await collection.find().toArray();
        res.send(results);
        return results;
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
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

app.post('/api/audios', async function (req, res) {
    const file = req.files.audio;
    const type = "." + file.name.substring(file.name.length - 3);
    const key = JSON.parse(req.body.key);

    await file.mv(path.join(__dirname, 'audios', key.key + type));

    try {
        await mongoClient.connect();
        const db = mongoClient.db("fieldsdb");
        const collection = db.collection("audioKeys");
        await collection.insertOne(key);
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    };
});

app.post('/api/videos', async function (req, res) {
    const file = req.files.video;
    const type = "." + file.name.substring(file.name.length - 3);
    const key = JSON.parse(req.body.key);

    await file.mv(path.join(__dirname, 'videos', key.key + type));

    try {
        await mongoClient.connect();
        const db = mongoClient.db("fieldsdb");
        const collection = db.collection("videoKeys");
        await collection.insertOne(key);
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    };
});


app.listen(PORT, () => {
    console.log("Server started on PORT " + PORT);
});