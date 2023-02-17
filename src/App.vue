<template>
  <NavBar />
  <ContactsList @addModal="Modal = !Modal"/>
  <ContactModal
    @CloseModal="Modal = !Modal"
    v-if="Modal"
    title="Create"
  />
  <!-- {{contacts}} -->
</template>

<script>
import NavBar from "./components/NavBar.vue";
import ContactsList from "./components/ContactsList.vue";
import ContactModal from "./components/ContactModal.vue";
export default {
  components: {
    NavBar,
    ContactsList,
    ContactModal,
  },
  data() {
    return {
      Modal: false,
    };
  },
};
</script>

<style></style>
