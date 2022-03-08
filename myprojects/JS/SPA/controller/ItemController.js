let itemCode;
let description;
let unitPrice;
let qty;

let txtItemCode = $("#txtItemCode");
let txtDescription = $("#txtDescription");
let txtUnitPrice = $("#txtUnitPrice");
let txtQty = $("#txtQty");

let txtSearchItem = $("#txtSearchItem");

let nextCode;
let lastCode;

disableButton(".btnSaveItem");
disableButton("#btnEditItem");
disableButton("#btnDeleteItem");

/* ---------------Initially Hide the Error Indicators----------*/

$("#itemForm p.errorText").hide();

/* -----------------------------------------------------------------CRUD Operation---------------------------------------------------*/

function addItem(){
    itemCode = txtItemCode.val();
    description = txtDescription.val();
    unitPrice = parseFloat(txtUnitPrice.val()).toFixed(2);
    qty = txtQty.val();  
    
    // if (unitPrice.split(".").length != 2) {
    //     unitPrice = unitPrice + ".00";
    // }

    // let itemObject = {
    //     code:itemCode,
    //     descrip:description,
    //     price:unitPrice,
    //     quantity:qty
    // }

    let itemObject = new Item(itemCode,description,unitPrice,qty);
    itemDB.push(itemObject);

    $("#totalItems").text("0"+itemDB.length);

    loadAllItems(itemDB);
}

function updateItem(){
    let obj;

    itemCode = txtItemCode.val();
    description = txtDescription.val();
    unitPrice = txtUnitPrice.val();
    qty = txtQty.val();

    for (let i in itemDB) {
        if (itemDB[i].getItemCode() == itemCode) {
            obj = itemDB[i];

            // obj.code = itemCode;
            // obj.descrip = description;
            // obj.price = unitPrice;
            // obj.quantity = qty;

            obj.setItemCode(itemCode);
            obj.setDescription(description);
            obj.setUnitPrice(unitPrice);
            obj.setQtyOnHand(qty);
        }
    }
    // console.log(itemDB);
    loadCmbItemCode();
    loadCmbDescription();
    clearItemFields();
}

function deleteItem(row){
    if (window.confirm("Do you really need to delete this Item..?")) {

        for (let i in itemDB) {
            if (itemDB[i].getItemCode() == itemCode) {
                itemDB.splice(i,1);
            }
        }  
        $(row).remove();
        reset_ItemForm();
    }
    loadCmbItemCode();
    loadCmbDescription();
    clearItemFields();
}

function loadAllItems(itemDB){
    $("#tblItem-body").empty();

    for (let i in itemDB) {
        // newRow = `<tr>
        //             <td>${itemDB[i].code}</td>
        //             <td>${itemDB[i].descrip}</td>
        //             <td>${itemDB[i].price}</td>
        //             <td>${itemDB[i].quantity}</td>
        //         </tr>`;

        newRow = `<tr>
                    <td>${itemDB[i].getItemCode()}</td>
                    <td>${itemDB[i].getDescription()}</td>
                    <td>${itemDB[i].getUnitPrice()}</td>
                    <td>${itemDB[i].getQtyOnHand()}</td>
                </tr>`;

        $("#tblItem-body").append(newRow);
    }

    loadCmbItemCode();
    loadCmbDescription();
    clearItemFields();
}

function searchItem(searchValue) { 
    let obj;

    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode() == searchValue) {
            obj = itemDB[i];
        }
    }

    if (obj) {
        txtItemCode.val(obj.getItemCode());
        txtDescription.val(obj.getDescription());
        txtUnitPrice.val(obj.getUnitPrice());
        txtQty.val(obj.getQtyOnHand());

        validate_ItemForm();

    } else {
        alert("Item "+ searchValue + " doesn't exist...");
        reset_ItemForm();
        $(txtSearchItem).focus();
    }

}

/* ------------------Save Item------------*/

/* When/after a new Item is Saved:
    1. add Item to table
    2. fill input fields when a row is selected
    3. delete the selected Item from the table
*/

function isItemAlreadyExist(){
    response = itemDB.find(function (obj) {  
        return obj.getItemCode() == txtItemCode.val();
    });
}

function checkDB_BeforeSaveItem () {

    nextCode = txtItemCode.val().split("-")[1];

    if (itemDB.length == 0) {
        lastCode = "C00-000";
    } else {
        lastCode = itemDB.slice(itemDB.length-1,itemDB.length)[0].getItemCode(); 
    }

    lastCode = lastCode.split("-")[1]; 

    if (response) {
        alert("An Item already exists with Code: "+ txtItemCode.val() +"...");
        
    } else if (nextCode < lastCode) { 
        lastCode++;
        
        if (lastCode < 9) {
            alert("Code: "+txtItemCode.val()+" is not available...Please use Code : I00-00"+lastCode); //C00-004
            
        } else if (lastCode >= 10) {
            alert("Code: "+txtItemCode.val()+" is not available...Please use Code : I00-0"+lastCode); //C00-004
        }
    
    } else if (nextCode > ++lastCode) {

        if (lastCode < 9) {
            alert("Next available ItemCode is: I00-00"+lastCode); 

        } else if (lastCode >= 10) {
            alert("Next available ItemCode is: I00-0"+lastCode); 
        }

    } else {
        if (window.confirm("Do you really need to add this Item..?")) {
            addItem();
            reset_ItemForm();
        }
    }
}

