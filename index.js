const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  //   updateContact,
} = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id ${id} wasn't found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContacts = await addContact(name, email, phone);
      console.table(newContacts);
      break;

    // case "update":
    //   const updatedContact = await updateContact(id, name, email, phone);
    //   if (!updatedContact) {
    //     throw new Error(`Contact with id ${id} wasn't found`);
    //   }
    //   console.log(updatedContact);
    //   break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
