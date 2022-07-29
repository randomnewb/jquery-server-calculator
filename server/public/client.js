$(readyNow);

function readyNow() {
  console.log("Ready");

  // Show the history of calculations on page load, even after refreshing
  getCalculation();

  // Event handlers when user clicks the various buttons
  $("body").on("click", ".expression", holdExpression);
  $("body").on("click", "#submit", checkInput);
  $("body").on("click", "#clear", clearFields);
  $("body").on("click", "#reset", resetMemory);

}

let expression = "";
let clickedExpression = "";

/**
 * A function that alerts the user when an input field 
 * has not been filled out or an expression has not been selected
 */

function checkInput() {
    // console.log(($('#calculator').children('.clickedButton').length))
    // console.log($('#calculator').children('.input').val());
    if ((!$('#calculator').children('.input').val()) || ($('#calculator').children('.clickedButton').length) === 0) {
        alert('Please make sure all input fields are complete and you chose an expression');
        // $(this).parents('p').addClass('warning')
    } else {
        sendCalculation();
    }
}

// Send information to the server
function sendCalculation() {
  $.ajax({
    type: "POST",
    url: "/calculation",
    data: {
      inputOne: $("#inputOne").val(),
      inputTwo: $("#inputTwo").val(),
      expression: expression,
    },
  }).then(function (response) {
    console.log(response);
    getCalculation();
    $("#memory").text('');
    expression = "";
    console.log("after getCalculation");
  });
}

/**
 * A function that highlights the button clicked 
 * through adding a class 'clickedButton'
 * 
 * It holds the expression clicked in a variable 'expression' through the data attribute
 * It also holds the particular element clicked in a holder variable 'clickedExpression'
 * for use later in removing the clickedButton class
 * 
 * @returns One of four expressions (add, subtract, multiply, divide)
 */
function holdExpression() {
  $(".expression").removeClass("clickedButton");
  $(this).addClass("clickedButton");
  expression = $(this).data("expression");
  console.log("In hold expression", expression);

  clickedExpression = $(this);
  return expression;
}

function getCalculation() {
  $.ajax({
    type: "GET",
    url: "/calculation",
  }).then(function (response) {
    // $(".expression").removeClass("clickedButton");
    // $("#inputOne").val("");
    // $("#inputTwo").val("");
    clearFields();
    console.log(response);
    console.log("in getCalc then response");
    $("#history").empty();
    for (let prop of response) {
      $("#history").append(`
            <div class="calculation-history">
                ${prop.inputOne} 
                ${prop.symbol} 
                ${prop.inputTwo}
                 = 
                ${prop.computation} 
            </div>
        `);
    }
  });
}

function clearFields() {
    $(".expression").removeClass("clickedButton");
    $("#inputOne").val("");
    $("#inputTwo").val("");
}

function resetMemory() {
    $.ajax({
        type: 'POST',
        url: '/delete',
    }).then(function (response) {
        console.log('Memory cleared')
        $("#memory").text('Memory cleared');
        $("#history").empty();
        expression = '';
    });
}