$(".btnSaveItem").click(function () { 
    isItemAlreadyExist();
    checkDB_BeforeSaveItem();
    select_ItemRow();

    $("#tblItem-body>tr").off("dblclick");
    delete_ItemRowOnDblClick();
});

/* ------------------Update Item------------*/

$("#btnEditItem").click(function (e) { 
    select_ItemRow();

    if (window.confirm("Do you really need to update Item " + itemCode + "..?")) {
        //$("#tblItem-body").find(rowSelected).replaceWith(updateItem());
        updateItem();
        loadAllItems(itemDB);
        reset_ItemForm();

        select_ItemRow();
        $("#tblItem-body>tr").off("dblclick");
        delete_ItemRowOnDblClick();
    }
});

/* ------------------Search Item------------*/
 
// $("#btnSearchItem").off("click");

// $("#btnSearchItem").click(function (e) { 
//     searchItem(txtSearchItem.val());
// });

$("#txtSearchItem").keyup(function (e) {
    searchValue = $(this).val();

    $("#btnSearchItem").off("click"); 
    $("#btnSearchItem").click(function (e) { 
        searchItem(searchValue);
    });

    if(e.key == "Enter") {
        // $("#btnSearchItem").off("click");
        searchItem(searchValue);
    }

    $("#tblItem-body>tr").each(function(){  
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


/* -------------------------------------------------------------------Validation--------------------------------------------------- */

/* --------------------------Validate & Jump to Next Field On Enter---------------------------------*/

var regExItemCode = /^(I00-)[0-9]{3,4}$/;
var regExDescription = /^[A-Z][a-z ]{3,9}[A-z]{2,10}$|^[A-Z][a-z]{4,20}$/;
var regExUnitPrice = /^[1-9][0-9]*([.][0-9]{2})?$/;
var regExQty = /^[0-9]+$/

// function disableBtnSaveItem(btn) {
//     $(btn).attr("disabled", "disabled");
// }

// function disableBtnEditItem(btn) {
//     $(btn).attr("disabled", "disabled");
// }

// function disableBtnDeleteItem(btn) {
//     $(btn).attr("disabled", "disabled");
// }

// function enableBtnSaveItem(btn) {
//     $(btn).removeAttr("disabled");
// }

// function enableBtnEditItem(btn) {
//     $(btn).removeAttr("disabled");
// }

// function enableBtnDeleteItem(btn) {
//     $(btn).removeAttr("disabled");
// }

function select_ItemRow(){
    $("#tblItem-body>tr").click(function () { 
        rowSelected = this;
        itemCode = $(this).children(':first-child').text();
        
        searchItem(itemCode);

        enableButton("#btnEditItem");
        enableButton("#btnDeleteItem");

        $("#btnDeleteItem").off("click"); 

        /* ------------------Delete Item------------*/

        $("#btnDeleteItem").click(function () { 
            deleteItem(rowSelected);
        });
    });
}

function delete_ItemRowOnDblClick() {
    $("#tblItem-body>tr").dblclick(function () { 
        rowSelected = $(this);
        deleteItem(rowSelected);
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

        disableButton(".btnSaveItem");
        disableButton("#btnEditItem");
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

        disableButton(".btnSaveItem");
        disableButton("#btnEditItem");
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

        disableButton(".btnSaveItem");
        disableButton("#btnEditItem");
        return false;
    }
}

function validate_Qty (input, txtField) {  

    if (regExQty.test(input)) {
        changeBorderColor("valid", txtField);
        
        enableButton(".btnSaveItem");
        enableButton("#btnEditItem");

        $("#itemForm p.errorText").eq(3).hide();
        return true;

    } else{
        changeBorderColor("invalid", txtField);
        $("#itemForm p.errorText").eq(3).show();
        $("#errorQty").text("*Required Field*  Only Numbers");

        disableButton(".btnSaveItem");
        disableButton("#btnEditItem");
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

    disableButton(".btnSaveItem");
    disableButton("#btnEditItem");
    disableButton("#btnDeleteItem");

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

$("#txtItemCode, #txtDescription, #txtUnitPrice, #txtQty").keydown(function (e) { 
    $("#btnSearchItem").off("click");
    if (e.key === "Tab") {
        e.preventDefault();
    }
});

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
        isItemAlreadyExist();
        checkDB_BeforeSaveItem();
        select_ItemRow();
    }

    $("#tblItem-body>tr").off("dblclick"); 
    delete_ItemRowOnDblClick();
});

/* -----Clear Fields-------*/

$("#btnClearItemFields").click(function () { 
    reset_ItemForm();
    $(txtSearchItem).val("");
    loadAllItems(itemDB);
    select_ItemRow();
});
