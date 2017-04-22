var time = 3;

// when the user clicks the start button
// it will select a question and display it
// to the document.
// it will then start the 45 second counter
// every second it will update the document with
// the time
// when the time runs out run the lose function

$('#startButton').on('click',function(){
  console.log('clicked start');

  // this runs every second to update the
  // time
  var updateTime = setInterval(function(){
    $('#time').html('0:'+time);
    time--;
  },1000);

  // this will run when the
  // game time runs out
  var startTime = setTimeout(function(){
    console.log('out of time');
    clearInterval(updateTime);
    time = 3;
  },4*1000);



});
