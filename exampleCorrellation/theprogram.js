/*
 *  This program is a demonstration of 
 *  some server side nodejs!
 *
 *  It simply reads in the json containing the poll
 *  results for the 10 questions about national debt.
 *
 *  Then the function "thisFunction" takes two questions
 *  as JSON and returns an array containing the votes
 *  of individuals who voted on both.
 *
 *  This return array can be processed, for example,
 *  in the function "show cool facts about correllation array"
 *
 *  copyright 2015 Joseph Burger and Alexander McNulty
 *
 */
var fs = require('fs');

fs.readFile('alex2.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
    var numquestions = obj.length;
    var keys = Object.keys(obj);
    var correllation = thisFunction(obj[keys[0]], obj[keys[1]]);
    showCoolFactsAboutACorrellationArray(correllation);
});

/*
 *  This function takes an array of arrays;
 *  the arrays in the array have two elements;
 *  the first is the user's vote on the first question,
 *  and the second is the user's vote on the second question.
 *
 *  Example of the array being passed in:
 *  [ [3, 5], [2, 1], [6, 6], [5, 0] ]
 *
 *  With those two values we can make connections about the data!
 *
 */
function showCoolFactsAboutACorrellationArray(correllation) {
    var numAgreeBoth = 0;
    var numDisAgreeBoth = 0;
    var totalUsers = correllation.length;
    for (var innerArray in correllation) {
        if (correllation[innerArray][0] > 3 && correllation[innerArray][1] > 3)
            numAgreeBoth++;
        else if (correllation[innerArray][0] < 3 && correllation[innerArray][1] < 3)
            numDisAgreeBoth++;
    }
    console.log("The number of users who agreed on both questions: " + Math.floor(numAgreeBoth / totalUsers * 100) + "%");
    console.log("The number of users who didn't agree on both questions: " + Math.floor(numDisAgreeBoth / totalUsers * 100) + "%");
}


/*
 * This Function:
 * Given two questions (A and B), as jsons, 
 * find out how many users who AT LEAST agreed on A,
 * also AT LEAST agree on B.
 * 
 * @param {A} the first question, in JSON
 * @param {B} the second question, in JSON
 */
function thisFunction (A, B) {
    var votedA = [], votedB = [];
    // Map takes an array and sends each element of
    // the array through a function that transforms
    // the data. This anonymous function simply
    // returns the user id. It's "filtering" our objects
    votedA = A.votes.map(function(question){ return question.userid; });
    votedB = B.votes.map(function(question){ return question.userid; });

    // Using a hash, for each user, add their
    // name to the hash and set that name to one.
    // In the second for loop, if the user isn't
    // in the hash, then set it to 1. But if the user 
    // is found in the hash, that means he/she voted
    // on the previous question, so increment and it 
    // will be 2
    var hash = {};
    for (var element in votedA)
        hash[votedA[element]] = 1;

    for (var element in votedB) {
        if (hash[votedB[element]] == null)
            hash[votedB[element]] = 1;
        else
            hash[votedB[element]]++;
    }
    
    // fill votedBoth with only the users who voted
    // on both question A and B. Because you can't
    // make a correlation between users who didn't
    // vote on both
    var votedBoth = [];
    for (var element in hash) {
        if (hash[element] > 1)
            votedBoth.push(element)
    }
    
    /*
     *  What we want:
     *  correllation: {
     *      user1 : [5, 6],
     *      user1 : [2, 6],
     *      user1 : [6, 0],
     *  }
     */
    var correllation = [];


    // votedBoth: array of user id's
    //console.log(A.votes);
    for (var user in votedBoth) { // user =  number, element of votedBoth array
        var uservotepair = [];
        for (var votes in A.votes)// A.votes = array of objects
            //console.log(A.votes[votes]); // is an object with the vote number we want
            if (A.votes[votes].userid == votedBoth[user])
                uservotepair.push(A.votes[votes].vote)
        for (var votes in B.votes)// B.votes = array of objects
            //console.log(B.votes[votes]); // is an object with the vote number we want
            if (B.votes[votes].userid == votedBoth[user])
                uservotepair.push(B.votes[votes].vote)
        correllation.push(uservotepair);
    }

    return correllation;
}





/*
 * This Function:
 * Given two questions (A and B), as jsons, 
 * find out how many users who STRONGLY agreed on A,
 * also STRONGLY agree on B.
 *
 */
