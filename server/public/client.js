$(readyNow)

function readyNow() {
    console.log('Ready');

    $('body').on('click','.expression',holdExpression);
    $('body').on('click','#submit',sendCalculation);
}

let expression = '';

function sendCalculation() {
    console.log('Calculation sent!');
    console.log(expression);
    const newCalculation = {
        inputOne: $('#inputOne').val(),
        inputTwo: $('#inputTwo').val(),
        expression: expression,
    };
};

function holdExpression() {
    $('.expression').removeClass("clickedButton");
    $(this).addClass("clickedButton");
    expression = $(this).data('expression');
    console.log('In hold expression',expression);
    return expression;
}