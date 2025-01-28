document.addEventListener('DOMContentLoaded', () => {
    const eventCheckboxes = document.querySelectorAll('input[name="events[]"]');
    const totalPriceElement = document.getElementById('total-price');
    const totalAmountInput = document.getElementById('total-amount'); // Get the hidden input

    // Event prices
    const workshopPrice = 300;
    const competitionPrice = 30;
    const workshopDiscountThreshold = 3;
    const workshopDiscountTotal = 750;

    function calculateTotalPrice() {
        let total = 0;
        let workshopCount = 0;

        eventCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const eventName = checkbox.value;
                if (eventName === "Cyber Security" || eventName === "Digital Media Marketing" || eventName === "Ethical Hacking") {
                    workshopCount++;
                } else if (eventName === "PROJECT EXPO" || eventName === "TYPING RUSH" || eventName === "E-FOOTBALL" || eventName === "CODING & DEBUGGING" || eventName === "WEB DESIGN" || eventName === "QUIZ" || eventName === "BGMI" || eventName === "TREASURE HUNT") {
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

        // Update total price display and hidden input value
        if(totalPriceElement){
          totalPriceElement.textContent = `Total Price: ₹${total}`;
          totalAmountInput.value = total;
        }
    }


    eventCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotalPrice);
    });

    calculateTotalPrice();
});


document.getElementById('screenshot').addEventListener('change', function(e) {
    const fileName = document.getElementById('file-name');
    if (this.files.length > 0) {
        fileName.textContent = this.files[0].name;
    } else {
        fileName.textContent = 'No file chosen';
    }
});