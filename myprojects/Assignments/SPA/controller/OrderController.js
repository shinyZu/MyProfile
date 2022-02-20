let cmbCustomerId = $("#cmbCustomerId");
let cmbCustomerName = $("#cmbCustomerName");
let cmbItemCode = $("#cmbItemCode");
let cmbDescription = $("#cmbDescription");
let txtUnitPrice2 = $("#txtUnitPrice2");

let txtord_address = $("#address"); 
let txtord_contact = $("#contact"); 

$(cmbItemCode).val("");
$(cmbDescription).val("");
$(txtUnitPrice2).val("");

let newOption;

function loadCmbCustomerId() {
    let optionValue = -1;
    for (let customer of customerDB) {
        optionValue++;
        newOption = `<option value="${optionValue}">${customer.id}</option>`;
    }   
    $(cmbCustomerId).append(newOption);
}

function loadCmbCustomerName() {
    let optionValue = -1;
    for (let customer of customerDB) {
        optionValue++;
        newOption = `<option value="${optionValue}">${customer.name}</option>`;
    }   
    $(cmbCustomerName).append(newOption);
}

function loadCmbItemCode() {
    let optionValue = -1;
    for (let item of itemDB) {
        optionValue++;
        newOption = `<option value="${optionValue}">${item.code}</option>`;
        // $(txtUnitPrice2).val(item.price);
    }   
    $(cmbItemCode).append(newOption);
}

function loadCmbDescription() {
    let optionValue = -1;
    for (let item of itemDB) {
        optionValue++;
        newOption = `<option value="${optionValue}">${item.descrip}</option>`;
    }   
    $(cmbDescription).append(newOption);
}

$("#cmbCustomerId").click(function () { 
    console.log(cmbCustomerId.val());
    let selectedOption = parseInt(cmbCustomerId.val());
    console.log(selectedOption);
    
    console.log(customerDB[selectedOption]);
});
