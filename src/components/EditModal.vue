<template>
  <div
    v-if="contactStore.editingContact"
    class="edit-modal-overlay"
    @click.self="contactStore.cancelEdit"
  >
    <div class="edit-modal-card" dir="rtl">
      <button class="close-button" @click="contactStore.cancelEdit">
        ×
      </button>

      <div class="edit-heading">
        <div class="edit-icon">✎</div>

        <div>
          <h3>ویرایش مخاطب</h3>
          <p>اطلاعات مخاطب را به‌روزرسانی کنید.</p>
        </div>
      </div>

      <label>نام و نام خانوادگی</label>
      <input
        v-model="contactStore.editingContact.name"
        type="text"
        placeholder="نام مخاطب"
      />

      <label>شماره تماس</label>
      <input
        v-model="contactStore.editingContact.phone"
        type="tel"
        dir="ltr"
        placeholder="شماره تماس"
      />

      <label>ایمیل</label>
      <input
        v-model="contactStore.editingContact.email"
        type="email"
        dir="ltr"
        placeholder="ایمیل"
      />

      <div class="edit-actions">
        <button class="cancel-button" @click="contactStore.cancelEdit">
          انصراف
        </button>

        <button class="save-button" @click="contactStore.saveEdit">
          ذخیره تغییرات
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContactStore } from '../stores/useContactStore'

const contactStore = useContactStore()
</script>

<style scoped>
.edit-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(25, 29, 50, 0.55);
  backdrop-filter: blur(5px);
}

.edit-modal-card {
  position: relative;
  width: min(100%, 440px);
  padding: 28px;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 25px 70px rgba(25, 29, 50, 0.2);
  animation: show-modal 0.2s ease-out;
}

@keyframes show-modal {
  from {
    opacity: 0;
    transform: translateY(15px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.close-button {
  position: absolute;
  top: 17px;
  left: 19px;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 8px;
  color: #8e95a8;
  background: #f5f6f9;
  cursor: pointer;
  font-size: 20px;
}

.edit-heading {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 25px;
}

.edit-icon {
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  color: #6957e8;
  background: #eeecff;
  font-size: 21px;
}

.edit-heading h3 {
  margin: 0 0 5px;
  color: #20243a;
  font-size: 17px;
}

.edit-heading p {
  margin: 0;
  color: #9da3b4;
  font-size: 11px;
}

.edit-modal-card label {
  display: block;
  margin: 15px 0 7px;
  color: #555c70;
  font-size: 11px;
  font-weight: bold;
}

.edit-modal-card input {
  width: 100%;
  height: 43px;
  padding: 0 13px;
  border: 1px solid #e5e7ee;
  border-radius: 9px;
  outline: 0;
  color: #33384d;
  font-family: inherit;
  font-size: 12px;
}

.edit-modal-card input:focus {
  border-color: #6957e8;
  box-shadow: 0 0 0 3px #eeecff;
}

.edit-actions {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 25px;
}

.cancel-button,
.save-button {
  height: 42px;
  padding: 0 17px;
  border-radius: 9px;
  cursor: pointer;
  font-family: inherit;
  font-size: 11px;
}

.cancel-button {
  border: 1px solid #e5e7ee;
  color: #737b8f;
  background: white;
}

.save-button {
  border: 0;
  color: white;
  background: #6957e8;
}
</style>