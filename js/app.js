/*
  Please add all Javascript code to this file.
*/
$(document).ready(function(){
	var rssApp = {};

// Calls in the templating to create the listing page
	rssApp.updateFeed = function(item){
		var source = $('#rss-template').html();
		var template = Handlebars.compile(source);
		return template(item);
	};
// defines the reddit feed ajax call function
	var runReddit = function (){
			var redditUrl = "https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/top.json";
			var request = $.ajax({
				url: redditUrl
			});
	// Calling the ajax request and logging the JSON elements I want
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
	// Appending the object to the listing template				
					posts.push(postInfo);
					var rssOnPage = rssApp.updateFeed(postInfo);
					$('#main').append(rssOnPage);
					$('#news-source').text("Reddit");			};
	// On-click popup description of the article
				$('#main').children(".article").on("click", function (){
					var post = posts[$(this).index()];
					$('#popUp').removeClass('loader hidden');
					$('#popUp h1').text(post.title);
					$('#popUp p').text(post.author);
					$('a.popUpAction').attr('href',post.link);
				});
	// Closing the popup by clicking X
				$('.closePopUp').on('click', function(){
					$('#popUp').addClass('hidden');
				});
			});
	};
// defines the Mashable feed ajax call function
	var runMashable = function() {
		var mashableUrl = "https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json";
		var request = $.ajax({
			url: mashableUrl
		});
	// Calling the ajax request and logging the JSON elements I want
		request.done(function(results){
			$('#popUp').addClass('hidden');
			var rssResults = results.new;
			var posts = [];
			for(i=0;i<rssResults.length;i++){
				var postInfo = {
					shares:rssResults[i].shares,
					author:rssResults[i].author,
					image:rssResults[i].feature_image,
					title:rssResults[i].title,
					link:rssResults[i].link,
					content:rssResults[i].content.plain
				}
	// Appending the object to the listing template	
				posts.push(postInfo);
				var rssOnPage = rssApp.updateFeed(postInfo);
				$('#main').append(rssOnPage);
				$('#news-source').text("Mashable");
			};
	// On-click popup description of the article
			$('#main').children(".article").on("click", function (){
				var post = posts[$(this).index()];
				$('#popUp').removeClass('loader hidden');
				$('#popUp h1').text(post.title);
				$('#popUp p').text(post.content);
				console.log(post.content);
				$('a.popUpAction').attr('href',post.link);
			});
	// Closing the popup by clicking X
			$('.closePopUp').on('click', function(){
				$('#popUp').addClass('hidden');
			});
		});
	};
// defines the Digg feed ajax call function
	var runDigg = function(){
		var diggUrl = "https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json";
		var request = $.ajax({
			url: diggUrl
		});
	// Calling the ajax request and logging the JSON elements I want
		request.done(function(results){
			$('#popUp').addClass('hidden');
			var rssResults = results.new;
			console.log(rssResults);
			var posts = [];
			for(i=0;i<rssResults.length;i++){
				var postInfo = {
					author:rssResults[i].author,
					image:rssResults[i].feature_image,
					title:rssResults[i].display_title,
					link:rssResults[i].link,
					content:rssResults[i].excerpt
				}
	// Appending the object to the listing template	
				posts.push(postInfo);
				var rssOnPage = rssApp.updateFeed(postInfo);
				$('#main').append(rssOnPage);
				$('#news-source').text("Digg");
			};


	// On-click popup description of the article
			$('#main').children(".article").on("click", function (){
				var post = posts[$(this).index()];
				$('#popUp').removeClass('loader hidden');
				$('#popUp h1').text(post.title);
				$('#popUp p').text(post.content);
				console.log(post.content);
				$('a.popUpAction').attr('href',post.link);
			});
	// Closing the popup by clicking X
			$('.closePopUp').on('click', function(){
				$('#popUp').addClass('hidden');
			});
		});
	};

	// Start of Reddit feed function
	$('#reddit').on('click', function(){ 
		$('#main').empty();
		$('#popUp').removeClass('hidden');
		runReddit();
	});
	// Start of Mashable feed function
	$('#mashable').on('click', function(){ 
		$('#main').empty();
		$('#popUp').removeClass('hidden');
		runMashable();
	});
	// Start of Digg feed function
	$('#digg').on('click', function(){ 
		$('#main').empty();
		$('#popUp').removeClass('hidden');
		runDigg();
	});
	// Click to load the default page of all 3
	$('.feedr').on('click', function(){
		$('#main').empty();
		$('#popUp').removeClass('hidden');
		runReddit();
		runMashable();
		runDigg();
		$('#news-source').text("ALL");
	});

	$('#search a').on('click', function(){
		$(this).toggle(function(){
			$(this).prev().animate({
				width: 185, 
				visibility: "visible"
			},200);
		}, function(){
			$(this).prev().animate({
				width: 185,
				visibility: "visible" 
			},200);
		});
	});
});