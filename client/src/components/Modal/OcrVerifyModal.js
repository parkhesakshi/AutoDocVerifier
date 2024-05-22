import React, { useState, useEffect } from "react";
import "./OcrVerifyModal.scss";
import Modal from "react-bootstrap/Modal";
import { DotLoader } from "react-spinners";
import SuccessGif from "../../assets/gif/successGIF.gif";

const OcrVerifyModal = ({
  // This is the DsVerifyModal component
  showOcrVerifyModal,
  setShowOcerVerifyModal,
  handleOcrVerifyModalClose,
  ocrVerifyLoading,
  setOcrVerifyLoading,
  ocrVerifyResponse,
}) => {
  useEffect(() => {
    // this is the useEffect hook
  }, []);

  return (
    <Modal
      show={showOcrVerifyModal}
      onHide={handleOcrVerifyModalClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="ocrverifyModal"
    >
      <Modal.Body>
        <div className="ocrverifyModal_container">
          <div className="ocrverifyModal_content">
            {ocrVerifyLoading ? (
              <>
                <p style={{ fontSize: ".9rem" }}>
                  Note: It may take upto 10min.
                </p>
                <DotLoader
                  color={"#3f51b5"}
                  loading={ocrVerifyLoading}
                  size={50}
                />
                <p>Verifying document</p>
              </>
            ) : (
              <>
                {ocrVerifyResponse && (
                  <>
                    {ocrVerifyResponse.ocrVerified ? (
                      <img src={SuccessGif} alt="success" />
                    ) : (
                      <span className="material-symbols-outlined">error</span>
                    )}
                    <p
                      className={
                        ocrVerifyResponse.ocrVerified ? "success" : "error"
                      }
                    >
                      {ocrVerifyResponse.message}
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OcrVerifyModal;
