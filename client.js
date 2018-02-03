let data = {
    languages: { //checkboxes
        french: null, //boolean
        spanish: null, //boolean
        english: null, //boolean
        vietnamese: null, //boolean
        russian: null, //boolean
    },
    musicGenres: { //checkboxes
        rap: null, //boolean
        heavy: null, //boolean
        classical: null, //boolean
        rave: null, //boolean
    },
    films: {
        titanic: null, //5 star rating
        diehard: null, //either yay, me, nah
    },
    drink: { //radio buttons
        favourite: null, //either tequila, coffee, coca-cola, none
    },
    food: {
        sushi: null, //either yay, meh, nah
        pizza: null, //5 star rating
        animals: null, //boolean
    },
    other: {
        baller: null, //either everyday, notreally, noidea
        musicPeakedIn80s: null, //boolean
        catdog: null, //cat/dog
    },
    goodLocations: [],
    badLocations: [],
};

var citynames = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: './top_places.json'
});
citynames.initialize();

$('.cityinput').tagsinput({
    typeaheadjs: {
        displayKey: 'name',
        valueKey: 'name',
        source: citynames.ttAdapter()
    },
    freeInput: false
});

function binaryValueChange(category, key, input) {
    let checked = input.checked;
    data[category][key] = checked || null;

    predict();
}

function numericValueChange(category, key, input) {
    let value = input.value;
    data[category][key] = parseInt(value) || null;

    predict();
}

function radioValueChange(category, key, input) {
    let value = input.value;

    if (value) {
        data[category][key] = value || null;

        console.log(value);

        predict();
    }
}

function insert() {
    data.goodLocations = $('#goodcities').tagsinput('items')
    data.badLocations = $('#badcities').tagsinput('items')

    superagent.post('http://localhost:3000/insert')
        .send(data)
        .set('Accept', 'application/json')
        .end(() => {});
}

function predict() {
    if (!data) {
        console.log("Shit, something isn't right");
    } else {
        superagent
            .post('http://localhost:3000/predict')
            .send(data)
            .set('Accept', 'application/json')
            .end((err, res) => {
                console.log(err);
                console.log(res.text);

                //TODO: use real results and show on right panel

                $('#recs').html(
                        JSON.parse(res.text).map((pair) =>
                            `<li /><div class="item" style="width: ${(pair.rating*300) + 200}px">${pair.name}</div> ${(pair.rating*100).toString().split('.')[0]}%`
                        )
                );
            });
    }
}

function randomRecommendations() {
    let locations = [
        'London', 'Helsinki', 'Hanoi', 'Tokyo', 'Tel Aviv'
    ].sort(() => .5 - Math.random());

    let ranking = 1;

    return locations.map(name => {
        ranking -= (Math.random() / locations.length);
        return {
            name,
            ranking,
        };
    })
}
