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

    let itemObject = new Item(itemCode,description,unitPrice,qty);
    itemDB.push(itemObject);

    $("#totalItems").text("0"+itemDB.length);

    loadAllItems(itemDB);
    toastr.success("Item Saved Successfully...");

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

            obj.setItemCode(itemCode);
            obj.setDescription(description);
            obj.setUnitPrice(unitPrice);
            obj.setQtyOnHand(qty);
        }
    }
    loadCmbItemCode();
    loadCmbDescription();
    clearItemFields();
}

function deleteItem(row){
    itemCode = $(row).children(':nth-child(1)').text();
    
    swal({

        title: 'Are you sure you want to delete this Item..?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
        closeModal: true,

    }).then(result => {

        if (result) {

            swal({

                title: 'Deleted!',
                text: "Item  "+itemCode+ "  Deleted.",
                icon: 'success',
                buttons: ["OK"],
                timer: 2000,
                closeModal: true,
            })
            
            for (let i in itemDB) {
                if (itemDB[i].getItemCode() == itemCode) {
                    itemDB.splice(i,1);
                }
            }  
            $(row).remove();
            reset_ItemForm();
            $("#totalItems").text("0"+itemDB.length);
            
        }
    })
    
    // if (window.confirm("Do you really need to delete this Item..?")) {

    //     for (let i in itemDB) {
    //         if (itemDB[i].getItemCode() == itemCode) {
    //             itemDB.splice(i,1);
    //         }
    //     }  
    //     $(row).remove();
    //     reset_ItemForm();
    // }
    loadCmbItemCode();
    loadCmbDescription();
    clearItemFields();
}

function loadAllItems(itemDB){
    $("#tblItem-body").empty();

    for (let i in itemDB) {

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
        swal({
            title: "Item "+ searchValue + " doesn't exist...",
            text:"\n",
            icon: 'warning',
            buttons: false,
            timer: 2000,
            closeModal: true,
        })

        reset_ItemForm();
        $(txtSearchItem).focus();

        return false;
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
        alertText = "An Item already exists with Code: "+ txtItemCode.val() +"...";
        display_Alert("", alertText, "warning");
        
    } else if (nextCode < lastCode) { 
        lastCode++;
        
        if (lastCode < 9) {
            alertText = "Code: "+txtItemCode.val()+" is not available...\nPlease use Code : I00-00"+lastCode;
            display_Alert("", alertText, "info");
            
        } else if (lastCode >= 10) {
            alertText = "Code: "+txtItemCode.val()+" is not available...\nPlease use Code : I00-0"+lastCode;
            display_Alert("", alertText, "info");
        }
    
    } else if (nextCode > ++lastCode) {

        if (lastCode < 9) {
            alertTitle = "I00-00"+lastCode;
            alertText = "is the next Available Item Code";
            display_Alert(alertTitle,alertText,"info");

        } else if (lastCode >= 10) {
            alertTitle = "I00-0"+lastCode;
            alertText = "is the next Available Item Code";
            alertIcon = "info";
            display_Alert(alertTitle, alertText, "info");
        }

    } else {
        Swal.fire({
            text: "Are you sure you want to Save this Item..?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save',
            confirmButtonColor: '#1abc9c',
            customClass: {
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
            },
            allowOutsideClick: false,
            returnFocus: false,
    
        }).then(result => {
            if (result.isConfirmed) {
                addItem();
                reset_ItemForm(); 
            } 
        });
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

    Swal.fire({
        text: "Are you sure you want to Update this Item..?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Update',
        confirmButtonColor: '#3498db',
        customClass: {
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
        },
        allowOutsideClick: false,
        returnFocus: false,

    }).then(result => {
        if (result.isConfirmed) {
            updateItem();
            loadAllItems(itemDB);
            reset_ItemForm();

            select_ItemRow();
            $("#tblItem-body>tr").off("dblclick");
            delete_ItemRowOnDblClick();
        }
    });
});

/* ------------------Search Item------------*/

$("#txtSearchItem").keyup(function (e) {
    searchValue = $(this).val();

    $("#btnSearchItem").off("click"); 
    $("#btnSearchItem").click(function (e) { 
        searchItem(searchValue);
    });

    if(e.key == "Enter") {
        e.preventDefault();
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

function select_ItemRow(){
    $("#tblItem-body>tr").click(function () { 
        rowSelected = this;
        itemCode = $(this).children(':first-child').text();
        
        console.log(rowSelected);
        searchItem(itemCode);

        enableButton("#btnEditItem");
        enableButton("#btnDeleteItem");

        $("#btnDeleteItem").off("click"); 

        /* ------------------Delete Item------------*/

        $("#btnDeleteItem").click(function () { 
            deleteItem(rowSelected);
        });

        $("#tblItem-body>tr").off("dblclick"); 
        delete_ItemRowOnDblClick();
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
    
    if (e.code === "Enter") {
        e.preventDefault();

    }

});

$("#txtItemCode").keyup(function (e) { 
    input = txtItemCode.val();
    validate_ItemCode(input, this);

    if (e.code === "Enter" && isBorderGreen(this)){
        e.preventDefault();
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

