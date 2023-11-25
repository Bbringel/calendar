/*
 * Student Name: Bianca Rocha Rodrigues Bringel
 * Student ID: 041086978
 * Course: CST8209 - Web Programming I
 * Semester: Fall 2022
 * Assignment: Calendar of Events - Part 4
 * Date Submitted: December 18, 2022
 */

// Clock Animation:

/*
Source: https://lenadesign.org/2021/05/19/html5-canvas-analog-clock/
Author: Lena Stanley
Date Retrieved: December 16, 2022
*/

var canvas = document.getElementById("canvas-clock");
var contex = canvas.getContext("2d");
var radius = canvas.height / 2;
contex.translate(radius, radius);
radius = radius * 0.65
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(contex, radius);
  drawNumbers(contex, radius);
  drawTime(contex, radius);
}

function drawFace(contex, radius) {
  var grad;
  contex.beginPath();
  contex.arc(0, 0, radius, 0, 2*Math.PI);
  contex.fillStyle = '#e0e1dd';
  contex.fill();
  contex.strokeStyle = "#152733";
  contex.lineWidth = radius*0.1;
  contex.stroke();
  contex.beginPath();
  contex.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  contex.fillStyle = '#333';
  contex.fill();
}

function drawNumbers(contex, radius) {
  var ang;
  var num;
  contex.font = radius*0.15 + "px Helvetica";
  contex.textBaseline="middle";
  contex.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    contex.rotate(ang);
    contex.translate(0, -radius*0.85);
    contex.rotate(-ang);
    contex.fillText(num.toString(), 0, 0);
    contex.rotate(ang);
    contex.translate(0, radius*0.85);
    contex.rotate(-ang);
  }
}

function drawTime(contex, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(contex, hour, radius*0.5, radius*0.07);
    
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(contex, minute, radius*0.8, radius*0.07);
    
    second=(second*Math.PI/30);
    drawHand(contex, second, radius*0.9, radius*0.02);
}

function drawHand(contex, pos, length, width) {
    contex.beginPath();
    contex.lineWidth = width;
    contex.lineCap = "round";
    contex.moveTo(0,0);
    contex.rotate(pos);
    contex.lineTo(0, -length);
    contex.stroke();
    contex.rotate(-pos);
}

//Calendar

function Event(displayDate, title, desc) {

  this.displayDate = displayDate;
  this.title = title;
  this.desc = desc;

  this.getEventDOM = function () {
    //return document.createTextNode(this.title);
    return $(this.title);
  }

}

// declare an object Calendar
function Calendar(elem) {
 
  // array of month names for display purposes
  this.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
  // array of day names for display purposes
  this.dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  // HTML element in which to display the calendar
  this.elem = elem;
   
  // method display generates calendar HTML
  this.display = function(displayDate = new Date()) {
    // clear the calendar element
    //this.elem.innerHTML = "";
    //$(elem).html(); 
    $(elem).empty();
     
    // if param displayDate is missing, use current month
    this.displayDate = new Date(displayDate);
    
    // get the number of days in the month
    let daysInMonth = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + 1, 0).getDate();
    
    // get array of days to display
    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(displayDate.getFullYear(), displayDate.getMonth(),i));
    }
    
    // print the display month header
    //let h1 = document.createElement("h1");

    let h1 = $("<h1>").text(this.monthNames[this.displayDate.getMonth()] + " " + this.displayDate.getFullYear());

    //create a text node with the desired content
    // let textNode = document.createTextNode(this.monthNames[this.displayDate.getMonth()] + " " + this.displayDate.getFullYear());

    let textNode; 

    h1.append(textNode);

    this.elem.append(h1);
    
    // generate tabular calendar
    let newTable = $("<table>"); 
    
    let tableRow = $("<tr>");
    
    let tableData = $("<td>");
   
    //create Button
    let prevMonthButton = $("<button>");
    prevMonthButton.attr("value","Previous Month");
    textNode = "<<";
    prevMonthButton.append(textNode); 

    //add event handler to the button:
    prevMonthButton.click(function () {
      cal.display(new Date(displayDate.getFullYear(), (displayDate.getMonth() - 1)));
    });

    tableData.append(prevMonthButton);

    tableRow.append(tableData);

    tableData = $("<td>");
    tableData.attr("colspan", "5");

    tableRow.append(tableData);

    //3rd cell in a row
    tableData = $("<td>");

    //create Button
    let nextMonthButton = $("<button>").attr("value","Next Month");
    textNode = ">>";
    nextMonthButton.append(textNode);
    nextMonthButton.click(function () {
      cal.display(new Date(displayDate.getFullYear(), (displayDate.getMonth() + 1)));
    });

    tableData.append(nextMonthButton);

    tableRow.append(tableData);

    newTable.append(tableRow);
  
    // weekday headers
    tableRow = $("<tr>");

    for (const elem of this.dayNames) {
      tableHead = $("<th>").text(elem);
      // textNode = document.createTextNode(elem);
      //tableData.appendChild(textNode);
      tableRow.append(tableHead);
    }

    newTable.append(tableRow);

    // first row
    // fill with blank cells until 1st of month

    tableRow = $("<tr>");

    const TODAY = new Date();
    TODAY.setHours(0,0,0,0);
    
    var valueOfDate;
     
    for (let i = 0; i < days[0].getDay(); i++) {
      tableData = $("<td>");
      tableRow.append(tableData);
    }

    for (let i = 0; i < days.length; i++) {
      
      if (days[i].getDay() % 7 == 0) { 
        newTable.append(tableRow);

        //start a new row (new week)
        tableRow = $("<tr>");
      }

      tableData = $("<td>").attr("class","day").text(days[i].getDate());
      //let textNode = document.createTextNode(this.dayNames[this.days[i].getDate()]);
      tableRow.append(tableData);
    }

    // last week of month empty cells
    for (let i = days.at(-1).getDay() + 1; i < 7; i++) {
      tableRow.append($("<td>"));
    }

    // completed a row, append it to the table
    newTable.append(tableRow);
        
    // output the calendar to the HTML element
    this.elem.append(newTable);
  }
}

// declare a instance of Calendar
const cal = new Calendar($("#calendar"));

// call the display() method
cal.display();

// Bootstrap Validation Form:

(function () {
  'use strict'
  const forms = document.querySelectorAll('.requires-validation')
  Array.from(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  // display a success message
const successSpan = $("#success")[0];
successSpan.appendChild(document.createTextNode("New event created!"));




