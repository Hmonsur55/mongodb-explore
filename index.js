const express = require('express')
const app = express()
const cors =require('cors')
const port =process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://farukahmed0762:ujn7Yqma8Xc9JufM@cluster1.9cknc8q.mongodb.net/?retryWrites=true&w=majority";


// middleweare
app.use(cors())
app.use(express.json())





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
      // this is for all method eta baire rkaha hoise jeno sob gulate pay
      const database = client.db("usersDB");
      const userCollections = database.collection("users");
    //   data read on API
      app.get('/users', async(req, res) => {
          const cursor = userCollections.find()
          const result = await cursor.toArray()
          res.send(result); 
      })
      
    //   data insert on database
      app.post('/users', async (req, res) => {
          const user = req.body;
          console.log('new user', user)
          const result = await userCollections.insertOne(user)
          res.send(result)
      })
    
// for delete database import objectId mannually
    app.delete('/users/:id', async(req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await userCollections.deleteOne(query);
      res.send(result)
      console.log('please delete database form', id)
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


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`mongodb server is running on port ${port}`)
})