$(document).ready(function () {

    var url = "https://wind-bow.glitch.me/helix/streams?first=20";

    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            let username = data["user_name"];
            let curStreaming = data["game_id"];
           
            $("#users").prepend("<li>username + curStreaming</li>");
        },

        error: function (errorMessage) {
           console.log(errorMessage);
        }
    });
});