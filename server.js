const express = require('express')
// since application needs acces to express, I am enabling server has access to express

const app = express()
// since express is holding all these methods we can use, so it is useful to create something that will hold 
// express so that we can actively use those methods. Using express storing it in app variable.
// whereever we see app, we are referring to express

// first thing we want to do is setup the server to hear a request and to generate a response

const PORT = 8000

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

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
}   )   
// Main page path is '/'. which is our route
// Once we hear a get request, we want to respond with something
// req is request, res is response
// Dirname is wherever the server.js file is located, thats where we are going to look for our files

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