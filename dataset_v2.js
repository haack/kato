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
];

const types = ["boolean", "boolean", "boolean", "boolean", "boolean", "boolean", "boolean", "boolean", "boolean", "string"];

const classifier = 'like';

function getFeaturesFromData(data) {
    data = flatten(data);

    return labels.map(key => data[key])
}

module.exports.getFeaturesFromData = getFeaturesFromData;
module.exports.types = types;
module.exports.labels = [...labels, `${classifier}?`];
