let itemCode;
let description;
let unitPrice;
let qty;

let txtItemCode = $("#txtItemCode");
let txtDescription = $("#txtDescription");
let txtUnitPrice = $("#txtUnitPrice");
let txtQty = $("#txtQty");

txtItemCode.focus();

disableBtnSaveItem(".btnSaveItem");
disableBtnEditItem("#btnEditItem");
disableBtnDeleteItem("#btnDeleteItem");

/* ---------------Initially Hide the Error Indicators----------*/

$("#itemForm p.errorText").hide();

/* -----------------------------------------------------------*/

/* When/after a new Item is Saved:
    1. add Item to table
    2. fill input fields when a row is selected
    3. delete the selected Item from the table
*/

$(".btnSaveItem").click(function () { 

    itemCode = $(rowSelected).children(':first-child').text();

    if (itemCode === txtItemCode.val()) {
        alert("An Item already exists with Code "+ itemCode +"...");
        
    } else{
        if (window.confirm("Do you really need to add this Item..?")) {
            addItem();
            reset_ItemForm();
        }
    }
    select_ItemRow();

    $("#tblItem-body>tr").off("dblclick");
    delete_ItemRowOnDblClick();
});

/* --------------------------Validate & Jump to Next Field On Enter---------------------------------*/

var regExItemCode = /^(I00-)[0-9]{3,4}$/;
var regExDescription = /^[A-Z][a-z ]{3,9}[A-z]{2,10}$|^[A-Z][a-z]{4,20}$/;
var regExUnitPrice = /^[1-9][0-9]*([.][0-9]{2})?$/;
var regExQty = /^[0-9]+$/

function disableBtnSaveItem(btn) {
    $(btn).attr("disabled", "disabled");
}

function disableBtnEditItem(btn) {
    $(btn).attr("disabled", "disabled");
}

function disableBtnDeleteItem(btn) {
    $(btn).attr("disabled", "disabled");
}

function enableBtnSaveItem(btn) {
    $(btn).removeAttr("disabled");
}

function enableBtnEditItem(btn) {
    $(btn).removeAttr("disabled");
}

function enableBtnDeleteItem(btn) {
    $(btn).removeAttr("disabled");
}

function addItem(){
    itemCode = txtItemCode.val();
    description = txtDescription.val();
    unitPrice = txtUnitPrice.val();
    qty = txtQty.val();   

    $("#tblItem-body").append(
        `<tr>
            <td>${itemCode}</td>
            <td>${description}</td>
            <td>${unitPrice}</td>
            <td>${qty}</td>
        </tr>`
    );
}

function updateItem(){
    itemCode = txtItemCode.val();
    description = txtDescription.val();
    unitPrice = txtUnitPrice.val();
    qty = txtQty.val();

    updatedRow = `<tr>
                    <td>${itemCode}</td>
                    <td>${description}</td>
                    <td>${unitPrice}</td>
                    <td>${qty}</td>
                </tr>`;

    return updatedRow;
}

function select_ItemRow(){
    $("#tblItem-body>tr").click(function () { 

        rowSelected = this;
    
        itemCode = $(this).children(':first-child').text();
        description = $(this).children(':nth-child(2)').text();
        unitPrice = $(this).children(':nth-child(3)').text();
        qty = $(this).children(':last-child').text();

        // console.log(itemCode,description,unitPrice,qty);
    
        txtItemCode.val(itemCode);
        txtDescription.val(description);
        txtUnitPrice.val(unitPrice);
        txtQty.val(qty);

        validate_ItemForm();
        enableBtnEditItem("#btnEditItem");
        enableBtnDeleteItem("#btnDeleteItem");

        $("#btnDeleteItem").off("click"); 

        $("#btnDeleteItem").click(function () { 
            // Clear fields after Customer is deleted
            if (window.confirm("Do you really need to delete this Item..?")) {
                $(rowSelected).remove();
                reset_ItemForm();
            }
        });
    });
}

function validate_ItemCode (input, txtField) {  

    if (regExItemCode.test(input)) {
        changeBorderColor("valid", txtField);

        // once the current input field is green change the the border of next input field to red
        if (!validate_Description(txtDescription.val(),txtDescription)) {
            changeBorderColor("invalid", txtDescription);
            $("#itemForm p.errorText").eq(1).show();
            $("#errorDescription").text("*Required Field* Min 5, Max 20, Spaces Allowed");
        }

        $("#itemForm p.errorText").eq(0).hide();
        return true;

    } else{
        changeBorderColor("invalid", txtField);
        $("#itemForm p.errorText").eq(0).show();
        $("#errorCode").text("*Required Field* Format : I00-000");

        disableBtnSaveItem(".btnSaveItem");
        disableBtnEditItem("#btnEditItem");
        return false;
    }
}

