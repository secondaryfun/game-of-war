window.addEventListener("load", function() {
    var f = document.getElementById('blink');
    setInterval(function() {
        f.style.display = (f.style.display == 'none' ? '' : 'none');
    }, 1000);

}, false);
// window.addEventListener("load", function() {
//     var first = document.getElementById('dot1');
//     var second = document.getElementById('dot1');
//     var third = document.getElementById('dot1');
//     setInterval(dotBlink(first), 500);
//     setInterval(dotBlink(second), 1000);
//     setInterval(dotBlink(third), 1500);

// }, false);


// function dotBlink(element) {
//     setInterval(function() {
//         element.style.display = (element.style.display == 'none' ? '' : 'none');
//     }, 1000);

// }
