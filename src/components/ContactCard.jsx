import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { changeActiveStatus } from "../store/contactsSlice";

function ContactCard({ contact }) {
  let [lastMessageOfContact, setLastMessageOfContact] = useState({});
  let [lastMessageDate, setLastMessageDate] = useState("");

  function getDate(lastMessageOfContact) {
    const timestamp = lastMessageOfContact.timestamp;
    const date = new Date(timestamp * 1000);
    if (!isNaN(date)) {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    }

    return "";
  }

  useEffect(() => {
    setLastMessageOfContact(contact.prevMessages[0] || {});
  }, [contact.prevMessages]);

  useEffect(() => {
    setLastMessageDate(getDate(lastMessageOfContact));
  }, [lastMessageOfContact]);

  const dispatch = useDispatch();

  const handleContactCardClick = () => {
    dispatch(changeActiveStatus(contact));
  };

  return (
    <div
      className="p-4 h-20 flex border-b border-gray-300 bg-white hover:bg-gray-100 cursor-pointer first:mt-16"
      onClick={handleContactCardClick}
    >
      <img
        className="w-12 h-12 mr-3 rounded-full object-contain"
        alt="avatar"
        src={
          contact.avatar.length > 0
            ? contact.avatar
            : "./src/images/default_avatar.svg"
        }
      ></img>
      <div className="w-10/12">
        <div className="flex justify-between items-center w-11/12">
          <h5 className="h-5 mb-1 text-base truncate">{contact.name}</h5>
          <p className="w-1/5 text-end text-xs text-gray-400">
            {lastMessageDate}
          </p>
        </div>
        <p className="truncate text-sm text-gray-400">
          {lastMessageOfContact.textMessage ?? ""}
        </p>
      </div>
    </div>
  );
}

export default ContactCard;
