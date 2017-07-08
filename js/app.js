/*
  Please add all Javascript code to this file.
*/
$(document).ready(function(){
	var rssApp = {};

	rssApp.updateFeed = function(item){
		var source = $('#rss-template').html();
		var template = Handlebars.compile(source);
		return template(item);
	};

	$('#popUp').removeClass('hidden');
	var redditUrl = "https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/top.json";
	var request = $.ajax({
		url: redditUrl
	});
	request.done(function(results){
		$('#popUp').addClass('hidden');
		var rssResults = results.data.children;
		var posts = [];
		for(i=0;i<rssResults.length;i++){
			var postInfo = {
				ups:rssResults[i].data.ups,
				author:rssResults[i].data.author,
				image:rssResults[i].data.thumbnail,
				title:rssResults[i].data.title,
				link:rssResults[i].data.url
			}
			posts.push(postInfo);
		};
			var rssOnPage = rssApp.updateFeed(postInfo);
			$('#main').prepend(rssOnPage);

			$('#main').children(".article").on("click", function (){
				$('#popUp').removeClass('loader hidden');
				$('#popUp h1').text(postInfo.title);
				$('#popUp p').text(postInfo.author);
				$('a.popUpAction').attr('href',postInfo.link);
			});

			$('.closePopUp').on('click', function(){
				$('#popUp').addClass('hidden');
			});
	});

});