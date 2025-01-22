import { reactive, toRef } from 'vue';
import { useDoCalculation } from './doCalculation';
import { useFetch } from '#app';

export function useRegistration() {
    const formData = reactive({
        name: '',
        college: '',
        year: '',
        branch: '',
        phone: '',
        email: '',
        events: [],
    });

     // Convert formData.events to a ref for reactivity
     const eventsRef = toRef(formData, 'events');


    // Use the useDoCalculation composable
    const { totalPrice } = useDoCalculation(eventsRef);

    // Handle form submission
    const submitForm = async () => {
        try {
            // Prepare data for submission
            const submissionData = {
              ...formData,
              totalPrice: totalPrice.value,
            };

            // Post to the backend
            const { data, error } = await useFetch('/api/register', {
                method: 'POST',
                body: submissionData,
            })

            if(error.value) {
                console.error('Error during registration:', error.value);
                alert('Registration failed. Please try again.');
                return;
            }


            // Simulate a successful submission
            alert('Registration successful!');
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return {
        formData,
        totalPrice,
        submitForm,
    };
}