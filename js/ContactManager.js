import EnhancedHashTable from "./EnhancedHashTable";

class ContactManager {
    constructor(){
        this.hashTable = new EnhancedHashTable();
        this.initUI();
    }
    initUI(){
        document.querySelector("#addButton").addEventListener("click", this.addContact.bind(this));
        this.updateContactList();
    }
    addContact(){
        const nameInput = document.querySelector("#name");
        const phoneInput = document.querySelector("#phone");
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if(name && this.isValidPhoneNumber(phone)){
            this.hashTable.set(name, phone);
            nameInput.value = '';
            phoneInput.value = '';
            this.updateContactList();
        } else {
            alert(`Check the correctness of data entry (name and phone)!`);
        }
    }
    updateContactList(){
        const contactList = document.querySelector("#contactList");
        contactList.innerHTML = '';
        this.hashTable.entries().forEach(([name, phone]) => {
            const row = `<tr><td>${name}</td><td>${phone}</td><td><button class='deleteBtn' data-name='${name}'>Delete</button></td></tr>`;
            contactList.innerHTML += row;
        });
        document.querySelectorAll(".deleteBtn").forEach(btn => btn.addEventListener("click", this.deleteContact.bind(this)));
    }
    deleteContact(event){
        const name = event.target.getAttribute(".data-name");
        this.hashTable.delete(name);
        this.updateContactList();
    }
    isValidPhoneNumber(phone) {
        const phoneRegex = /^\+?(\d{1,3})?[-.\s]?((\(\d{1,3}\))|\d{1,3})?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
        return phoneRegex.test(phone);
    }
}
export default ContactManager;