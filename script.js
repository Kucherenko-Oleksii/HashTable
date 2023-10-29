"use strict";

class HashTable {
  constructor(size = 10) {
    this.table = new Array(size).fill(null).map(() => []);
  }

  hash(key) {
    return (
      key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      this.table.length
    );
  }

  put(key, value) {
    const index = this.hash(key);
    if (this.table[index].some((item) => item.key === key)) {
      alert("This data already exists!");
    } else {
      this.table[index].push({ key, value });
    }
  }

  get(key) {
    const index = this.hash(key);
    const item = this.table[index].find((item) => item.key === key);
    return item ? this.value : undefined;
  }

  remove(key) {
    const index = this.hash(key);
    this.table[index] = this.table[index].filter((item) => item.key !== key);
  }
}

const hashTable = new HashTable();

const addButton = document.querySelector("#addButton");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");

addButton.addEventListener("click", () => {
  const name = nameInput.value;
  const phone = phoneInput.value;
  if (name && isValidPhoneNumber(phone)) {
    hashTable.put(name, phone);
    displayContacts();
    nameInput.value = "";
    phoneInput.value = "";
  } else {
    alert("Check the correctness of data entry (name and phone)!");
  }
});

const contactList = document.querySelector("#contactList");

const displayContacts = () => {
  contactList.innerHTML = "";
  hashTable.table.flat().forEach((item) => {
    const row = createTableRow(item.key, item.value);
    contactList.appendChild(row);
  });
};

const createTableRow = (name, phone) => {
  const row = document.createElement("tr");
  row.appendChild(createTableCell(name));
  row.appendChild(createTableCell(phone));
  row.appendChild(createDeleteButton(name));
  return row;
};

const createTableCells = (data) => data.map((text) => createTableCell(text));

const createTableCell = (text) => {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
};

const createDeleteButton = (key) => {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    hashTable.remove(key);
    displayContacts();
  });

  return deleteButton;
};

function isValidPhoneNumber(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

displayContacts();
