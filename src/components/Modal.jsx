import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModalIsOpen } from "../store/modalSlice";
import { getChatHistory, getContactInfo } from "../utils/MainApi";
import { addNewContact } from "../store/contactsSlice";

function Modal() {
  const [inputValue, setInputValue] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const currentModalState = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleFormSubmit = (e, contact) => {
    e.preventDefault();

    const getInfoPromise = getContactInfo(
      currentUser.idInstance,
      currentUser.apiTokenInstance,
      contact
    );

    const getChatHistoryPromise = getChatHistory(
      currentUser.idInstance,
      currentUser.apiTokenInstance,
      `${contact}@c.us`
    );

    Promise.all([getInfoPromise, getChatHistoryPromise])
      .then((values) => {
        dispatch(addNewContact(values));
        dispatch(setModalIsOpen());
        setInputValue("");
      })
      .catch((error) => console.log(error));
  };

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      {currentModalState.isOpen ? (
        <form
          name="contactNumber"
          className="absolute flex flex-col top-1/4 left-1/4 h-fit w-2/4 rounded-md bg-gray-200 p-6 border border-gray-300"
          onSubmit={(e) => handleFormSubmit(e, inputValue)}
        >
          <button
            type="button"
            className="bg-[url(/window_close.svg)] bg-contain bg-no-repeat w-4 h-4 self-end"
            onClick={() => {
              dispatch(setModalIsOpen());
            }}
          ></button>
          <label className="text-sm">Укажите номер телефона:</label>
          <input
            type="text"
            placeholder="Например: 79091231231"
            value={inputValue}
            required={true}
            className="w-full mb-2 rounded-md outline-none p-1 placeholder:italic placeholder:text-gray-400 placeholder:text-sm"
            onChange={handleChangeInput}
          ></input>
          <button
            type="submit"
            className="bg-green-400 h-8 text-white rounded-md hover:bg-green-500 active:bg-green-600"
          >
            Начать чат
          </button>
        </form>
      ) : null}
    </>
  );
}

export default Modal;
