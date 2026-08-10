<template>
  
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ contact.name }}</td>
    <td>{{ contact.phone }}</td>
    <td>{{ contact.email }}</td>
    <td>
      <button class="btn btn-sm btn-warning me-2" @click="contactStore.startEdit(index)">
        Edit
      </button>
      <button class="btn btn-sm btn-danger" @click="contactStore.deleteContact(index)">
        Delete
      </button>
    </td>
  </tr>
  <EditModal></EditModal>
</template>

<script setup lang="ts">
import { useContactStore } from '../stores/useContactStore'
import EditModal from './EditModal.vue'

defineProps<{
  contact: { name: string; phone: string; email: string };
  index: number;
}>();

const contactStore = useContactStore();

</script>