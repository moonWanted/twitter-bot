const twit = require('twit');
const config = require('./config.js');
const fs = require('fs');
const path = require('path');

var Twitter = new twit(config);


var retweet = function () {
    var params = {
        q: '#WWII',
        //count: 10,
        //result_type: 'recent',
        lang: 'en'
    }

    Twitter.get('search/tweets', params, function (err, data) {
        if(!err) {
            console.log(data);
            //take ID of tweet
            let retweetId = data.statuses[0].id_str;
            //retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function (err, response) {
                if (response) {
                    console.log('Successful retweet');
                }
                if (err) {
                    console.log('Error occurred while retweet');
                }
            });
        }
        //if error while searching a tweet
        else {
            console.log('Error while searching');
        }
    });
}

retweet();
setInterval(retweet, 60000);


// FAVORITE BOT

//find random, tweet and favorite it
var favoriteTweet = function () {
    var params = {
        q: '#WWII',
        //result_type: 'recent',
        lang: 'en'
    }

    Twitter.get('search/tweets', params, function (err, data) {

        var tweet = data.statuses;
        var randomTweet = randTweet(tweet);

        if (typeof randomTweet != 'undefined') {
           Twitter.post('favorites/create', {id:randomTweet.id_str}, function (err, res) {
               if(err) {
                   console.log('Error occurred while favorite');
               } else {
                   console.log('Successful favorite');
               }
           })
        }
    });
}

favoriteTweet();
setInterval(favoriteTweet, 3600000);

function randTweet (arr) {
    let index = Math.floor(Math.random()*arr.length);
    return arr[index];
};
