document.getElementById('loan-form').addEventListener('submit', function(e){

  // Show Loader
  document.getElementById('loading').style.display = 'block';
 
 // Hide reults
 document.getElementById('results').style.display = 'none';
  setTimeout(calculateResults,2000);

  e.preventDefault();
}
);


// Calculating Results
function calculateResults(){
console.log('calculating...');

// Grabbing UI variables
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const monthlyPayment = document.getElementById('monthly-payment');
const years = document.getElementById('years');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest')
// .amount turns the entered string into a number and parseFloat turns it into a decimal
const principal = parseFloat(amount.value);
// dividing by 100 gives us percentage /12 gives us percentage per month of the interest
const calculatedInterest = parseFloat(interest.value) / 100 / 12;
// converts the to the number of months instead of years
const calculatedPayments = parseFloat(years.value)*12

// computing the monthly payment
const x = Math.pow(1 + calculatedInterest, calculatedPayments);
// subtracted 1 corrects the bias ( some form of standard diviation method for stats)
const monthly = (principal*x*calculatedInterest)/(x-1);


if(isFinite(monthly)){
monthlyPayment.value = monthly.toFixed(2);
totalPayment.value = (monthly * calculatedPayments).toFixed(2);
totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
 // show reults
 document.getElementById('results').style.display = 'block';

 // Hide loader
 document.getElementById('loading').style.display = 'none';
}else{
  showError('Please check what you have entered')
}
}
  

// Show Error
function showError(error){

  // Create Div
const errorDiv = document.createElement('div');
// Get elements
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');


// Add class
errorDiv.className = 'alert alert-danger';

// create text node and append to div
errorDiv.appendChild(document.createTextNode(error));

 // Hide loader
 document.getElementById('loading').style.display = 'none';

 // Hide reults
 document.getElementById('results').style.display = 'none';

// Inserting error above heading
card.insertBefore(errorDiv,heading)
}