"use strict";

jQuery(document).ready(function ($) {
  var operators = {
    "%": function _(x, y) {
      return x % y;
    },
    "/": function _(x, y) {
      return x / y;
    },
    "*": function _(x, y) {
      return x * y;
    },
    "-": function _(x, y) {
      return x - y;
    },
    "+": function _(x, y) {
      return x + y;
    }
  };
  var lastAns = "";
  var currentAns = "";
  //number and operator button clicks
  var opFunction = function opFunction() {
    var str = $("#output").html();
    if ($("#output").hasClass("ans")) {
      $("#output").removeClass("ans");
      $("#output").html("");
      if (/([^+\-*%\/])/g.test(str[str.length - 1])) {
        $("#output").append($(this).html());
      }
      //if this entry is not a function, append this
      else if (/([^+\-*%\/])/g.test($(this).html())) {
          $("#output").append($(this).html());
        }
    }
    //check if last entry was not a function, append anything
    else if (/([^+\-*%\/])/g.test(str[str.length - 1])) {
        $("#output").append($(this).html());
      }
      //if this entry is not a function, append this
      else if (/([^+\-*%\/])/g.test($(this).html())) {
          $("#output").append($(this).html());
        }
  };
  $(".operator").click(opFunction);
  //AC clear all function
  var clearFunction = function clearFunction() {
    $("#output").html("");
    $("#output").removeClass("ans");
    lastAns = "";
    currentAns = "";
  };
  $(".clear").click(clearFunction);
  //CE clear last function
  var backFunction = function backFunction() {
    var str = $("#output").html();
    str = str.substring(0, str.length - 1);
    $("#output").html(str);
  };
  $(".back").click(backFunction);
  //equals function
  var equalsFunction = function equalsFunction() {
    var data = $("#output").html().split(/([+\-*%\/])/g);
    var decimalCount = 0;
    //fix floating point issue only works for up to 6 decimal places
    data.map(function (ea) {
      var thisNum = Number(ea);
      if (thisNum) {
        var thisCount = thisNum != Math.floor(thisNum) ? thisNum.toString().split('.')[1].length : 0;
        thisCount > decimalCount ? decimalCount = thisCount : decimalCount = decimalCount;
      }
    });
    data.map(function (e, i) {
      if (i === 0 && /([^+\-*%\/])/g.test(data[i])) {
        currentAns = Number(e);
      } else if (currentAns === "") {
        currentAns = Number(e);
      } else if (/([+\-*%\/])/g.test(e)) {
        currentAns = operators[e](Number(currentAns), Number(data[i + 1]));
      }
    });
    $("#output").html(currentAns.toFixed(decimalCount));
    $("#output").addClass("ans");
    lastAns = currentAns;
  };
  $(".equals").click(equalsFunction);
  //call-ans function
  var callAnsFunction = function callAnsFunction() {
    var str = $("#output").html();
    if (/([+\-*%\/])/g.test(str[str.length - 1])) {
      $("#output").append(lastAns);
    }
  };
  $(".call-ans").click(callAnsFunction);
  //decimals
  var decimalFunction = function decimalFunction() {
    var curOperation = $("#output").html().split(/([+\-*%\/])/g);
    var curNumber = curOperation[curOperation.length - 1];
    if (!/([.])/g.test(curNumber)) {
      $("#output").append(".");
    }
  };
  $(".decimal").click(decimalFunction);

  //handle keypresses
  // $(document).keyup(function(e) {
  //   let key = String.fromCharCode(e.which);
  //   console.log(key);
  // })
});