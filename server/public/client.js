$(readyNow)

function readyNow() {
    console.log('Ready');

    $('body').on('click','.expression',holdExpression);
    $('body').on('click','#submit',sendCalculation);
}

let expression = '';

function sendCalculation() {
    $.ajax({
        type:'POST',
        url: '/calculation',
        data: {
            inputOne: $('#inputOne').val(),
            inputTwo: $('#inputTwo').val(),
            expression: expression,
        }
    }).then(function (response) {
        console.log(response);
        getCalculation;
    })
};

function holdExpression() {
    $('.expression').removeClass("clickedButton");
    $(this).addClass("clickedButton");
    expression = $(this).data('expression');
    console.log('In hold expression',expression);
    return expression;
}

function getCalculation() {
    $.ajax({
        type: 'GET',
        url: '/calculation'
    }).then(function (response) {
        console.log(response);
        $('#history').append(`
            <div class="calculation-history">
                ${response} 
            </div>
        `);
        $('#inputOne').val('');
        $('#inputTwo').val('');
        $('.expression.').removeClass("clickedButton");
    });

};