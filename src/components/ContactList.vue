<template>
  <div class="container">
    <h1>My Contacts</h1>
    
    <table class="table">
       <!-- اینجا لیست ردیف‌ها رندر می‌شود -->
       <ContactItem 
         v-for="(contact, index) in contactStore.contacts" 
         :key="index"
         :contact="contact"
         :index="index"
       />
    </table>


  </div>
</template>

<script setup lang="ts">

import ContactItem from './ContactItem.vue';
import { useContactStore } from '../stores/useContactStore';

const contactStore = useContactStore();
</script>
