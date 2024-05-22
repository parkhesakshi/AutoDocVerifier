import React, { useState, useEffect } from "react";
import "./UploadModal.scss";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { json } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { docfileUpload, verifydoc } from "../../functions/fileUpload";

const UploadModal = ({
  // This is the UploadModal component
  showUploadModal,
  setShowUploadModal,
  handleUploadModalClose,
  getDocumentsFun,
  fileUname,
  docCode,
  setShowVerifyModal,
  handleDsVerify,
}) => {
  // this are the states of the component
  const [docFile, setDocFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isDSVerified, setisDsVerified] = useState(false);
  const [verifyLoading, setverifyLoading] = useState(false);
  const [verficationMessage, setVerficationMessage] = useState("");
  const { useremail } = useSelector((state) => state.user); // this is the redux hook
  useEffect(() => {
    // this is the useEffect hook
    if (!showUploadModal) {
      setDocFile(null);
      setSelectedFile(null);
      setUploadLoading(false);
    }
  }, []);

  const handleUploadClose = () => {
    // this is the function to close the modal
    setShowUploadModal(false);
    setFileUploaded(false);
    setDocFile(null);
    setSelectedFile(null);
    setUploadLoading(false);
    setVerficationMessage(null);
    setisDsVerified(false);
    setverifyLoading(false);
  };

  const handleFileUplaoded = () => {
    setFileUploaded(false);
    setShowUploadModal(false);
    setSelectedFile(null);
  };
  const fileType = ["application/pdf"];

  const handleFileChange = (e) => {
    // this is the function to handle the file change
    if (e.target.files[0] && fileType.includes(e.target.files[0].type)) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async (e) => {
    // this is the function to handle the file upload
    e.preventDefault(); //prevent the form from submitting
    setUploadLoading(true);
    const formData = new FormData(); // this is the form data
    formData.append("file", selectedFile); //append the file to the form data
    formData.append("useremail", useremail);
    formData.append("fileuname", fileUname);
    formData.append("docCode", docCode);
    docfileUpload(formData)
      .then((res) => {
        setUploadLoading(false);
        res.data.code === 200 ? setFileUploaded(true) : setFileUploaded(false);
        getDocumentsFun();
        console.log(res.data);
      })
      .catch((err) => setUploadLoading(false));
  };

  const handleVerifyClick = () => {
    setShowUploadModal(false);
    setFileUploaded(false);
    setDocFile(null);
    setSelectedFile(null);
    setUploadLoading(false);
    setisDsVerified(false);
    setverifyLoading(false);
    handleDsVerify(docCode);
  };

  return (
    <Modal
      show={showUploadModal}
      onHide={handleUploadClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="uploadModal"
    >
      <Modal.Body>
        <div className="uploadModal_container">
          <div className="uploadModal_container_header">
            <span className="material-icons" onClick={handleUploadClose}>
              close
            </span>
          </div>
          <div className="uploadModal_container_body">
            {/* <!-- up --> */}
            {!fileUploaded && (
              <div className="file_upload_container">
                <svg
                  classname="modal__icon modal__icon--blue"
                  viewBox="0 0 24 24"
                  width="100%"
                  height="100%"
                  aria-hidden="true"
                >
                  <g
                    fill="none"
                    stroke="hsl(223,90%,50%)"
                    strokewidth="2"
                    strokelinecap="round"
                    strokelinejoin="round"
                  >
                    <circle
                      classname="modal__icon-sdo69"
                      cx="12"
                      cy="12"
                      r="11"
                      strokedasharray="69.12 69.12"
                      class="svg-elem-1"
                    ></circle>
                    <polyline
                      classname="modal__icon-sdo14"
                      points="7 12 12 7 17 12"
                      strokedasharray="14.2 14.2"
                      class="svg-elem-2"
                    ></polyline>
                    <line
                      classname="modal__icon-sdo10"
                      x1="12"
                      y1="7"
                      x2="12"
                      y2="17"
                      strokedasharray="10 10"
                      class="svg-elem-3"
                    ></line>
                  </g>
                </svg>
                <div className="file_upload_container_content">
                  <h3>Upload a file</h3>
                  <p>Select a file to upload from your computer</p>
                  {!selectedFile && !fileUploaded && (
                    <div className="uploadModal_container_upload_content">
                      <input
                        type="file"
                        id="doc_file_input"
                        hidden
                        onChange={handleFileChange}
                        accept=".pdf"
                        required
                        draggable
                      />
                      <label
                        for="doc_file_input"
                        className="choose_file_button"
                      >
                        Choose File
                      </label>
                      <p>Note: Only .pdf file are acceptable.</p>
                    </div>
                  )}

                  {/* show file name */}
                  {selectedFile && !fileUploaded && (
                    <div className="file_name_container">
                      <i class="fa-regular fa-file"></i>
                      <p>{selectedFile.name.substring(0, 15)}...</p>
                      <span
                        className="material-icons close"
                        onClick={() => {
                          setSelectedFile(null);
                          setDocFile(null);
                        }}
                      >
                        close
                      </span>

                      <div
                        className="upload_button verify_button"
                        onClick={handleFileUpload}
                      >
                        {uploadLoading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            Loading...
                          </>
                        ) : (
                          "Upload"
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {fileUploaded && (
              <div className="file_uploaded" style={{ margin: "auto 0px" }}>
                <svg
                  class="modal__icon modal__icon--green"
                  viewBox="0 0 24 24"
                  width="100%"
                  height="100%"
                >
                  <g
                    fill="none"
                    stroke="hsl(138,90%,50%)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle
                      class="modal__icon-sdo69 svg-elem-1"
                      cx="12"
                      cy="12"
                      r="11"
                      stroke-dasharray="69.12 69.12"
                    ></circle>
                    <polyline
                      class="modal__icon-sdo14 svg-elem-2"
                      points="7 12.5 10 15.5 17 8.5"
                      stroke-dasharray="14.2 14.2"
                    ></polyline>
                  </g>
                </svg>
                <div className="file_uploaded_content">
                  <h3>Upload Successfully !</h3>
                  <p>Your file hass been uploaded.</p>

                  <div
                    className="file_uploaded_done"
                    onClick={handleVerifyClick}
                  >
                    <div className="done_button">Proceed</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UploadModal;
