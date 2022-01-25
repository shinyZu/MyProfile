console.log("loaded");
// document.location.reload(true);
// window.location.reload(true);
// location.href = location.href;

window.addEventListener("scroll",function(){
    console.log("scroll");
});

document.getElementById("nav-home").addEventListener("click",function(){
    console.log("inside Home");

    document.getElementsByTagName("title")[0].innerText = "Home"

    document.getElementById("home-main").style.display="block";
    document.getElementById("customer-main").style.display="none";
    document.getElementById("store-main").style.display="none";
    document.getElementById("orders-main").style.display="none";

    document.querySelector("#nav-home a").classList.add("active");
    document.querySelector("#nav-customer a").classList.remove("active");
    document.querySelector("#nav-store a").classList.remove("active");
    document.querySelector("#nav-orders a").classList.remove("active");

    // document.location.reload(true);
    
    // document.querySelector("#nav-home a").setAttribute("aria-current","page");
    // console.log("Home Page");
});

document.getElementById("nav-customer").addEventListener("click",function(){
    console.log("inside Manage Customers");

    document.getElementsByTagName("title")[0].innerText = "Customers"

    document.getElementById("home-main").style.display="none";
    document.getElementById("customer-main").style.display="block";
    document.getElementById("store-main").style.display="none";
    document.getElementById("orders-main").style.display="none";

    document.querySelector("#nav-home a").classList.remove("active");
    document.querySelector("#nav-customer a").classList.add("active");
    document.querySelector("#nav-store a").classList.remove("active");
    document.querySelector("#nav-orders a").classList.remove("active");

    // document.querySelector("#nav-home a").setAttribute("aria-current","false");
    // console.log("home false");

    // document.querySelector("#nav-customer a").setAttribute("aria-current","page");
    // console.log("Customer Page");
});

document.getElementById("nav-store").addEventListener("click",function(){
    console.log("inside Manage Store");

    document.getElementsByTagName("title")[0].innerText = "Store"

    document.getElementById("home-main").style.display="none";
    document.getElementById("customer-main").style.display="none";
    document.getElementById("store-main").style.display="block";
    document.getElementById("orders-main").style.display="none";

    document.querySelector("#nav-home a").classList.remove("active");
    document.querySelector("#nav-customer a").classList.remove("active");
    document.querySelector("#nav-store a").classList.add("active");
    document.querySelector("#nav-orders a").classList.remove("active");
});

document.getElementById("nav-orders").addEventListener("click",function(){
    console.log("inside Manage Invoice");

    document.getElementsByTagName("title")[0].innerText = "Orders"

    document.getElementById("home-main").style.display="none";
    document.getElementById("customer-main").style.display="none";
    document.getElementById("store-main").style.display="none";
    document.getElementById("orders-main").style.display="block";

    document.querySelector("#nav-home a").classList.remove("active");
    document.querySelector("#nav-customer a").classList.remove("active");
    document.querySelector("#nav-store a").classList.remove("active");
    document.querySelector("#nav-orders a").classList.add("active");

    // window.screenY. = 1140;
    // location.href = location.href;


});
// document.location.reload(true);

// function scrollToElement(getElementById) {
//         window.scrollTo(0, top);
//     }