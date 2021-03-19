const dotenv = require('dotenv');
dotenv.config();
const name = process.env.NAME || 'User'

console.log('http://localhost:3000')

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'))

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(process.env.URL, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to database')
    const db = client.db('books')
    const titlesCollection = db.collection('titles')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.get('/', (req, res) => {
        db.collection('titles').find().toArray()
            .then(results => {
                res.render('index.ejs', { titles: results, name: name })
            })
            .catch(error => console.error(error))
    })

    app.post('/titles', (req, res) => {
        titlesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
        console.log(req.body)
    })

    app.listen(3000, function() {
        console.log('listening on 3000')
    })

    app.delete('/titles', (req, res) => {
        titlesCollection.deleteOne({})
        .then(result => {
            res.json('Delete one title')
        })
        .catch(error => console.error(error))
    })
})
.catch(error => console.error(error))