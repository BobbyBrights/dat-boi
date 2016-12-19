function iecure_detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}
document.addEventListener('DOMContentLoaded', function () {
    if(iecure_detectIE()){
        console.log("aww gawwd its an ie");
        document.body.innerHTML = "<img style='" +
            "position: absolute; left: 0; top: 0; width: 100vw; height: 100vh; z-index: 100;" +
            "' src='https://media.giphy.com/media/l4Ki2obCyAQS5WhFe/giphy.gif'>" +
            "<img style='position: absolute; left: 45vw; top: 45vh; width: 10vw; height: 10vh; z-index: 101;'" +
            "src='http://www.eggdrop.ch/noie/noie.png'>";
    }
}, false);