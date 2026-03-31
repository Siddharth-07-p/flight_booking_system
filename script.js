// Allow only future dates
let today = new Date().toISOString().split("T")[0];
document.getElementById("travelDate").min = today;


// SEARCH BUTTON

document.getElementById("searchBtn").addEventListener("click", function(){

let from =
document.getElementById("fromCity").value;

let to =
document.getElementById("toCity").value;

let date =
document.getElementById("travelDate").value;

let passengers =
document.getElementById("passengers").value;

let flightClass =
document.getElementById("flightClass").value;


// Validation

if(from === to){

showToast("From and To cannot be same", "error");

return;

}

if(date === ""){

showToast("Please select travel date", "error");

return;

}


// Save search data

localStorage.setItem("searched","yes");

localStorage.setItem("fromCity",from);
localStorage.setItem("toCity",to);
localStorage.setItem("date",date);
localStorage.setItem("passengers",passengers);
localStorage.setItem("class",flightClass);


// Go booking page

window.location.href="booking.html";

});