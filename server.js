const express = require('express')
// since application needs acces to express, I am enabling server has access to express

const app = express()
// since express is holding all these methods we can use, so it is useful to create something that will hold 
// express so that we can actively use those methods. Using express storing it in app variable.
// whereever we see app, we are referring to express

// first thing we want to do is setup the server to hear a request and to generate a response

const PORT = 8000

// To make request from client to server, we need to enable cors 
// did npm install cors --save
const cors = require('cors')

// did npm install path --save
const path = require('path')

app.use(cors()) 


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://starwalking23:uoBgBX1oS6SwhxMv@rap.k4oyr.mongodb.net/?retryWrites=true&w=majority&appName=rap";
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
run().catch(console.dir)

const rappers = {
    '21 savage':{
        'age': 29,
        'birthName':'Shéyaa Bin Abraham-Joseph',
        'birthLocation':'London, England'
    },
    'chance the rapper':{
        'age': 29,
        'birthName':'Chancelor Johnathan Bennett',
        'birthLocation':'Chicago, Illinois'
    },
    'dylan':{
        'age': 29,
        'birthName':'Dylan',
        'birthLocation':'Dylan'
    } 
}


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
}   )   
// Main page path is '/'. which is our route
// Once we hear a get request, we want to respond with something
// req is request, res is response
// Dirname is wherever the server.js file is located, thats where we are going to look for our files

// if it was public file, inside js inside main.js it would be 'public' behind dirname
// app.use(express.static(__dirname +  "js/main.js"));
app.use(express.static('public'))

app.get('/api/:rapperName', (req, res) => {
    const rapperName = req.params.rapperName.toLowerCase()
    if (rappers[rapperName]) {
        res.json(rappers[rapperName])
    }
    else{
        res.json(rappers['dylan'])
    }
})

//  colon is to let us know thats a query parameter

app.listen(process.env.PORT ||PORT, () => {
    console.log(`This server is running on port ${PORT}!`)
})
// have to tell the server listen to requests from a port number
// Want to klnow when the server is running
// Heroku might not like port 8000, so this is saying use the port that heroku gives us, or if it doesn't exist
//  use the port 8000 we defined