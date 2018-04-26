import { Api } from './class';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

function cardCheck(cards) {
  let creatureArray = [];
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].types.includes("Creature") === true){
      creatureArray.push(cards[i]);
    }
  }
  return creatureArray;
}

// function damagePlayer1(p1Power, p2Power){
//   let damage1 = 0;
//   if(p1Power[0] > p2Power[1]) {
//     damage1 = p1Power[0] - p2Power[1];
//   } else if (p1Power[0] === isNan && p1Power[1] === isNan) {
//     damage1 = 0;
//   }
//   return damage1;
// }

function damagePlayer1(p1Power, p2Power) {
  let damage1 = 0;
  if (isNaN(p1Power[0]) && isNaN(p1Power[1])) {
     damage1 = 1;
  } else if (p1Power[0] > p2Power[1]) {
      damage1 = p1Power[0] - p2Power[1];
    } else  {
      damage1 = 0;
  }
  return damage1;
}


function damagePlayer2(p1Power, p2Power) {
  let damage2 = 0;
  if (isNaN(p2Power[0]) && isNaN(p2Power[1])) {
     damage2 = 1;
  } else if (p2Power[0] > p1Power[1]) {
      damage2 = p2Power[0] - p1Power[1];
    } else  {
      damage2 = 0;
  }
  return damage2;
}


$(document).ready(function(){
  let p1Damage = 0;
  let p2Damage = 0;
  $("#battle").click(function(){
    let api = new Api();
    let promise = api.makeCall();
    promise.then(function(response) {
      // let p2Damage = 0;
      let body = JSON.parse(response);
      let creatureArray = cardCheck(body.cards);
      let p1Card = creatureArray[Math.floor(Math.random() * Math.floor(69))];
      let p2Card = creatureArray[Math.floor(Math.random() * Math.floor(69))];
      let p1Power = [parseInt(p1Card.power), parseInt(p1Card.toughness)];
      let p2Power = [parseInt(p2Card.power), parseInt(p2Card.toughness)];
      p1Damage += damagePlayer1(p1Power, p2Power);
      p2Damage += damagePlayer2(p1Power, p2Power);
      $("#p1damage").text(p2Damage);
      $("#p2damage").text(p1Damage);
      $('.p1image').html(`<img src="${p1Card.imageUrl}" alt="card">`);
      $('.p2image').html(`<img src="${p2Card.imageUrl}" alt="card">`);
      $("#battle").show();

    });
  });
});
//
// },
//  function(error) {
//   $('#error').text(`There was an error processing your request: ${error.message}`);
