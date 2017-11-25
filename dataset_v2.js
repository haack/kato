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

const classifier = 'like';

const training = [
    [true, true, false, false, false, false, true, false, false, 0, 1, "yes"],
    [false, true, false, false, false, false, true, false, false, 2, 2, "no"],
    [true, true, false, false, false, false, true, false, false, 2, 3, "yes"],
    [true, true, false, false, false, false, true, false, false, 6, 4, "yes"],
    [true, true, false, false, false, false, true, true, false, 3, 5, "yes"],
    [false, true, false, false, false, false, true, true, false, 2, 6, "no"],
    [true, true, true, false, false, false, true, false, false, 2, 7, "yes"],
    [true, true, false, false, false, false, true, false, false, 2, 8, "no"],
    [true, true, true, false, true, false, true, false, false, 1, 9, "no"],
];

function getFeaturesFromData(data) {
    data = flatten(data);

    return labels.map(key => data[key])
}

module.exports.getFeaturesFromData = getFeaturesFromData;
module.exports.labels = [...labels, `${classifier}?`];
module.exports.training = training;
