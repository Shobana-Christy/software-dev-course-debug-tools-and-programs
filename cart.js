const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
    total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
  if (discountRate <= 0 || discountRate >= 1) {
    return -1;
  }
  return total - total * discountRate; // Bug: Missing validation for discountRate
}

function generateReceipt(cartItems, total) {
    let receipt = "Items:\n";
    cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
    });
    receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number
    return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
if (discountedTotal == -1) {
  document.getElementById("error").textContent = "Discount rate should be between 0 and 1";
} else {
  if(typeof discountedTotal != "number") {
    document.getElementById("error").textContent = "Total should be a number value.";
  } else {
    const receipt = generateReceipt(cart, discountedTotal);
    document.getElementById("total").textContent = `Total: $${discountedTotal}`;
    document.getElementById("receipt").textContent = receipt;
  }
}

/*Summary
1. In the calculateTotal function i <= cartItems.length which makes error.
   It should be i < cartItems.length. Using Console tab I found the TypeError 
   on cart.js file on particular line. (cart.js.10)
   In the Source tab the 10th line and 12th line are highlighted which is breakpoint.
   In the breakpoint section, step over icon helps to check the loop iteration. In the Scope Panel,
   I can see the iteration with values (0,1,2) until i = 2 the total  was added correctly. In Watch Panel
   if I enter cartItems[3] it was showing undefined which confirmed the array only has 3 items (length = 3), indexes = (0,1,2) .
 2. if the discountRate is out of the range (0-1) like applyDiscount(total, 1) or applyDiscount(total, 0), 
    then we need to validate and show as error
 3. since the generateReceipt is using toFixed method which is available only for number, 
    we have to validate total to be an number type.
*/