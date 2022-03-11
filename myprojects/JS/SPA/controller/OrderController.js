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

var regEx_Discount_Cash = /^[0-9]+$/;

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

(function () {  
    disableButton("#btnAddToCart");
    disableButton("#btnDeleteFromCart");
    disableButton("#btnDeleteOrder");
    disableButton("#btnPurchase");

    txtOrderQty.attr("disabled","disabled");
    $("#txtDiscount").attr("disabled","disabled");
    $("#txtAmountPaid").attr("disabled","disabled");

    if (ordersDB.length == 0) {
        orderId.val("OID-001");
    } else {
        generateNextOrderID();
    }
})();

function generateNextOrderID() {  
    if (ordersDB.length != 0) {

        let lastOrderId = ordersDB.reverse().slice(0,1)[0].getOrderId();
        let nextOrderId = ++lastOrderId.split("-")[1];
        ordersDB.reverse();

        if (nextOrderId < 9) {
            nextOrderId = "OID-00"+nextOrderId;
            orderId.val(nextOrderId);
            return nextOrderId;
            
        } else if (nextOrderId > 9) {
            nextOrderId = "OID-0",nextOrderId;
            orderId.val(nextOrderId);
            return nextOrderId;
            
        } else if (nextOrderId < 100) {
            nextOrderId = "OID-",nextOrderId;
            orderId.val(nextOrderId);
            return nextOrderId;
        }
        

    } else {
        // console.log("empty ordersDB");
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
        txtOrderQty.removeAttr("disabled");
    }
});

$("#cmbDescription").click(function () { 
    selectedOption = parseInt(cmbDescription.val());
    if (selectedOption >= 0) {
        loadItemDetails(itemDB[selectedOption]);
        txtOrderQty.removeAttr("disabled");
    }
});

/* ---------------------Clear Fields & Invoice Table-------------*/

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
    
    changeBorderColor("default", $("#txtDiscount"));
    $("#purchaseForm input#txtDiscount+p.errorText").hide();
    
    changeBorderColor("default", $("#txtAmountPaid"));
    $("#purchaseForm input#txtAmountPaid+p.errorText").hide();

    changeBorderColor("default", $("#txtBalance"));
    
    disableButton("#btnPurchase");
}

$("#btnClearSelectItemFields").click(function (e) { 
    clearItemFields();  
});

function clearInvoiceTable(){
    $("#tblInvoice-body").empty();
    noOfRows = 0;
    rowSelected = null;
}

$("#btnClearAllFields").click(function (e) { 
    clearCustomerFields();
    clearInvoiceFields();
    clearInvoiceTable();

    generateNextOrderID();
    disableButton("#btnDeleteOrder");
    $("#txtDiscount").attr("disabled","disabled");
    $("#txtAmountPaid").attr("disabled","disabled");
    enableCmbBoxes();
});

function disableCmbBoxes(){
    cmbCustomerId.attr("disabled", "disabled");
    cmbCustomerName.attr("disabled", "disabled");
    cmbItemCode.attr("disabled", "disabled");
    cmbDescription.attr("disabled", "disabled");
    $("#txtOrderQty").attr("disabled", "disabled");
    $("#txtDiscount").attr("disabled", "disabled");
    $("#txtAmountPaid").attr("disabled", "disabled");
}

function enableCmbBoxes(){
    cmbCustomerId.removeAttr("disabled");
    cmbCustomerName.removeAttr("disabled");
    cmbItemCode.removeAttr("disabled");
    cmbDescription.removeAttr("disabled");
    $("#txtOrderQty").removeAttr("disabled");
}

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

                Swal.fire({
                    text: `Do you really need to Remove Item ${itemCode} from Cart..?`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Remove',
                    confirmButtonColor: '#e66767',
                    customClass: {
                        cancelButton: 'order-1 right-gap',
                        confirmButton: 'order-2',
                    },
                    allowOutsideClick: false,
            
                }).then(result => {
                    if (result.isConfirmed) {
                        $(rowSelected).remove();
                        clearItemFields();
                        clearInvoiceFields();
                        rowSelected = null;

                        disableButton("#btnDeleteFromCart");
                        noOfRows--;
                        calculate_OrderCost();
                        reset_InvoiceOnCartUpdate();
                    }
                });
                
            } else {
                alertText = "Please select a row to delete...";
                display_Alert("", alertText, "warning");
            }
        
            // disableButton("#btnDeleteFromCart");
            // noOfRows--;
            // calculate_OrderCost();
            // reset_InvoiceOnCartUpdate();
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
        // $("small#errorQty").text("Please enter an amount lower than "+qtyOnHand);
        $("small#errorQty").text("Please enter only numbers");
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

    $("#txtDiscount").removeAttr("disabled");
    $("#txtAmountPaid").removeAttr("disabled");

    calculate_OrderCost();
    calculate_subTotal($("#txtDiscount").val());

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

        Swal.fire({
            text: `Do you really need to Remove Item ${itemCode} from Cart..?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Remove',
            confirmButtonColor: '#e66767',
            customClass: {
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
            },
            allowOutsideClick: false,
    
        }).then(result => {
            if (result.isConfirmed) {
                $(rowSelected).remove();
                clearItemFields();
                clearInvoiceFields();
                rowSelected = null;

                disableButton("#btnDeleteFromCart");
                noOfRows--;
                calculate_OrderCost();
                reset_InvoiceOnCartUpdate();
            }
        });

        // disableButton("#btnDeleteFromCart");
        // noOfRows--;
        // calculate_OrderCost();
        // reset_InvoiceOnCartUpdate();
    });
}

/* ---------------Calculate Order Total, Subtotal, Balance------------------ */

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

    if ($("#txtDiscount").val() == '') {
        subTotal = cartTotal;
        $("#txtSubTotal").val(parseFloat(subTotal).toFixed(2));
        return;
    }

    subTotal = cartTotal * (100-discount) / 100;
    $("#txtSubTotal").val(parseFloat(subTotal).toFixed(2));
}

function validate_Discount_Cash (input, txtField, txtFieldId) {  // validate discount & cash fields

    if (regEx_Discount_Cash.test(input)) {
        changeBorderColor("valid", txtField);
        
        // $("#purchaseForm input#txtDiscount+p.errorText").hide();
        $(`#purchaseForm input${txtFieldId}+p.errorText`).hide();

        // if (txtFieldId == "txtAmountPaid") {
        //     calculate_Balance(input);
        // }

        return true;

    } else{
        changeBorderColor("invalid", txtField);
        $(`#purchaseForm input${txtFieldId}+p.errorText`).show();
        $(`#purchaseForm input${txtFieldId}+p.errorText small`).text(" Enter Only Numbers");
       
        return false;
    }
}

