import { useSelector } from "react-redux";
import ContactCard from "./ContactCard";

function Sidebar() {
  const contacts = useSelector((state) => state.contactsList);

  return (
    <div className="flex fixed top-0 bottom-0 left-0 flex-col min-h-screen w-2/6 bg-gray-200 border-r border-gray-300 overflow-y-auto">
      {contacts
        ? contacts.map((contact) => (
            <ContactCard key={contact.chatId} contact={contact} />
          ))
        : null}
    </div>
  );
}

export default Sidebar;
