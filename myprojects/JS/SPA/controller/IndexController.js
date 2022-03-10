/* ----------------------------------------------------------------Navigation-----------------------------------------------------------*/

$("#nav-home").click(function () { 
    $("title").text("Home");

    $("#home-main").css('display', 'block');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").addClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").removeClass("active");
    
});

$("#nav-customer").click(function () {
    // swal({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     buttons: ["Cancel", "Delete"],
    //     dangerMode: true,
    //     closeModal: true,
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       swal(
    //         'Deleted!',
    //         'Your file has been deleted.',
    //         'success'
    //       )
    //     }
    //   })

    // swal({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     buttons: ["Cancel", "Delete"],
    //     dangerMode: true,
    //     closeModal: true,
    //   }).then(function () {
    //     swal(
    //         'Deleted!',
    //         'Your file has been deleted.',
    //         'success'
    //       )
    //   })

    // swal({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     buttons: ["Cancel", "Delete"],
    //     dangerMode: true,
    //     closeModal: true,
    // }).then(result => {
    //     if (result) {
    //     swal(
    //         'Deleted!',
    //         'Your file has been deleted.',
    //         'success'
    //         )
    //     }
    
    // })
      
    // Swal.fire({
    //     title: 'Error!',
    //     text: 'Do you want to continue',
    //     icon: 'question',
    //     confirmButtonText: 'Cool'
    //   })

    $("title").text("Customers");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'block');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").addClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").removeClass("active");

    $("#txtCustomerId").focus();
    
});

$("#nav-store").click(function () { 
    $("title").text("Store");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'block');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").addClass("active");
    $("#nav-orders a").removeClass("active");

    // $("#itemForm>div:nth-child(2)>div>input#txtItemCode").focus();

    $("#txtItemCode").focus();
    
});

$("#nav-orders").click(function () { 
    $("title").text("Orders");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'block');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").addClass("active");

    // setComboBoxes();
    
});

// toastr.options = {
//   "closeButton": false,
//   "debug": true,
//   "newestOnTop": false,
//   "progressBar": false,
//   "positionClass": "toast-top-right",
//   "preventDuplicates": false,
//   "onclick": null,
//   "showDuration": "300",
//   "hideDuration": "1000",
//   "timeOut": "5000",
//   "extendedTimeOut": "1000",
//   "showEasing": "swing",
//   "hideEasing": "linear",
//   "showMethod": "fadeIn",
//   "hideMethod": "fadeOut"
// }


let rowSelected;
let updatedRow;

let input;
let newRow;

let searchValue;
let response;

let color;

let alertText;
let alertTitle;
let alertIcon;

function isBorderGreen (inputField) {
    color = $(inputField).css('border-color');

    // if (color === "rgb(38, 222, 129)") {
    if (color === "rgb(39, 174, 96)") {
        return true;
    }
    return false;
}

function changeBorderColor(inputStatus, inputField) {
    switch (true) {
        case inputStatus === "valid":
            // $(inputField).css('border', '5px solid #26de81');
            $(inputField).css('border', '5px solid #27ae60');
            break;
        
        case inputStatus === "invalid":
            // $(inputField).css('border', '5px solid #ff3f34');
            $(inputField).css('border', '5px solid #e74c3c');
            break;
    
        default:
            $(inputField).css('border', '2px solid rgb(206, 212, 218)');
            break;
    }
}

function disableButton(btn) {
    $(btn).attr("disabled", "disabled");
}

function enableButton(btn) {
    $(btn).removeAttr("disabled");
}

function display_Alert(alertTitle,alertText,alertIcon){

    if (alertTitle == "") {
        swal({
            text: alertText,
            icon: alertIcon,
            buttons: "OK",
            closeModal: true,
            closeOnClickOutside: false,
        });

    } else {
        swal({
            title: alertTitle,
            text: alertText,
            icon: alertIcon,
            buttons: "OK",
            closeModal: true,
            closeOnClickOutside: false,
        });
    }
    
}