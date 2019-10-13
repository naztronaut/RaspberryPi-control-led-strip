let kitchenRight = 'http://192.168.1.169';
let kitchenLeft = 'http://192.168.1.167';
let globalStatus = 0;

$(document).ready(function() {
    $.ajax({
        url: 'led/status.txt', //kitchen right
        method: 'GET',
        dataType: 'text',
        success: function (result) {
            globalStatus = result;
            btnStatus();
            singleButton('Right', result);
        }
    });

    $.ajax({
        url: kitchenLeft + '/kitchenLights/led/status.txt', //kitchen right
        method: 'GET',
        dataType: 'text',
        success: function (result) {
            singleButton('Left', result);
        }
    });
    
    $('#btnToggle').on('click', function(e){
        let state;
        if(globalStatus == 0) {
            state = 'on';
            globalStatus = 1;
        } else {
            state = 'off';
            globalStatus = 0;
        }

        //right
        $.ajax({
            url: '/api/kitchen?status=' + state,
            method: 'GET',
            success: function(result) {
                singleButton('Right', globalStatus);
            },
            complete: btnStatus
        });

        //left
        $.ajax({
            url: kitchenLeft + '/api/kitchen?status=' + state, //kitchen right
            method: 'GET',
            dataType: 'text',
            success: function (result) {
                // status = result;
                singleButton('Left', globalStatus);
        }
    });
        e.preventDefault();
    });

    function btnStatus() {
        if(globalStatus == 0) {
            $('#btnToggle').text('Turn On');
            $('#btnToggle').removeClass().addClass('btn btn-block btn-dark');
            singleButton('Left', 0);
            singleButton('Right', 0);
        } else {
            $('#btnToggle').text('Turn Off')
            $('#btnToggle').removeClass().addClass('btn btn-block btn-light');
            singleButton('Left', 1);
            singleButton('Right', 1);
        }
    }

    $('#kitchenRight, #kitchenLeft').on('click', function(e){
        let side;
        if($(e.target).data('side') == 'left') {
            side = 'Left';
            url = kitchenLeft;
        } else {
            side = 'Right';
            url = kitchenRight;
        }
        $.ajax({
            url: url + '/api/kitchen/toggle', //kitchen right
            method: 'GET',
            dataType: 'json',
            success: function (result) {
                singleButton(side, result.status);
            }
        });
        e.preventDefault();
    });

    function singleButton(side, state) {
        if(state == "0") {
            $('#kitchen' + side).text(side + ' On');
            $('#kitchen' + side).removeClass().addClass('btn btn-block btn-dark');
        } else {
            $('#kitchen' + side).text(side + ' Off')
            $('#kitchen' + side).removeClass().addClass('btn btn-block btn-light');
        }
    }
});