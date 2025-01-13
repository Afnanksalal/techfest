<template>
    <div>
      <Hero />
      <CounterSection />
      <AboutSection />
      <EventsSection />
    </div>
  </template>
  
  <script setup>
  import Hero from '~/components/Hero.vue';
  import CounterSection from '~/components/CounterSection.vue';
  import AboutSection from '~/components/AboutSection.vue';
  import EventsSection from '~/components/EventsSection.vue';
  </script>