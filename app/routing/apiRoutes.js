
var path = require("path");
var pagans = require('../data/pagans.js');
var bodyParser = require("body-parser");

module.exports = function(app){

 //GET route that displays current pagans
  app.get('/api/pagans', function(req,res){
    res.json(pagans);
  });

  app.post('/api/pagans', function(req,res){
    var newPagan = req.body;
    console.log(newPagan);
    console.log(pagans);
    //Gets the new pagan's scores to compare with pagans in pagans array
    var newPaganScores = newPagan.scores;
    var scoresArr = [];
    var paganCount = 0;
    var bestMatch = 0;
console.log(newPaganScores);

    //Loops through all current pagans 
    for(var i=0; i < pagans.length; i++){
      var scoresDiff = 0;


      //Loops through scores to compare pagans
      for(var j=0; j < newPaganScores.length; j++){
        scoresDiff += (Math.abs(parseInt(pagans[i].scores[j]) - parseInt(newPaganScores[j])));
      }

      //Push results into scoresArr
      scoresArr.push(scoresDiff);
    }

    //After all pagans are compared, finds match
    for(var i=0; i < scoresArr.length; i++){
      if(scoresArr[i] <= scoresArr[bestMatch]){
        bestMatch = i;
      }
    }

    // Returns bestMatch data
    var paganMatch = pagans[bestMatch];
    res.json(paganMatch);

    //Push new submission into the pagans array
    pagans.push(newPagan);
    // res.json(newPagan);
  });

}

