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
var rowSelected;

let customerId;
let customerName;
let customerAddress;
let customerContact;

/* When/after a new Customer is Saved:
    1. add Customer to table
    2. fill input fields when a row is selected
    3. delete the selected Customer from the table
*/

$("#btnSaveCustomer").click(function () {
    console.log("Save btn clicked");

    customerId = $("#txtCustomerId").val();
    customerName = $("#txtCustomerName").val();
    customerAddress = $("#txtAddress").val();
    customerContact = $("#txtContact").val();

    $("#tblCustomer-body").append(
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

        rowSelected = this;

        customerId = $(this).children(':nth-child(1)').text();
        customerName = $(this).children(':nth-child(2)').text();
        customerAddress = $(this).children(':nth-child(3)').text();
        customerContact = $(this).children(':nth-child(4)').text();

        $("#txtCustomerId").val(customerId);
        $("#txtCustomerName").val(customerName);
        $("#txtAddress").val(customerAddress);
        $("#txtContact").val(customerContact);

        $("#btnDeleteCustomer").click(function () { 
            console.log("Delete btn clicked");
            $(rowSelected).remove();
            
            // Clear fields after Customer is deleted
            $("#txtCustomerId").val("");
            $("#txtCustomerName").val("");
            $("#txtAddress").val("");
            $("#txtContact").val("");
        });
    });

});

/* When selected an already existing Customer from the table
    1. fill input fields when a row is selected
    2. delete the selected Customer from the table
*/

$("#tblCustomer-body>tr").click(function () {
    console.log("row selected 2");
    // console.log(this);
    // console.log($(this).children(':nth-child(1)').text());
    // console.log($(this).children(':nth-child(2)').text());
    // console.log($(this).children(':nth-child(3)').text());
    // console.log($(this).children(':nth-child(4)').text());

    rowSelected = this;
    // console.log(rowSelected);

    customerId = $(this).children(':nth-child(1)').text();
    customerName = $(this).children(':nth-child(2)').text();
    customerAddress = $(this).children(':nth-child(3)').text();
    customerContact = $(this).children(':nth-child(4)').text();

    $("#txtCustomerId").val(customerId);
    $("#txtCustomerName").val(customerName);
    $("#txtAddress").val(customerAddress);
    $("#txtContact").val(customerContact);

    $("#btnDeleteCustomer").click(function () { 
        console.log("Delete btn clicked");
        $(rowSelected).remove();
        
        // Clear fields after Customer is deleted
        $("#txtCustomerId").val("");
        $("#txtCustomerName").val("");
        $("#txtAddress").val("");
        $("#txtContact").val("");
    });
});

/* When Clear button is clicked*/

$("#btnClearFields").click(function () {
    console.log("Clear btn clicked");

    $("#txtCustomerId").val("");
    $("#txtCustomerName").val("");
    $("#txtAddress").val("");
    $("#txtContact").val("");

});

/* -------------------------------------------------------------------------------Manage Store - Events-------------------------------------------------------------- */

var itemCode;
var description;
var unitPrice;
var qty;

/* When/after a new Item is Saved:
    1. add Item to table
    2. fill input fields when a row is selected
    3. delete the selected Item from the table
*/

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

        rowSelected = this;
    
        itemCode = $(this).children(':first-child').text();
        description = $(this).children(':nth-child(2)').text();
        unitPrice = $(this).children(':nth-child(3)').text();
        qty = $(this).children(':last-child').text();
    
        $("#txtItemCode").val(itemCode);
        $("#txtDescription").val(description);
        $("#txtUnitPrice").val(unitPrice);
        $("#txtQty").val(qty);

        $("#btnDeleteItem").click(function () { 
            console.log("Delete btn clicked");
            $(rowSelected).remove();
            
            // Clear fields after Customer is deleted
            $("#txtItemCode").val('');
            $("#txtDescription").val('');
            $("#txtUnitPrice").val('');
            $("#txtQty").val('');
        });
    });

    $("#cmbItemCode").append(
        `<option>${itemCode}</option>`
    );

    $("#cmbDescription").append(
        `<option>${description}</option>`
    );
});

/* When selected an already existing Item from the table
    1. fill input fields when a row is selected
    2. delete the selected Item from the table
*/

$("#tblItem-body>tr").click(function () { 
    console.log("Item Row selected");
    
    // console.log(this);
    // console.log($(this).children());
    // console.log($(this).children(':first-child').text());

    rowSelected = this;

    itemCode = $(this).children(':first-child').text();
    description = $(this).children(':nth-child(2)').text();
    unitPrice = $(this).children(':nth-child(3)').text();
    qty = $(this).children(':last-child').text();

    $("#txtItemCode").val(itemCode);
    $("#txtDescription").val(description);
    $("#txtUnitPrice").val(unitPrice);
    $("#txtQty").val(qty);

    $("#btnDeleteItem").click(function () { 
        console.log("Delete btn clicked");
        $(rowSelected).remove();
        
        // Clear fields after Customer is deleted
        $("#txtItemCode").val('');
        $("#txtDescription").val('');
        $("#txtUnitPrice").val('');
        $("#txtQty").val('');
    });
});

/* When Clear button is clicked*/

$("#btnClearItemFields").click(function () { 
    $("#txtItemCode").val('');
    $("#txtDescription").val('');
    $("#txtUnitPrice").val('');
    $("#txtQty").val('');
    
});

/* -------------------------------------------------------------------------------Manage Invoice - Events-------------------------------------------------------------- */
// unitPrice * qtyOrdered
var total;

/* When/after an Item is Added To Cart:
    1. add Item to table
*/

$("#btnAddToCart").click(function () { 
    console.log("Add to Cart btn clicked");

    // console.log($("#cmbItemCode").val());
    
    itemCode = $("#cmbItemCode").val();
    description = $("#cmbDescription").val();
    unitPrice = $("#txtUnitPrice2").val();
    qty = $("#txtOrderQty").val();
    total = unitPrice * qty;

    $("#tblInvoice-body").append(
        `<tr>
            <td>${itemCode}</td>
            <td>${description}</td>
            <td>${unitPrice}.00</td>
            <td>${qty}</td>
            <td>${total}.00</td>
         </tr>`
    );

});

/* When Clear button is clicked*/

$("#btnClearSelectItemFields").click(function () { 
    $("#cmbItemCode").val('I001');
    $("#cmbDescription").val('Rice');
    $("#txtUnitPrice2").val('');
    $("#txtOrderQty").val('');
});