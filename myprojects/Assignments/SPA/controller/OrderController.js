let orderId =  $("#txtOrderID");
let date = $("#date");

let cmbCustomerId = $("#cmbCustomerId");
let cmbCustomerName = $("#cmbCustomerName");
let txtord_address = $("#address"); 
let txtord_contact = $("#contact"); 

let cmbItemCode = $("#cmbItemCode");
let cmbDescription = $("#cmbDescription");
let txtUnitPrice2 = $("#txtUnitPrice2");
let txtQtyOnHand = $("#txtQtyOnHand");
let txtOrderQty = $("#txtOrderQty");

let newOption;
let defaultOption = `<option value="-1" selected disabled hidden >Select</option>`;
let selectedOption;

let orderQty;
let total;
let qtyOnHand;

let selected_cartItem;
let noOfRows = 0;
let cartTotal = 0; // total cost of the cart

let subTotal;
let balance;
let discount;
let amountPaid;

$(cmbCustomerId).append(defaultOption);
$(cmbCustomerName).append(defaultOption);
$(cmbItemCode).append(defaultOption);
$(cmbDescription).append(defaultOption);

$("#selectItemForm p.errorText").hide();
$("#purchaseForm p.errorText").hide();

// ordersDB.push(new Orders("OID-001","2022-02-27",5000,150,"C00-001"));
// ordersDB.push(new Orders("OID-002","2022-02-28",3000,150,"C00-002"));
// console.log(ordersDB[0].getOrderDate());

(function () {  
    disableButton("#btnAddToCart");
    disableButton("#btnDeleteFromCart");
    disableButton("#btnDeleteOrder");
    disableButton("#btnPurchase");

    if (ordersDB.length == 0) {
        orderId.val("OID-001");
    } else {
        generateNextOrderID();
    }
})();

