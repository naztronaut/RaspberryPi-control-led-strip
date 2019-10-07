$(document).ready(function() {
    let status = 0;

    $.ajax({
        url: 'led/status.txt',
        method: 'GET',
        dataType: 'text',
        success: function (result) {
            status = result;
            btnStatus();
        }
    });
    
    $('#btnToggle').on('click', function(e){
        let state;
        if(status == 0) {
            state = 'on';
            status = 1;
        } else {
            state = 'off'
            status = 0;
        }
        $.ajax({
            url: '/api/kitchen?status=' + state,
            method: 'GET',
            success: function(result) {
                console.log(result);
            },
            complete: btnStatus
        });
        e.preventDefault();
    });

    function btnStatus() {
        if(status == 0) {
            $('#btnToggle').text('Turn On');
            $('#btnToggle').removeClass().addClass('btn btn-block btn-dark');
        } else {
            $('#btnToggle').text('Turn Off')
            $('#btnToggle').removeClass().addClass('btn btn-block btn-light');
        }
    }
});