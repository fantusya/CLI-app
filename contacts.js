const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "db", "contacts.json");
// const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const foundContact = contacts.find(
    (contact) => Number(contact.id) === contactId
  );
  return foundContact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => Number(contact.id) === contactId);
  const changedContacts = contacts.filter((_, index) => index != idx);
  await fs.writeFile(contactsPath, JSON.stringify(changedContacts));
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: (contacts.length + 1).toString(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
}

// async function updateContact(id, name, email, phone) {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex((contact) => contact.id == id);
//   if (idx === -1) null;
//   contacts[idx] = { id, name, email, phone };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts));
//   return contacts[idx];
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  //   updateContact,
};
