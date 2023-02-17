/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */





$(document).ready(function() {
  const createTweetElement = function(data) {
  let time = timeago.format(new Date(data.created_at));


// use escape to prevent XSS-cross site scripting
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str)); //add escape in textarea to prevent xss
  return div.innerHTML;  
};

  let $tweet = 
  `<article class="tweet-article">
  <header class="tweet-header">
    <div class="avatar-name">
      <img class="tweet-avatar" src="https://i.imgur.com/73hZDYK.png"></img>
      <h5>${data.user.name}</h5>

    </div>
    <h5 class="userID">${data.user.handle}</h5>
  </header>
     <div class="tweet-post">
       <p>
       ${escape(data.content.text)}
       </p>
    </div>
    <div class="horizontal-line"></div>
  <footer class="tweet-footer">
    <p>${time};</p>
      <div class='icons'>
        <div class="icon">
          <i class="fa-solid fa-flag"></i>
        </div>
        <div class="icon">

          <i class="fas fa-retweet"></i>
        </div>
        <div class="icon">

          <i class="fa-solid fa-heart"></i>
        </div>
      </div>
  </footer>
</article>`

return $tweet;
}


//array里的所有post数据，分别用上面的func进行处理后，插入container里
const renderTweets = function(allData) {

  for (let data of allData) {
    let tweet = createTweetElement(data)
    $('#tweets-container').prepend(tweet);
  }
}

//点击submit button发送post内容到/tweets端，生成新用户名
//用loadtweets来从/tweets返回所有数据（包含已经有的用户名和post）
//然后用rendertweets来处理
const loadTweets = () => {
  $.ajax({
    url:'/tweets',
    method:'GET',
    dataType: 'json', //jQuery 会将服务器返回的数据解析为 JSON 格式，并将其作为参数传递给 success 回调函数中的 data 参数。
    //如果服务器返回的数据不是 JSON 格式，那么 jQuery 会在请求失败时调用 error 回调函数。
    success: (data) => {
      console.log(data, 'get data');
      renderTweets(data);
    },
    error: (error) => {
      console.error(error);
    }
  })
}


$('#form').submit((event) => { //要从form来listen，不能直接button
  event.preventDefault();
  let input = $("#tweet-text").val();
  let serializedData = $("#tweet-text").serialize();//.serialize() function turns a set of form data into a query string
console.log(input, serializedData,'here')
  if (input.length === 0) {
    $(".error-dialog").slideDown(1200);
    $(".error-text").text("Say something! Pls say something! Thank you!");
    $("#tweet-text").focus();
    setTimeout(function() {
      $(".error-dialog").slideUp(1000);
    }, 2000);
  } else if (input.length > 140) {
    $("#tweet-text").val("");
    $("#tweet-text").focus();
    $(".counter").text("140");
    $(".counter").css("color", "black");
    $(".error-dialog").slideDown(1200);
    $(".error-text").text("Too long. Pls rspct our abitrary limit of 140 chars! Thank You!");
    setTimeout(function() {
      $(".error-dialog").slideUp(1000);
    }, 2000);
  } else {
    $.ajax({
      url: "/tweets",
      type: "POST",
      data: serializedData,
      }) //把序列化后的数据post到服务器的tweets路径，这个数据将作为 POST 请求的 body 数据发送到服务器上。
      .then(() => {
        $("#tweet-text").val("");
        $(".counter").text("140");
        $(".counter").css("color", "black");
        $("#tweet-text").focus();
        loadTweets(); // load tweets without refresh page
      })
      .catch(error => {
        console.log(error);
      });
  }
})


//red arrow
$("#arrow").on("click", function(event){
  $(".new-tweet").toggle();//turn it on and off(show/hide)
});



});