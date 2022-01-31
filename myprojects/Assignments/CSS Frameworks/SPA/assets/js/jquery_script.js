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

});

/* -------------------------------------------------------------------------------Manage Customer - Events-------------------------------------------------------------- */

let customerId;
let customerName;
let customerAddress;
let customerContact;

$("#btnSaveCustomer").click(function () {
    console.log("Save btn clicked");

    customerId = $("#txtCustomerId").val();
    customerName = $("#txtCustomerName").val();
    customerAddress = $("#txtAddress").val();
    customerContact = $("#txtContact").val();

    $("#tblCustomer-body").append(
        /*"<tr>" +
            "<td>"+customerId+"</td>" +
            "<td>"+customerName+"</td>" +
            "<td>"+customerAddress+"</td>" +
            "<td>"+customerContact+"</td>" +
        "</tr>"*/

        `<tr>
            <td>${customerId}</td>
            <td>${customerName}</td>
            <td>${customerAddress}</td>
            <td>${customerContact}</td>
        </tr>`
    );

    $("#tblCustomer-body>tr").click(function () {
        console.log("row selected 1");
        // console.log(this);
        // console.log($(this).children(':nth-child(1)').text());
        // console.log($(this).children(':nth-child(2)').text());
        // console.log($(this).children(':nth-child(3)').text());
        // console.log($(this).children(':nth-child(4)').text());

        customerId = $(this).children(':nth-child(1)').text();
        customerName = $(this).children(':nth-child(2)').text();
        customerAddress = $(this).children(':nth-child(3)').text();
        customerContact = $(this).children(':nth-child(4)').text();

        $("#txtCustomerId").val(customerId);
        $("#txtCustomerName").val(customerName);
        $("#txtAddress").val(customerAddress);
        $("#txtContact").val(customerContact);
    });

});

$("#tblCustomer-body>tr").click(function () {
    console.log("row selected 2");
    // console.log(this);
    // console.log($(this).children(':nth-child(1)').text());
    // console.log($(this).children(':nth-child(2)').text());
    // console.log($(this).children(':nth-child(3)').text());
    // console.log($(this).children(':nth-child(4)').text());

    customerId = $(this).children(':nth-child(1)').text();
    customerName = $(this).children(':nth-child(2)').text();
    customerAddress = $(this).children(':nth-child(3)').text();
    customerContact = $(this).children(':nth-child(4)').text();

    $("#txtCustomerId").val(customerId);
    $("#txtCustomerName").val(customerName);
    $("#txtAddress").val(customerAddress);
    $("#txtContact").val(customerContact);
});

$("#btnClearFields").click(function () {
    console.log("Clear btn clicked");

    $("#txtCustomerId").val("");
    $("#txtCustomerName").val("");
    $("#txtAddress").val("");
    $("#txtContact").val("");

});

/* -------------------------------------------------------------------------------Manage Customer - Events-------------------------------------------------------------- */

var itemCode;
var description;
var unitPrice;
var qty;

$(".btnSaveItem").click(function () { 
    console.log("Save Item btn clicked");

    itemCode = $("#txtItemCode").val();
    description = $("#txtDescription").val();
    unitPrice = $("#txtUnitPrice").val();
    qty = $("#txtQty").val();

    $("#tblItem-body").append(
        `<tr>
            <td>${itemCode}</td>
            <td>${description}</td>
            <td>${unitPrice}.00</td>
            <td>${qty}</td>
        </tr>`
     );

     $("#tblItem-body>tr").click(function () { 
        console.log("Item Row selected");
        
        // console.log(this);
        // console.log($(this).children());
        // console.log($(this).children(':first-child').text());
    
        itemCode = $(this).children(':first-child').text();
        description = $(this).children(':nth-child(2)').text();
        unitPrice = $(this).children(':nth-child(3)').text();
        qty = $(this).children(':last-child').text();
    
        $("#txtItemCode").val(itemCode);
        $("#txtDescription").val(description);
        $("#txtUnitPrice").val(unitPrice);
        $("#txtQty").val(qty);
        
    });
});

$("#tblItem-body>tr").click(function () { 
    console.log("Item Row selected");
    
    // console.log(this);
    // console.log($(this).children());
    // console.log($(this).children(':first-child').text());

    itemCode = $(this).children(':first-child').text();
    description = $(this).children(':nth-child(2)').text();
    unitPrice = $(this).children(':nth-child(3)').text();
    qty = $(this).children(':last-child').text();

    $("#txtItemCode").val(itemCode);
    $("#txtDescription").val(description);
    $("#txtUnitPrice").val(unitPrice);
    $("#txtQty").val(qty);
    
});

$("#btnClearItemFields").click(function () { 
    $("#txtItemCode").val('');
    $("#txtDescription").val('');
    $("#txtUnitPrice").val('');
    $("#txtQty").val('');
    
});