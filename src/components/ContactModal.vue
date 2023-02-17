<template>
  <div class="w-100 position-fixed top-0 h-100 d-flex justify-content-center align-items-center modal-bg">
    <div class="contactModal rounded p-3 bordered">
      <div class="d-flex justify-content-between">
        <h3 class="title">{{ title }} Contact</h3>
        <i class="bi bi-x-lg close h3" @click="$emit('CloseModal')"></i>
      </div>
      <div class="alert alert-danger m-2 py-2" v-if="Err" role="alert">
        {{ ErrText }}
      </div>
      <div class="px-2">
        <div class="d-flex align-items-center justify-content-center textBox">
          <i class="bi bi-person-fill"></i>
          <input type="text" placeholder="Name" class="modalInput" :value="id !== undefined ? contact.name : ''"
            ref="name" />
        </div>
        <div class="d-flex align-items-center justify-content-center textBox">
          <i class="bi bi-telephone-fill"></i>
          <input type="tel" placeholder="Mobile" class="modalInput" ref="mobile" @keyup="contactInp()" maxlength="15"
            :value="id !== undefined ? contact.mobile : ''" />
        </div>
      </div>
      <button class="btn float-end modalBtn" @click="dataFunc()">
        {{ title }}
      </button>
      <button v-if="deleteBtn" @click="store.DeleteFunc(id), $emit('CloseModal')"
        class="btn float-end mx-3 btn-danger">Delete</button>
    </div>
  </div>
</template>
<script>
import { Contacts } from '../store';
export default {
  props: {
    title: String,
    id: Number,
    deleteBtn: Boolean
  },
  data() {
    const store = Contacts()
    let contact
    if (this.id !== undefined) {
      contact = store.GetContact(this.id)[0]
    }
    return {
      Err: false,
      ErrText: "Error",
      space: 2,
      store,
      contact,
    };
  },
  methods: {
    dataFunc() {
      let name = this.$refs.name.value
      let mobile = this.$refs.mobile.value
      if (name == "" && mobile == "") {
        this.Err = true;
        this.ErrText = "Name and Mobile is Required!";
      } else if (name == "") {
        this.Err = true;
        this.ErrText = "Name is Required!";
      } else if (mobile == "") {
        this.Err = true;
        this.ErrText = "Mobile is Required!";
      }else {
        let contact = {
          name: this.$refs.name.value,
          mobile: this.$refs.mobile.value,
        };
        if (this.title == "Edit") {
          contact.id = this.contact.id
          this.store.EditFunc(contact)
        } else {
          this.store.AddContact(contact);
          console.log(this.store.contacts)
        }
        this.$emit('CloseModal')
      }
    },
    contactInp() {
      let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-']
      let contact = this.$refs.mobile
      if (contact.value[0] != "+" && contact.value != "") {
        contact.value = "+" + contact.value
      }
      if (numbers.indexOf(contact.value[contact.value.length - 1]) > -1) {
        // console.log('matched')
      } else {
        contact.value = contact.value.replace(contact.value[contact.value.length - 1], '')
        // console.log('not matched')
      }
      if (this.space == 2 && contact.value.length < 15 && contact.value.length > 4) {
        contact.value = `${contact.value.slice(0, 4)} ${contact.value.slice(4)}`
        this.space = 1
      }
      if (this.space == 1 && contact.value.length < 15 && contact.value.length > 8) {
        contact.value = `${contact.value.slice(0, 6)}${contact.value.slice(6, 8)} ${contact.value.slice(8)}`
        this.space = 0
      }
      if (contact.value == "" || contact.value.length < 5) {
        this.space = 2
      }
    },
  },
};
</script>
<style>
.modal-bg {
  background-color: rgba(45, 45, 45, 0.4);
  left: 0;
}

.contactModal {
  background-color: white;
  animation: Modal 1s;
  width: 400px;
  margin: 10px;
}

.modalInput {
  border: none;
  outline: none;
  padding: 5px;
  width: 100%;
}

.textBox:focus-within {
  border-bottom: 1.4px solid rgb(231, 46, 231) !important;
}

.modalBtn {
  background-color: rgb(231, 46, 231) !important;
  color: white !important;
}

.close {
  cursor: pointer;
}

.textBox {
  border-bottom: 1px solid;
  margin: 3px !important;
  margin-bottom: 5px !important;
}

@keyframes Modal {
  0% {
    margin-left: -700px;
  }

  100% {
    margin: 0;
  }
}
</style>
