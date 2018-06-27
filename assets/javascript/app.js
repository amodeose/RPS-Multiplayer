//Global Scope

var p1choice = false;
var p2choice = false;
var p1name;
var p2name;
var pnumber = false;
$('.option').toggle();

// Initialize Firebase

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

// Assign player number

database.ref().once('value', function(snapshot) {
    if (snapshot.child("player1").exists() && snapshot.child("player2").exists()) {
      pnumber = "none";
    } else if (snapshot.child("player1").exists()) {
      pnumber = 2;
    } else {
      pnumber = 1;
    };
});

// Keep variables updated

database.ref().on('value', function(snapshot) {
    if (snapshot.child("player1").exists()) {
      p1name = snapshot.val().player1.username;
      p1choice = snapshot.val().player1.choice;

      if (pnumber === 2) {
        $('.opponent-name').text(p1name);
      }

    };

    if (snapshot.child("player2").exists()) {
      p2name = snapshot.val().player2.username;
      p2choice = snapshot.val().player2.choice;

      if (pnumber === 1) {
        $('.opponent-name').text(p2name);
      }

    }

});

// Username Function

$('.submit').click(function(){

  if (pnumber === 1) {

    p1name = $('.username-input').val();
    $('.player-name').text(p1name);
    $('.submit').remove();
    $('.username-input').remove();
    database.ref('player1').set({
      username: p1name,
    });
    $('.option').toggle();

  } else if (pnumber === 2) {

    p2name = $('.username-input').val();
    $('.player-name').text(p2name);
    $('.submit').remove();
    $('.username-input').remove();
    database.ref('player2').set({
      username: p2name,
    });
    $('.option').toggle();
  } else {
    $('.player-name').text('Too many players. Try again later.');
  };
})

// Choice Function

$('.option').click(function(){

  var choice = $(this).text().toLowerCase();

  if (pnumber === 1) {

    if (choice === 'rock') {
      $('.player-choice').attr('src', 'assets/images/rock.png');
      p1choice = 'rock';
      database.ref('player1').update({
        choice: 'rock'
      });

      if (p2choice) {
        $('.opponent-choice').attr('src', 'assets/images/' + p2choice + '.png');
      }

    } else if (choice === 'paper') {
      $('.player-choice').attr("src", 'assets/images/paper.png');
      p1choice = 'paper';
      database.ref('player1').update({
        choice: 'paper'
      });

      if (p2choice) {
        $('.opponent-choice').attr('src', 'assets/images/' + p2choice + '.png');
      }

    } else {
      $('.player-choice').attr('src', 'assets/images/scissors.png');
      p1choice = 'scissors';
      database.ref('player1').update({
        choice: 'scissors'
      });

      if (p2choice) {
        $('.opponent-choice').attr('src', 'assets/images/' + p2choice + '.png');
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
        $('.opponent-choice').attr('src', 'assets/images/' + p1choice + '.png');
      }

    } else if (choice === 'paper') {
      $('.player-choice').attr("src", 'assets/images/paper.png');
      p2choice = 'paper';
      database.ref('player2').update({
        choice: 'paper'
      });

      if (p1choice) {
        $('.opponent-choice').attr('src', 'assets/images/' + p1choice + '.png');
      }

    } else {
      $('.player-choice').attr('src', 'assets/images/scissors.png');
      p2choice = 'scissors';
      database.ref('player2').update({
        choice: 'scissors'
      });

      if (p1choice) {
        $('.opponent-choice').attr('src', 'assets/images/' + p1choice + '.png');
      }
    }
  }
})

// Logout Function

function logout() {
  if (pnumber === 1) {
    database.ref("player1").remove();
  } else if (pnumber === 2) {
    database.ref("player2").remove();
  }
}
