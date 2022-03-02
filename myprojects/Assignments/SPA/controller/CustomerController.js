let customerId;
let customerName;
let customerAddress;
let customerContact;

let txtCustomerId = $("#txtCustomerId");
let txtCustomerName = $("#txtCustomerName");
let txtAddress = $("#txtAddress");
let txtContact = $("#txtContact");

let txtSearchId = $("#txtSearchCustomer");

let nextID;
let lastId;

txtCustomerId.focus();

disableButton(".btnSaveCustomer");
disableButton("#btnEditCustomer");
disableButton("#btnDeleteCustomer");

/* ---------------Initially Hide the Error Indicators----------*/

$("#customerForm p.errorText").hide();

/* -----------------------------------------------------------------CRUD Operation---------------------------------------------------*/

function addCustomer(){
    customerId = txtCustomerId.val();
    customerName = txtCustomerName.val();
    customerAddress = txtAddress.val();
    customerContact = txtContact.val();

    // let customerObject = {
    //     id:customerId,
    //     name:customerName,
    //     address:customerAddress,
    //     contact:customerContact
    // }

    let customerObject = new Customer(customerId,customerName,customerAddress,customerContact);
    customerDB.push(customerObject);

    loadAllCustomers(customerDB);
}

function updateCustomer(){
    let obj;

    customerId = txtCustomerId.val();
    customerName = txtCustomerName.val();
    customerAddress = txtAddress.val();
    customerContact = txtContact.val();

    // let customerToUpdate = customerDB.find(function (cust) {
    //     return cust.id == customerId;
    // });

    // if (customerToUpdate) {
    //     console.log("To be Updated....");

    //     customerName = txtCustomerName.val();
    //     customerAddress = txtAddress.val();
    //     customerContact = txtContact.val();
    // }

    for (let i in customerDB) {
        if (customerDB[i].getCustomerID() == customerId) {

            obj = customerDB[i];
            // obj.id = customerId;
            // obj.name = customerName;
            // obj.address = customerAddress;
            // obj.contact = customerContact;

            obj.setCustomerID(customerId);
            obj.setCustomerName(customerName);
            obj.setCustomerAddress(customerAddress);
            obj.setCustomerContact(customerContact);
        }
    }

    loadCmbCustomerId();
    loadCmbCustomerName();
    clearCustomerFields();
}

function deleteCustomer(row){
    if (window.confirm("Do you really need to delete this Customer..?")) {

        for (let i in customerDB) {
            if (customerDB[i].getCustomerID() == customerId) {
                customerDB.splice(i,1);
            }
        }  
        $(row).remove();
        reset_CustomerForm();
    }

    loadCmbCustomerId();
    loadCmbCustomerName();
    clearCustomerFields();
}

function loadAllCustomers(customerDB){
    $("#tblCustomer-body").empty();

    for (var obj of customerDB) {
        // newRow = `<tr>
        //             <td>${obj.id}</td>
        //             <td>${obj.name}</td>
        //             <td>${obj.address}</td>
        //             <td>${obj.contact}</td>
        //         </tr>`;

        newRow = `<tr>
            <td>${obj.getCustomerID()}</td>
            <td>${obj.getCustomerName()}</td>
            <td>${obj.getCustomerAddress()}</td>
            <td>${obj.getCustomerContact()}</td>
        </tr>`;

        $("#tblCustomer-body").append(newRow);
    }

    loadCmbCustomerId();
    loadCmbCustomerName();
    clearCustomerFields();
}

function searchCustomer(searchValue) { 
    let obj;

    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerID() == searchValue) {
            obj = customerDB[i];
        }
    }

    if (obj) {
        txtCustomerId.val(obj.getCustomerID());
        txtCustomerName.val(obj.getCustomerName());
        txtAddress.val(obj.getCustomerAddress());
        txtContact.val(obj.getCustomerContact());

        validate_CustomerForm();
        return true;

    } else {
        return false;
    }
}

/* ------------------Save Customer------------*/

/* When/after a new Customer is Saved:
    1. add Customer to table
    2. fill input fields when a row is selected
    3. delete the selected Customer from the table
*/

function isCustomerAlreadyExist(){
    response = customerDB.find(function (obj) {  
        return obj.getCustomerID() == txtCustomerId.val();
    });
}

function checkDB_BeforeSaveCustomer() {

    nextID = txtCustomerId.val().split("-")[1];

    if (customerDB.length == 0) {
        lastId = "C00-000";
    } else {
        lastId = customerDB.slice(customerDB.length-1,customerDB.length)[0].getCustomerID(); 
    }

    lastId = lastId.split("-")[1]; 

    if (response) {
        alert("A Customer already exists with ID: "+ txtCustomerId.val() +"...");
        
    } else if (nextID < lastId) { 
        lastId++;
        
        if (lastId < 9) {
            alert("ID: "+txtCustomerId.val()+" is not available...Please use ID : C00-00"+lastId); //C00-004
            
        } else if (lastId >= 10) {
            alert("ID: "+txtCustomerId.val()+" is not available...Please use ID : C00-0"+lastId); //C00-004
        }
    
    } else if (nextID > ++lastId) {

        if (lastId < 9) {
            alert("Next available ID is: C00-00"+lastId); 

        } else if (lastId >= 10) {
            alert("Next available ID is: C00-0"+lastId); 
        }

    } else {
        if (window.confirm("Do you really need to add this Customer..?")) {
            addCustomer();
            reset_CustomerForm();
        }
    }
}

