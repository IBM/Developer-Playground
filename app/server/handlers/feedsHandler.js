'use strict'

var FeedParser = require('feedparser'),
  request = require('request');

var feeds_count = 10;

module.exports = function() {

var methods = {};

	methods.fetchFeedsData = function(params, cb) {
		var feeds = [];
		feeds.push("<b>These are the top news headlines.  </b>");
		var req = request(params.feedURL)
		, feedparser = new FeedParser([]);

		req.on('error', function (error) {
			cb(new Error("Error while fetching Feeds "), null);
		});

		req.on('response', function (res) {
			var stream = this;
			if (res.statusCode != 200){
				cb(new Error("Bad status code "), null);
			}
			stream.pipe(feedparser);
		});


		feedparser.on('error', function(error) {
			cb(new Error("Error while fetching Feeds "), null);
		});

		feedparser.on('end', function(){
			console.log("ALL FEEDS FETCHED.  Do next steps >>>> ");
			cb(null, feeds);
		});

		feedparser.on('readable', function() {
			// This is where the action is!
			var stream = this
			  , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
			  , item;
			while (item = stream.read()) {
				var newsTitle = item.title+". ";
				if(feeds.length >= feeds_count){
					break;
				}else{
					feeds.push(newsTitle);
				}
			}
		});
	};

    return methods;

}
