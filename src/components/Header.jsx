import { useSelector, useDispatch } from "react-redux";
import { setModalIsOpen } from "../store/modalSlice";
import buttonImgUrl from "../images/new_chat.png";
import defaultAvatarUrl from "../images/default_avatar.svg";

function Header() {
  const currentUser = useSelector((state) => state.currentUser);
  const contactsList = useSelector((state) => state.contactsList);
  const activeChat = contactsList.find(
    (contact) => contact.activeChat === true
  );

  const dispatch = useDispatch();
  const handleNewChatButton = () => {
    dispatch(setModalIsOpen());
  };

  return (
    <header className="flex">
      <div className="flex h-16 fixed left-0 top-0 px-4 py-3 w-2/6 border-r border-b border-gray-300 bg-gray-200 items-center justify-end">
        <p className="text-sm mr-auto">
          ID:{" "}
          {currentUser.idInstance === ""
            ? "Требуется авторизация"
            : currentUser.idInstance}
        </p>
        {currentUser.authorized === "authorized" ? (
          <>
            <label className="text-sm leading-3 h-3 mr-1">
              Добавить новый чат:
            </label>
            <button
              className="p-2 w-10 h-10 rounded-full hover:bg-gray-300 active:bg-gray-400"
              type="button"
              onClick={handleNewChatButton}
            >
              <img src={buttonImgUrl} />
            </button>
          </>
        ) : null}
      </div>
      {activeChat ? (
        <div className="w-4/6 bg-gray-200 px-4 py-3 flex items-center fixed right-0 top-0">
          <img
            className="w-10 h-10 rounded-full object-contain mr-4"
            src={
              activeChat.avatar.length > 0
                ? activeChat.avatar
                : defaultAvatarUrl
            }
          />
          <h4 className="align-middle">{activeChat.name}</h4>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
