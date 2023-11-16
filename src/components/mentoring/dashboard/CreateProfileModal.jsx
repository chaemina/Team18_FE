import Modal from "react-modal";

import Fallback from "../../common/Fallback";
import ProfileModal from "./ProfileModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function CreateProfileModal({ isModal, setIsModal, uid }) {
  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <Modal
      contentLabel="Profile Modal"
      isOpen={isModal}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <button onClick={closeModal} className="w-fit">
        <span className="material-symbols-outlined">close</span>
      </button>
      <Fallback errorMessage="Failed to load profile">
        <ProfileModal uid={uid} />
      </Fallback>
    </Modal>
  );
}
