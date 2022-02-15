let box1 = $("section:first-child > div > div:nth-child(1)");
let box2 = $("section:first-child > div > div:nth-child(2)");
let box3 = $("section:first-child > div > div:nth-child(3)");
let box4 = $("section:first-child > div > div:nth-child(4)");
let box5 = $("section:first-child > div > div:nth-child(5)");

let scanner = [box1,box2,box3,box4,box5];

let shade1 = "rgb(250, 0, 0)"; //red
let shade2 = "rgb(0, 128, 0)"; //green
let shade3 = "rgb(0, 0, 255)"; // blue
let shade4 = 'rgb(255, 255, 0)'; // yellow
let shade5 = "rgb(238, 130, 238)"; //pink
let shade6 = "rgb(0, 255, 255)"; // aqua

// let shade1 = "rgb(192, 57, 43)";
// let shade2 = 'rgb(231, 76, 60)';
// let shade3 = "rgb(235, 77, 75)";
// let shade4 = "rgb(255, 121, 121)";
// let shade5 = "rgb(250, 177, 160)";
// let shade6 = "rgb(255, 255, 255)";

let shades = [shade1,shade2,shade3,shade4,shade5];
let initialShades = [shade6,shade6,shade6,shade6,shade6];

function changeColor(){
    // console.log(1);

    let firstShade = shades.shift();
    initialShades.unshift(firstShade);
    let x = initialShades.pop();
    shades.push(x);

    // console.log(shades);
    // console.log(initialShades);
}

let i; 
let j;
let array = [];

function moveForward() {  
    // console.log("start of 1");

    for (j = 0; j < scanner.length; j++) {
        // console.log("");
        // console.log("start of 2");
        console.log("---j----"+j+"----:----"+initialShades[j]);

        for (i in scanner) {
            // console.log(i);
            // console.log("start of 3");
            console.log(i+"---:---"+scanner[i].text());
            
            scanner[i].css("background-color",initialShades[i]);

            // console.log("end of 3");
            
            // scanner[0].css("height","100px");
            // scanner[1].css("height","100px");
        
            // shades.forEach(k => {
            //     // console.log(k);
            //     if (scanner[4].css("background-color") == shade5) {
            //         // console.log("equals...........");
            //         scanner[4].css("background-color","black");
            //         // changeShadesWithinBoxOne();
            
            //     } 
            // });

            // scanner.forEach( (k) => {
            //     if (k.css("background-color") == shade6) {
            //         console.log(true);
            //         // k.css("background-color","black");
            //     }
            // });


            // if (scanner[4].css(":focus") ) {
            //     console.log("focused");
            // }
            

            // if (j == 4 ) {
            //     console.log(j);
            // }
            // scanner[4].css("background-color","black");

            // j++;
        }
        // console.log("end of 2");
    }
    // console.log("end of 1");
    
    timerId2 = setInterval(moveBackwards,1000);
    // clearInterval(timerId2);
    // clearInterval(timerId1);
    // start();

    // for (let t = 11000; t > 0; t*10) {
        
    // }
}

function moveBackwards(){
    for (let i = scanner.length-1; i >= 0; i--) {
        scanner[i].css("background-color",initialShades[(scanner.length-1)-i]);
    }

    clearInterval(timerId2);
    timerId1 = setInterval(moveForward,1000);
}

let timerId1;
let timerId2;

// timerId2 = setInterval(moveBackwards,11000);


(function(){
    
    // setInterval(changeColor,100);
    // clearInterval(timerId1);
    // clearInterval(timerId2);
    // timerId1 = setInterval(moveForward,100);
    // clearInterval(timerId2);
 

})();