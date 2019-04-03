autowatch = 1;
outlets = 3;


var myval = [];
var markObj = {};
var currentGram = [];

function list() {
    var a = arrayfromargs(arguments);
    myval.push(a);
    bang();
}


function clear() {
    markObj = {};
    myval = [];
    result = [];
    pitches= [];
    velocities = [];
    durations = [];

}

function callCreate() {

    createMarkov(myval);

}


function bang() {
    //outlet(0, "myvalue", "is", myval.toString());
}


function createMarkov(noteList) {


    for (var i = 0; i < noteList.length; i++) {


        if (!markObj[noteList[i].toString()]) {
            markObj[noteList[i].toString()] = [];

        }
        //push first element after last to create a loop
        if (i === noteList.length - 1) {

            markObj[noteList[i].toString()].push(noteList[0]);
        } else {
            markObj[noteList[i].toString()].push(noteList[i + 1]);

        }


    }

    var properties = [];
    for (var key in markObj) {
        if (markObj.hasOwnProperty(key)) {
            post("key: " + key + " " + "value: " + markObj[key] + " ");
            post();
        }
    }
    //assign first element to currentgram for next function//bad practice

}

var result = [];
var pitches= [];
var velocities = [];
var durations = [];

function generate() {

    currentGram = myval[0];
    result.push(currentGram);


    for (var i = 0; i < 64; i++) {
        currentGram.toString().replace(/[ ,]+/g, ",");
        //get all possible succesors given an index
        var possibilities = markObj[currentGram];
        //pick a value from all possible values and add it to the result string
        var next = possibilities[Math.floor(Math.random() * possibilities.length)];
        result.push(next);
        pitches.push(result[i][0]);
        velocities.push(result[i][1]);
        //durations.push(result[i][2]);



        currentGram = result[result.length - 1];

    }

    outlet(0, pitches);
    outlet(1, velocities);
    outlet(2, durations);

 /*   var properties = [];
    for (var key in result) {
        if (result.hasOwnProperty(key)) {
            post(result[key] + " ");
            post();
        }
    }
*/

}










