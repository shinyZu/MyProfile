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

let shades = [shade1,shade2,shade3,shade4,shade5];
let initialShades = [shade6,shade6,shade6,shade6,shade6];

let timerId = -1;
let timerId1 = -1;
let timerId2 = -1;
// let timerId3;
let timeOut = 100;


// (function(){
//     // timerId = setInterval(changeColor,timeOut);
//     // timerId1 = setInterval(moveForward,timeOut);
// })();

function start() {  

    timerId = setInterval(changeColor,timeOut);
    timerId1 = setInterval(moveForward,timeOut);
}

function stop() {  
}

// stop();
start();

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
    // timerId1 = setInterval(moveForward,timeOut*10);

    for (let i = scanner.length-1; i >= 0; i--) {
        scanner[i].css("background-color",initialShades[(scanner.length-1)-i]);
    }

    clearTimeout(timerId2);
    timerId1 = setInterval(moveForward,timeOut*10);
        
}

$("#btnStop").click(function (e) { 

    console.log(clearInterval(timerId));

    clearInterval(timerId);
    clearInterval(timerId1);
    clearTimeout(timerId1);
    clearTimeout(timerId2);

    timerId = -1;
    timerId1 = -1;
    timerId2 = -1;
    
    console.log(timerId); 
    console.log(timerId1);
    console.log(timerId2);
});


$("#btnStart").click(function (e) { 

    // clearInterval(timerId);
    // clearInterval(timerId1);
    // clearTimeout(timerId1);
    // clearTimeout(timerId2);

    start();

    // timerId = -1;
    // timerId1 = -1;
    // timerId2 = -1;

    console.log(timerId);
    console.log(timerId1);
    console.log(timerId2);


});
