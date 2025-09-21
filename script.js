// Monitor all form fields for changes
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

    // Handle address fields
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

    fields.forEach(field => {
        const value = document.getElementById(field.id).value;
        const displayElement = document.getElementById(field.display);
        if (value.trim()) {
            displayElement.textContent = value;
            displayElement.className = 'field-value captured';
        } else {
            displayElement.textContent = 'AWAITING DATA STREAM...';
            displayElement.className = 'field-value';
        }
    });
}

// Add event listeners to all form fields
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('phishingForm');
    const inputs = form.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('input', updateDisplay);
        input.addEventListener('change', updateDisplay);
    });

    // Also check periodically for autofill (some browsers fill asynchronously)
    setInterval(updateDisplay, 500);
});

function resetForm() {
    document.getElementById('phishingForm').reset();
    setTimeout(updateDisplay, 100);
}

// Console message for demonstration
window.addEventListener('load', function() {
    setTimeout(function() {
        if (document.getElementById('name').value === '') {
            console.log('CYBER PROTOCOL ACTIVE: Input your identity to witness data extraction!');
        }
    }, 2000);
});
