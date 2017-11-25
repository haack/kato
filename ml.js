const bayes = require('node-bayes');
const dataset = require('./dataset.js');

let model;

//todo: use eager training
function buildModel() {
    model = new bayes.NaiveBayes({
        columns: dataset.labels,
        data: dataset.data,
        verbose: true
    });

    model.train();
}

function retrain() {
    //todo: pull in new data

    model.train();
}

function predict(features) {
    let answers = model.predict(features);
    let rankings = [];

    for (let i in answers) {
        if (typeof answers[i] !== 'string') {
            rankings.push({
                name: i,
                rating: answers[i]
            });
        }
    }

    return rankings.sort((a,b) => b.rating - a.rating);
}

buildModel();
module.exports.predict = predict;
module.exports.retrain = retrain;


// let answer = cls.predict(['football', 24, 1, 'sushi', 'coffee', 'cocktail', 'rave', 'beach']);
// let answer = cls.predict(['football', 1, 1, 'kebab', 'milk', null, 'rave', null]);