function calculate_Balance (amountPaid) {  
    balance = parseFloat(amountPaid - subTotal).toFixed(2);

    $("#txtBalance").val(balance);

    if (balance < 0) {
        changeBorderColor("invalid", $("#txtAmountPaid"));
        changeBorderColor("invalid", $("#txtBalance"));
        $("#purchaseForm input#txtAmountPaid+p.errorText").show();
        $("small#errorPaid").text("Insufficient Credit");

    } else {
        changeBorderColor("valid", $("#txtAmountPaid"));
        changeBorderColor("default", $("#txtBalance"));
        $("#purchaseForm input#txtAmountPaid+p.errorText").hide();

        enableButton("#btnPurchase");
    }
}

$("#txtDiscount, #txtAmountPaid").keydown(function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});

$("#txtDiscount").keyup(function (e) { 
    // discount = parseInt($("#txtDiscount").val());
    discount = $("#txtDiscount").val();
    console.log("discount : "+discount);
    // let isValid = validate_Discount_Cash(discount,$("#txtDiscount"),"#txtDiscount");
    validate_Discount_Cash(discount,$("#txtDiscount"),"#txtDiscount");
    
    // if (isValid) {
        calculate_subTotal(discount);

        if (e.code === "Enter" && isBorderGreen(this)) {
            $("#txtAmountPaid").focus();
        }
    // }
});

$("#txtAmountPaid").keyup(function (e) { 
    // amountPaid = parseInt($("#txtAmountPaid").val());
    amountPaid = $("#txtAmountPaid").val();
    console.log("amountPaid : "+amountPaid);
    isValid = validate_Discount_Cash(amountPaid,$("#txtAmountPaid"),"#txtAmountPaid");
    // validate_Discount_Cash(amountPaid,$("#txtAmountPaid"),"#txtAmountPaid");

    if (isValid) {
        calculate_Balance(amountPaid);

        if (e.code === "Enter" && isBorderGreen(this)) {
            $("#btnPurchase").focus();
        }
    }
});

/* --------------------Place Order------------------------ */

