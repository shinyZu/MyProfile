let cmbCustomerId = $("#cmbCustomerId");
let cmbCustomerName = $("#cmbCustomerName");
let cmbItemCode = $("#cmbItemCode");
let cmbDescription = $("#cmbDescription");
let txtUnitPrice2 = $("#txtUnitPrice2");

let txtord_address = $("#address"); 
let txtord_contact = $("#contact"); 

// $(cmbItemCode).val("");
// $(cmbDescription).val("");
// $(txtUnitPrice2).val("");

let newOption;
let defaultOption = `<option value="-1" selected disabled hidden >Select</option>`;

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

$("#cmbCustomerId").click(function () { 
    console.log(cmbCustomerId.val());
    let selectedOption = parseInt(cmbCustomerId.val());
    console.log(selectedOption);
    
    console.log(customerDB[selectedOption]);
});
