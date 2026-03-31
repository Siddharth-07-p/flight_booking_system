// Check if flight was selected

let flightName = localStorage.getItem("flightName");


// If NO booking → redirect to home

if (!flightName) {

    showToast("No booking found. Please select a flight first.", "error");

    window.location.href = "index.html";

}


// If booking exists → load details

let from = localStorage.getItem("fromCity");
let to = localStorage.getItem("toCity");
let date = localStorage.getItem("date");
let passengers = localStorage.getItem("passengers");
let flightClass = localStorage.getItem("class");

let departure = localStorage.getItem("departure");
let arrival = localStorage.getItem("arrival");
let price = localStorage.getItem("price");


// Show data

document.getElementById("route").innerHTML =
from + " → " + to;

document.getElementById("date").innerHTML =
date;

document.getElementById("flight").innerHTML =
flightName;

document.getElementById("departure").innerHTML =
departure;

document.getElementById("arrival").innerHTML =
arrival;

document.getElementById("passengers").innerHTML =
passengers;

document.getElementById("class").innerHTML =
flightClass;

document.getElementById("price").innerHTML =
price;


// Booking ID

let bookingID = "FB" + Math.floor(Math.random()*100000);

document.getElementById("bookingID").innerHTML =
bookingID;


// Clear booking after showing

localStorage.removeItem("flightName");