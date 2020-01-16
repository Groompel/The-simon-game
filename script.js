//                 Jan Feb      Mch Apr May Jun Jul Aug Sep Oct Nov Dec
var daysInMonths = [31, [28,29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var datingDate = new Date("Apr 15, 2019 21:00:00");

// Set the date we're counting down to
var countDownDate = datingDate;
var countDownDateMillis = datingDate.getTime();

// Counting the number of days without months

function countDays (days, startDate, type) {
  var i = startDate.getMonth();
  while(days - daysInMonths[i] >= 0){
    if(i == 1){
      if(startDate.getFullYear % 4  == 0) {
        days -= daysInMonths[i][1];
      }
      else
        days -= daysInMonths[i][0];
    }
    else
       days -= daysInMonths[i];
    
    i++;
  } 

  if(type == "months")
    return i - startDate.getMonth();
  else if(type == "days")
    return days;
}

// function countYears(days, startDate) {
//   var i = startDate.getFullYear();
//   while(days - 365 >= 0){
//     if()
//   }
// }

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date();
  var nowMillis = new Date().getTime();

  // Find the distance between nowMillis and the count down date
  var distance = nowMillis - countDownDateMillis;

  // Time calculations for days, hours, minutes and seconds
  var totalDays = Math.floor(distance / (1000 * 60 * 60* 24));
  // var years = now.getFullYear() - datingDate.getFullYear();
  var months = countDays(totalDays, datingDate, "months");
  var days = countDays(totalDays, datingDate, "days");
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="timer"
//   document.getElementById("timer").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";
  // document.getElementById("num-years").innerHTML = years;
  // document.getElementById("years").innerHTML = "л";
  document.getElementById("num-months").innerHTML = months;
  document.getElementById("months").innerHTML = "м";
  document.getElementById("num-days").innerHTML = days;
  document.getElementById("days").innerHTML = "д";
  document.getElementById("num-hours").innerHTML = hours;
  document.getElementById("hours").innerHTML = "ч";
  document.getElementById("num-minutes").innerHTML = minutes;
  document.getElementById("minutes").innerHTML = "м";
  document.getElementById("num-seconds").innerHTML = seconds;
  document.getElementById("seconds").innerHTML = "с";

  // If the count down is finished, write some text
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("timer").innerHTML = "EXPIRED";
//   }
}, 1000);