function generateNextOrderID() {  
    // let lastOrderId = ordersDB.pop().getOrderId();
    let lastOrderId = ordersDB.reverse().slice(0,1)[0].getOrderId();
    lastOrderId = ++lastOrderId.split("-")[1];

    if (lastOrderId < 9) {
        lastOrderId = "OID-00"+lastOrderId;
        orderId.val(lastOrderId);
        
    } else if (lastOrderId > 9) {
        lastOrderId = "OID-0",lastOrderId;
        orderId.val(lastOrderId);
        
    } else if (lastOrderId < 100) {
        lastOrderId = "OID-",lastOrderId;
        orderId.val(lastOrderId);
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

/* --------------------------------------------------------*/

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

    qtyOnHand = parseInt(itemObj.getQtyOnHand());
    response = isItemAlreadyAddedToCart(itemObj.getItemCode());
   
    if (response) { // if item is already added to cart
        let rowNo = response;
        let orderedQty = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(4)").text();
        txtQtyOnHand.val(qtyOnHand-parseInt(orderedQty));
        
    } else if (response == false) {
        txtQtyOnHand.val(qtyOnHand);
    }

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
    txtOrderQty.val("").css('border', '1px solid rgb(206, 212, 218)');
    $("#selectItemForm p.errorText").hide();

    disableButton("#btnAddToCart");
}

function clearCustomerFields () {  
    loadCmbCustomerId();
    loadCmbCustomerName();
    txtord_address.val("");
    txtord_contact.val("");
}

function clearInvoiceFields() {
    $("#txtTotal, #txtDiscount, #txtSubTotal, #txtAmountPaid, #txtBalance").val("");
    changeBorderColor("default", $("#txtAmountPaid"));
    disableButton("#btnPurchase");
}

$("#btnClearSelectItemFields").click(function (e) { 
    // loadCmbItemCode();
    // loadCmbDescription();
    // txtUnitPrice2.val(""); 
    clearItemFields();  
});

/* --------------------Select from Cart------------- */

function select_CartRow() {
    $("#tblInvoice-body>tr").click(function (e) { 
        enableButton("#btnDeleteFromCart");

        rowSelected = this;
        itemCode = $(this).children(':first-child').text();
        orderQty = $(this).children(':nth-child(4)').text();
        
        itemDB.forEach(obj => {
            if (itemCode == obj.getItemCode()) {
                loadItemDetails(obj);
                txtOrderQty.val(orderQty);
            }
        });

        $("#btnDeleteFromCart").off("click"); 
        $("#btnDeleteFromCart").click(function (e) { 
            if (rowSelected != null) {
                itemCode = $(rowSelected).children(':first-child').text();
                
                if (window.confirm(`Do you really need to Remove Item ${itemCode} from Cart..?`)) {
                    $(rowSelected).remove();
                    clearItemFields();
                    rowSelected = null;
                }
                
            } else {
                alert("Please select a row to delete...");
            }
        
            disableButton("#btnDeleteFromCart");
            noOfRows--;
            calculate_OrderCost();
            reset_InvoiceOnCartUpdate();
        });

        validate_OrderQty(parseInt(txtOrderQty.val()),txtOrderQty);

    });
}

/* ------------------------Add To Cart------------ */

function validate_OrderQty (input, txtField) {  
    orderQty =  parseInt(txtOrderQty.val());
    qtyOnHand =  parseInt(txtQtyOnHand.val());

    if (regExQty.test(input)) {

        if (input < qtyOnHand) {
            changeBorderColor("valid", txtField);
            $("#selectItemForm p.errorText").hide();
            enableButton("#btnAddToCart");

        } else if (input > qtyOnHand) {
            changeBorderColor("invalid", txtField);
            $("#selectItemForm p.errorText").show();
            $("small#errorQty").text("Please enter an amount lower than "+qtyOnHand);
            disableButton("#btnAddToCart");
        }
        
    } else{
        changeBorderColor("invalid", txtField);
        $("#selectItemForm p.errorText").show();
        $("small#errorQty").text("Please enter an amount lower than "+qtyOnHand);
    }
}

function isItemAlreadyAddedToCart (code) {  
    let codeInCart;
    let rowNo = 1;
    do{
        codeInCart = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(1)").text();
        if (code == codeInCart) {
            return rowNo; // if item is already added to cart
        } 
        // rowSelected = rowNo;
        rowNo++;
    } while(codeInCart != "");
    return false; // if item is not yet added to the cart
}

function addToCart () {

    itemCode = itemDB[parseInt(cmbItemCode.val())].getItemCode();
    description = itemDB[parseInt(cmbItemCode.val())].getDescription();
    unitPrice = parseFloat(txtUnitPrice2.val());
    orderQty =  parseInt(txtOrderQty.val());
    total = parseFloat(unitPrice * orderQty);
    qtyOnHand =  txtQtyOnHand.val();
    
    response = isItemAlreadyAddedToCart(itemCode);

    if (response) { // if item is already added to cart

        let rowToUpdate = $(`#tblInvoice-body>tr:nth-child(${response})`);
        let prevQty = parseInt(rowToUpdate.children(":nth-child(4)").text());
        rowToUpdate.children(":nth-child(4)").text(prevQty + orderQty);
        rowToUpdate.children(":nth-child(5)").text(parseFloat((prevQty + orderQty) * unitPrice).toFixed(2));

    } else if (response == false) { // if item is not yet added to the cart
        
        newRow = `<tr>
                     <td>${itemCode}</td>
                    <td>${description}</td>
                    <td>${txtUnitPrice2.val()}</td>
                    <td>${txtOrderQty.val()}</td>
                    <td>${total}.00</td>
                 </tr>`;
                    
        $("#tblInvoice-body").append(newRow);
        noOfRows++;
    }
    clearItemFields();
    disableButton("#btnDeleteFromCart");
    calculate_OrderCost();
    reset_InvoiceOnCartUpdate();
   
}

$("#txtOrderQty").keyup(function (e) { 
    validate_OrderQty(parseInt(txtOrderQty.val()),txtOrderQty);
    
    if (e.code === "Enter" && isBorderGreen(this)){
        addToCart();
        rowSelected = null;
    }
    select_CartRow();

    $("#tblInvoice-body>tr").off("dblclick"); 
    delete_cartRowOnDblClick();
});

$("#btnAddToCart").click(function (e) {
    if (isBorderGreen(txtOrderQty)) {
        addToCart();
        rowSelected = null;
    }
    select_CartRow();
    delete_cartRowOnDblClick();
});

/* ------------------------Delete from Cart------------ */

function delete_cartRowOnDblClick () {
    $("#tblInvoice-body>tr").off("dblclick"); 
    $("#tblInvoice-body>tr").dblclick(function () { 
        itemCode = $(rowSelected).children(':first-child').text();

        if (window.confirm(`Do you really need to Remove Item ${itemCode} from Cart..?`)) {
            $(rowSelected).remove();
            clearItemFields();
            rowSelected = null;
        }

        disableButton("#btnDeleteFromCart");
        noOfRows--;
        calculate_OrderCost();
        reset_InvoiceOnCartUpdate();
    });
}

/* ---------------Calculate Order Cost------------------ */

function reset_InvoiceOnCartUpdate () {
    if (noOfRows == 0) {
        $("#txtDiscount").val("");
    }

    $("#txtAmountPaid, #txtBalance").val("");
    changeBorderColor("default", $("#txtBalance"));
    changeBorderColor("default", $("#txtAmountPaid"));
}

function calculate_OrderCost () {
    cartTotal = 0;
    let colTotal = 0; // column "Total" in Table
    let rowNo = 1;

    if (noOfRows == 0) {
        $("#txtTotal").val("0.00");
        cartTotal = 0;

    } else {
        do{
            colTotal = parseInt($(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(5)").text());
            cartTotal += parseInt(colTotal);
            $("#txtTotal").val(parseFloat(cartTotal).toFixed(2));
            rowNo++;

        } while(rowNo <= noOfRows);
    }
    calculate_subTotal($("#txtDiscount").val());
}

function calculate_subTotal (discount) {
    subTotal = cartTotal * (100-discount) / 100;

    $("#txtSubTotal").val(parseFloat(subTotal).toFixed(2));
}

function calculate_Balance (amountPaid) {  
    balance = parseFloat(amountPaid - subTotal).toFixed(2);

    $("#txtBalance").val(balance);

    if (balance < 0) {
        changeBorderColor("invalid", $("#txtAmountPaid"));
        changeBorderColor("invalid", $("#txtBalance"));
        $("#purchaseForm p.errorText").show();
        $("small#errorPaid").text("Insufficient Credit");
    } else {
        changeBorderColor("valid", $("#txtAmountPaid"));
        changeBorderColor("default", $("#txtBalance"));
        $("#purchaseForm p.errorText").hide();

        enableButton("#btnPurchase");
    }
}

$("#txtDiscount").keyup(function (e) { 
    discount = $("#txtDiscount").val();
    amountPaid = $("#txtAmountPaid").val();

    calculate_subTotal(discount);

    if (amountPaid != '') {
        calculate_Balance(amountPaid);
    }
});

$("#txtAmountPaid").keyup(function (e) { 
    amountPaid = $("#txtAmountPaid").val();
    calculate_Balance(amountPaid);
});

/* --------------------Place Order------------------------ */

function place_Order(orderId) {
    customerId = customerDB[cmbCustomerId.val()].getCustomerID();
    let newOrder = new Orders(orderId, date.val(), cartTotal, discount, customerId);    

    ordersDB.push(newOrder);

    let rowNo = 1;
    let orderDetail;

    if (noOfRows == 0) {
        alert("Empty Table..");

    } else {
        do{
            itemCode = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(1)").text();
            orderQty = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(4)").text();
            
            orderDetail = new OrderDetails(orderId, itemCode, orderQty);
            orderDetailDB.push(orderDetail);

            itemDB.forEach(obj => {
                if (obj.getItemCode() == itemCode) {
                    qtyOnHand = obj.getQtyOnHand();
                }
            });

            let index;

            for (let i in itemDB) {
                if (itemDB[i].getItemCode() == itemCode) {
                    qtyOnHand = itemDB[i].getQtyOnHand();
                    index = i;
                }
            }

            let newQtyOnHand = qtyOnHand - parseInt(orderQty);
            itemDB[index].setQtyOnHand(newQtyOnHand);
            loadAllItems(itemDB);
            rowNo++;

        } while(rowNo <= noOfRows);
    }
}

function reset_Forms() {  
    date.val("");

    clearCustomerFields();
    clearItemFields();
    clearInvoiceFields();
}

function reset_Table(){
    $("#tblInvoice-body>tr").remove();
    noOfRows = 0;
}

function load_TblCustomerOrder() {
    customerId = customerDB[cmbCustomerId.val()].getCustomerID();
    customerName = customerDB[cmbCustomerName.val()].getCustomerName();

    newRow = `<tr>
                <td>${customerId}</td>
                <td>${customerName}</td>
                <td>${txtord_address.val()}</td>
                <td>${txtord_contact.val()}</td>
                <td>${orderId.val()}</td>
                <td>${date.val()}</td>
            </tr>`;
            
    $("#tblOrders-body").append(newRow);
}

$("#btnPurchase").click(function (e) { 
    if (cmbCustomerId.val() == null) {
        alert("Please select a Customer....");

    } else if (date.val() == "") {
        alert("Please choose a Date....");

    } else {
        place_Order(orderId.val());
        alert("Order Placed Successfully");
        
        load_TblCustomerOrder();
        generateNextOrderID();

        reset_Forms();
        reset_Table();
    }  
});