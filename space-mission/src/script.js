/**
 * Created by ue66405 on 30.09.2016.
 */

var bullets = 0;
var traitors = 0;

var bulletspeed = 600;
var shootspeed = 650;
var collisioncheck = 10;

var traiterinterval = 2000;
var traitorspeed = 8000;

// --- gameplay --
var hit_counter = 0;
var sec = 0;
var landed_traitors = 0;

var timer;
var speed_up_traitor_interval;

$(document).ready(function () {

    if(!mobile_device())
    {
        alert("You might be better open this page on your mobile device and tilt it to the right or left to control the spaceship." +
            "\n\n" +
            ". . . also possible to do so with the arrow-keys!");
    }else{
        alert("Tilt your smartphone to the left or right to control the spaceship!");
    }

    document.onkeydown = function (e) {
        e = e || window.event;
        switch (e.keyCode){
            case 32:
                break;
            case 37: move(-20);
                break;
            case 39: move(20);
                break;
        }
    };
});

function move(dis){

    var display_width = parseInt(screen.width);
    var pos_h = parseInt($("#ship").css('left'));
    pos_h += dis;

    if(pos_h < (-32)){
        pos_h = (-32);
    }
    if(pos_h > (display_width) - 50){
        pos_h = (display_width) - 50;
    }


    $("#ship").animate({
        left: pos_h + 'px'
    }, 0, function() {

    });
}
function start(){

    $('#start').hide();
    $("#controll_area").show();
    $("#ship").animate({
        bottom: '20px'
    }, 1000, function() {

        $(".game_props").show();
        $("#pause").show();
        detect_device_movement();
    });

    create_traitor();

    setInterval(function(){ shoot(); }, shootspeed);
    speed_up_traitor_interval = setInterval(function(){

        if(traiterinterval > 300){
            traiterinterval = traiterinterval - 10;
        }
        var eps = 1000 / traiterinterval
        eps = parseFloat(eps).toFixed( 2 );
        $("#int_traitors").text( eps + ' enemy/sec');

    }, 2000);
    timer = setInterval(function(){ $("#sec").text(sec + ' sec'); sec++; }, 1000);
}
function shoot(){

    var posX = parseFloat($("#ship").css('left')) + 39;
    var pos_b = parseFloat($("#ship").css('bottom')) - 5;
    var posY = parseInt($(window).height()) - pos_b - 95;

    var bullet = document.createElement("bullet");
    bullet.className = 'bullet';
    bullet.id = 'bullet_' + bullets;
    $("#area").append(bullet);

    $("#bullet_" + bullets).animate({
        left: posX + 'px',
        top: posY + 'px'
    }, 0, function() {
        bullet_fly($("#bullet_" + bullets));
    });
    bullets++;

}
function bullet_fly(id){

    detect_collision(id);
    id.animate({
        top: '-10px'
    }, bulletspeed, function() {
        id.remove();
    });

}
function detect_collision(bullet){

    var b_l = parseInt(bullet.css('left'));
    var b_w = parseInt(bullet.css('width'));
    var hit = false;

    $(".traitor").each(function () {

        var traitor = $('#' + $(this).attr('id'));

        var t_l = parseInt(traitor.css('left'));
        var t_w = parseInt(traitor.css('width'));

        if(t_l < b_l && t_l + t_w > b_l + b_w && t_l < b_l){

            var interval = setInterval(function(){
                if(!hit && contact(traitor, bullet)){

                    bullet.stop();
                    bullet_explode(bullet, b_l, b_w);
                    hit = true;
                    hit_counter++;
                    $("#counter").text(hit_counter);
                    traitor.remove();
                    clearInterval(interval);
                }
            }, collisioncheck);
        }
    });
}
function bullet_explode(bullet, bl, bw) {

    bullet.css('background-color', 'yellow');
    bullet.animate({
        left: (bl - 20) + 'px',
        top: ((bullet.css('top')) - 40) + 'px',
        width: '44px',
        height: '44px',
        opacity: '0'
    }, 300, function() {

        bullet.remove();
    });
}
function contact(traitor, bullet){

    if(parseInt(traitor.css('top')) + 30 >= parseInt(bullet.css('top')) &&
       parseInt(traitor.css('top')) <= parseInt(bullet.css('top')) ){
        return true;
    }
    return false;
}
function create_traitor(){

    var max = parseInt($("#area").css('width')) - 30;
    var min = 30;
    var rand = Math.random() * (max - min) + min;
    traitor(parseInt(rand));

    $({to:0}).animate({to:1}, traiterinterval, function() {
        create_traitor();
    });

}
function traitor(location){

    location = location - 30;

    var traitor = document.createElement("traitor");
    traitor.className = 'traitor';
    traitor.id = 'traitor_' + traitors;
    $("#area").append(traitor);

    $("#traitor_" + traitors).attr('src', '');
    $("#traitor_" + traitors).animate({
        left: location + 'px',
        top: '-150px'
    }, 0, function() {
        traitor_move_and_shoot($("#traitor_" + traitors));
    });
    traitors++;
    //$("#enemys").text(traitors + ' enemys');

}
function traitor_move_and_shoot(id){

    id.animate({
        top: '700px'
    }, traitorspeed, function() {

        $(this).remove();
    });

}
function detect_device_movement() {

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(eventData) {

            // gamma is the left-to-right tilt in degrees
            var g = parseInt(eventData.gamma);

            // beta is the front-to-back tilt in degrees
            //var b = parseInt(eventData.beta);

            move(g);

        }, false);
    }
}
function mobile_device()
{
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){
        return true;
    }
    return false;
}














































