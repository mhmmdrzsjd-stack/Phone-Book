<template>
  <div class="dashboard" dir="rtl">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-icon">C</div>
        <div>
          <strong>Contactly</strong>
          <small>مدیریت مخاطبین</small>
        </div>
      </div>

      <nav class="sidebar-menu">
        <a class="menu-item active" href="#">
          <span>▦</span>
          <span>داشبورد</span>
        </a>

        <a class="menu-item" href="#">
          <span>♙</span>
          <span>مخاطبین</span>
          <b>{{ contactStore.contacts.length }}</b>
        </a>

        <a class="menu-item" href="#">
          <span>★</span>
          <span>مورد علاقه‌ها</span>
        </a>

        <a class="menu-item" href="#">
          <span>⚙</span>
          <span>تنظیمات</span>
        </a>
      </nav>

      <div class="sidebar-bottom">
        <div class="help-card">
          <div class="help-icon">?</div>
          <strong>نیاز به راهنمایی داری؟</strong>
          <p>با تیم پشتیبانی تماس بگیر.</p>
          <button>مشاهده راهنما</button>
        </div>

        <div class="profile">
          <div class="avatar">ع</div>
          <div class="profile-info">
            <strong>علی رضایی</strong>
            <small>مدیر سیستم</small>
          </div>
          <span class="profile-more">•••</span>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="topbar">
        <div>
          <span class="breadcrumb">داشبورد / مخاطبین</span>
          <h1>مخاطبین</h1>
          <p>تمام مخاطبین خود را از این قسمت مدیریت کنید.</p>
        </div>

        <div class="topbar-actions">
          <button class="icon-button">⌕</button>
          <button class="icon-button notification">
            ♧
            <span></span>
          </button>

          <button class="add-button" @click="openAddModal">
            <span>+</span>
            افزودن مخاطب
          </button>
        </div>
      </header>

      <!-- Statistics -->
      <section class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon purple">♙</div>
          <div class="stat-content">
            <span>کل مخاطبین</span>
            <strong>{{ contactStore.contacts.length }}</strong>
            <small class="positive">↑ ۱۲٪ نسبت به ماه قبل</small>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon blue">✉</div>
          <div class="stat-content">
            <span>ایمیل‌ها</span>
            <strong>{{ emailCount }}</strong>
            <small class="positive">↑ ۸٪ نسبت به ماه قبل</small>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon orange">☎</div>
          <div class="stat-content">
            <span>شماره تماس‌ها</span>
            <strong>{{ phoneCount }}</strong>
            <small class="positive">↑ ۵٪ نسبت به ماه قبل</small>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon green">★</div>
          <div class="stat-content">
            <span>مخاطبین جدید</span>
            <strong>{{ recentContacts }}</strong>
            <small class="neutral">در این ماه</small>
          </div>
        </div>
      </section>

      <!-- Contacts Section -->
      <section class="contacts-panel">
        <div class="panel-header">
          <div>
            <h2>لیست مخاطبین</h2>
            <p>{{ filteredContacts.length }} مخاطب پیدا شد</p>
          </div>

          <div class="panel-tools">
            <div class="search-box">
              <span>⌕</span>
              <input
                v-model="search"
                type="text"
                placeholder="جستجوی نام، شماره یا ایمیل..."
              />
            </div>

            <button class="filter-button">
              ☷
              فیلتر
            </button>
          </div>
        </div>

        <div v-if="filteredContacts.length" class="table-wrapper">
          <table class="contacts-table">
            <thead>
              <tr>
                <th>مخاطب</th>
                <th>شماره تماس</th>
                <th>ایمیل</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(contact, index) in filteredContacts"
                :key="contact.phone + index"
              >
                <td>
                  <div class="contact-cell">
                    <div
                      class="contact-avatar"
                      :style="{ background: getAvatarColor(index) }"
                    >
                      {{ getInitials(contact.name) }}
                    </div>

                    <div>
                      <strong>{{ contact.name }}</strong>
                      <small>مخاطب شخصی</small>
                    </div>
                  </div>
                </td>

                <td class="ltr">{{ contact.phone }}</td>

                <td class="ltr email-cell">
                  {{ contact.email || 'ثبت نشده' }}
                </td>

                <td>
                  <span class="status active-status">
                    <i></i>
                    فعال
                  </span>
                </td>

                <td>
                  <div class="actions">
                    <button
                      class="action-button edit"
                      title="ویرایش"
                      @click="editContact(getOriginalIndex(contact))"
                    >
                      ✎
                    </button>

                    <button
                      class="action-button delete"
                      title="حذف"
                      @click="removeContact(getOriginalIndex(contact))"
                    >
                      ×
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="empty-state">
          <div class="empty-icon">♙</div>
          <h3>مخاطبی پیدا نشد</h3>
          <p>برای شروع، یک مخاطب جدید اضافه کنید.</p>
          <button class="add-button" @click="openAddModal">
            افزودن مخاطب
          </button>
        </div>

        <div v-if="contactStore.contacts.length" class="pagination">
          <span>نمایش {{ filteredContacts.length }} از {{ contactStore.contacts.length }} مخاطب</span>

          <div>
            <button disabled>‹</button>
            <button class="current-page">۱</button>
            <button disabled>›</button>
          </div>
        </div>
      </section>
    </main>

    <!-- Add Modal -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="closeAddModal">
      <div class="modal-card">
        <button class="close-modal" @click="closeAddModal">×</button>

        <div class="modal-title">
          <div class="modal-icon">+</div>
          <div>
            <h3>افزودن مخاطب جدید</h3>
            <p>اطلاعات مخاطب را وارد کنید.</p>
          </div>
        </div>

        <form @submit.prevent="addNewContact">
          <label>نام و نام خانوادگی</label>
          <input
            v-model="newContact.name"
            required
            type="text"
            placeholder="مثلاً علی رضایی"
          />

          <label>شماره تماس</label>
          <input
            v-model="newContact.phone"
            required
            type="tel"
            dir="ltr"
            placeholder="09123456789"
          />

          <label>ایمیل</label>
          <input
            v-model="newContact.email"
            type="email"
            dir="ltr"
            placeholder="example@email.com"
          />

          <div class="modal-actions">
            <button type="button" class="cancel-button" @click="closeAddModal">
              انصراف
            </button>

            <button type="submit" class="save-button">
              ذخیره مخاطب
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Modal -->
    <EditModal />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useContactStore } from '../stores/useContactStore'
