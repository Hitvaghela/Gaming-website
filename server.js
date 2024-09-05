import mongoose from "mongoose";
import express from 'express';
import { schema } from "./model/schema1.js";
import { schema2 } from "./model/schema2.js";
import { schema3 } from "./model/schema3.js";
import * as path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

let a = await mongoose.connect("mongodb://localhost:27017/login")
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.post('/check', async (req, res) => {
    const { username, pass } = req.body;
    try {
        const foundDocument = await schema.find({ username: username });
        if (foundDocument.length > 0) {
            foundDocument.forEach(document => {
                if (document.pass === pass) {
                    console.log(200)
                    res.send(200)
                }
                else {
                    console.log(409)
                    res.send(409)
                }
            });
        }
        else {
            res.send(410)
        }
    } catch (error) {
        console.error("Error occurred while querying the database:", error);
        res.send(400);
    }
});
app.post('/store', async (req, res) => {

    const { username, pass } = req.body;
    console.log(username,pass)
    try {
        
        const foundDocument = await schema.find({ username: username });
        
        if (foundDocument.length > 0) {
            console.log("User already exists");
            res.sendStatus(409); // Send status code 409 for conflict (user already exists)
        } else {
            console.log("i am inner")
            const data = new schema({ username: username, pass: pass });
            data.save();
            console.log("OK");
            res.sendStatus(200);
             // Send status code 200 for success
        }
    } catch (error) {
        res.sendStatus(400);
        console.log(error)
    }

})


app.get('/get_recorde', async (req, res) => {
    console.log(req.query)
    const username = req.query.username;
    console.log(username);
    try {
        const foundDocument = await schema2.find({ username: username });
        const data = {
            first: foundDocument[0].first_2048,
            memory: foundDocument[0].memory,
            quiz: foundDocument[0].quiz,
            r_p_s: foundDocument[0].r_p_s,
            snakegame: foundDocument[0].snakegame,
            tic: foundDocument[0].tic,
            word: foundDocument[0].word_gessing,
            type:foundDocument[0].typeracer
        }
        res.json(data);
    }
    catch (error) {
        console.log(error);
    }

})
app.post('/store_recorde', async (req, res) => {
    console.log("request arrives");
    const { username, score, game } = req.body;
    console.log(username, score, game);
    try {
        const foundDocument = await schema2.find({ username: username });
        console.log(foundDocument)
        if (foundDocument.length > 0) {
            let score2 = foundDocument[0][game];
            console.log(score2)
            console.log(score)
            console.log(score2)
            if (score2 < score) {
                try {
                    console.log("hello")
                    let query1 = await schema2.updateMany({ username: username }, { $set: { [game]: score } }).exec();
                    console.log(query1);

                } catch (error) {
                    console.error("Error occurred while updating document:", error);

                }
            }
            console.log("updated")
            res.sendStatus(200); // Send status code 409 for conflict (user already exists)
        } else {
            const data = new schema2({ username: username, [game]: score });
            data.save();
            console.log("OK");
            res.sendStatus(200); // Send status code 200 for success
        }
    } catch (error) {
        res.sendStatus(400);
    }
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get('/passage', async (req, res) => {
    try {
        const randomPassage = await schema3.aggregate([{ $sample: { size: 1 } }]);
        
        const passage = randomPassage[0].passage;
        res.json({ passage }); 
        console.log(passage);
    } catch (error) {
        console.error('Failed to fetch passage:', error);
        res.status(500).send('Error: Failed to fetch passage');
    }
});

