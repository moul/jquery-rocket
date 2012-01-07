;(function($) {
     $.fn.rocket3d = function(options) {
         var defaults = {
             enterOn: 'now',
             delayTime: 5000,
         };
         var options = $.extend(defaults, options);

         return this.each(function() {
                              var _this = $(this);
                              var _started = false;

                              function init() {
                                  if (_started) {
                                      return ;
                                  }
                                  _started = true;
                                  var _width = $('body').width();
                                  var _height = Math.max($('body').height(), $(window).height());
                                  $("html:not(:animated),body:not(:animated)").animate({scrollTop: _height - $(window).height()}, 500, function() {
                                                                                       });
                              }

                              if (options.enterOn == 'now') {
                                  init();
                              } else if (options.enterOn == 'timer') {
                                  setTimeout(init, options.delayTime);
                              } else if(options.enterOn == 'click') {
                                  _this.bind('click', function(e) {
                                                 e.preventDefault();
                                                 init();
                                             });
                              } else if(options.enterOn == 'konami-code'){
                                  var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
                                  $(window).bind("keydown.rocketz", function(e){
                                                     kkeys.push(e.keyCode);
                                                     if (kkeys.toString().indexOf(konami) >= 0) {
                                                         init();
                                                         kkeys = []
                                                     }
                                                 }, true);
                              }

                          });
     }
 })(jQuery);
