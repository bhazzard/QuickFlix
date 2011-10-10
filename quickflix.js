// define or extend quickflix
var quickflix = quickflix || {};
(function(qf) {
    qf.play_first_movie = function() {
        qf.ui.play_movie(qf.ui.streamable_movies().first());
    };
})(quickflix);
// define or extend quickflix.ui
var quickflix = quickflix || {};
quickflix.ui = quickflix.ui || {};
(function(ui) {
    // private members
    var selected_movie = 0,
        init_styles = function() {
            document.styleSheets[0].addRule(".quickflix-selected", "border: 4px green solid;");
        },
        init_shortcuts = function() {
            var down = function() {
                    ui.selected_movie(selected_movie + 1);
                },
                up = function() {
                    ui.selected_movie(selected_movie - 1);
                };
            $(document).bind('keydown', 'down', down).bind('keydown', 'j', down).bind('keydown', 'up', up).bind('keydown', 'k', up).bind('keydown', 'left', function() {
                $('.pagination a.prev').each(function() {
                    window.location = $(this).attr('href');
                });
            }).bind('keydown', 'right', function() {
                $('.pagination a.next').each(function() {
                    window.location = $(this).attr('href');
                });
            }).bind('keydown', 'return', function() {
                ui.view_movie_details(ui.selected_movie()) || ui.play_movie(ui.selected_movie());
            }).bind('keydown', 'shift+return', function() {
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
        }
        else {
            return false;
        }
        return true;
    };
    ui.play_movie = function(movie) {
        var href = movie.find('a.btn-play:first').attr('href');
        if (href) {
            window.location = href;
        }
        else {
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
        }
        else if (index < 0) {
            selected_movie = streamable_movies.size() - 1;
        }
        else if (index >= streamable_movies.size()) {
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