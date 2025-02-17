const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

 //middleware
 app.use(cors());
 app.use(express.json());


 console.log(process.env.DB_User, process.env.DB_Pass)

 
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.f0l8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)

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

    const coffeeCollection = client.db('coffeeDB2').collection('coffee');

    // data gula frontend e pathano
    app.get('/coffee', async (req, res)=>{
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    // update
    app.get('/coffee/:id', async (req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await coffeeCollection.findOne(query);
      res.send(result);
    })


    
    // ekhan theke all kaj suru krbo
    app.post('/coffee', async(req, res)=>{
      const newCoffee = req.body;
      console.log(newCoffee)
      const result = await coffeeCollection.insertOne(newCoffee);
      res.send(result)
    })


    app.put('/coffee/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const options = {upsert:true};
      const updatedCoffee = req.body
      const Coffee = {
        $set:{
          name:updatedCoffee.name, 
          details:updatedCoffee.details, 
          photo:updatedCoffee.photo, 
          quantity:updatedCoffee.quantity, 
          supplier:updatedCoffee.supplier, 
          taste:updatedCoffee.taste, 
          category:updatedCoffee.category
        }
      }

      const result = await coffeeCollection.updateOne(query, Coffee, options)
      res.send(result)
    })
    // Delete

    app.delete('/coffee/:id',  async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await coffeeCollection.deleteOne(query);
      res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


 app.get('/', (req, res)=>{
    res.send('coffee making server is running')
 })

 app.listen(port, ()=>{
    console.log(`coffee server is running on port ${port}`)
 })