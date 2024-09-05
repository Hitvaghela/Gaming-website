import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { schema } from './model/schemas.js';
const __filename = fileURLToPath(import.meta.url); // Define __filename using import.meta.url
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

mongoose.connect("mongodb://localhost:27017/local"); // Removed 'await' as it cannot be used at the top level

app.use(express.static('public'));

// Route handler to fetch a random passage
app.get('/passage', async (req, res) => {
  try {
    const randomPassage = await schema.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomPassage); // Sending the random passage as JSON
    
  } catch (error) {
    console.error('Failed to fetch passage:', error);
    res.status(500).send('Error: Failed to fetch passage');
  }
});
app.get('/', async (req, res) => {
  try{
  res.sendFile(path.join(__dirname,"public","typeracer.html"));}
  catch(error){
    console.error('Failed to fetch page', error);
    res.status(500).send('Error: Failed to fetch page');
  }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
