/**
 * Created by Administrator on 14-7-30.
 */

var string = [
    "这是咱们在一起的第一个七夕",
    "我喜欢有你的日子",
    "我喜欢属于咱们的默契",
    "没有谁追谁的感情",
    "无意识的靠近彼此",
    "从好朋友到情人",
    "从相爱到白头",
    "不离不弃",
    "也许我没有出众的文采",
    "也许我没有帅气的外表",
    "也许我没有完美的身材",
    "但是",
    "我有一颗爱你的心",
    "一份真挚的感情",
    "我愿做你的天使",
    "保护你 宠爱你",
    "给你依赖 给你力量",
    "我爱你",
    "七夕快乐",
    "&nbsp",
    "你的大叔"
];
var current = 0;
var timer;

$(document).ready(function(){
    start();
});
//开始显示
function start(){
    $("#code").empty();
    //添加信的内容
    $("#code").append("<li><strong>最爱的琦贝贝：</strong></li>");
    for(var i=0; i<string.length; i++){
        if(i == string.length - 1){
            $("#code").append("<li class='zhengWen' style='text-align: right;' id='liZW"+i+"'>测试</li>");
        } else {
            $("#code").append("<li class='zhengWen' style='margin-left: 70px;' id='liZW"+i+"'>测试</li>");
        }
    }
    //隐藏
    $(".zhengWen").hide();
    //循环显示
    timer = self.setInterval("showAndHide()",2000);
}
//显示函数
function showAndHide(){
    document.getElementById("liZW" + current).innerHTML = string[current];
    $("#liZW" + current).show(5000);
    if(current > 6){
        $("#liZW" + (current - 7) ).hide(5000);
//        for(var i=1;i<7;i++){
//            var marLeft = (280-40*i);
//            console.log("#liZW" + (current - i) +"----marLeft---->>>",marLeft);
//            $("#liZW" + (current - i) ).animate({marginLeft:marLeft},1000);
//        }
//        console.log("-------------------");
    }
    current ++;
    if(current == string.length){
        timer = window.clearInterval(timer);
    }
}