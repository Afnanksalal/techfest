document.addEventListener('DOMContentLoaded', () => {
    const eventCheckboxes = document.querySelectorAll('input[name="events[]"]');
    const totalPriceElement = document.getElementById('total-price');

    // Event prices
    const workshopPrice = 300;
    const competitionPrice = 30;
    const workshopDiscountThreshold = 3; // Number of workshops required for discount
    const workshopDiscountTotal = 750; // Discounted total for 3 workshops

    // Function to calculate total price
    function calculateTotalPrice() {
        let total = 0;
        let workshopCount = 0;

        // Count selected workshops and competitions
        eventCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                if (checkbox.value.startsWith('workshop')) {
                    workshopCount++;
                } else if (checkbox.value.startsWith('competition')) {
                    total += competitionPrice;
                }
            }
        });

        // Apply discount if 3 or more workshops are selected
        if (workshopCount >= workshopDiscountThreshold) {
            total += workshopDiscountTotal;
        } else {
            total += workshopCount * workshopPrice;
        }

        // Update the total price in the DOM
        if (totalPriceElement) {
            totalPriceElement.textContent = `Total Price: ₹${total}`;
        }
    }

    // Add event listeners to checkboxes
    eventCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotalPrice);
    });

    // Initial calculation
    calculateTotalPrice();
});