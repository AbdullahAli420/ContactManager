<template>
  <div class="d-flex justify-content-between align-items-center m-2">
    <h2 class="p-3">Your Contacts</h2>
    <div>
      <button class="btn">
        <i class="bi bi-plus-lg h3 Add" v-on:click="$emit('addModal')"></i>
      </button>
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <div>
      <div class="d-flex searchWrap align-items-center p-0 m-auto">
        <i class="bi bi-search"></i>
        <input type="text" class="search" ref="search" @keyup="Search()" placeholder="Search a contact" />
      </div>
      <div>
        <div class=" d-flex flex-row justify-content-center">
          <table class="table border-none text-center">
            <thead>
              <tr class="h5">
                <td>Name</td>
                <td>Phone#</td>
              </tr>
            </thead>
            {{ contactsUse != contacts && !search ? contactsUse = contacts : "" }}
            <tbody v-for="contact in contactsUse" class="border-none">
              <tr class="contact" @click="
                () => {
                  id = contact.id;
                  Modal = !Modal;
                }
              ">
                <td>{{ contact.name }}</td>
                <td>{{ contact.mobile }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 v-if="contactsUse.length == 0" class="d-flex justify-content-center">
          No contacts Available!
        </h4>
      </div>
    </div>
    <div class="position-sticky p-0 m-0 text-center">
      <div v-for="letter in alphabet" class="p-0 m-0">
        <button class="btn letter p-0 m-0" @click="SortBy(letter)">{{ letter }}</button>
      </div>
    </div>
    <ContactModal @CloseModal="Modal = !Modal" v-if="Modal" title="Edit" :id="id" @contact="
      (contact) => {
        $emit('contact', contact);
        Modal = !Modal;
      }
    " :deleteBtn="true" @deleteId="
  (id) => {
    Modal = !Modal;
    $emit('deleteId', id);
  }
" />
  </div>
</template>
<script>
import ContactModal from "./ContactModal.vue";
import { storeToRefs } from "pinia";
import { Contacts } from "../store"
export default {
  Name: "ContactsList",
  components: {
    ContactModal,
  },
  data() {
    let alphabet = [
      "#",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "j",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    const store = Contacts()
    const { contacts } = storeToRefs(store)
    return {
      Modal: false,
      id: Number,
      alphabet,
      contacts,
      contactsUse: Array,
      store,
      search: false
    };
  },
  emits: ['addModal'],
  methods: {
    Search() {
      let searchVal = this.$refs.search.value
      this.contactsUse = this.contacts
      if (searchVal != "") {
        this.search = true
        this.contactsUse = this.contactsUse.filter(e => {
          if (e.name.toUpperCase().indexOf(searchVal.toUpperCase()) > -1) {
            return e
          }
        })
      }
    },
    SortBy(letter) {
      this.contactsUse = this.contacts
      if (letter != '#') {
        this.search = true
        this.contactsUse = this.contactsUse.filter(e => {
          return e.name[0].toUpperCase() == letter
        })
      }
    }
  },
  mounted(){
    this.contacts.sort((a,b)=>{
      if(a.name < b.name){
        return -1
      } else if(a.name > b.name){
        return 1
      } else {
        return 0
      }
    })
  }
};
</script>
<style>
.contact:hover {
  background-color: aliceblue;
  cursor: pointer;
}

.search {
  border: none;
  outline: none;
  padding: 5px;
  margin: 3px;
  width: 100%;
  /* border-bottom: 1.4px solid rgb(97, 97, 97) !important; */
}

.searchWrap {
  width: 340px;
  border-bottom: 1.4px solid gray;
}

.searchWrap:focus-within {
  border-bottom: 1.4px solid rgb(231, 46, 231) !important;
}

table {
  width: 500px !important;
  margin: auto;
}

.letter {
  font-size: 12px !important;
  ;
}

@media screen and (max-width:530px) {
  table {
    width: 93vw !important;
  }
}
</style>
