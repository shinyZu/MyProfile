// $(document).ready(function () {
//     console.log(1);
//     $(".loader").show();

//     $("header").hide();
//     $("main").hide();
//     $("footer").hide();
//     // $("body").hide();
// });

// $(function () {
//     console.log(2);
//     $("header.header-position").hide();
//     $("#main").hide();
//     $("footer").hide();
//     // $("body").hide();
//     $(".loader").show();
// });

(function () {
    $("header").hide();
    $("main").hide();
    $("footer").hide();
    // $("body").hide();
    $(".loader").show();

})(jQuery);

$(window).on("load", function () {
    console.log(3);
    $("body").show();
    $("header").show();
    $("main").show();
    $("footer").show();

    $(".loader").hide();
});


// (function ($) {
//     $(window).on('load', function () {
//         $("header").show();
//         $("main").show();
//         $("footer").show();

//         $(".loader").hide();
//     });
// })(jQuery);
