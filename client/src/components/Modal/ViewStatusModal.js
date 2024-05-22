import React from "react";
import "./ViewStatusModal.scss";
import Modal from "react-bootstrap/Modal";
import successGIF from "../../assets/gif/successGIF.gif";
import { useSelector } from "react-redux";

const ViewStatusModal = ({
  showViewStatusModal,
  setShowViewStatusModal,
  handleViewStatusModalClose,
  doc,
}) => {
  const handleOK = () => {
    setShowViewStatusModal(false);
  };

  const { username } = useSelector((state) => state.user);
  return (
    <Modal
      show={showViewStatusModal}
      onHide={handleViewStatusModalClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="viewstatus_modal"
    >
      <Modal.Body>
        <div className="viewstatus_container">
          <div className="viewstatus_content">
            <div className="viewstatus_content_item">
              <div className="viewstatus_content_item_title">Status</div>
              <span>:</span>
              <div className="viewstatus_content_item_value">" Verified "</div>
            </div>
            <div className="viewstatus_content_item">
              <div className="viewstatus_content_item_title">User Name</div>
              <span>:</span>
              <div className="viewstatus_content_item_value">"{username}"</div>
            </div>
            <div className="viewstatus_content_item">
              <div className="viewstatus_content_item_title">
                Barcode Number
              </div>
              <span>:</span>
              <div className="viewstatus_content_item_value">
                "{doc && doc.doc_barcode}"
              </div>
            </div>
            <div className="viewstatus_content_item">
              <div className="viewstatus_content_item_title">
                Certificate Name
              </div>
              <span>:</span>
              <div className="viewstatus_content_item_value">
                "{doc && doc.doc_name}"
              </div>
            </div>
            <div className="viewstatus_content_item">
              <div className="viewstatus_content_item_title">Uploaded_at </div>
              <span>:</span>
              <div className="viewstatus_content_item_value">
                "{doc && doc.doc_uploaded}"
              </div>
            </div>
            <div className="viewstatus_content_item">
              <div className="viewstatus_content_item_title">Verified_at </div>
              <span>:</span>
              <div className="viewstatus_content_item_value">
                "{doc && doc.doc_verified}"
              </div>
            </div>
          </div>
          <div className="viewstatus_gif">
            <img src={successGIF} alt="successGIF" />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div
          className="viewstatus_ok_btn"
          onClick={handleViewStatusModalClose}
          style={{
            cursor: "pointer",
            backgroundColor: "#00aa55",
            color: "white",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Close
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewStatusModal;
