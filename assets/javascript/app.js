var p1choice;
var p2choice;

$('button').click(function(){

  p1choice = $(this).text().toLowerCase();

  console.log(p1choice);

  if (p1choice === 'rock') {
    $('.p1choice').attr('src', 'assets/images/rock.png');
  } else if (p1choice === 'paper') {
    $('.p1choice').attr("src", 'assets/images/paper.png');
  } else {
    $('.p1choice').attr('src', 'assets/images/scissors.png');
  }

})
