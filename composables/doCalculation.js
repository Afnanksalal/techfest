import { onMounted, ref } from 'vue';

export function useDoCalculation() {
    const totalPrice = ref(0);
    const eventPrice = 40; // Default price per event

    function calculateTotalPrice() {
        const eventCheckboxes = document.querySelectorAll('input[name="events[]"]');
        let numEvents = 0;
        eventCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                numEvents++;
            }
        });
        totalPrice.value = numEvents * eventPrice;
    }

    onMounted(() => {
        const eventCheckboxes = document.querySelectorAll('input[name="events[]"]');
        eventCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', calculateTotalPrice);
        });
        calculateTotalPrice(); // Initial calculation
    });

    return { totalPrice };
}