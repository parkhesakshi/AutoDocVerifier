import React, { useEffect, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
import Modal from "react-bootstrap/Modal";
import { getDocFile } from "../../functions/fileUpload";
import "./PDFViewerModal.scss";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewerModal = ({
  showPDFViewerModal,
  setShowPDFViewerModal,
  handlePDFViewerModalClose,
  pdfFile,
  isLoading,
}) => {
  const [numPages, setNumPages] = useState(0);
  const { userid } = useSelector((state) => state.user); // this is the redux hook

  // console.log(pdfFile);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <Modal
      className="view_doc_modal"
      show={showPDFViewerModal}
      onHide={handlePDFViewerModalClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="d-flex justify-content-center">
        {isLoading ? (
          <ScaleLoader color="#00aa55" height={40} />
        ) : (
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            noData={
              <div className="d-flex flex-column justify-content-center">
                <ScaleLoader color="#00aa55" height={30} />
                <h6>Loading PDF...</h6>
              </div>
            }
            loading={
              <div className="d-flex flex-column justify-content-center">
                <ScaleLoader color="#00aa55" height={30} />
                <h6>Loading PDF...</h6>
              </div>
            }
          >
            <Page
              key={`page_${0 + 1}`}
              pageNumber={1}
              renderTextLayer={false}
            />
          </Document>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div
          className="view_pdf_btn"
          onClick={handlePDFViewerModalClose}
          style={{
            cursor: "pointer",
            backgroundColor: "#00aa55",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Close
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PDFViewerModal;
