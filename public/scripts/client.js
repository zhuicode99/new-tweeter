/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


$(document).ready(function() {
  const createTweetElement = function(data) {
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
       ${data.content.text}
       </p>
    </div>
    <div class="horizontal-line"></div>
  <footer class="tweet-footer">
    <p>posted ten days ago</p>
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



const renderTweets = function(allData) {

  for (let data of allData) {
    let tweet = createTweetElement(data)
    $('#tweets-container').prepend(tweet);
  }
}

renderTweets(tweets)

});