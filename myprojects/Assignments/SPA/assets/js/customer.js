let rowSelected;
let updatedRow;

let input;

let customerId;
let customerName;
let customerAddress;
let customerContact;

let txtCustomerId = $("#txtCustomerId");
let txtCustomerName = $("#txtCustomerName");
let txtAddress = $("#txtAddress");
let txtContact = $("#txtContact");

txtCustomerId.focus();

disableBtnSaveCustomer(".btnSaveCustomer");
disableBtnEditCustomer("#btnEditCustomer");
disableBtnDeleteCustomer("#btnDeleteCustomer");

/* ---------------Initially Hide the Error Indicators----------*/

$("#customerForm p.errorText").hide();

/* -----------------------------------------------------------*/

/* When/after a new Customer is Saved:
    1. add Customer to table
    2. fill input fields when a row is selected
    3. delete the selected Customer from the table
*/

$(".btnSaveCustomer").click(function (e) { 

    customerId = $(rowSelected).children(':first-child').text();

    if (customerId === txtCustomerId.val()) {
        alert("A Customer already exists with ID "+ customerId +"...");

    } else{
        if (window.confirm("Do you really need to add this Customer..?")) {
            addCustomer();
            reset_CustomerForm();
        }
    }

    select_CustomerRow();

    $("#tblCustomer-body>tr").off();
    delete_CustomerRowOnDblClick();
    
});

/* --------------------------Validate & Jump to Next Field On Enter---------------------------------*/

var regExCusID = /^(C00-)[0-9]{3,4}$/;
var regExCusName = /^[A-Z][a-z ]{4,9}[A-z]{1,10}$|^[A-Z][a-z ]{3,20}$/;
var regExCusAddress = /^[A-z0-9 \.]{5,}$/;
// var regExCusSalary = /^[1-9][0-9]*([.][0-9]{2})?$/;
var regExCusContact = /^[0-9]{10}$/

function disableBtnSaveCustomer(btn) {
    $(btn).attr("disabled", "disabled");
}

function disableBtnEditCustomer(btn) {
    $(btn).attr("disabled", "disabled");
}

function disableBtnDeleteCustomer(btn) {
    $(btn).attr("disabled", "disabled");
}

function enableBtnSaveCustomer(btn) {
    $(btn).removeAttr("disabled");
}

function enableBtnEditCustomer(btn) {
    $(btn).removeAttr("disabled");
}

function enableBtnDeleteCustomer(btn) {
    $(btn).removeAttr("disabled");
}

function addCustomer(){
    customerId = txtCustomerId.val();
    customerName = txtCustomerName.val();
    customerAddress = txtAddress.val();
    customerContact = txtContact.val();

    $("#tblCustomer-body").append(
        `<tr>
            <td>${customerId}</td>
            <td>${customerName}</td>
            <td>${customerAddress}</td>
            <td>${customerContact}</td>
        </tr>`
    );
}

function updateCustomer(){
    customerId = txtCustomerId.val();
    customerName = txtCustomerName.val();
    customerAddress = txtAddress.val();
    customerContact = txtContact.val();

    updatedRow = `<tr>
                <td>${customerId}</td>
                <td>${customerName}</td>
                <td>${customerAddress}</td>
                <td>${customerContact}</td>
            </tr>`;

    return updatedRow;
}

function select_CustomerRow(){
    $("#tblCustomer-body>tr").click(function () { 
    
        rowSelected = this;
        
        customerId = $(this).children(':nth-child(1)').text();
        customerName = $(this).children(':nth-child(2)').text();
        customerAddress = $(this).children(':nth-child(3)').text();
        customerContact = $(this).children(':nth-child(4)').text();
    
        // console.log(customerId,customerName,customerAddress,customerContact);
    
        txtCustomerId.val(customerId);
        txtCustomerName.val(customerName);
        txtAddress.val(customerAddress);
        txtContact.val(customerContact);
    
        validate_CustomerForm();
        enableBtnEditCustomer("#btnEditCustomer");
        enableBtnDeleteCustomer("#btnDeleteCustomer");

        $("#btnDeleteCustomer").off("click"); 

        $("#btnDeleteCustomer").click(function () { 
            // Clear fields after Customer is deleted
            if (window.confirm("Do you really need to delete this Customer..?")) {
                $(rowSelected).remove();
                reset_CustomerForm();
            }
        });
    });
}

let color;
function isBorderGreen (inputField) {
    color = $(inputField).css('border-color');

    if (color === "rgb(38, 222, 129)") {
        return true;
    }
    return false;
}

function changeBorderColor(inputStatus, inputField) {
    switch (true) {
        case inputStatus === "valid":
            $(inputField).css('border', '5px solid #26de81');
            break;
        
        case inputStatus === "invalid":
            $(inputField).css('border', '5px solid #ff3f34');
            break;
    
        default:
            $(inputField).css('border', '2px solid rgb(206, 212, 218)');
            break;
    }
}

function validate_CustomerID (input, txtField) {  

    if (regExCusID.test(input)) {               
        changeBorderColor("valid", txtField);

        // once the current input field is green change the the border of next input field to red
        if (!validate_CustomerName(txtCustomerName.val(),txtCustomerName)) {
            changeBorderColor("invalid", txtCustomerName);
            $("#customerForm p.errorText").eq(1).show();
            $("#errorName").text("*Required Field* Min 5, Max 20, Spaces Allowed");
        }

        $("#customerForm p.errorText").eq(0).hide();
        return true;

    } else{
        changeBorderColor("invalid", txtField);
        $("#customerForm p.errorText").eq(0).show();
        $("#errorID").text("*Required Field* Format : C00-000");

        disableBtnSaveCustomer(".btnSaveCustomer");
        disableBtnEditCustomer("#btnEditCustomer");
        return false;
    }
}

