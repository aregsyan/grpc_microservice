(function($) {

    window.onload = function () {
        initConnected();
        initSendClick();
    }

    function initConnected() {
        $.ajax({
            url: '/connected',
            type: 'GET',
            dataType: 'json',
            processData: false,
            contentType: 'application/json',
        }).done(function(response) {
            addToHistory(response.message, 'microservice', true);
        });
    }

    function initSendClick() {
        $('#client_send').on('click', function(e) {
            e.preventDefault();
            var fd = {
                name: $('#client_name').val(),
                message: $('#client_message').val()
            };
            addToHistory(fd.message, fd.name)
            sendMessage(fd);
        });
    }

    function addToHistory(message, name, res) {
        var cl = "container" + (res && " darker" || "");
        var cl1 = !res && "right" || ""
        var html = '<div class='+ cl + '><p class="' + cl1 + '" style="width:100%;">' + name + '<p>' + message + '</p></div>';
        $('#history').append(html);
    }

    function sendMessage(fd) {
        $.ajax({
            url: '/message',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(fd),
            processData: false,
            contentType: 'application/json',
        }).done(function(response) {
            addToHistory(response.message, 'microservice', true);
        });
    }
})(jQuery);
