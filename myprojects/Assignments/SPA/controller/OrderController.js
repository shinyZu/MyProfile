let cmbCustomerId = $("#cmbCustomerId");
let cmbCustomerName = $("#cmbCustomerName");
let txtord_address = $("#address"); 
let txtord_contact = $("#contact"); 

let cmbItemCode = $("#cmbItemCode");
let cmbDescription = $("#cmbDescription");
let txtUnitPrice2 = $("#txtUnitPrice2");
let txtOrderQty = $("#txtOrderQty");

// $(cmbItemCode).val("");
// $(cmbDescription).val("");
// $(txtUnitPrice2).val("");

let newOption;
let defaultOption = `<option value="-1" selected disabled hidden >Select</option>`;
let selectedOption;

$(cmbCustomerId).append(defaultOption);
$(cmbCustomerName).append(defaultOption);
$(cmbItemCode).append(defaultOption);
$(cmbDescription).append(defaultOption);

function loadCmbCustomerId() {
    clearCmbCustomerId();
    $(cmbCustomerId).append(defaultOption);

    let optionValue = -1;
    for (let customer of customerDB) {
        optionValue++;
        newOption = `<option value="${optionValue}">${customer.id}</option>`;
        $(cmbCustomerId).append(newOption);
    } 
    $(cmbItemCode).val("");  
}

function clearCmbCustomerId () {
    $(cmbCustomerId).empty();
}

function loadCmbCustomerName() {
    clearCmbCustomerName();
    $(cmbCustomerName).append(defaultOption);

    let optionValue = -1;
    for (let customer of customerDB) {
        optionValue++;
        newOption = `<option value="${optionValue}">${customer.name}</option>`;
        $(cmbCustomerName).append(newOption);
    }   
}

function clearCmbCustomerName () {
    $(cmbCustomerName).empty();
}

function loadCmbItemCode() {
    clearCmbItemCode();
    $(cmbItemCode).append(defaultOption);

    let optionValue = -1;
    for (let item of itemDB) {
        optionValue++;
        newOption = `<option value="${optionValue}">${item.code}</option>`;
        // $(txtUnitPrice2).val(item.price);
        $(cmbItemCode).append(newOption);
    }   
}

function clearCmbItemCode () {
    $(cmbItemCode).empty();
}

function loadCmbDescription() {
    clearCmbDescription();
    $(cmbDescription).append(defaultOption);

    let optionValue = -1;
    for (let item of itemDB) {
        optionValue++;
        newOption = `<option value="${optionValue}">${item.descrip}</option>`;
        $(cmbDescription).append(newOption);
    }   
}

function clearCmbDescription () {
    $(cmbDescription).empty();
}

function loadCustomerDetails (custObj) {
    cmbCustomerId.val(customerDB.indexOf(custObj));
    cmbCustomerName.val(customerDB.indexOf(custObj));
    txtord_address.val(custObj.address);
    txtord_contact.val(custObj.contact);
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