function validate_CustomerName (input, txtField) {  

    if (regExCusName.test(input)) {
        changeBorderColor("valid", txtField);

        // once the current input field is green change the the border of next input field to red
        if (!validate_CustomerAddress(txtAddress.val(),txtAddress)) {
            changeBorderColor("invalid", txtAddress);
            $("#customerForm p.errorText").eq(2).show();
            $("#errorAddress").text("*Required Field* Minimum 5");
        }

        $("#customerForm p.errorText").eq(1).hide();
        return true;

    } else{
        changeBorderColor("invalid", txtField);
        $("#customerForm p.errorText").eq(1).show();
        $("#errorName").text("*Required Field* Min 5, Max 20, Spaces Allowed");

        disableBtnSaveCustomer(".btnSaveCustomer");
        disableBtnEditCustomer("#btnEditCustomer");
        return false;
    }
}

function validate_CustomerAddress (input, txtField) {  

    if (regExCusAddress.test(input)) {               
        changeBorderColor("valid", txtField);

        // once the current input field is green change the the border of next input field to red
        if (!validate_CustomerContact(txtContact.val(),txtContact)) {
            changeBorderColor("invalid", txtContact);
            $("#customerForm p.errorText").eq(3).show();
            $("#errorContact").text("*Required Field* Min 10, Max 10, Only Numbers");
        }

        $("#customerForm p.errorText").eq(2).hide();
        return true;

    } else{
        changeBorderColor("invalid", txtField);
        $("#customerForm p.errorText").eq(2).show();
        $("#errorAddress").text("*Required Field* Minimum 5");

        disableBtnSaveCustomer(".btnSaveCustomer");
        disableBtnEditCustomer("#btnEditCustomer");
        return false;
    }
}

function validate_CustomerContact (input, txtField) {  

    if (regExCusContact.test(input)) {               
        changeBorderColor("valid", txtField);
        enableBtnSaveCustomer(".btnSaveCustomer")
        enableBtnEditCustomer("#btnEditCustomer")

        $("#customerForm p.errorText").eq(3).hide();
        return true;

    } else{
        changeBorderColor("invalid", txtField);
        $("#customerForm p.errorText").eq(3).show();
        $("#errorContact").text("*Required Field* Min 10, Max 10, Only Numbers");

        disableBtnSaveCustomer(".btnSaveCustomer");
        disableBtnEditCustomer("#btnEditCustomer");
        return false;
    }
}

function reset_CustomerForm(){
    txtCustomerId.val("").css('border', '1px solid rgb(206, 212, 218)');
    txtCustomerName.val("").css('border', '1px solid rgb(206, 212, 218)');
    txtAddress.val("").css('border', '1px solid rgb(206, 212, 218)');
    txtContact.val("").css('border', '1px solid rgb(206, 212, 218)');

    $("#customerForm p.errorText").hide();

    txtCustomerId.focus();
    disableBtnSaveCustomer(".btnSaveCustomer");
    disableBtnEditCustomer("#btnEditCustomer");
    disableBtnDeleteCustomer("#btnDeleteCustomer");

    select_CustomerRow();

    rowSelected = null;
    customerId = null;
}

function validate_CustomerForm(){

    customerId = txtCustomerId.val();
    customerName = txtCustomerName.val();
    customerAddress = txtAddress.val();
    customerContact = txtContact.val();

    validate_CustomerID(customerId,txtCustomerId);
    validate_CustomerName(customerName,txtCustomerName);
    validate_CustomerAddress(customerAddress,txtAddress);
    validate_CustomerContact(customerContact,txtContact);
}

function delete_CustomerRowOnDblClick() {
    $("#tblCustomer-body>tr").dblclick(function () { 
        rowSelected = $(this);

        if (window.confirm("Do you really need to delete this Customer..?")) {
            $(rowSelected).remove();
            reset_CustomerForm();
        }
    });
}

 $("#txtCustomerId").keyup(function (e) { 
    input = txtCustomerId.val();

    validate_CustomerID(input, this);
    
    console.log($(this).css("border-color"));
    if (e.code === "Enter" && isBorderGreen(this)){
        $("#txtCustomerName").focus();
    }
});

$("#txtCustomerName").keyup(function (e) { 
    input = txtCustomerName.val();
    validate_CustomerName(input, this);

    if (e.code === "Enter" && isBorderGreen(this)){
        $("#txtAddress").focus();
    }
});

$("#txtAddress").keyup(function (e) {
    input = txtAddress.val();
    validate_CustomerAddress(input, this);

    if (e.code === "Enter" && isBorderGreen(this)){
        $("#txtContact").focus();
    }
});

$("#txtContact").keyup(function (e) { 
    input = txtContact.val();
    validate_CustomerContact(input, this);

    if (e.code === "Enter" && isBorderGreen(this)){

        customerId = $(rowSelected).children(':first-child').text();

        if (customerId === txtCustomerId.val()) {
            alert("A Customer already exists with ID "+ customerId +"...");

        } else{
            if (window.confirm("Do you really need to add this Customer..?")) {
                addCustomer();
                reset_CustomerForm();
            }
        }
        select_CustomerRow();;
    }

    $("#tblCustomer-body>tr").off("dblclick"); 
    delete_CustomerRowOnDblClick();
}); 

/* -----When Clear button is clicked-----*/

$("#btnClearCustomerFields").click(function () { 
    reset_CustomerForm();
});

/* ------------------Update Customer------------*/
$("#btnEditCustomer").click(function (e) { 
    select_CustomerRow();
    console.log(customerId);

    if (window.confirm("Do you really need to update Customer "+ customerId + "..?")) {
        $("#tblCustomer-body").find(rowSelected).replaceWith(updateCustomer());
        reset_CustomerForm();
    }
});