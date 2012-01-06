/**
 * http://www.free.fr/js/components/accueil/index.js
 */

var keys = [];
var VroumVroum  = '38,38,40,40,37,39,37,39,66,65';
$(document)
    .keydown(
        function(e) {
            keys.push( e.keyCode );
            if ( keys.toString().indexOf( VroumVroum ) >= 0 ){

                $('body').append('<div id="KCode" style="position:absolute; z-index:1337;left:0px; top:0px; bottom:-30px; right:0px; display:none; background:url(/im/nrbg.gif) ; padding-left:50%; padding-top:20%"><img src="/im/nyanrocket.gif" style="margin-top:-160px; margin-left:-315px;"/></div><div id="loveboat" style="position:absolute; height:1px;width:1px; top:-100px;"></div>');
                /*loadScript("http://swfobject.googlecode.com/svn/trunk/swfobject/swfobject.js", function(){});*/
                var atts = { id: "video" };
                var params = {
                    allowScriptAccess: "always",
                    'wmode':'transparent'
                };
                swfobject.embedSWF("http://www.youtube.com/apiplayer?video_id=icAwcByaNtY&version=3&autoplay=1&enablejsapi=1&playerapiid=ytplayer","loveboat", "1", "1", "8", null, null, params, atts);
                $('#KCode').fadeIn(2000);

                keys = [];
            }
        }
    );
)