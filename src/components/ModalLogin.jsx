import Modal from "react-modal";

import Login from "./Login";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "20%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "none",
  },
};

const ModalLogin = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button className="btn-modal" onClick={openModal}>
        Connexion
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h3
          className="description-title
        "
        >
          Connexion
        </h3>

        <Login closeModal={closeModal} />

        <button className="btn-modal" onClick={closeModal}>
          fermer
        </button>
      </Modal>
    </div>
  );
};

export default ModalLogin;