import EditModal from '../components/EditModal.vue'

const contactStore = useContactStore()

const search = ref('')
const showAddModal = ref(false)

const newContact = reactive({
  name: '',
  phone: '',
  email: '',
})

const filteredContacts = computed(() => {
  const value = search.value.trim().toLowerCase()

  if (!value) return contactStore.contacts

  return contactStore.contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(value) ||
      contact.phone.toLowerCase().includes(value) ||
      contact.email.toLowerCase().includes(value)
    )
  })
})

const emailCount = computed(() => {
  return contactStore.contacts.filter((contact) => contact.email).length
})

const phoneCount = computed(() => {
  return contactStore.contacts.filter((contact) => contact.phone).length
})

const recentContacts = computed(() => {
  return Math.min(contactStore.contacts.length, 4)
})

function openAddModal() {
  showAddModal.value = true
}

function closeAddModal() {
  showAddModal.value = false
  newContact.name = ''
  newContact.phone = ''
  newContact.email = ''
}

function addNewContact() {
  contactStore.addContact({
    name: newContact.name,
    phone: newContact.phone,
    email: newContact.email,
  })

  closeAddModal()
}

function editContact(index: number) {
  contactStore.startEdit(index)
}

function removeContact(index: number) {
  const confirmed = window.confirm('آیا از حذف این مخاطب مطمئن هستید؟')

  if (confirmed) {
    contactStore.deleteContact(index)
  }
}

function getOriginalIndex(contact: {
  name: string
  phone: string
  email: string
}) {
  return contactStore.contacts.findIndex(
    (item) =>
      item.name === contact.name &&
      item.phone === contact.phone &&
      item.email === contact.email
  )
}

