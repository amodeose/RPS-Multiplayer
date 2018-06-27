//Global Scope

var p1choice;
var p2choice;
var p1name;
var p2name;
var pnumber;

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


// Username Function

$('.submit').click(function(){

  if (p1name === false) {

    pnumber = 1;
    p1name = $('.username-input').val();
    $('.player-name').text(p1name);
    $('.submit').remove();
    $('.username-input').remove();

    $('.option').toggle();

  } else if (!p2name) {

    p2name = $('.username-input').val();
    $('.player-name').text(p2name);
    $('.submit').remove();
    $('.username-input').remove();

    $('.option').toggle();
  } else {

  }

})

// Choice Function

$('.option').click(function(){

  p1choice = $(this).text().toLowerCase();



  if (p1choice === 'rock') {
    $('.p1choice').attr('src', 'assets/images/rock.png');
  } else if (p1choice === 'paper') {
    $('.p1choice').attr("src", 'assets/images/paper.png');
  } else {
    $('.p1choice').attr('src', 'assets/images/scissors.png');
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
