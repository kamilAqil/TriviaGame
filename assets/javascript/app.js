var time = 10;
var updateTime = undefined;
var startTime = undefined;

var game = {
  "questions" : [{
    "question":"What color is the ocean",
        "answerA" : {
          "answer" : "blue",
          "correct" : true
        },
        "answerB" : {
          "answer": "green",
          "correct": false
        },
        "answerC" : {
          "answer": "red",
          "correct": false
        }
      },{
    "question":"What color is grass?",
      "answerA": {
        "answer":"blue",
        "correct":false
      },
      "answerB":{
        "answer":"green",
        "correct":true
      },
      "answerC" : {
        "answer": "red",
        "correct": false
      }
  }],
  "indexesToGuess" : [],
  "randomIndexPicker": function(){
    var indexToDisplay = Math.floor((Math.random() * game.questions.length));
    // console.log(indexToDisplay);
    return indexToDisplay;
  },
  "questionToGuess": undefined,
  "rightAnswer" : undefined,
  "displayQuestion" : function(){
    var questionIndex = game.randomIndexPicker();
    var question = game.questions[questionIndex].question;
    var answerA = game.questions[questionIndex].answerA.answer;
    var answerB = game.questions[questionIndex].answerB.answer;
    var answerC = game.questions[questionIndex].answerC.answer;

    // set question to guess
    game.questionToGuess = game.questions[questionIndex];

    // console.log(question);
    $('#question').html(question);
    // console.log(answerA);
    $('#answerAContent').html(answerA);
    // console.log(answerB);
    $('#answerBContent').html(answerB);
    // console.log(answerC);
    $('#answerCContent').html(answerC);
  },
  "setRightAnswer" : function(){},
  "updateScore":function(){
    $('#winsCount').html(game.wins);
    $('#lossesCount').html(game.losses);
  },
  "handleTimer":function(){

    var updateTime = setInterval(function(){
      $('#time').html('0:'+time);
      time--;
    },1000);

    var startTime = setTimeout(function(){
      clearInterval(updateTime);
      console.log('out of time');
    },11*1000);

  },
  "showWinScreen":function(){
    console.log(game.questions);
    console.log(game.questionToGuess);
    var x =game.questions.indexOf(game.questionToGuess);
    game.questions.splice(x,1);
    console.log(x);
    $('#gamePlayScreen').css({
      "display":"none"
    });
    $('#correctAnswerScreen').css({
      "display":""
    });
    setTimeout(function(){
      $('#gamePlayScreen').css({
        "display":""
      });
      $('#correctAnswerScreen').css({
        "display":"none"
      });
    },3000);
    game.displayQuestion();
  },
  "showLoseScreen":function(){

  },
  "inPlay":false,
  "wins":0,
  "losses":0
};

// when the user clicks the start button
// it will select a question and display it
// to the document.
// it will then start the 45 second counter
// every second it will update the document with
// the time
// when the time runs out run the lose function

$('#startButton').on('click',function(){
  console.log('clicked start');
  $('#winsCount').html(game.wins);
  $('#lossesCount').html(game.losses);
  game.displayQuestion();
  game.inPlay = true;
  console.log('game in play');

   updateTime = setInterval(function(){
      $('#time').html('0:'+time);
      time--;
    },1000);

   startTime = setTimeout(function(){
    clearInterval(updateTime);
    console.log('out of time');
  },11*1000);

});


// when the answerContainer is clicked it will
// create a variable that will carry the value for
// the option clicked
$('.answerContainer').on('click',function(){
  // console.log($(this).children('p').html());
  if (game.inPlay == true){
    var answerClicked = $(this).attr("id");
    console.log(answerClicked);
    var correct = game.questionToGuess[answerClicked].correct;
    console.log(correct);
    if (correct) {
      console.log('you got it');
      clearInterval(updateTime);
      clearTimeout(startTime);
      game.wins += 1;
      game.updateScore();
      // run the win function
      game.showWinScreen();
    }else{
      console.log("wrong");
      clearInterval(updateTime);
      clearTimeout(startTime);
      game.losses += 1;
      game.updateScore();
      // run the lose function
    }
  }
});
