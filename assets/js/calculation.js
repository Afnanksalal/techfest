document.addEventListener('DOMContentLoaded', function() {
    const eventCheckboxes = document.querySelectorAll('input[name="events[]"]');
    const totalPriceDisplay = document.getElementById('total-price');
    const eventPrice = 40; // Default price per event

    function calculateTotalPrice() {
        let numEvents = 0;
        eventCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                numEvents++;
            }
        });
        const totalPrice = numEvents * eventPrice;
        totalPriceDisplay.textContent = `Total Price: ₹${totalPrice}`;

    }

    eventCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotalPrice);
    });
    
   calculateTotalPrice();
});