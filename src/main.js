import { Api } from './class';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';



$(document).ready(function(){
  $("#credit").click(function(){
    let api = new Api();
    let promise = api.makeCall();

    promise.then(function(response) {
      let body = JSON.parse(response);
      for (var i = 0; i < 100; i++) {
        $('#name').append(`<div><img src="${body.cards[i].imageUrl}" alt="card"></div>`);
      }

    },
     function(error) {
      $('#error').text(`There was an error processing your request: ${error.message}`);
    });


  });
});
