import React, { useState, useEffect } from "react";
import "./DsVerifyModal.scss";
import Modal from "react-bootstrap/Modal";
import { DotLoader } from "react-spinners";
import SuccessGif from "../../assets/gif/successGIF.gif";

const DsVerifyModal = ({
  // This is the DsVerifyModal component
  showDsVerifyModal,
  setShowDsVerifyModal,
  handleDsVerifyModalClose,
  dsVerifyLoading,
  setDsVerifyLoading,
  dsVerifyResponse,
  handleOcrVerify,
  docCode,
  dsVerificationMessage,
}) => {
  useEffect(() => {
    // this is the useEffect hook
  }, []);

  const handleUploadClose = () => {
    // this is the function to close the modal
    setShowDsVerifyModal(false);
    setDsVerifyLoading(false);
  };
  return (
    <Modal
      show={showDsVerifyModal}
      onHide={handleDsVerifyModalClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="dsverifyModal"
    >
      <Modal.Body>
        <div className="dsverifymodal_container">
          <div className="dsverifymodal-content">
            {dsVerifyLoading ? (
              <>
                <DotLoader
                  color={"#3f51b5"}
                  loading={dsVerifyLoading}
                  size={50}
                />
                <p>Validating Digital Signature</p>
              </>
            ) : (
              <>
                {dsVerifyResponse.dsVerified ? (
                  <img src={SuccessGif} alt="success" />
                ) : (
                  <span className="material-symbols-outlined">error</span>
                )}
                <p
                  className={dsVerifyResponse.dsVerified ? "success" : "error"}
                >
                  {dsVerifyResponse.message}
                </p>
                {dsVerifyResponse.dsVerified && (
                  <div
                    className="verify_btn"
                    onClick={() => handleOcrVerify(docCode)}
                  >
                    Verify
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DsVerifyModal;
