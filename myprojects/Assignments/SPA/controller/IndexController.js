/* ----------------------------------------------------------------Navigation-----------------------------------------------------------*/

$("#nav-home").click(function () { 
    console.log("inside Home");

    $("title").text("Home");

    $("#home-main").css('display', 'block');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").addClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").removeClass("active");
    
});

$("#nav-customer").click(function () { 
    console.log("inside Manage Customers");

    $("title").text("Customers");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'block');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").addClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").removeClass("active");
    
});

$("#nav-store").click(function () { 
    console.log("inside Manage Store");

    $("title").text("Store");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'block');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").addClass("active");
    $("#nav-orders a").removeClass("active");
    
});

$("#nav-orders").click(function () { 
    console.log("inside Manage Invoice");

    $("title").text("Orders");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'block');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").addClass("active");

    // setComboBoxes();
    
});


let rowSelected;
let updatedRow;

let input;
let newRow;

let searchValue;
let response;