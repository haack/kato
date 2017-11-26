const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Classifier = require('./ml');
const getCollection = require('./mongo');
const cors = require('cors');

app.use(cors({credentials: true, origin: true}))
app.use(bodyParser.json());

let classifiers = {};
let locations;

function loadAndBuild() {
    getCollection().find({}).toArray((err, docs) => {
        locations.forEach(location => {
            classifiers[location] = new Classifier(location, docs);
        });
    });
}

app.post('/dummy', (req, res) => {
    let datum = req.body;

    let locationsToClassify = locations.filter(location => !datum.goodLocations.includes(location) && !datum.badLocations.includes(location))

    let recs = locationsToClassify.map(location => {
        return {
            name: location,
            prediction: classifiers[location].predict(datum),
        }
    });

    res.send(recs);
});

app.post('/insert', (req, res) => {
    let datum = req.body;

    getCollection().insert(datum);

    res.send("thanks");
});

app.post('/predict', (req, res) => {
    res.send([
        {
            name: "London",
            rating: 0.9
        },
        {
            name: "Helsinki",
            rating: 0.6
        },
    ]);
});

function main() {
    request('http://localhost:1337/cities/top/60', (err, res, body) => {
        locations = JSON.parse(body);
        if (!err) {
            console.log("City list retrieved");

            if (!getCollection()) {
                console.log("mongo not ready");
            }

            loadAndBuild();

            app.listen(8000, () => console.log('Listening on port 8000!'));
        } else {
            console.log(`shit: ${err}`);
        }
    })
}

setTimeout(main, 2000);
