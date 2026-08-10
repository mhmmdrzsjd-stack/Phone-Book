import { defineStore } from 'pinia'
import { ref } from 'vue'

type Contact = { name: string; phone: string; email: string }

export const useContactStore = defineStore('contactStore', () => {
  const contacts = ref<Contact[]>([])

  const editingContact = ref<Contact | null>(null)
  const editingIndex = ref<number | null>(null)

  function addContact(contact: Contact) {
    contacts.value.push(contact)
  }

  function deleteContact(index: number) {
    contacts.value.splice(index, 1)

    // اگر همین آیتم در حال ادیت بود، مودال بسته شود
    if (editingIndex.value === index) cancelEdit()
  }

  function startEdit(index: number) {
    editingIndex.value = index
    editingContact.value = { ...contacts.value[index] } // کپی برای cancel
    console.log(editingContact.value)
  }

  function cancelEdit() {
    editingContact.value = null
    editingIndex.value = null
  }

  function saveEdit() {
    if (editingIndex.value === null || !editingContact.value) return
    contacts.value[editingIndex.value] = { ...editingContact.value }
    cancelEdit()
  }

  return {
    contacts,
    editingContact,
    addContact,
    deleteContact,
    startEdit,
    cancelEdit,
    saveEdit,
  }
})