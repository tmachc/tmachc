function getButterflyPoint(t){
    var n=t/Math.PI,
        e=Math.cos(n),
        a=Math.sin(n),
//        i=Math.exp(a)-2*Math.cos(4*n)-Math.pow(Math.sin(-Math.PI/24+n/12),5),//蝴蝶曲线
        i = Math.sqrt(225/(17-16*a*Math.sqrt(Math.pow(e,2)))),//心形曲线
        o=70*e*i,
        s=-60*a*i;
    return new Array(offsetX+o,offsetY+s)
}
function startButterflyAnimation(){
    var t=150,
        n=5,
        e=new Array,
        a=setInterval(function(){
            for(var t=getButterflyPoint(n),i=!0,o=0;o<e.length;o++){
                var s=e[o],r=Math.sqrt(Math.pow(s[0]-t[0],2)+Math.pow(s[1]-t[1],2));
                if(r<1.3*Garden.options.bloomRadius.max){
                    i=!1;break
                }
            }
            i&&(e.push(t),garden.createRandomBloom(t[0],t[1])),
                n>=25?(clearInterval(a),showMessages()):n+=.2
        },t)
}
function timeElapse(t){
    var n=Date(),
        e=(Date.parse(n)-Date.parse(t))/1e3,
        a=Math.floor(e/86400);
    e%=86400;
    var i=Math.floor(e/3600);10>i&&(i="0"+i),e%=3600;
    var o=Math.floor(e/60);10>o&&(o="0"+o),e%=60,10>e&&(e="0"+e);
    var s='<span class="digit">'+a+'</span> days <span class="digit">'+i+'</span> hours <span class="digit">'+o+'</span> minutes <span class="digit">'+e+"</span> seconds";
    $("#elapseClock").html(s)
}
function showMessages(){
    adjustWordsPosition(),
        $("#messages").fadeIn(5e3,function(){
            showHope()
        })
}
function adjustWordsPosition(){
    $("#words").css("position","absolute"),
        $("#words").css("top",$("#garden").position().top+160),
        $("#words").css("left",$("#garden").position().left+100)
}
function adjustCodePosition(){}
function showHope(){
    $("#hope").fadeIn(3e3)
}
var $window=$(window),
    $animation,gardenCtx,gardenCanvas,$garden,garden,offsetX,offsetY,clientWidth=$window.width(),
    clientHeight=$window.height();
$(function(){
    hljs.initHighlighting(),adjustCodePosition(),
        $("#code").typewriter(),setTimeout(function(){
        startButterflyAnimation()
    },6e4);
    var t=new Date;
    t.setFullYear(2014,4,8),
    t.setHours(21),
    t.setMinutes(0),
    t.setSeconds(0),
    t.setMilliseconds(0),
    timeElapse(t),
    setInterval(function(){
        timeElapse(t)
    },1e3),
    $animation=$("#animation"),
    gardenCanvas=$("#garden")[0],
        gardenCanvas.width=$animation.width(),
        gardenCanvas.height=$animation.height(),
        gardenCtx=gardenCanvas.getContext("2d"),
        gardenCtx.globalCompositeOperation="lighter",
        garden=new Garden(gardenCtx,gardenCanvas),
        offsetX=$animation.width()/2+20,
        offsetY=$animation.height()/2+10,
        $("#content").css("width",$animation.width()+$("#code").width()),
        $("#content").css("height",Math.max($animation.height(),$("#code").height())),
        $("#content").css("margin-top",Math.max(($window.height()-$("#content").height())/2,10)),
        $("#content").css("margin-left",Math.max(($window.width()-$("#content").width())/2,10)),setInterval(function(){
        garden.render()},Garden.options.growSpeed)
}),
    $(window).resize(function(){
        var t=$(window).width(),n=$(window).height();
        t!=clientWidth&&n!=clientHeight&&location.replace(location)}
    ),function(t){t.fn.typewriter=function(){return this.each(function(){var n,e=t(this),a=e.html(),i=0,o=95,s=45;e.html(""),$audio=t("#sound")[0],function r(){setTimeout(function(){n=Math.round(Math.random()*(o-s))+s;var t=a.substr(i,1);i=("<"==t?a.indexOf(">",i):i)+1,e.html(a.substr(0,i)+(1&i&&i<a.length?"_":"")),($audio.ended||$audio.paused)&&$audio.play(),i<a.length?r():$audio.pause()},n)}()}),this}}(jQuery);