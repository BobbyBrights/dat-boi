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















































