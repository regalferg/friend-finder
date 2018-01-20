
var path = require("path");
var pagans = require('../data/pagans.js');
var bodyParser = require("body-parser");

module.exports = function(app){

 //a GET route that displays JSON of all possible pagans
  app.get('/api/pagans', function(req,res){
    res.json(pagans);
  });

  app.post('/api/pagans', function(req,res){
    var newPagan = req.body;
    console.log(newPagan);
    console.log(pagans);
    //grabs the new friend's scores to compare with pagans in pagans array
    var newPaganScores = newPagan.scores;
    var scoresArr = [];
    var paganCount = 0;
    var bestMatch = 0;
console.log(newPaganScores);
    //runs through all current pagans in list
    for(var i=0; i < pagans.length; i++){
      var scoresDiff = 0;
      //run through scores to compare pagans
      for(var j=0; j < newPaganScores.length; j++){
        scoresDiff += (Math.abs(parseInt(pagans[i].scores[j]) - parseInt(newPaganScores[j])));
      }

      //push results into scoresArr
      scoresArr.push(scoresDiff);
    }

    //After all pagans are compared, find best match
    for(var i=0; i < scoresArr.length; i++){
      if(scoresArr[i] <= scoresArr[bestMatch]){
        bestMatch = i;
      }
    }

    // Return bestMatch data
    var paganMatch = pagans[bestMatch];
    res.json(paganMatch);

    //pushes new submission into the pagansList array
    pagans.push(newPagan);
    // res.json(newPagan);
  });

}

