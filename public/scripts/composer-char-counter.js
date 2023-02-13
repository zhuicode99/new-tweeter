$(document).ready(function() {
/*   var textarea = document.querySelector("textarea");
  let counter = document.getElementsByClassName("counter")
  textarea.addEventListener("input", function(){ //只有不用arrow function，this才有用
    let num = this.value().length
  }) */ //不使用jquery是这样

  $("textarea").on('input', function() {
    let char = $(this).val().length;

    let counter = $(this).parent().children('.tweet-bottom').children('.counter')

    let charLeft = 140 - char;

    counter.html(charLeft)

    if(charLeft < 0) {
      counter.css("color","red")
    } else {
      counter.css("color", "black")
    }
  });






});