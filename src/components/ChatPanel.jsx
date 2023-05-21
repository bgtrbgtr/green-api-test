import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Footer, Message } from ".";
import { receiveMessage, deleteNotification } from "../utils/MainApi";
import { refreshChatHistory } from "../store/contactsSlice";

function ChatPanel() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const contactsList = useSelector((state) => state.contactsList);
  const activeChat = contactsList.find(
    (contact) => contact.activeChat === true
  );
  let [messages, setMessages] = useState([]);
  const messagesListEnd = useRef(null);

  useEffect(() => {
    if (activeChat) {
      setMessages([...activeChat.prevMessages].reverse());
    }

    return () => setMessages([]);
  }, [activeChat]);

  useEffect(() => {
    messagesListEnd.current.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      receiveIncomingMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const receiveIncomingMessages = () => {
    const idInstance = currentUser.idInstance;
    const apiTokenInstance = currentUser.apiTokenInstance;
    receiveMessage(idInstance, apiTokenInstance)
      .then((res) => {
        let messageReceived = {};
        if (!res) {
          return;
        } else {
          messageReceived = {
            type: "incoming",
            timestamp: res.body.timestamp,
            idMessage: res.body.idMessage,
            typeMessage: res.body.messageData.typeMessage,
            chatId: res.body.senderData.chatId,
            senderId: res.body.senderData.chatId,
            senderName: res.body.senderData.senderName,
            textMessage:
              res.body.messageData.textMessageData?.textMessage ||
              res.body.messageData.extendedTextMessageData?.text,
          };
        }
        if (messageReceived) {
          dispatch(
            refreshChatHistory({
              chatId: messageReceived.chatId,
              newMessage: messageReceived,
            })
          );
        }

        return res;
      })
      .then((res) => {
        if (!res) {
          return;
        } else {
          deleteNotification(idInstance, apiTokenInstance, res.receiptId);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="flex flex-col min-h-full relative overflow-auto">
        <div className="flex flex-col relative top-16 max-h-full px-10 overflow-y-auto">
          {!!messages?.length
            ? messages.map((message) => {
                if (
                  message.typeMessage === "textMessage" ||
                  message.typeMessage === "extendedTextMessage"
                ) {
                  return <Message key={message.idMessage} message={message} />;
                }
              })
            : null}
          <div className="h-1 mb-16" ref={messagesListEnd}></div>
        </div>
      </div>
      <Footer setMessages={setMessages} />
    </>
  );
}

export default ChatPanel;