function validate_Description (input, txtField) {  

    if (regExDescription.test(input)) {
        changeBorderColor("valid", txtField);

        // once the current input field is green change the the border of next input field to red
        if (!validate_UnitPrice(txtUnitPrice.val(),txtUnitPrice)) {
            changeBorderColor("invalid", txtUnitPrice);
            $("#itemForm p.errorText").eq(2).show();
            $("#errorPrice").text("*Required Field* Pattern : 100.00 or 100");
        }

        $("#itemForm p.errorText").eq(1).hide();
        return true;

    } else{
        changeBorderColor("invalid", txtField);
        $("#itemForm p.errorText").eq(1).show();
        $("#errorDescription").text("*Required Field* Min 5, Max 20, Spaces Allowed");

        disableBtnSaveItem(".btnSaveItem");
        disableBtnEditItem("#btnEditItem");
        return false;
    }
}

function validate_UnitPrice (input, txtField) {  

    if (regExUnitPrice.test(input)) {
        changeBorderColor("valid", txtField);

        // once the current input field is green change the the border of next input field to red
        if (!validate_Qty(txtQty.val(),txtQty)) {
            changeBorderColor("invalid", txtQty);
            $("#itemForm p.errorText").eq(3).show();
            $("#errorQty").text("*Required Field*  Only Numbers");
        }

        $("#itemForm p.errorText").eq(2).hide();
        return true;

    } else{
        changeBorderColor("invalid", txtField);
        $("#itemForm p.errorText").eq(2).show();
        $("#errorPrice").text("*Required Field* Pattern : 100.00 or 100");

        disableBtnSaveItem(".btnSaveItem");
        disableBtnEditItem("#btnEditItem");
        return false;
    }
}

function validate_Qty (input, txtField) {  

    if (regExQty.test(input)) {
        changeBorderColor("valid", txtField);
        enableBtnSaveItem(".btnSaveItem");
        enableBtnEditItem("#btnEditItem");

        $("#itemForm p.errorText").eq(3).hide();
        return true;

    } else{
        changeBorderColor("invalid", txtField);
        $("#itemForm p.errorText").eq(3).show();
        $("#errorQty").text("*Required Field*  Only Numbers");

        disableBtnSaveItem(".btnSaveItem");
        disableBtnEditItem("#btnEditItem");
        return false;
    }
}

function reset_ItemForm(){
    txtItemCode.val("").css('border', '1px solid rgb(206, 212, 218)');
    txtDescription.val("").css('border', '1px solid rgb(206, 212, 218)');
    txtUnitPrice.val("").css('border', '1px solid rgb(206, 212, 218)');
    txtQty.val("").css('border', '1px solid rgb(206, 212, 218)');

    $("#itemForm p.errorText").hide();

    txtItemCode.focus();
    disableBtnSaveItem(".btnSaveItem");
    disableBtnEditItem("#btnEditItem");
    disableBtnDeleteItem("#btnDeleteItem");

    select_ItemRow();

    rowSelected = null;
    itemCode = null;
}

function validate_ItemForm(){
    itemCode = txtItemCode.val();
    description = txtDescription.val();
    unitPrice = txtUnitPrice.val();
    qty = txtQty.val();

    validate_ItemCode(itemCode,txtItemCode);
    validate_Description(description,txtDescription);
    validate_UnitPrice(unitPrice,txtUnitPrice);
    validate_Qty(qty,txtQty);
}

function delete_ItemRowOnDblClick() {
    $("#tblItem-body>tr").dblclick(function () { 
        rowSelected = $(this);

        if (window.confirm("Do you really need to delete this Item..?")) {
            $(rowSelected).remove();
            reset_ItemForm();
        }
    });
}

$("#txtItemCode").keyup(function (e) { 
    input = txtItemCode.val();
    validate_ItemCode(input, this);

    if (e.code === "Enter" && isBorderGreen(this)){
        $("#txtDescription").focus();
    }
});

$("#txtDescription").keyup(function (e) { 
    input = txtDescription.val();
    validate_Description(input, this);

    if (e.code === "Enter" && isBorderGreen(this)){
        $("#txtUnitPrice").focus();
    }
});

$("#txtUnitPrice").keyup(function (e) { 
    input = txtUnitPrice.val();
    validate_UnitPrice(input, this);

    if (e.code === "Enter" && isBorderGreen(this)){
        $("#txtQty").focus();
    }
});

$("#txtQty").keyup(function (e) { 
    input = txtQty.val();
    validate_Qty(input, this);

    if (e.code === "Enter" && isBorderGreen(this)){

        itemCode = $(rowSelected).children(':first-child').text();

        if (itemCode === txtItemCode.val()) {
            alert("An Item already exists with Code "+ itemCode +"...");

        } else{
            if (window.confirm("Do you really need to add this Item..?")) {
                addItem();
                reset_ItemForm();
            }
        }
        select_ItemRow();
    }

    $("#tblItem-body>tr").off("dblclick"); 
    delete_ItemRowOnDblClick();
});

/* -----When Clear button is clicked -----*/

$("#btnClearItemFields").click(function () { 
    reset_ItemForm();
});

/* ------------------Update Item------------*/
$("#btnEditItem").click(function (e) { 
    select_ItemRow();

    if (window.confirm("Do you really need to update Item " + itemCode + "..?")) {
        $("#tblItem-body").find(rowSelected).replaceWith(updateItem());
        reset_ItemForm();
    }
});