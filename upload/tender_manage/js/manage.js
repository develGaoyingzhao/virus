
//退出登录下拉菜单
$(".my").add(".down-menu").click(function(event)
{
    event=event||window.event;
    event.stopPropagation();
    $(".down-menu").toggle();
});

$(document).click(function(e){

    $(".down-menu").hide();

});


if(getCookie('user'))
{
    userObj=JSON.parse(getCookie('user'));
    console.log(userObj);
    $("#topComName").text(userObj.com_name);
}
else
{
    window.location.href="../login.html";
}

$("#loginOut").click(function()
{
    $.ajax({
        url: serverUrl + "logout",
        type: 'post',
        dataType: "json",
        beforeSend: function(request) {
            request.setRequestHeader("token", userObj.token);
        },
        success: function (data) {

            console.log(JSON.stringify(data));
            clearCookie("user");
            if(data.code==1800)
            {
                window.location.href="../login.html";
            }
            else {
                window.location.href="../login.html";
            }
        },
        error:function(msg)
        {
            clearCookie("user");
            window.location.href="../login.html";
        }
    });

});

var　coordinateY;
$(".step img").live('click',function()
{

    var imgUrl=$(this).attr('src');
    coordinateY=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    $("body").append("<div id='shadow' class='shadow'></div>");
    $("body").append("<div id='imgDialog' style='position: absolute;z-index:100;width:800px;left:50%;margin-left:-400px;top:20%;padding-top:30px;background: #fff;'><img id='close-icon' style='top:20px;' class='close-icon' src='../img/close.png'><img style='width:98%;display: block;margin:0 auto;' src='"+imgUrl+"'></div>");

    window.scrollTo(0,0);

});

$("#close-icon").live('click',function()
{
    $("#shadow").remove();
    $("#imgDialog").remove();
    console.log("坐标"+coordinateY);
    window.scrollTo(0,coordinateY);

});

$("#shadow").live('click',function()
{
    $("#shadow").remove();
    $("#imgDialog").remove();
    window.scrollTo(0,coordinateY);

});