function place_Order(orderId) {
    customerId = customerDB[cmbCustomerId.val()].getCustomerID();
    let newOrder = new Orders(orderId, date.val(), cartTotal, discount, customerId);    

    if (ordersDB.length == 0) {
        ordersDB.push(newOrder);
        
    } else {
        for (let obj of ordersDB) {
            if (orderId == obj.getOrderId()) {
                alertText = "Duplicate Order ID "+orderId+"\nPlease start a New Order";
                display_Alert("", alertText, "warning");

                return;
            } 
        }
        ordersDB.push(newOrder);
    }

    $("#totalOrders").text("0"+ordersDB.length);

    let rowNo = 1;
    let orderDetail;

    if (noOfRows == 0) {
        // alert("Empty Table..");

    } else {
        do{
            itemCode = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(1)").text();
            orderQty = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(4)").text();
            
            orderDetail = new OrderDetails(orderId, itemCode, orderQty);
            orderDetailDB.push(orderDetail);

            // for (let obj of orderDetailDB) {
            //     if (orderId != obj.getOrderId()) {
            //         orderDetailDB.push(orderDetail);
                    
            //     } else {
            //         alert("You cannot update an existing Order...");
            //     }
            // }

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
    $("#tblOrders-body").empty();

    for (let ord_obj of ordersDB) {

        for (let cust_obj of customerDB) {

            if (ord_obj.getCustomerID() == cust_obj.getCustomerID()) {
                
                newRow = `<tr>
                            <td>${ord_obj.getOrderId()}</td>
                            <td>${ord_obj.getCustomerID()}</td>
                            <td>${cust_obj.getCustomerName()}</td>
                            <td>${cust_obj.getCustomerContact()}</td>
                            <td>${parseFloat(ord_obj.getOrderCost()).toFixed(2)}</td>
                            <td>${ord_obj.getOrderDate()}</td>
                        </tr>`;

            }
        }
        $("#tblOrders-body").append(newRow);
    }
}

$("#btnPurchase").click(function (e) { 
    if (cmbCustomerId.val() == null) {
        alertText = "Please select a Customer....";
        display_Alert("", alertText, "warning");

    } else if (date.val() == "") {
        alertText = "Please select a Date....";
        display_Alert("", alertText, "warning");

    } else {
        place_Order(orderId.val());
        toastr.success("Order Placed Successfully...");
        
        load_TblCustomerOrder();
        generateNextOrderID();

        reset_Forms();
        reset_Table();

        select_OrderDetailRow();
    }  
});

/* ------------------Search Order------------------------- */

// find() --> looks at the children of the current selection for a match
// filter() --> looks at the current selection for a match
// each()-->  used to iterate over any collection, whether it is an object or an array. 

/* --------------------------------------------------------------*/

$("#txtSearchOrder").keyup(function (e) { 
    searchValue = $(this).val();

    $("#tblOrders-body>tr").each(function(){  
        let isFound = false;  
        $(this).each(function(){  // search td of each tr one by one
             if($(this).text().toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) { 
                  isFound = true;  
             } 
        });  
        if(isFound){  
             $(this).show();  

        } else {  
             $(this).hide();  
        }  
   }); 
});

/* ------------Load Order Details when OrderID is selected-----------*/

function select_OrderDetailRow() {

    $("#tblOrders-body>tr").off("click");
    $("#tblOrders-body>tr").click(function (e) { 

        clearInvoiceTable();
        disableCmbBoxes();

        rowSelected = this;
        let orderID = $(this).children(":nth-child(1)").text();
    
        let order_obj;
        let cust_obj;
        let item_obj;

        let orderDetail_arr = [];
    
        for (let obj of ordersDB) {
            if (obj.getOrderId() == orderID) {
                order_obj = obj;
            }
        }
    
        for (let obj of customerDB) {
            if (order_obj.getCustomerID() == obj.getCustomerID()) {
                cust_obj = obj;
            }
        }
        
        let index = 0;
        for (let i in orderDetailDB) {
            if (orderID == orderDetailDB[i].getOrderId()) {
                console.log(orderDetail_arr.length);
                orderDetail_arr[index++] = orderDetailDB[i];
            }
        }

        orderId.val(orderID);
        date.val(order_obj.getOrderDate());
    
        cmbCustomerId.val(customerDB.indexOf(cust_obj));
        cmbCustomerName.val(customerDB.indexOf(cust_obj));
        txtord_address.val(cust_obj.getCustomerAddress())
        txtord_contact.val(cust_obj.getCustomerContact());
    
        for (let i = 0; i < orderDetail_arr.length; i++) {

            for (let obj of itemDB) {
                if (orderDetail_arr[i].getItemCode() == obj.getItemCode()) {
                    item_obj = obj;
                }
            }

            let unitPrice = item_obj.getUnitPrice();
            orderQty = orderDetail_arr[i].getOrderQty();
            total = unitPrice * orderQty;

            newRow = `<tr>
                        <td>${item_obj.getItemCode()}</td>
                        <td>${item_obj.getDescription()}</td>
                        <td>${unitPrice}</td>
                        <td>${orderQty}</td>
                        <td>${parseFloat(total).toFixed(2)}.00</td>
                    </tr>`;
            
            $("#tblInvoice-body").append(newRow);
            noOfRows++;
        }

        calculate_OrderCost();
        discount = order_obj.getOrderDiscount();
        $("#txtDiscount").val(discount)
        calculate_subTotal(discount);

        enableButton("#btnDeleteOrder");

    });
}

/* -------------------------------Delete Order------------------------*/

$("#btnDeleteOrder").click(function (e) { 
    let orderID = orderId.val();

    Swal.fire({
        text: "Are you sure you want to Delete this Order..?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#e66767',
        customClass: {
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
        },
        allowOutsideClick: false,

    }).then(result => {
        if (result.isConfirmed) {

            for (let i in ordersDB) {
                if (orderID == ordersDB[i].getOrderId()) {
                    ordersDB.splice(i,1);
                    break;
                }
            }
    
            $("#totalOrders").text("0"+ordersDB.length);
    
            for (let i in orderDetailDB) {
                if (orderID == orderDetailDB[i].getOrderId()) {
                    console.log(i);
                    orderDetailDB.splice(i,1);
                    i--;
                }
            }
    
            clearCustomerFields();
            clearInvoiceFields();
            clearInvoiceTable();
    
            generateNextOrderID();
            disableButton("#btnDeleteOrder");
            enableCmbBoxes();
            load_TblCustomerOrder();

        }
    });

    select_OrderDetailRow();
});