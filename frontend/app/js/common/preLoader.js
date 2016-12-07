//paste this code under the head tag or in a separate js file.
// Wait for window load

//$(window).load(function () {
$(document).on('ready', function(){
    // Animate loader off screen
    window.progressLogo.fadeOut();
    if(!$("form:visible").is("#userQuestions")){
        $("form:visible input:visible:eq(0)").focus();
    }
});
window.progressLogo = {
    $el : $('.progress-logo'),
    start : function () {
        $('.progress-logo').addClass('start');
    },
    stop : function () {//
        $('.progress-logo').removeClass('start').addClass('stop');
        setTimeout(function () {
            $('.progress-backdrop').remove();
        }, 10000)
    },
    fadeOut : function (){
        $(".se-pre-con").fadeOut("slow");
    },
    fadeIn : function(){
        $(".se-pre-con").fadeIn("slow");
    }
};

$(function () {
    checkPreLoaderDiv();
});

function checkPreLoaderDiv () {
    if ($('.progress-logo').is(':visible')) {
        window.progressLogo.start();
    } else {
        setTimeout(checkPreLoaderDiv, 50);
    }
}