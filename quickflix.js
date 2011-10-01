// ==UserScript==
// @name           QuickFlix
// @description    A brief description of your script
// @author         Brian Hazzard
// @include        http://movies.netflix.com/*
// @version        1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require        http://github.com/cowboy/jquery-hashchange/raw/v1.3/jquery.ba-hashchange.min.js
// @require        http://github.com/cowboy/jquery-bbq/raw/v1.2.1/jquery.ba-bbq.min.js
// @require        https://raw.github.com/okbreathe/jquery_plugins/master/okShortcut/jquery.okShortcut.min.js
// @require        https://raw.github.com/litera/jquery-scrollintoview/master/jquery.scrollintoview.min.js
// ==/UserScript==

// define or extend quickflix
var quickflix = quickflix || {};
(function(qf) {
	qf.play_first_movie = function() {
		qf.play_movie($('a.btn-play:first'));
	};
})(quickflix);

// define or extend quickflix.ui
var quickflix = quickflix || {};
quickflix.ui = quickflix.ui || {};
(function(ui) {
	// private members
	var selected_movie = 0,
	init_styles = function() {
		document.styleSheets[0]
			.addRule(".agMovie.quickflix-selected", "border: 4px green solid;");
	},
	init_shortcuts = function() {
		$.shortcut.add('down', function() {
			ui.selected_movie(selected_movie + 1);
		});
		$.shortcut.add('up', function() {
			ui.selected_movie(selected_movie - 1);
		});
		$.shortcut.add('left', function() {
			$('.pagination a.prev').each(function() {
				window.location = $(this).attr('href');
			});
		});
		$.shortcut.add('right', function() {
			$('.pagination a.next').each(function() {
				window.location = $(this).attr('href');
			});
		});
		$.shortcut.add('enter', function() {
			ui.view_movie_details(ui.selected_movie()) || ui.play_movie(ui.selected_movie());
		});
		$.shortcut.add('shift+enter', function() {
			ui.play_movie(ui.selected_movie()) || ui.view_movie_details(ui.selected_movie());
		});
	};

	// public members
	ui.init = function() {
		init_styles(); // css
		init_shortcuts(); // keyboard events
		ui.selected_movie(0);
	};

	ui.streamable_movies = function() {
		return $('.agMovie:has(.btn-play)');
	};

	ui.movie = function(index) {
		return ui.streamable_movies().eq(index);
	};

	ui.view_movie_details = function(movie) {
		var href = movie.find('a.mdpLink:first').attr('href');
		
		if (href) {
			window.location = href;
		} else {
			return false;
		}

		return true;
	};

	ui.play_movie = function(movie) {
		var href = movie.find('a.btn-play:first').attr('href');
		
		if (href) {
			window.location = href;
		} else {
			return false;
		}

		return true;
	};

	ui.selected_movie = function(index) {
		if (typeof index != "number") {
			return ui.movie(selected_movie);
		}

		var streamable_movies = ui.streamable_movies();

		if (index >= 0 && index < streamable_movies.size()) {
			selected_movie = index;
		} else if (index < 0) {
			selected_movie = streamable_movies.size() - 1;
		} else if (index >= streamable_movies.size()) {
			selected_movie = 0;
		}

		streamable_movies.removeClass('quickflix-selected');
		return ui.movie(selected_movie).addClass('quickflix-selected').scrollintoview();
	};
})(quickflix.ui);

// define or extend quickflix.hash
var quickflix = quickflix || {};
quickflix.hash = quickflix.hash || {};
(function(h) {
	// private members
	var process = function(hash_string) {
		var hash = $.deparam(hash_string);

		if (hash.quickflix && hash.quickflix.method) {
			route_method(hash.quickflix.method);
		}
	};

	var route_method = function(method, params) {
		if (typeof quickflix[method] == "function") {
			quickflix[method]();
		}
	};

	// public members
	h.init = function() {
		$(window).hashchange(function() {
			process($.param.fragment());
		});
		process($.param.fragment());
	};
})(quickflix.hash);

// setup to perform once the document is loaded
$(document).ready(function() {
	// initialize the hash
	quickflix.hash.init();

	// initialize the ui
	quickflix.ui.init();
});