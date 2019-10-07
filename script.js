$(document).ready(function() {
    let status = 0;

    $.ajax({
        url: 'led/status.txt',
        method: 'GET',
        dataType: 'text',
        success: function (result) {
            console.log(result);
            status = result;
            btnStatus();
        //     if(result == 0) {
        //     $(this).text('Turn Off')
        //     $(this).removeClass().addClass('btn btn-block btn-light');
        //     status = 'on';
        // } else {
        //     $(this).text('Turn On');
        //     $(this).removeClass().addClass('btn btn-block btn-dark');
        //     status = 'off';
        // }
        }
    });

    // $('#turnOnBtn').on('click', function(e){
    //     $.ajax({
    //         url: '/api/kitchen?status=on',
    //         method: 'GET',
    //         success: function(result) {
    //             console.log(result);
    //      }
    //     });
    //     e.preventDefault();
    // });
    //
    // $('#turnOffBtn').on('click', function(e){
    //     $.ajax({
    //         url: '/api/kitchen?status=off',
    //         method: 'GET',
    //         success: function(result) {
    //             console.log(result);
    //      }
    //     });
    //     e.preventDefault();
    // });
    
    $('#btnToggle').on('click', function(e){
        // let status;
        // if($(this).text() == 'Turn On') {
        //     $(this).text('Turn Off')
        //     $(this).removeClass().addClass('btn btn-block btn-light');
        //     status = 'on';
        // } else {
        //     $(this).text('Turn On');
        //     $(this).removeClass().addClass('btn btn-block btn-dark');
        //     status = 'off';
        // }
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
         }, complete: btnStatus
        });
        e.preventDefault();
    });

    function btnStatus() {
        if(status == 0) {
            $(this).text('Turn On');
            $(this).removeClass().addClass('btn btn-block btn-dark');
        } else {
            $(this).text('Turn Off')
            $(this).removeClass().addClass('btn btn-block btn-light');
        }
    }
});