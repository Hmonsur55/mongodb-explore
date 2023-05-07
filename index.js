const express = require('express')
const app = express()
const cors =require('cors')
const port =process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`mongodb server is running on port ${port}`)
})