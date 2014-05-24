
$(document).ready(function() {
    //
    console.log('hello');

    $('.linkAddToCart').on('click', function (event){
        console.log('this', this);
        var planName = $(this).attr('data-name');
//this & attribute(data-name)
        console.log('on click');
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/cart',
            data: {
                planName: planName
            },
            success: function onSucess (data, textStatus, jqXHR) {
                console.log('add to cart data', data);
                $('#cart li').remove();
                $.each(data.cart, function(index, value){
                    $('#cart').append("<li>"+value.name+"</li>");
                })
            },
            dataType: 'json'
        });
    });

//clear cart

    $('.clearCart').on('click', function (event){
        event.preventDefault();
        console.log('this', this);
        var planName = $(this).attr('data-name');
        // planName = "-" + planName;
//this & attribute(data-name)
        console.log('on click');
        $.ajax({
            type: 'get',
            url: 'http://localhost:8000/cart/clear',
            data: '',
            success: function onSucess (data, textStatus, jqXHR) {
                $('#cart li').remove();
                // console.log('clear cart data', data);
                $('#cart').append("<li>"+value.name+"</li>");
            },
            dataType: 'json'
        });
    });
    $('.checkOut').on('click', function (event){
        alert("請先登入帳號，謝謝");
        // function{
        //     href.
        // }
    });
    $('.checkout').on('click', function (event){
        alert("check out page")
        // function{
        //     href.
        // }
    });

});


//$('.updateCart').on('click', function (event){
//         console.log('this', this);
//         var planName = $(this).attr('data-name');
// //this & attribute(data-name)
//         console.log('on click');
//         $.ajax({
//             type: 'POST',
//             url: 'http://localhost:8000/cart/update',
//             data: {
//                 planName: planName
//             },
//             success: function onSucess (data, textStatus, jqXHR) {
//                 console.log('update cart data', data);
//                 $('#cart').text("data.item");
//             },
//             dataType: 'json'
//         });
//     });

//Shopify API

    // $('.removeFromCart').click(function(event) {

    //     var prodVar = $(this).data('prodvar');
    //     var prodQty = $('.cartCount.cart'+prodVar).html();

    //     $('.cartCount.cart'+prodVar).html("0");
    //     cCart.update(prodVar,prodQty);