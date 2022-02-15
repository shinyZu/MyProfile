let box1 = $("section:first-child > div > div:nth-child(1)");
let box2 = $("section:first-child > div > div:nth-child(2)");
let box3 = $("section:first-child > div > div:nth-child(3)");
let box4 = $("section:first-child > div > div:nth-child(4)");
let box5 = $("section:first-child > div > div:nth-child(5)");

let scanner = [box1,box2,box3,box4,box5];

// let shade1 = "rgb(250, 0, 0)"; //red
// let shade2 = "rgb(0, 128, 0)"; //green
// let shade3 = "rgb(0, 0, 255)"; // blue
// let shade4 = 'rgb(255, 255, 0)'; // yellow
// let shade5 = "rgb(238, 130, 238)"; //pink
// let shade6 = "rgb(0, 255, 255)"; // aqua

let shade1 = "rgb(192, 57, 43)";
let shade2 = 'rgb(231, 76, 60)';
let shade3 = "rgb(235, 77, 75)";
let shade4 = "rgb(255, 121, 121)";
let shade5 = "rgb(250, 177, 160)";
let shade6 = "rgb(255, 255, 255)";

let shades = [];
let initialShades = [];

let timerId;
let timerId1;
let timerId2;
let timeOut = 60;

(function(){
    start();
})();

function start() { 
    
    shades = [shade1,shade2,shade3,shade4,shade5];
    initialShades = [shade6,shade6,shade6,shade6,shade6];
    
    timerId = setInterval(changeColor,timeOut);
    timerId1 = setInterval(moveForward,timeOut);

}

function stop() { 
    for (var i = 1; i < 99999; i++) {
        window.clearInterval(i);
        // window.clearTimeout(timerId2);
    }
}

function changeColor(){

    let firstShade = shades.shift();
    initialShades.unshift(firstShade);

    let lastShade = initialShades.pop();
    shades.push(lastShade);
}

function moveForward() {  

    for (i in scanner) {
        scanner[i].css("background-color",initialShades[i]);
    }

    timerId2 = setTimeout(moveBackwards,timeOut*10);
    // timerId2 = setInterval(moveBackwards,t*10);
    
}

function moveBackwards(){

    clearInterval(timerId1);
    timerId1 = setTimeout(moveForward,timeOut*10);
    // setTimeout(moveForward,timeOut*10);

    for (let i = scanner.length-1; i >= 0; i--) {
        scanner[i].css("background-color",initialShades[(scanner.length-1)-i]);
    }

    clearTimeout(timerId2);
    timerId1 = setInterval(moveForward,timeOut*10);
        
}

let audio = new Audio('assets/audio/Scanner Kitt.mp3');

$("#btnStop").click(function (e) {
    stop();
    audio.pause();
    audio.currentTime=0;
});


$("#btnStart").click(function (e) { 
    stop();
    start();

    audio.play();
});

audio.play()
audio.loop = true;
// audio.load();