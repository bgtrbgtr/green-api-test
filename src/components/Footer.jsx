import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { sendMessage } from "../utils/MainApi";
import { refreshChatHistory } from "../store/contactsSlice";
import smileButtonImgUrl from "../images/smile.svg";
import sendButtonImgUrl from "../images/send.png";

function Footer() {
  const dispatch = useDispatch();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const contactsList = useSelector((state) => state.contactsList);
  const activeChat = contactsList.find(
    (contact) => contact.activeChat === true
  );

  useEffect(() => {
    const emojiPreview = document.querySelector(".Flex.epr-preview.FlexRow");
    emojiPreview.setAttribute("style", "display: none");
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  const handleKeyboardOpen = () => {
    setIsKeyboardOpen((state) => !state);
  };

  const handleEmojiClick = (emojiData) => {
    setNewMessage(newMessage + emojiData.emoji);
  };

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height =
      Math.min(
        e.target.scrollHeight - 16,
        5 * parseInt(getComputedStyle(e.target).lineHeight)
      ) + "px";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(
      currentUser.idInstance,
      currentUser.apiTokenInstance,
      activeChat.chatId,
      newMessage
    )
      .then((res) => {
        dispatch(
          refreshChatHistory({
            chatId: activeChat.chatId,
            newMessage: {
              type: "outgoing",
              chatId: activeChat.chatId,
              textMessage: newMessage,
              idMessage: res.idMessage,
              typeMessage: "extendedTextMessage",
              timestamp: Date.now() / 1000,
            },
          })
        );
      })
      .catch((error) => console.log(error));

    setNewMessage("");
  };

  return (
    <>
      <div
        className={
          isKeyboardOpen
            ? "fixed bottom-12 w-4/6 transition duration-300 ease-in-out transform translate-y-0 overflow-y-auto"
            : "fixed bottom-12 w-4/6 transition duration-300 ease-in-out transform translate-y-full scale-y-0 overflow-y-auto"
        }
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          emojiStyle="native"
          height={380}
          width="100%"
        />
      </div>
      {activeChat ? (
        <footer className="w-4/6 fixed bottom-0 right-0 flex justify-start items-center px-4 py-1 bg-gray-200">
          <button
            className="w-10 h-10 mt-auto mb-1 rounded-full hover:bg-gray-300 active:bg-gray-400"
            type="button"
            onClick={handleKeyboardOpen}
          >
            <img className="w-6 h-6 mx-auto" src={smileButtonImgUrl} />
          </button>
          <form className="flex justify-between items-center w-full">
            <textarea
              value={newMessage}
              onChange={handleNewMessageChange}
              onKeyDown={handleKeyDown}
              className="mx-2 my-1 h-10 min-h-0 leading-5 align-middle flex-grow resize-none px-3 py-2 rounded-lg w-8/12 text-sm whitespace-pre-wrap break-words overflow-x-clip overflow-y-auto outline-none"
            ></textarea>
            <button
              className=" w-10 h-10 mt-auto mb-1 rounded-full hover:bg-gray-300 active:bg-gray-400"
              type="submit"
              onClick={handleSubmit}
            >
              <img className="w-6 h-6 mx-auto" src={sendButtonImgUrl} />
            </button>
          </form>
        </footer>
      ) : null}
    </>
  );
}

export default Footer;
