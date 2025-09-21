// Global variables to track state
let lastAutofillCheck = {};
let isMonitoring = false;

// Enhanced monitoring function
function updateDisplay() {
const fields = [
    {id: 'email', display: 'display-email'},
    {id: 'phone', display: 'display-phone'},
    {id: 'organization', display: 'display-organization'},
    {id: 'city', display: 'display-city'},
    {id: 'state', display: 'display-state'},
    {id: 'postal-code', display: 'display-postal-code'},
    {id: 'country', display: 'display-country'},
    {id: 'cc-name', display: 'display-cc-name'},
    {id: 'cc-number', display: 'display-cc-number'},
    {id: 'cc-exp', display: 'display-cc-exp'}
];

// Handle address fields specially
const address1 = document.getElementById('address-line1').value;
const address2 = document.getElementById('address-line2').value;
const fullAddress = [address1, address2].filter(a => a.trim()).join(', ');
const addressDisplay = document.getElementById('display-address');

if (fullAddress) {
    addressDisplay.textContent = fullAddress;
    addressDisplay.className = 'field-value captured';
} else {
    addressDisplay.textContent = 'AWAITING DATA STREAM...';
    addressDisplay.className = 'field-value';
}

// Check all other fields
let dataFound = false;
fields.forEach(field => {
    const element = document.getElementById(field.id);
    const value = element ? element.value : '';
    const displayElement = document.getElementById(field.display);
    
    if (value && value.trim()) {
        displayElement.textContent = value;
        displayElement.className = 'field-value captured';
        dataFound = true;
        
        // Alert on first data capture
        if (!lastAutofillCheck[field.id]) {
            console.log(`DATA INTERCEPTED: ${field.id} = ${value}`);
        }
        lastAutofillCheck[field.id] = value;
    } else {
        displayElement.textContent = 'AWAITING DATA STREAM...';
        displayElement.className = 'field-value';
    }
});

// Show success message if data was captured
if (dataFound && !isMonitoring) {
    isMonitoring = true;
    console.log('CYBERSECURITY ALERT: Hidden autofill data successfully intercepted!');
}
}

// Function to programmatically trigger autofill
function triggerAutofill() {
const nameField = document.getElementById('name');

// Focus and trigger events that might cause autofill
nameField.focus();
nameField.click();

// Simulate typing to trigger autofill suggestions
const event = new Event('input', { bubbles: true });
nameField.dispatchEvent(event);

// Try to trigger autofill through various events
setTimeout(() => {
    nameField.dispatchEvent(new Event('focus'));
    nameField.dispatchEvent(new Event('keydown'));
    nameField.dispatchEvent(new Event('keyup'));
    updateDisplay();
}, 100);

// Check for autofill after a delay
setTimeout(() => {
    updateDisplay();
    console.log('Checking for autofill data...');
}, 500);
}

// Enhanced event listeners
document.addEventListener('DOMContentLoaded', function() {
const form = document.getElementById('phishingForm');
const inputs = form.querySelectorAll('input');

// Add comprehensive event listeners
inputs.forEach(input => {
    // Standard events
    input.addEventListener('input', updateDisplay);
    input.addEventListener('change', updateDisplay);
    input.addEventListener('blur', updateDisplay);
    
    // Autofill-specific events
    input.addEventListener('focus', updateDisplay);
    input.addEventListener('keyup', updateDisplay);
    input.addEventListener('keydown', updateDisplay);
});

// Special handling for the name field
const nameField = document.getElementById('name');
nameField.addEventListener('input', function() {
    // Delay check to allow browser autofill to complete
    setTimeout(updateDisplay, 100);
    setTimeout(updateDisplay, 300);
    setTimeout(updateDisplay, 1000);
});

// FIXED: Form submission listener moved inside DOMContentLoaded
form.addEventListener('submit', function(e) {
    e.preventDefault();
    updateDisplay();
    console.log('Form submission intercepted - checking for autofill data');
});

// Monitor for autofill more aggressively
setInterval(updateDisplay, 100);

console.log('CYBERSECURITY EXERCISE LOADED: Start typing your name and select autofill!');
});

// Reset function
function resetForm() {
document.getElementById('phishingForm').reset();
lastAutofillCheck = {};
isMonitoring = false;
setTimeout(updateDisplay, 100);
console.log('Form data purged');
}

