<template>
    <div>
      <!-- Custom Cursor -->
      <div class="cursor"></div>
  
      <!-- Header -->
      <Header />
  
      <!-- Main Content -->
      <main>
        <NuxtPage />
      </main>
  
      <!-- Footer -->
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '~/components/Header.vue';
  import Footer from '~/components/Footer.vue';
  </script>
  
  <style>
  @import '~/assets/css/styles.css';
  </style>