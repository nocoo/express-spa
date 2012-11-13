/*
    express-spa
    @copyright 2012  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/express-spa
    @license MIT
*/

// Avoid `console` errors in browsers that lack a console.
;(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

(function() {
    // Global namespace.
    var ESPA = {};

    // Global configurations.
    ESPA.LINK_CLASS = '.espa';
    ESPA.DEFAULT_PAGE = 'index';
    ESPA.TITLE_TAIL = ' - express-spa';
    ESPA.MAP = {
        'index': { 'path': '/index', 'title': 'Index' },
        'page1': { 'path': '/page1', 'title': 'Page1' },
        'page2': { 'path': '/page2', 'title': 'Page2' },
        'page3': { 'path': '/page3', 'title': 'Page3' }
    };

    // Parse parameters of given url.
    ESPA.url_parameter = function (link) {
        var url = link || window.location.href;
        if (url.indexOf('?') !== -1) {
            var queryArr = url.split('?')[1].split('&');
            var obj = {};

            for (var i = 0; i < queryArr.length; i++) {
                var pair = queryArr[i].split('=');
                obj[pair[0]] = pair[1];
            }

            return obj;
        }

        return {};
    };

    // Hijack link click behavior.
    ESPA.hack_links = function () {
        $(ESPA.LINK_CLASS).off('click');
        $(ESPA.LINK_CLASS).on('click', function(evt) {
            evt.preventDefault();

            var arr = $(evt.target).attr('href').split('/');
            arr.shift();
            ESPA.load_page(arr.join('.'));

            return false;
        });
    };

    ESPA.load_page = function (page) {
        console.log('[Routing] load page: ' + page);
        var obj = ESPA.MAP[page], path;

        if (obj) {
            path = obj.path;
            obj.id = page;

            ESPA.current_page = page;
            History.pushState(obj, obj.title + ESPA.TITLE_TAIL, '?p=' + page);

            $.get(path, function (data) {
                $('#root').html(data);
                ESPA.hack_links();
            });
        } else {
            console.log('[Routing] page not found: ' + page);
        }
    };

    // Initilization.
    var History = window.History;
    if (!History.enabled) {
        alert('Fatal Error: History API is disabled in your browser.');
        return false;
    }

    // Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function() {
        var status = History.getState();

        // Browser back and forwards.
        if (ESPA.current_page !== status.data.id) {
            ESPA.load_page(status.data.id);
        }
    });

    ESPA.hack_links();

    var history = ESPA.url_parameter();
    if (history.p) {
        var index = window.location.href.indexOf('?p=') + 3;
        ESPA.load_page(window.location.href.substr(index));
    } else {
        ESPA.current_page = ESPA.DEFAULT_PAGE;
        ESPA.load_page(ESPA.DEFAULT_PAGE);
    }
}());
