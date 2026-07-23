import { usePlayer } from "./context/PlayerContext";
import { useModal } from "./context/ModalContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Modal from "./components/layout/Modal";

function App() {
  const { player, loading } = usePlayer();
  const { modal, hideModal } = useModal();

  if (loading) {
    return (
      <div className="login-page">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      {player ? <Home /> : <Login />}

      <Modal
        open={modal.open}
        title={modal.title}
        onClose={hideModal}
      >
        <p>{modal.message}</p>
      </Modal>
    </>
  );
}

export default App;