$(".btnSaveCustomer").click(function (e) { 
    isCustomerAlreadyExist();
    checkDB_BeforeSaveCustomer();
    select_CustomerRow();

    $("#tblCustomer-body>tr").off("dblclick");
    delete_CustomerRowOnDblClick();
    
});

/* ------------------Update Customer------------*/

$("#btnEditCustomer").click(function (e) { 
    select_CustomerRow();

    if (window.confirm("Do you really need to update Customer "+ customerId + "..?")) {
        // $("#tblCustomer-body").find(rowSelected).replaceWith(updateCustomer());
        updateCustomer();
        loadAllCustomers(customerDB);
        reset_CustomerForm();

        select_CustomerRow();
        $("#tblCustomer-body>tr").off("dblclick");
        delete_CustomerRowOnDblClick();
    }
});

/* ------------------Search Customer------------*/
 
$("#btnSearchCustomer").off("click");

$("#btnSearchCustomer").click(function (e) { 
    searchValue = txtSearchId.val();
    // searchCustomer(txtSearchId.val());

    if (!searchCustomer(searchValue)) {
        alert("Customer "+ searchValue + " doesn't exist...");
        reset_CustomerForm();
    }
});

$("#txtSearchCustomer").keydown(function (e) { 
    
    if(e.key == "Enter") {
        $("#btnSearchCustomer").off("click");
        searchValue = txtSearchId.val();
        // searchCustomer(txtSearchId.val());

        if (!searchCustomer(searchValue)) {
            alert("Customer "+ searchValue + " doesn't exist...");
            reset_CustomerForm();
            $(txtSearchId).focus();
        }
    }
});


/* -------------------------------------------------------------------Validation--------------------------------------------------- */

/* --------------------------Validate & Jump to Next Field On Enter---------------------------------*/

var regExCusID = /^(C00-)[0-9]{3,4}$/;
var regExCusName = /^[A-Z][a-z ]{4,9}[A-z]{1,10}$|^[A-Z][a-z ]{3,20}$/;
var regExCusAddress = /^[A-z0-9 \.]{5,}$/;
var regExCusContact = /^[0-9]{10}$/

function select_CustomerRow(){
    $("#tblCustomer-body>tr").click(function () { 
        rowSelected = this;
        customerId = $(this).children(':nth-child(1)').text();

        if (!searchCustomer(customerId)) {
            reset_CustomerForm();
            alert("Customer "+ searchValue + " doesn't exist...");
        }

        enableButton("#btnEditCustomer");
        enableButton("#btnDeleteCustomer");

        $("#btnDeleteCustomer").off("click"); 

        /* ------------------Delete Customer------------*/

        $("#btnDeleteCustomer").click(function () { 
            deleteCustomer(rowSelected);
        });
    });
}

function delete_CustomerRowOnDblClick() {
    $("#tblCustomer-body>tr").dblclick(function () { 
        rowSelected = $(this);
        deleteCustomer(rowSelected);
    });
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

        disableButton(".btnSaveCustomer");
        disableButton("#btnEditCustomer");
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

        disableButton(".btnSaveCustomer");
        disableButton("#btnEditCustomer");
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

        disableButton(".btnSaveCustomer");
        disableButton("#btnEditCustomer");
        return false;
    }
}

function validate_CustomerContact (input, txtField) {  

    if (regExCusContact.test(input)) {               
        changeBorderColor("valid", txtField);
        enableButton(".btnSaveCustomer");
        enableButton("#btnEditCustomer");

        $("#customerForm p.errorText").eq(3).hide();
        return true;

    } else{
        changeBorderColor("invalid", txtField);
        $("#customerForm p.errorText").eq(3).show();
        $("#errorContact").text("*Required Field* Min 10, Max 10, Only Numbers");

        disableButton(".btnSaveCustomer");
        disableButton("#btnEditCustomer");
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
    disableButton(".btnSaveCustomer");
    disableButton("#btnEditCustomer");
    disableButton("#btnDeleteCustomer");

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

$("#txtCustomerId, #txtCustomerName, #txtAddress, #txtContact").keydown(function (e) { 
    $("#btnSearchCustomer").off("click");

    if (e.key === "Tab") {
        e.preventDefault();
    }
});

$("#txtCustomerId").keyup(function (e) { 
    input = txtCustomerId.val();
    validate_CustomerID(input, this);
    
    // console.log($(this).css("border-color"));
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
        isCustomerAlreadyExist();
        checkDB_BeforeSaveCustomer();
        select_CustomerRow();;
    }

    $("#tblCustomer-body>tr").off("dblclick"); 
    delete_CustomerRowOnDblClick();
}); 


/* -----Clear Fields-------*/

$("#btnClearCustomerFields").click(function () { 
    reset_CustomerForm();
    txtSearchId.val("");
});




