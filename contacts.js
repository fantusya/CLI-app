const path = require("path");
const fs = require("fs").promises;
// const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8")
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => console.log(error));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const parsedData = JSON.parse(data);
      const foundContact = parsedData.filter(
        (contact) => contact.id == contactId
      );
      console.log(foundContact);
    })
    .catch((error) => console.log(error));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const parsedData = JSON.parse(data);

      const changedArray = parsedData.filter(
        (contact) => contact.id != contactId
      );
      console.table(changedArray);
      return JSON.stringify(changedArray);
    })
    .then((contactArray) => fs.writeFile(contactsPath, contactArray, "utf8"))
    .catch((error) => console.log(error));
}

function addContact(name, email, phone) {
  const contact = {
    // id: nanoid(),
    name,
    email,
    phone,
  };

  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const newArray = [contact, ...JSON.parse(data)];
      console.table(newArray);
      return fs.writeFile(contactsPath, JSON.stringify(newArray), "utf8");
    })
    .catch((error) => console.log(error));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
