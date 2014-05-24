$(document).ready(function() {
    $('body').on('click', '#search', function(e) {
        e.preventDefault();
        var domain = $('#domain').val();
        //Ajax post method:$(selector).post(URL,data,function(data,status,xhr),dataType)
        // $.post("query/getQry", {
        //     domain: domain
        // }, function(msg) {
        //     console.log("Data Saved: " + msg);
        //     $('#response').html(msg);
        //     if (msg.toString = "5 IP Adderss prohibited") {
        //         $('#response').html("抱歉您查詢的網域已使用");

        //     } else {
        //         //$(".alert").alert("您查詢的網域目前無人使用")
        //         $('#response').html("您查詢的網域目前無人使用");
        //     }
        // }

         $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/query/getQry',
            data: {
                domain: domain
            },function(msg) {
            console.log("Data Saved: " + msg);
            $('#response').html(msg);
            if (msg.toString = "5 IP Adderss prohibited") {
                $('#response').html("抱歉您查詢的網域已使用");

            } else {
                //$(".alert").alert("您查詢的網域目前無人使用")
                $('#response').html("您查詢的網域目前無人使用");
            }
            },
            dataType: 'json'
        });
    });
});
