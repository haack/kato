const bayes = require('node-bayes');
const dataset = require('./dataset_v2.js');

let model;

//todo: use eager training
function buildModel() {
    model = new bayes.NaiveBayes({
        columns: dataset.labels,
        data: dataset.training,
        verbose: true
    });

    model.train();
}

function retrain() {
    //todo: pull in new data

    model.train();
}

function predict(data) {
    let features = dataset.getFeaturesFromData(data);
    let rankings = [];

    return model.predict(features);
}

buildModel();
module.exports.predict = predict;
module.exports.retrain = retrain;
