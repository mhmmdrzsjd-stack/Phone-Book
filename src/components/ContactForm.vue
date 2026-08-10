<template>
  <div class="container mt-5">
    <!-- فرم -->
    <form @submit.prevent="handleFormSubmit" class="mb-5">
      <div class="row g-3">
        <div class="col-md-3"><input v-model="formData.name" class="form-control" placeholder="Full Name"></div>
        <div class="col-md-3"><input v-model="formData.phone" class="form-control" placeholder="Phone Number"></div>
        <div class="col-md-3"><input v-model="formData.email" class="form-control" placeholder="Email"></div>
        <div class="col-md-3">
          <button class="btn btn-success w-100" type="submit">Add Contact</button>
        </div>
      </div>
    </form>

    <!-- جدول -->
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>#</th><th>Name</th><th>Phone</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- خواندن مستقیم از استور -->
          <ContactItem 
            v-for="(item, idx) in contactStore.contacts" 
            :key="idx" 
            :contact="item" 
            :index="idx"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">

import { reactive } from 'vue'
import { useContactStore } from '../stores/useContactStore'
import ContactItem from './ContactItem.vue'

const contactStore = useContactStore()

// وضعیت فرم به صورت یک آبجکت واکنش‌گرا
const formData = reactive({
  name: '',
  phone: '',
  email: ''
})

function handleFormSubmit() {
  if (!formData.name || !formData.phone || !formData.email) {
    alert("Name and Phone and email are required!");
    return;
  }

  // ارسال به استور
  contactStore.addContact({ ...formData });

  // ریست کردن فرم
  formData.name = '';
  formData.phone = '';
  formData.email = '';
}
</script>
