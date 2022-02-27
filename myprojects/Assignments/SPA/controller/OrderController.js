let cmbCustomerId = $("#cmbCustomerId");
let cmbCustomerName = $("#cmbCustomerName");
let txtord_address = $("#address"); 
let txtord_contact = $("#contact"); 

let cmbItemCode = $("#cmbItemCode");
let cmbDescription = $("#cmbDescription");
let txtUnitPrice2 = $("#txtUnitPrice2");
let txtQtyOnHand = $("#txtQtyOnHand");
let txtOrderQty = $("#txtOrderQty");

// $(cmbItemCode).val("");
// $(cmbDescription).val("");
// $(txtUnitPrice2).val("");

let newOption;
let defaultOption = `<option value="-1" selected disabled hidden >Select</option>`;
let selectedOption;

// $("#invoiceForm p.errorText").hide();

$(cmbCustomerId).append(defaultOption);
$(cmbCustomerName).append(defaultOption);
$(cmbItemCode).append(defaultOption);
$(cmbDescription).append(defaultOption);

// ordersDB.push(new Orders("OID-001","2022-02-27",5000,150,"C00-002"));
// ordersDB.push(new Orders("OID-002","2022-02-27",5000,150,"C00-002"));
// console.log(ordersDB[0].getOrderDate());

(function () {  
    if (ordersDB.length == 0) {
        $("#txtOrderID").val("OID-001");
    } else {
        generateNextOrderID();
    }
})();

function generateNextOrderID() {  
    let lastOrderId = ordersDB.pop().getOrderId();
    lastOrderId = ++lastOrderId.split("-")[1];

    if (lastOrderId < 9) {
        lastOrderId = "OID-00"+lastOrderId;
        $("#txtOrderID").val(lastOrderId);
        
    } else if (lastOrderId > 9) {
        lastOrderId = "OID-0",lastOrderId;
        $("#txtOrderID").val(lastOrderId);
        
    } else if (lastOrderId < 100) {
        lastOrderId = "OID-",lastOrderId;
        $("#txtOrderID").val(lastOrderId);
    }
}

function clearCmbCustomerId () {
    $(cmbCustomerId).empty();
    $(cmbCustomerId).append(defaultOption);
}

function clearCmbCustomerName () {
    $(cmbCustomerName).empty();
    $(cmbCustomerName).append(defaultOption);
}

function clearCmbItemCode () {
    $(cmbItemCode).empty();
    $(cmbItemCode).append(defaultOption);
}

function clearCmbDescription () {
    $(cmbDescription).empty();
    $(cmbDescription).append(defaultOption);
}


function loadCmbCustomerId() {
    clearCmbCustomerId();
    // clearCustomerFields();

    let optionValue = -1;
    for (let customer of customerDB) {
        optionValue++;
        newOption = `<option value="${optionValue}">${customer.getCustomerID()}</option>`;
        $(cmbCustomerId).append(newOption);
    } 
}

function loadCmbCustomerName() {
    clearCmbCustomerName();
    // clearCustomerFields();

    let optionValue = -1;
    for (let customer of customerDB) {
        optionValue++;
        newOption = `<option value="${optionValue}">${customer.getCustomerName()}</option>`;
        $(cmbCustomerName).append(newOption);
    }   
}

function loadCmbItemCode() {
    clearCmbItemCode();
    // clearItemFields();

    let optionValue = -1;
    for (let item of itemDB) {
        optionValue++;
        newOption = `<option value="${optionValue}">${item.getItemCode()}</option>`;
        // $(txtUnitPrice2).val(item.price);
        $(cmbItemCode).append(newOption);
    }   
}

function loadCmbDescription() {
    clearCmbDescription();
    // clearItemFields();

    let optionValue = -1;
    for (let item of itemDB) {
        optionValue++;
        newOption = `<option value="${optionValue}">${item.getDescription()}</option>`;
        $(cmbDescription).append(newOption);
    }   
}

/* ---------------------Load Customer Details-------------*/

function loadCustomerDetails (custObj) {
    cmbCustomerId.val(customerDB.indexOf(custObj));
    cmbCustomerName.val(customerDB.indexOf(custObj));
    txtord_address.val(custObj.getCustomerAddress());
    txtord_contact.val(custObj.getCustomerContact());
}

$("#cmbCustomerId").click(function () { 
    selectedOption = parseInt(cmbCustomerId.val());
    if (selectedOption >= 0) {
        loadCustomerDetails(customerDB[selectedOption]);
    }
});

$("#cmbCustomerName").click(function () { 
    selectedOption = parseInt(cmbCustomerName.val());
    if (selectedOption >= 0) {
        loadCustomerDetails(customerDB[selectedOption]);
    }
});

/* ---------------------Load Item Details-------------*/

function loadItemDetails (itemObj) {
    cmbItemCode.val(itemDB.indexOf(itemObj));
    cmbDescription.val(itemDB.indexOf(itemObj));
    txtQtyOnHand.val(itemObj.getQtyOnHand());
    txtUnitPrice2.val(itemObj.getUnitPrice());
}

$("#cmbItemCode").click(function () { 
    selectedOption = parseInt(cmbItemCode.val());
    if (selectedOption >= 0) {
        loadItemDetails(itemDB[selectedOption]);
    }
});

$("#cmbDescription").click(function () { 
    selectedOption = parseInt(cmbDescription.val());
    if (selectedOption >= 0) {
        loadItemDetails(itemDB[selectedOption]);
    }
});

/* ---------------------Clear Fields-------------*/

function clearItemFields () {
    loadCmbItemCode();
    loadCmbDescription();
    txtUnitPrice2.val(""); 
    txtQtyOnHand.val(""); 
}

function clearCustomerFields () {  
    loadCmbCustomerId();
    loadCmbCustomerName();
    txtord_address.val("");
    txtord_contact.val("");
}

$("#btnClearSelectItemFields").click(function (e) { 
    // loadCmbItemCode();
    // loadCmbDescription();
    // txtUnitPrice2.val(""); 
    clearItemFields();  
});

