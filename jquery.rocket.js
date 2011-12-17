(function($) {
    $.fn.rocket = function(options) {
        var defaults = {
            base_url: 'https://raw.github.com/moul/jquery-rocket/master/',
            enterOn: 'now',
            delayTime: 5000,
            spread: 3
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
                var _this = $(this);
                var _status = 'stopped';

                var rocketMarkup = '<div id="rocket" style="display: none"></div>';
                $('body').append(rocketMarkup);
                var rocket = $('#rocket').css({
                        width: "275px",
                        height: "375px",
                        background: "url('" + options.base_url + "img/rocket.png') no-repeat",
                        margin: "140px 0 50px",
                        position: "absolute"
                    });

                rocket.append('<span id="rocketSteam"></span>');
                var steam = $('#rocketSteam').css({
                        position: 'absolute',
                        bottom: 78,
                        left: 50,
                        width: 80,
                        height: 80,
                        background: 'url("' + options.base_url + 'img/steam.png") no-repeat',
                        opacity: 0.8,
                    });

                function propulsion() {
                    if (_status != 'started') {
                        return ;
                    }
                    var rotate = Math.floor(Math.random() * options.spread) - ((options.spread - 1) / 2);
                    rocket.css('WebkitTransform', 'rotate(' + rotate + 'deg)');
                    steam
                        .css({left: 50,
                                    bottom: 78,
                                    display: 'block',
                                    marginLeft: -10 + Math.floor(Math.random() * 20),
                                    backgroundPosition: (Math.floor(Math.random() * 2) < 1 ? '0% 0%' : 'left bottom')})
                        .animate({left: '-=58',
                                    bottom: '-=100',
}, 120,
                                 function(){
                                     setTimeout(propulsion, 10);
                                 });
                }

                function init() {
                    var _overflow_state = rocket.parent().css('overflow');
                    var _width = $(window).width();
                    var _height = $(window).height();
                    rocket.parent().css('overflow', 'hidden');
                    //rocket.parent().css('overflow', _overflow_state);
                    rocket.css({
                            display: 'block',
                            left: _width - 275,
                            top: _height,
                          })
                        .animate({top: '-=500'}, 500).animate({top: '+=25'}, 200)
                        .delay(200)
                        .animate({left:'-=' + (_width - 250)}, 1000)
                        .animate({left: '+=25'}, 200, function() {
                                _status = 'started';
                                propulsion();
                                rocket
                                    .delay(2000)
                                    .animate({'left':'+=' + _width, "top": '-=' + (_height + 375)}, 5000,
                                             function() {
                                                 _status = 'stopped';
                                             });
                            });
                }

                if (options.enterOn == 'now') {
                    init();
                } else if (options.enterOn == 'timer') {
                    setTimeout(init, options.delayTime);
                } else if(options.enterOn == 'click') {
                    _this.bind('click', function(e) {
                            e.preventDefault();
                            if(!locked) {
                                init();
                            }
                        });
                } else if(options.enterOn == 'konami-code'){
                    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
                    $(window).bind("keydown.rocketz", function(e){
                            kkeys.push( e.keyCode );
                            if ( kkeys.toString().indexOf( konami ) >= 0 ) {
                                init();
                                $(window).unbind('keydown.rocketz');
                            }
                        }, true);
                }

            });
    }
})(jQuery);

//$(window).load(function() { $('body').rocket(); });