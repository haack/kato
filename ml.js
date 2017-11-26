const bayes = require('node-bayes');
const dataset = require('./dataset_v2.js');

class Classifier {
    constructor(className, docs) {
        console.log(`Building classifier for: ${className}`);

        this.className = className;

        let training = this.docsToMatrix(docs);

        console.log(training)

        this.model = new bayes.NaiveBayes({
            columns: dataset.labels,
            data: training,
            columnTypes: dataset.types,
            verbose: true,
        });

        this.model.train();

        console.log(this.className);

        try {
            console.log(this.model.predict([ true, true, false, false, true, false, true, false, false]));
        } catch (e) {
            console.log('Predict failed. Possibly untrained?');
        }
    }

    docsToMatrix(docs) {
        let matrix = [];

        for (let item of docs) {
            if (item.goodLocations.includes(this.className)) {
                matrix.push([...dataset.getFeaturesFromData(item), "yes"]);
            } else if (item.badLocations.includes(this.className)) {
                matrix.push([...dataset.getFeaturesFromData(item), "no"]);
            }
        }

        return matrix;
    }

    retrain() {
        //todo: pull in new data

        this.model.train();
    }

    predict(data) {
        let features = dataset.getFeaturesFromData(data);
        let rankings = [];

        console.log(features);
        console.log(this.model);
        console.log(this.className);

        return this.model.predict(features);
    }
}

module.exports = Classifier;
