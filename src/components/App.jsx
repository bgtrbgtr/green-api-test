import { Main, Sidebar, Header, Modal } from ".";

function App() {
  return (
    <>
      <div className="flex flex-col font-sans overflow-y-auto">
        <div className="flex overflow-y-auto">
          <Sidebar />
          <Main />
          <Modal />
        </div>
        <Header />
      </div>
    </>
  );
}

export default App;
