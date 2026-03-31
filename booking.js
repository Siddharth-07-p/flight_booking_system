function selectFlight(flightName, departure, arrival, price)
{

let searchData = JSON.parse(localStorage.getItem("searchData"));

if(!searchData)
{
showToast("Please search flights first", "error");
window.location.href = "index.html";
return;
}


// Create booking data
let bookingData = {

route: searchData.from + " → " + searchData.to,

date: searchData.date,

flight: flightName,

departure: departure,

arrival: arrival,

passengers: searchData.passengers,

class: searchData.class,

price: price

};


// Save booking
localStorage.setItem("bookingData", JSON.stringify(bookingData));


// Go to confirmation
window.location.href = "confirmation.html";

}