(function(a){a.fn.rocket=function(b){b=a.extend({base_url:"https://raw.github.com/moul/jquery-rocket/master/",enterOn:"now",delayTime:5E3,spread:3},b);return this.each(function(){function h(){_propulsion&&(c.css("WebkitTransform","rotate("+(Math.floor(Math.random()*b.spread)-(b.spread-1)/2)+"deg)"),i.css({left:50,bottom:78,display:"block",marginLeft:-10+Math.floor(Math.random()*20),backgroundPosition:Math.floor(Math.random()*2)<1?"0% 0%":"left bottom"}).animate({left:"-=58",bottom:"-=100"},120,function(){setTimeout(h,
10)}))}function d(){if(!f){g=!1;f=!0;var b=c.parent().css("overflow"),d=a("body").width(),e=Math.max(a("body").height(),a(window).height());j.css("opacity",0);c.parent().css("overflow","hidden");a("html:not(:animated),body:not(:animated)").animate({scrollTop:e-a(window).height()},500,function(){g||(g=!0,c.css({display:"block",left:d-275,top:e}).animate({top:"-=500"},500).animate({top:"+=25"},200).delay(200).animate({left:"-="+(d-250)},1E3).animate({left:"+=25"},200,function(){j.delay(100).animate({opacity:"+=1"},
300,function(){_propulsion=!0;h();a("html:not(:animated),body:not(:animated)").delay(2300).animate({scrollTop:0},3200);c.delay(2E3).animate({left:"+="+d,top:"-="+(e+400)},5E3,function(){c.parent().css("overflow",b);f=_propulsion=!1;i.css("display","none")})})}))})}}var k=a(this),f=!1,g=!1;a("body").append('<div id="rocket" style="display: none"></div>');var c=a("#rocket").css({width:275,height:375,zIndex:9999,background:"url('"+b.base_url+"img/rocket-off.png') no-repeat",margin:"140px 0 50px",position:"absolute"});
c.append('<div id="rocketFire"></span>');var j=a("#rocketFire").css({position:"absolute",height:375,width:275,background:'url("'+b.base_url+'img/rocket-fire.png") no-repeat'});c.append('<span id="rocketSteam"></span>');var i=a("#rocketSteam").css({position:"absolute",bottom:78,left:50,width:80,height:80,background:'url("'+b.base_url+'img/steam.png") no-repeat',opacity:0.8,display:"none"});if(b.enterOn=="now")d();else if(b.enterOn=="timer")setTimeout(d,b.delayTime);else if(b.enterOn=="click")k.bind("click",
function(a){a.preventDefault();d()});else if(b.enterOn=="konami-code"){var e=[];a(window).bind("keydown.rocketz",function(a){e.push(a.keyCode);e.toString().indexOf("38,38,40,40,37,39,37,39,66,65")>=0&&(d(),e=[])},!0)}})}})(jQuery);
