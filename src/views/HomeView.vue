<template>
  <div class="container py-5">

    <div class="row justify-content-center">

      <div class="col-lg-10">

        <div class="card shadow">

          <div class="card-header bg-primary text-white">
            <h3 class="mb-0">📞 Phone Book</h3>
          </div>

          <div class="card-body">

            <ContactForm />

            <hr class="my-4">
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import ContactForm from '../components/ContactForm.vue'
</script>