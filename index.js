const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
    //   break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "updateById":
      const updateContact = await contacts.updateById(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);

    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "AeHIrLTr6JkxGE6SN-0Rw" });
// invokeAction({
//   action: "add",
//   name: "Dina Mavleeva",
//   email: "mavleeva.dinara@gmail.com",
//   phone: "(+972) 50-239-18-19",
// });

// invokeAction({
//   action: "updateById",
//   id: "bIAUv_Gz9TOqdizX5Gpb5",
//   name: "Elina Mavleeva",
//   email: "mavleeva.dinara@gmail.com",
//   phone: "(+972) 50-239-18-20",
// });

// invokeAction({
//   action: "remove",
//   id: "TJ_WtsSECWAyaptJPBvxy",
// });

invokeAction(argv);
