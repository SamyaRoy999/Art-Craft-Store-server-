const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vmk1mwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const collection = client.db("artsDB").collection("arts");

    app.get('/addArts', async (req, res) => {
      const coursor = collection.find()
      const result = await coursor.toArray()
      res.send(result)
    })

    app.post('/addArts', async (req, res) => {
      console.log(req.body);
      const result = await collection.insertOne(req.body);
      res.send(result)
    })

    app.delete('/addArts/:id', async (req, res) => {
      const id =  req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await collection.deleteOne(query)
      res.send(result)
    })

    app.get("/addArts/:email", async (req, res) => {
      console.log(req.params.email);
      const result = await collection.find({ authEmail: req.params.email }).toArray();
      res.send(result)
      console.log(result);
    })

    await client.db("admin").command({ ping: 1 });


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('SIMPLE ARTS IS RANNING');
})

app.listen(port, () => {
  console.log(`PORT IS RANNIN ${port}`);
})



// https://i.ibb.co/55Y13NV/oil-paintings-landscape-river-trees-260nw-732930142.webp