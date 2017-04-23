var time = 9;
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
    if(game.questions.length !==0){
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
    }else{
      console.log("you beat the game");

    }

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
      // run the lose function

    },11*1000);

  },
  "showWinScreen":function(){
    $('#correctAnswerScreen').css({
      "display":"flex"
    });
    $('#gamePlayScreen').css({
      "display":"none"
    });
    setTimeout(function(){
      $('#gamePlayScreen').css({
        "display":""
      });
      $('#correctAnswerScreen').css({
        "display":"none"
      });
      game.displayQuestion();
       time = 10;
       $('#time').html('0:'+time);
      updateTime = setInterval(function(){
        time--;
         $('#time').html('0:'+time);
       },1000);
      startTime = setTimeout(function(){
       clearInterval(updateTime);
       console.log('out of time');
     },10*1000);
    },3000);
  },
  "showLoseScreen":function(){

    clearInterval(updateTime);
    clearTimeout(startTime);

    $('#gamePlayScreen').css({
      "display":"none"
    });
    $('#wrongAnswerScreen').css({
      "display":"flex"
    });
    setTimeout(function(){
      $('#gamePlayScreen').css({
        "display":""
      });
      $('#wrongAnswerScreen').css({
        "display":"none"
      });

      game.displayQuestion();
      time = 10;
      $('#time').html('0:'+time);
      updateTime = setInterval(function(){
        time--;
         $('#time').html('0:'+time);
       },1000);

    },3000);

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
  console.log('game in play');
  game.displayQuestion();
   updateTime = setInterval(function(){

      $('#time').html('0:'+time);
      time--;
    },1000);

   startTime = setTimeout(function(){
    clearInterval(updateTime);
    console.log('out of time');
  },10*1000);

  $('#winsCount').html(game.wins);
  $('#lossesCount').html(game.losses);
  game.inPlay = true;
});


// when the answerContainer is clicked it will
// create a variable that will carry the value for
// the option clicked
$('.answerContainer').on('click',function(){
  // console.log($(this).children('p').html());
  clearInterval(updateTime);
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
        console.log(game.questions);
        console.log(game.questionToGuess);
        var x =game.questions.indexOf(game.questionToGuess);
        game.questions.splice(x,1);
        console.log(x);
        // run the win function
        if(game.questions.length!==0){
          game.showWinScreen();
        }else{
          console.log("beat the game");
          $('#gamePlayScreen').css({
            "display":"none"
          });
          $('#beatTheGameScreen').css({
            "display":"flex"
          });
        }

      }else{
        console.log("wrong");
        clearInterval(updateTime);
        clearTimeout(startTime);
        game.losses += 1;
        game.showLoseScreen()
        game.updateScore();
        // run the lose function
      }
  }
});


// when the reset button is clicked
$('#resetButton').on('click',function(){
  console.log('reset button clicked');
  location.reload();
});
