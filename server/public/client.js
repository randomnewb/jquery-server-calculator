$(readyNow);

function readyNow() {
  console.log("Ready");

  $("body").on("click", ".expression", holdExpression);
  $("body").on("click", "#submit", sendCalculation);
}

let expression = "";
let clickedExpression = "";

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
    clickedExpression.removeClass("clickedButton");
    $("#inputOne").val("");
    $("#inputTwo").val("");
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
