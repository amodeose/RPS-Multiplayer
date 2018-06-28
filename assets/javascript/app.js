// Global Scope //

var p1choice = false;
var p2choice = false;
var p1name = false;
var p2name = false;
var p1wins = 0;
var p2wins = 0;
var winner = false;
var pnumber = false;
var dialogue;
$('.option').hide();
$('.text').hide();
$('.waiting').hide();

// Initialize Firebase //

var config = {
    apiKey: "AIzaSyBYX_I19vZj3NQPi9tSoRND1dLs2Qm7y8s",
    authDomain: "rps-multiplayer-adee5.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-adee5.firebaseio.com",
    projectId: "rps-multiplayer-adee5",
    storageBucket: "",
    messagingSenderId: "691783135699"
};

firebase.initializeApp(config);

var database = firebase.database();

// Assign player number on page load //

database.ref().once('value', function(snapshot) {
    if (snapshot.child("player1").exists() && snapshot.child("player2").exists()) {
      pnumber = "none";
    } else if (snapshot.child("player1").exists()) {
      pnumber = 2;
    } else {
      pnumber = 1;
    };
});

// Keep global variables updated throughout game //

database.ref().on('value', function(snapshot) {

  if (snapshot.child("player1").exists()) {

    p1name = snapshot.val().player1.username;
    p1choice = snapshot.val().player1.choice;

    if (pnumber === 2) {
      $('.opponent-name').text(p1name);
      $('.text').show();
      $('.option').show();
      $('.waiting').hide();
    }
  };

  if (snapshot.child("player2").exists()) {

    p2name = snapshot.val().player2.username;
    p2choice = snapshot.val().player2.choice;

    if (pnumber === 1) {
      $('.opponent-name').text(p2name);
      $('.text').show();
      $('.option').show();
      $('.waiting').hide();
    }
  }

  if (snapshot.child("winner").exists()) {

    winner = snapshot.val().winner.username;
    $('.message').text('Winner: ' + winner);
    database.ref("winner").remove();

    if (pnumber === 1) {
      $('.opponent-choice').attr('src', 'assets/images/' + snapshot.val().player2.choice + '.png');
    } else {
      $('.opponent-choice').attr('src', 'assets/images/' + snapshot.val().player1.choice + '.png');
    }

    database.ref("player1").child('choice').remove();
    database.ref("player2").child('choice').remove();
  }

  p1wins = snapshot.val().player1.wins;
  p2wins = snapshot.val().player2.wins;

  if (pnumber === 1) {
    $('.player-wins').text(p1wins);
    $('.opponent-wins').text(p2wins);
  } else {
    $('.player-wins').text(p2wins);
    $('.opponent-wins').text(p1wins);
  }

  dialogue = snapshot.val().messages;
  $('.dialogue').children().remove();
  for (key in dialogue) {
    $('.dialogue').append($('<p>').text(dialogue[key]))
  }

});

// Set Username Function //

$('.submit').click(function(){

  if (pnumber === 1) {

    p1name = $('.username-input').val();
    $('.player-name').text(p1name);
    $('.submit').remove();
    $('.username-input').remove();
    database.ref('player1').set({
      username: p1name,
      wins: 0
    });
    if (!p2name) {
      $('.waiting').show();
    }

  } else if (pnumber === 2) {

    p2name = $('.username-input').val();
    $('.player-name').text(p2name);
    $('.submit').hide();
    $('.username-input').hide();
    database.ref('player2').set({
      username: p2name,
      wins: 0
    });

    if (!p2name) {
      $('.waiting').show();
    }

  } else {
    $('.player-name').text('Too many players. Try again later.');
  };
})

// Choice Function //

