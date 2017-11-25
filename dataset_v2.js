//todo: possibly move out
var flatten = require('flat');

const labels = [
    'musicGenres.rap',
    'musicGenres.rave',
    'musicGenres.classical',
    'musicGenres.heavy',
    'languages.french',
    'languages.spanish',
    'languages.english',
    'languages.vietnamese',
    'languages.russian',
    'films.titanic',
    'films.diehard',
];

const classifier = 'location';

const training = [[true, true, false, false, false, false, true, false, false, 2, 1, "London"]];

function getFeaturesFromData(data) {
    data = flatten(data);

    return labels.map(key => data[key])
}

module.exports.getFeaturesFromData = getFeaturesFromData;
module.exports.labels = [...labels, `${classifier}?`];
module.exports.training = training;
