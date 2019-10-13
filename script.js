let kitchenRight = 'http://192.168.1.167';
let kitchenLeft = 'http://192.168.1.169';
let globalStatus = 0;
let leftStatus = 0;
let rightStatus = 0;

$(document).ready(function() {
    $.ajax({
        url: 'led/status.txt', //kitchen right
        method: 'GET',
        dataType: 'text',
        success: function (result) {
            globalStatus = result;
            btnStatus();
            singleButton('kitchenRight', result);
        }
    });

    $.ajax({
        url: kitchenLeft + '/kitchenLights/led/status.txt', //kitchen right
        method: 'GET',
        dataType: 'text',
        success: function (result) {
            singleButton('kitchenLeft', result);
        }
    });
    
    $('#btnToggle').on('click', function(e){
        let state;
        if(globalStatus == 0) {
            state = 'on';
            globalStatus = 1;
        } else {
            state = 'off'
            globalStatus = 0;
        }

        //right
        $.ajax({
            url: '/api/kitchen?status=' + state,
            method: 'GET',
            success: function(result) {
                console.log(result);
                singleButton('kitchenRight', result);
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
                singleButton('kitchenLeft', result);
        }
    });
        e.preventDefault();
    });

    function btnStatus() {
        if(globalStatus == 0) {
            $('#btnToggle').text('Turn On');
            $('#btnToggle').removeClass().addClass('btn btn-block btn-dark');
        } else {
            $('#btnToggle').text('Turn Off')
            $('#btnToggle').removeClass().addClass('btn btn-block btn-light');
        }
    }

    $('#kitchenRight, #kitchenLeft').on('click', function(e){
        let side;
        if($(e.target).data('side') == 'left') {
            side = 'kitchenLeft';
            url = kitchenLeft;
        } else {
            side = 'kitchenRight';
            url = kitchenRight;
        }
        $.ajax({
            url: url + '/api/kitchen/toggle', //kitchen right
            method: 'GET',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                singleButton(side, result.status);
            }
        });
        e.preventDefault();
    });

    function singleButton(side, state) {
        console.log(state);
        if(state == "0") {
            $('#' + side).text('Turn On');
            $('#' + side).removeClass().addClass('btn btn-block btn-dark');
        } else {
            $('#' + side).text('Turn Off')
            $('#' + side).removeClass().addClass('btn btn-block btn-light');
        }
    }
});