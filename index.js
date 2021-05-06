const express = require('express')

const bodyParser = require('body-parser');
const cors= require('cors');


const app = express()

app.use(cors());
app.use(bodyParser.json());
const port = 3002;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:abunasimlomani@cluster0.t2o5i.mongodb.net/burj-al-arab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect(err => {
  const collection = client.db("burj-al-arab").collection("booking");
    

    app.post('/addBooking', (req, res) => {
        const newBooking =req.body;
        collection.insertOne(newBooking)
        .then(result=>{
            res.send(result.insertedCount>0)
        })

        console.log(newBooking)
    })
    app.get('/bookings', (req, res) => {
      console.log(req.headers.authorization)
      collection.find({email: req.query.email})
      .toArray((err, documents) =>{
        res.send(documents);
      })
    })
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)