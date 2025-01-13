<template>
    <section class="form-container">
        <h2>Register Here</h2>
        <form action="#" method="post"> <!-- Replace # with your form action -->
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" class="form-control" required>
            </div>
             <div class="form-group">
                <label for="college">College</label>
                <input type="text" id="college" name="college" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="year">Year</label>
                 <select id="year" name="year" class="form-select" required>
                     <option value="" disabled selected>Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                     <option value="4">4th Year</option>
                     <option value="5">5th Year</option>
                     </select>
            </div>
            <div class="form-group">
                <label for="branch">Branch</label>
                <input type="text" id="branch" name="branch" class="form-control" required>
            </div>
           <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" class="form-control" required>
            </div>
             <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Select Events</label>
                <div style="display:flex; flex-direction: column;">
                    <label style="display: flex; align-items: center;">
                        <input type="checkbox" name="events[]" value="workshop1" style="margin-right:10px;">Workshop 1
                    </label>
                    <label style="display: flex; align-items: center;">
                        <input type="checkbox" name="events[]" value="workshop2" style="margin-right:10px;">Workshop 2
                    </label>
                    <label style="display: flex; align-items: center;">
                        <input type="checkbox" name="events[]" value="competition1" style="margin-right:10px;">Competition 1
                    </label>
                    <label style="display: flex; align-items: center;">
                        <input type="checkbox" name="events[]" value="competition2" style="margin-right:10px;">Competition 2
                    </label>
                    <label style="display: flex; align-items: center;">
                        <input type="checkbox" name="events[]" value="competition3" style="margin-right:10px;">Competition 3
                    </label>
                </div>
            </div>
            <div id="total-price">Total Price: ₹{{ totalPrice }}</div>
            <button type="submit" class="btn-submit">Register</button>
        </form>
    </section>
  </template>
  
  <script setup>
  import { useAnimations } from '~/composables/useAnimations';
  useAnimations();
  import { useDoCalculation } from '~/composables/doCalculation';
  const { totalPrice } = useDoCalculation();
  </script>