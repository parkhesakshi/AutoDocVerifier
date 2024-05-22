import React from "react";
import "./SuccessModal.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SuccessGIF from "../../assets/gif/successGIF.gif";
const SuccessModal = ({
  showSuccessModal,
  setShowSuccessModal,
  handleSuccessModalClose,
  setShow,
}) => {
  const handleContinueLogin = () => {
    setShowSuccessModal(false);
    setShow(true);
  };
  return (
    <Modal
      show={showSuccessModal}
      onHide={handleSuccessModalClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="success_modal_body">
          <img src={SuccessGIF} alt="" />
          <h4 className="success_message">Registrated Successfully!</h4>
          <p>
            To verify your email address, please check your registered email.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="continue_login_btn" onClick={handleContinueLogin}>
          Continue to Login
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
