import { defineStore } from "pinia";

export const Contacts = defineStore('contacts', {
  state: () => ({
    contacts: [
        {name: 'Abdullah', mobile: '+576  75 5 7423', id: 1},
        {name: 'Farhan', mobile: '+232 352 5352', id: 2},
        {name: 'Bushra', mobile: '+344 124 241', id: 3},
        {name: 'Zeeshan', mobile: '+124 124 14241', id: 4},
        {name: 'Bilal', mobile: '+789  374 27342', id: 5},
        {name: 'Ramzan', mobile: '+124  142 14223', id: 6},
        {name: 'Furqan', mobile: '+412 414 2414', id: 7},
        {name: 'Shumaila', mobile: '+234 123 41234', id: 8},
        {name: 'Yousaf', mobile: '+342 132 335342', id: 9},
        {name: 'Raheel', mobile: '+344  533 52324', id: 10},
        {name: 'Touseef', mobile: '+234 242 352526', id: 11},
        {name: 'Asfandyar', mobile: '+252 346 235123', id: 12},
        {name: 'Ubaid', mobile: '+892 349 184012', id: 13},
        {name: 'Mousa', mobile: '+412 412 412423', id: 14},
        {name: 'Dawood', mobile: '+435 235 2352', id: 15}
    ]
  }),
  getters: {
    GetContacts: (state)=>{
      return state.contacts
    },
    GetContact: (state) => {
      return (id) => state.contacts.filter(e => {
        return e.id === id
      })
    },
  },
  actions: {
    AddContact(contact) {
      let id;
      this.contacts.length ? (id = this.contacts.length + 1) : (id = 1);
      contact.id = id
      console.log(id)
      this.contacts = [...this.contacts, contact]
      console.log(this.contacts)
      return this.contacts
      // this.Modal = false
      // this.contactUse = this.contacts
    },
    EditFunc(contact) {
      let id = contact.id
      let OldContact = this.contacts.filter(e=>{
        return e.id == id
      })
      OldContact[0].name = contact.name
      OldContact[0].mobile = contact.mobile
    },
    DeleteFunc(id) {
      this.contacts = this.contacts.filter((e) => {
        return e.id != id
      })
    },
    SortBy(letter) {
      this.contactUse = this.contacts
      if (letter != '#') {
        this.contactUse = this.contactUse.filter(e => {
          return e.name[0].toUpperCase() == letter
        })
      }
      if (this.contactUse.length == 0) {
        this.dataDisplay = false
      } else {
        this.dataDisplay = true
      }
    }
  }
})
