<template>
    <section class="hero">
      <div class="hero-content">
        <h2>EVENT STARTS IN</h2>
        <div id="countdown" class="countdown">
          <span id="days">00</span> Days
          <span id="hours">00</span> Hours
          <span id="minutes">00</span> Minutes
          <span id="seconds">00</span> Seconds
        </div>
      </div>
      <div class="animated-background"></div>
      <div class="trailing-stars" id="trailing-stars"></div>
    </section>
  </template>
  
  <script setup>
  import { useAnimations } from '~/composables/useAnimations';
  useAnimations();
  </script>