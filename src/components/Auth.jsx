import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setCurrentUser } from "../store/currentUserSlice";
import { authorize } from "../utils/MainApi";

function Auth() {
  const currentUser = useSelector((state) => state.currentUser);
  const [id, setId] = useState(currentUser.idInstance);
  const [token, setToken] = useState(currentUser.apiTokenInstance);
  const dispatch = useDispatch();

  const handleAuthorization = () => {
    authorize(id, token)
      .then((res) => {
        dispatch(setCurrentUser({ idInstance: id, apiTokenInstance: token }));
        dispatch(setAuth(res.stateInstance));
      })
      .catch((err) => console.log(err));
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  return (
    <form className="absolute flex flex-col top-1/4 left-1/4 h-fit w-2/4 rounded-md bg-gray-200 p-6 border border-gray-300">
      <h5 className="text-center text-sm mb-6">
        Введите учетные данные Green-API
      </h5>
      <label className="text-sm">Укажите ID:</label>
      <input
        className="w-full mb-2 rounded-md outline-none p-1"
        value={id}
        onChange={handleIdChange}
      ></input>
      <label className="text-sm">Укажите API-токен:</label>
      <input
        type="password"
        className="w-full mb-5 rounded-md outline-none p-1"
        value={token}
        onChange={handleTokenChange}
      ></input>
      <button
        type="button"
        className="bg-green-400 h-8 text-white rounded-md hover:bg-green-500 active:bg-green-600"
        onClick={handleAuthorization}
      >
        Войти
      </button>
    </form>
  );
}

export default Auth;
