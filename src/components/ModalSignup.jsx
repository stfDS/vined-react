/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Modal from "react-modal";
import Signup from "./Signup";

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

const ModalSigup = () => {
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
        Inscription
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
          Inscription
        </h3>

        <Signup closeModal={closeModal} />

        <button className="btn-modal" onClick={closeModal}>
          fermer
        </button>
      </Modal>
    </div>
  );
};

export default ModalSigup;
