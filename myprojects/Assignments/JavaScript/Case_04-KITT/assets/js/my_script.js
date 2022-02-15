let box1 = $("section:first-child > div > div:nth-child(1)");
let box2 = $("section:first-child > div > div:nth-child(2)");
let box3 = $("section:first-child > div > div:nth-child(3)");
let box4 = $("section:first-child > div > div:nth-child(4)");
let box5 = $("section:first-child > div > div:nth-child(5)");

let scanner = [box1,box2,box3,box4,box5];
// console.log(scanner);

// let shade1 = "rgb(192, 57, 43)";
// let shade2 = 'rgb(231, 76, 60)';
// let shade3 = "rgb(235, 77, 75)";
// let shade4 = "rgb(255, 121, 121)";
// let shade5 = "rgb(250, 177, 160)";
// let shade6 = "rgb(255, 255, 255)";

let shade6 = "rgb(0, 255, 255)"; // aqua
let shade5 = "rgb(238, 130, 238)"; //pink
let shade4 = 'rgb(255, 255, 0)'; // yellow
let shade3 = "rgb(0, 0, 255)"; // blue
let shade2 = "rgb(0, 128, 0)"; //green
let shade1 = "rgb(250, 0, 0)"; //red

// let shade1 = "rgb(0, 255, 255)"; // aqua
// let shade2 = "rgb(238, 130, 238)"; //pink
// let shade3 = 'rgb(255, 255, 0)'; // yellow
// let shade4 = "rgb(0, 0, 255)"; // blue
// let shade5 = "rgb(0, 128, 0)"; //green
// let shade6 = "rgb(250, 0, 0)"; //red

// console.log(shade1);

let shades = [shade1,shade2,shade3,shade4,shade5,shade6];
// console.log(shades);

let box;
let shade;

function changeShadesWithinBoxOne() {  

    // let firstShade = shades.shift();
    // shades.push(firstShade);
    
    let lastShade = shades.pop();
    shades.unshift(lastShade);

    // console.log(0+" ---:--- "+shades[0]);
    // console.log(1+" : "+shades[1]);
    // console.log(2+" : "+shades[2]);
    // console.log(3+" : "+shades[3]);
    // console.log(4+" : "+shades[4]);
    
    
    for (let i in shades) {
        // console.log(i+" : "+shades[i]);
        scanner[0].css("background-color",shades[i]);
    }

    // console.log(5+" ---:--- "+shades[5]);
    // console.log(0+" ---:--- "+shades[0]);


    // for (let i = shades.length-1; i > shades.length ; i--) {
    //     // console.log(i+" : "+shades[i]);
    //     scanner[0].css("background-color",shades[i]);
    // }

}


function changeShadesWithinBoxTwo() {  

    // let firstShade = shades.shift();
    // shades.push(firstShade);

    let lastShade = shades.pop();
    shades.unshift(lastShade);

    // console.log(0+" : "+shades[0]);
    
    // for (let i in shades) {
    //     scanner[1].css("background-color",shades[i-3]);
    // }

    let j = 1;
    for (i = j; i < shades.length; i++) {
        scanner[1].css("background-color",shades[i]);
        
    }

}

function changeShadesWithinBoxThree() {  

    let firstShade = shades.shift();
    shades.push(firstShade);

    // console.log(0+" : "+shades[0]);
    
    // for (let i in shades) {
    //     scanner[2].css("background-color",shades[i-1]);
    // }

    for ( let i = 2; i < shades.length; i++) {
        scanner[2].css("background-color",shades[i]);
        
    }

}

function changeShadesWithinBoxFour() {  

    let firstShade = shades.shift();
    shades.push(firstShade);

    // console.log(0+" : "+shades[0]);
    
    // for (let i in shades) {
    //     scanner[3].css("background-color",shades[i-2]);
    // }

    let j = 3;
    for (i = j; i < shades.length; i++) {
        scanner[3].css("background-color",shades[i]);
        
    }

}

function changeShadesWithinBoxFive() {  

    let firstShade = shades.shift();
    shades.push(firstShade);

    // console.log(0+" : "+shades[0]);
    
    // for (let i in shades) {
    //     scanner[4].css("background-color",shades[i-3]);
    // }

    let j = 4;
    for (i = j; i < shades.length; i++) {
        scanner[4].css("background-color",shades[i]);
        
    }

}


// function changeBackwards(array) { 
//     for (let i in array) {
//         console.log(i);
//         scanner[0].css("background-color",shades[i]);

//     }
// }

// changeShadesWithinBoxOne();
// changeShadesWithinBoxOne();
// changeShadesWithinBoxTwo();
// changeShadesWithinBoxThree();
// changeShadesWithinBoxFour();
// changeShadesWithinBoxFive();

let array = [changeShadesWithinBoxOne,changeShadesWithinBoxTwo,changeShadesWithinBoxThree,changeShadesWithinBoxFour,changeShadesWithinBoxFive];
// console.log(array);

let timerId;
(function(){

    // for (let i = 0; i < scanner.length; i++) {

    //     switch (true) {
    //         case i == 0:
    //             // changeShadesWithinBoxOne();
    //             setInterval(changeShadesWithinBoxOne,800);
    //             break;

    //         case i == 1:
    //             // setTimeout(changeShadesWithinBoxTwo,1);
    //             setInterval(changeShadesWithinBoxTwo,800);
    //             break;

    //         case i == 2:
    //             setInterval(changeShadesWithinBoxThree,800);
    //             break;

    //         // case i == 3:
    //         //     setInterval(changeShadesWithinBoxFour,800);
    //         //     break;

    //         // case i == 4:
    //         //     setInterval(changeShadesWithinBoxFive,800);
    //         //     break;
        
    //         default:
    //             break;
    //     }
    // }

    // for (let i of array) {
    //     setInterval(i,300);
    // }

    timerId = setInterval(changeShadesWithinBoxOne,800);
    // clearInterval(timerId);

    // setTimeout(changeShadesWithinBoxTwo,1);
    // timerId = setInterval(changeShadesWithinBoxTwo,800);

    // setTimeout(changeShadesWithinBoxThree,2);
    // timerId = setInterval(changeShadesWithinBoxThree,800);

    // setTimeout(changeShadesWithinBoxFour,3);
    // timerId = setInterval(changeShadesWithinBoxFour,300);

    // setTimeout(changeShadesWithinBoxFive,4);
    // timerId = setInterval(changeShadesWithinBoxFive,300);

})();