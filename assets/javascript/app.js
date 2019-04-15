$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    // starting numbers
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 30,
    timerOn: false,
    timerId : '',

    // questions and answers
    questions: {
      q1: 'What does the phrase "Valar Morghilis" mean?',
      q2: 'What is Ayras punishment for stealing from the Many-Face God?',
      q3: 'Who killed King Joffrey?',
      q4: 'How many children did Ned Stark have?',
      q5: "What is the sigil of the house Tyrell?",
      q6: 'The Night King was created using a dagger made of:',
      q7: "Who is Jon Snow's father?",
      q8: "How does Daenerys hatch her dragon eggs?"
    },
    options: {
      q1: ['All men must serve', 'All men must die', 'All men must fight', 'All men must serve the throne'],
      q2: ['Blindness', 'Memory Loss', 'Loss of Voice', 'Loss of Mobility'],
      q3: ['Olenna Tyrell', 'Tyrion Lannister', 'Jon Snow', 'Sansa Stark'],
      q4: ['4', '8', '5', '6'],
      q5: ['Twin Towers','Black Stag','Three Suns','Golden Rose'],
      q6: ['Valyrian Steel','Blue Ice','Dragonglass','Weirwood'],
      q7: ['Ned Stark', 'The Mad King', 'Rhaegar Targeryen','Jamie Lannister'],
      q8: ['In a funeral pyre', 'With the help of a sorcercess', 'With a lightning strike','Using wildfire']

    },
    answers: {
      q1: 'All men must die',
      q2: 'Blindness',
      q3: 'Olenna Tyrell',
      q4: '5',
      q5: 'Golden Rose',
      q6: 'Dragonglass',
      q7: 'Rhaegar Targeryen',
      q8: 'In a funeral pyre'
    },

    // sartgame function
    startGame: function(){

      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
      
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      trivia.nextQuestion();
      
    },
    ///next game function
    nextQuestion : function(){
      
      trivia.timer = 30;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },

    timerRunning : function(){

      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
        }
      }

      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }

      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // score keeper
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        $('#game').hide();
        
        $('#start').show();
      }
      
    },

    guessChecker : function() {
      
      var resultId;
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }

      else{

        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },

    guessResult : function(){
      
      trivia.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();
      
      trivia.nextQuestion();
       
    }
  
  }