function getInitials(name: string) {
  const parts = name.trim().split(' ')

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`
  }

  return name.slice(0, 2)
}

function getAvatarColor(index: number) {
  const colors = [
    'linear-gradient(135deg, #8067f7, #a78bfa)',
    'linear-gradient(135deg, #1597e5, #38bdf8)',
    'linear-gradient(135deg, #f97316, #fb923c)',
    'linear-gradient(135deg, #10b981, #34d399)',
  ]

  return colors[index % colors.length]
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.dashboard {
  min-height: 100vh;
  display: flex;
  background: #f7f8fc;
  color: #20243a;
  font-family: Tahoma, Arial, sans-serif;
}

.sidebar {
  width: 255px;
  min-height: 100vh;
  padding: 28px 18px 20px;
  background: #ffffff;
  border-left: 1px solid #edf0f6;
  display: flex;
  flex-direction: column;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 10px;
  margin-bottom: 45px;
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  color: white;
  font-size: 22px;
  font-weight: bold;
  background: linear-gradient(135deg, #6957e8, #9787ff);
  box-shadow: 0 9px 20px rgba(105, 87, 232, 0.25);
}

.brand strong {
  display: block;
  font-size: 17px;
}

.brand small {
  display: block;
  color: #9ca3b5;
  font-size: 10px;
  margin-top: 3px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  height: 48px;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 0 16px;
  border-radius: 12px;
  color: #8990a6;
  text-decoration: none;
  font-size: 13px;
  transition: 0.2s;
}

.menu-item span:first-child {
  font-size: 19px;
}

.menu-item b {
  margin-right: auto;
  min-width: 24px;
  padding: 4px 7px;
  border-radius: 20px;
  background: #f0efff;
  color: #6957e8;
  text-align: center;
  font-size: 11px;
}

.menu-item:hover,
.menu-item.active {
  color: #6957e8;
  background: #f0efff;
  font-weight: bold;
}

.sidebar-bottom {
  margin-top: auto;
}

.help-card {
  padding: 17px;
  margin: 15px 4px 24px;
  border-radius: 16px;
  color: white;
  background: linear-gradient(145deg, #6957e8, #8d79f7);
  box-shadow: 0 12px 25px rgba(105, 87, 232, 0.2);
}

.help-icon {
  width: 29px;
  height: 29px;
  margin-bottom: 13px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
}

.help-card strong {
  display: block;
  font-size: 12px;
}

.help-card p {
  margin: 8px 0 14px;
  color: #e8e5ff;
  font-size: 10px;
  line-height: 1.8;
}

.help-card button {
  border: 0;
  border-radius: 7px;
  padding: 7px 10px;
  color: #6957e8;
  background: white;
  font-size: 10px;
  cursor: pointer;
}

.profile {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 6px 0;
  border-top: 1px solid #f0f1f5;
}

.avatar {
  width: 37px;
  height: 37px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #6957e8;
  background: #e9e6ff;
  font-weight: bold;
}

.profile-info {
  flex: 1;
}

.profile-info strong,
.profile-info small {
  display: block;
}

.profile-info strong {
  font-size: 11px;
}

.profile-info small {
  margin-top: 3px;
  color: #a1a7b7;
  font-size: 9px;
}

.profile-more {
  color: #9ba1b2;
  font-size: 12px;
}

.main-content {
  flex: 1;
  min-width: 0;
  padding: 38px 45px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  margin-bottom: 32px;
}

.breadcrumb {
  color: #9da3b4;
  font-size: 11px;
}

h1 {
  margin: 10px 0 7px;
  font-size: 29px;
}

.topbar p {
  margin: 0;
  color: #9299aa;
  font-size: 12px;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-button,
.filter-button {
  border: 1px solid #e8eaf0;
  color: #777f94;
  background: white;
  cursor: pointer;
}

.icon-button {
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  font-size: 20px;
}

.notification span {
  position: absolute;
  top: 9px;
  right: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ef6d79;
}

.add-button,
.save-button {
  border: 0;
  border-radius: 11px;
  padding: 13px 18px;
  color: white;
  background: #6957e8;
  box-shadow: 0 8px 18px rgba(105, 87, 232, 0.2);
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  transition: 0.2s;
}

.add-button:hover,
.save-button:hover {
  background: #5745d1;
  transform: translateY(-1px);
}

.add-button span {
  margin-left: 6px;
  font-size: 18px;
  vertical-align: middle;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 17px;
  margin-bottom: 25px;
}

.stat-card {
  min-height: 128px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 19px;
  border: 1px solid #eef0f5;
  border-radius: 17px;
  background: white;
  box-shadow: 0 5px 20px rgba(35, 42, 70, 0.025);
}

.stat-icon {
  width: 46px;
  height: 46px;
  display: grid;
  flex-shrink: 0;
  place-items: center;
  border-radius: 13px;
  font-size: 21px;
}

.purple {
  color: #6957e8;
  background: #eeecff;
}

.blue {
  color: #168dd1;
  background: #e5f5ff;
}

.orange {
  color: #eb891d;
  background: #fff1df;
}

.green {
  color: #16a574;
  background: #e1f9ee;
}

.stat-content span,
.stat-content small {
  display: block;
  color: #9299aa;
  font-size: 10px;
}

.stat-content strong {
  display: block;
  margin: 7px 0;
  font-size: 23px;
}

.positive {
  color: #18a777 !important;
}

.neutral {
  color: #9299aa !important;
}

.contacts-panel {
  border: 1px solid #eef0f5;
  border-radius: 18px;
  background: white;
  box-shadow: 0 5px 20px rgba(35, 42, 70, 0.025);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 25px 27px;
  border-bottom: 1px solid #f0f1f5;
}

.panel-header h2 {
  margin: 0 0 7px;
  font-size: 17px;
}

.panel-header p {
  margin: 0;
  color: #9da3b4;
  font-size: 11px;
}

.panel-tools {
  display: flex;
  gap: 10px;
}

.search-box {
  width: 255px;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid #e8eaf0;
  border-radius: 9px;
  color: #9ba1b2;
}

.search-box input {
  width: 100%;
  border: 0;
  outline: 0;
  color: #33384d;
  font-family: inherit;
  font-size: 11px;
}

.filter-button {
  height: 40px;
  padding: 0 14px;
  border-radius: 9px;
  font-family: inherit;
  font-size: 11px;
}

.table-wrapper {
  overflow-x: auto;
}

.contacts-table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
}

.contacts-table th {
  padding: 17px 27px;
  color: #a1a7b6;
  background: #fcfcfd;
  text-align: right;
  font-size: 10px;
  font-weight: normal;
}

.contacts-table td {
  padding: 16px 27px;
  border-top: 1px solid #f2f3f6;
  color: #50566b;
  font-size: 11px;
}

.contact-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-avatar {
  width: 37px;
  height: 37px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  color: white;
  font-size: 11px;
  font-weight: bold;
}

.contact-cell strong,
.contact-cell small {
  display: block;
}

.contact-cell strong {
  color: #30354a;
  font-size: 11px;
}

.contact-cell small {
  margin-top: 4px;
  color: #a3a8b7;
  font-size: 9px;
}

.ltr {
  direction: ltr;
  text-align: right;
}

.email-cell {
  color: #788197 !important;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  border-radius: 20px;
  font-size: 9px;
}

.active-status {
  color: #159a6e;
  background: #e9faf2;
}

.status i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.actions {
  display: flex;
  gap: 7px;
}

.action-button {
  width: 29px;
  height: 29px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}

.action-button.edit {
  color: #6957e8;
  background: #f0efff;
}

.action-button.delete {
  color: #ed6874;
  background: #fff0f1;
  font-size: 20px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 27px;
  color: #9da3b4;
  font-size: 10px;
  border-top: 1px solid #f0f1f5;
}

.pagination button {
  width: 28px;
  height: 28px;
  margin-right: 5px;
  border: 1px solid #e9ebf0;
  border-radius: 7px;
  color: #9ba1b2;
  background: white;
}

.pagination .current-page {
  color: white;
  background: #6957e8;
  border-color: #6957e8;
}

.empty-state {
  padding: 70px 20px;
  text-align: center;
}

.empty-icon {
  width: 65px;
  height: 65px;
  display: grid;
  place-items: center;
  margin: 0 auto 15px;
  border-radius: 20px;
  color: #6957e8;
  background: #f0efff;
  font-size: 28px;
}

.empty-state h3 {
  margin: 0 0 8px;
}

.empty-state p {
  color: #9da3b4;
  font-size: 12px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(25, 29, 50, 0.55);
  backdrop-filter: blur(5px);
}

.modal-card {
  position: relative;
  width: min(100%, 440px);
  padding: 28px;
  border-radius: 22px;
  background: white;
  box-shadow: 0 25px 70px rgba(25, 29, 50, 0.2);
  animation: modal-in 0.22s ease-out;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(15px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.close-modal {
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

.modal-title {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 25px;
}

.modal-icon {
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  color: #6957e8;
  background: #eeecff;
  font-size: 25px;
}

.modal-title h3 {
  margin: 0 0 5px;
  font-size: 17px;
}

.modal-title p {
  margin: 0;
  color: #9da3b4;
  font-size: 11px;
}

.modal-card label {
  display: block;
  margin: 15px 0 7px;
  color: #555c70;
  font-size: 11px;
  font-weight: bold;
}

.modal-card input {
  width: 100%;
  height: 43px;
  padding: 0 13px;
  border: 1px solid #e5e7ee;
  border-radius: 9px;
  outline: 0;
  color: #33384d;
  font-family: inherit;
  font-size: 12px;
  transition: 0.2s;
}

.modal-card input:focus {
  border-color: #6957e8;
  box-shadow: 0 0 0 3px #eeecff;
}

.modal-actions {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 25px;
}

.cancel-button {
  padding: 0 19px;
  border: 1px solid #e5e7ee;
  border-radius: 9px;
  color: #737b8f;
  background: white;
  cursor: pointer;
  font-family: inherit;
}

@media (max-width: 1100px) {
  .main-content {
    padding: 30px 25px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 760px) {
  .sidebar {
    display: none;
  }

  .main-content {
    padding: 22px 15px;
  }

  .topbar,
  .panel-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .topbar-actions,
  .panel-tools {
    width: 100%;
  }

  .add-button {
    flex: 1;
  }

  .search-box {
    flex: 1;
    width: auto;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .stat-card {
    padding: 13px;
  }

  .stat-icon {
    width: 38px;
    height: 38px;
  }

  .stat-content strong {
    font-size: 19px;
  }

  .panel-header {
    padding: 20px;
  }
}

@media (max-width: 430px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .topbar-actions {
    flex-wrap: wrap;
  }

  .icon-button {
    width: 38px;
  }
}
</style>