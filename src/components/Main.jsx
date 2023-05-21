import { useSelector } from "react-redux";
import { Auth, ChatPanel } from ".";

function Main() {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <main className="overflow-y-auto fixed top-0 bottom-0 right-0 min-h-full flex flex-col w-4/6 bg-stone-200 bg-[url(./src/images/chat_bg.png)] bg-contain">
      {currentUser.authorized === "authorized" ? (
        <ChatPanel />
      ) : (
        <div className="h-full relative ">
          <Auth />
        </div>
      )}
    </main>
  );
}

export default Main;