$('.option').click(function(){

  var choice = $(this).text().toLowerCase();

  $('.message').text('');

  $('.opponent-choice').attr('src', '');

  if (pnumber === 1) {

    if (choice === 'rock') {
      $('.player-choice').attr('src', 'assets/images/rock.png');
      p1choice = 'rock';
      database.ref('player1').update({
        choice: 'rock'
      });

      if (p2choice) {

        if (p2choice === 'rock') {
          database.ref('winner').set({
            username: "tie"
          });
        } else if (p2choice === 'paper') {
          database.ref('winner').set({
            username: p2name
          });
          p2wins++;
        } else {
          database.ref('winner').set({
            username: p1name
          });
          p1wins++;
        }
      }

    } else if (choice === 'paper') {
      $('.player-choice').attr("src", 'assets/images/paper.png');
      p1choice = 'paper';
      database.ref('player1').update({
        choice: 'paper'
      });

      if (p2choice) {
        if (p2choice === 'rock') {
          database.ref('winner').set({
            username: p1name
          });
          p1wins++;
        } else if (p2choice === 'paper') {
          database.ref('winner').set({
            username: "tie"
          });
        } else {
          database.ref('winner').set({
            username: p2name
          });
          p2wins++;
        }
      }

    } else {
      $('.player-choice').attr('src', 'assets/images/scissors.png');
      p1choice = 'scissors';
      database.ref('player1').update({
        choice: 'scissors'
      });

      if (p2choice) {
        if (p2choice === 'rock') {
          database.ref('winner').set({
            username: p2name
          });
          p2wins++;
        } else if (p2choice === 'paper') {
          database.ref('winner').set({
            username: p1name
          });
          p1wins++;
        } else {
          database.ref('winner').set({
            username: "tie"
          });
        }
      }

    }

  } else if (pnumber === 2) {

    if (choice === 'rock') {
      $('.player-choice').attr('src', 'assets/images/rock.png');
      p2choice = 'rock';
      database.ref('player2').update({
        choice: 'rock'
      });

      if (p1choice) {
        if (p1choice === 'rock') {
          database.ref('winner').set({
            username: "tie"
          });
        } else if (p1choice === 'paper') {
          database.ref('winner').set({
            username: p1name
          });
          p1wins++;
        } else {
          database.ref('winner').set({
            username: p2name
          });
          p2wins++;
        }
      }

    } else if (choice === 'paper') {
      $('.player-choice').attr("src", 'assets/images/paper.png');
      p2choice = 'paper';
      database.ref('player2').update({
        choice: 'paper'
      });

      if (p1choice) {
        if (p1choice === 'rock') {
          database.ref('winner').set({
            username: p2name
          });
          p2wins++;
        } else if (p1choice === 'paper') {
          database.ref('winner').set({
            username: "tie"
          });
        } else {
          database.ref('winner').set({
            username: p1name
          });
          p1wins++
        }
      }

    } else {
      $('.player-choice').attr('src', 'assets/images/scissors.png');
      p2choice = 'scissors';
      database.ref('player2').update({
        choice: 'scissors'
      });

      if (p1choice) {
        if (p1choice === 'rock') {
          database.ref('winner').set({
            username: p1name
          });
          p1wins++;
        } else if (p1choice === 'paper') {
          database.ref('winner').set({
            username: p2name
          });
          p2wins++;
        } else {
          database.ref('winner').set({
            username: "tie"
          });
        }
      }
    }
  }

  database.ref('player1').update({
    wins: p1wins
  });

  database.ref('player2').update({
    wins: p2wins
  });

  if (pnumber === 1) {
    $('.player-wins').text(p1wins);
    $('.opponent-wins').text(p2wins);
  } else {
    $('.player-wins').text(p2wins);
    $('.opponent-wins').text(p1wins);
  }
})

// Logout Function

function logout() {
  if (pnumber === 1) {
    database.ref("player1").remove();
  } else if (pnumber === 2) {
    database.ref("player2").remove();
  }
  database.ref("messages").remove();
}

// Send Message Function //

$('.send').click(function(){
  var newMessage = $('.message-input').val();
  database.ref('messages').push(newMessage);
  $('.message-input').val('');
})
