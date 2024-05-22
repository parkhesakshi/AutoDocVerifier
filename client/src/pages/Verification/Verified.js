import React, { useState, useEffect } from "react";
import ViewStatusModal from "../../components/Modal/ViewStatusModal";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./index.scss";
import DocCard from "./DocCard";
import UploadModal from "../../components/Modal/UploadModal";
import { getDocCodes } from "../../functions/doc";
import { ScaleLoader } from "react-spinners";
import PDFViewerModal from "../../components/Modal/PDFViewerModal";
import { useSelector } from "react-redux";
import { getDocFile, getDocInfo } from "../../functions/fileUpload";

const Verified = ({ userDocInfo, userDocs, getDocumentsFun, docLoading }) => {
  const [showViewStatusModal, setShowViewStatusModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPDFViewerModal, setShowPDFViewerModal] = useState(false);
  const handleUploadModalClose = () => setShowUploadModal(false);
  const [docCode, setDocCode] = useState(null);
  const [fileUname, setFileUname] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
  const [isPDFViewLoading, setIsPDFViewLoading] = useState(false);
  const [docCodesData, setDocCodesData] = useState([]);
  const [currentstatusdoc, setCurrentstatusdoc] = useState(null);
  const { userid } = useSelector((state) => state.user); // this is the redux hook

  const handleUploadFun = (uname, docCode) => {
    setFileUname(uname);
    setDocCode(docCode);
    setShowUploadModal(true);

    // getDocumentsFun();
  };

  useEffect(() => {
    getDocCodesFun();
    // this is the useEffect hook that is called when the userDocInfo or userDocs state changes
  }, []);

  const handleViewStatusModalClose = () => {
    setShowViewStatusModal(false);
    setCurrentstatusdoc(null);
  };
  const viewStatus = (docCode) => {
    getDocInfo(docCode, userid).then((res) => {
      setCurrentstatusdoc(res.data);
      setShowViewStatusModal(true);
    });
  };

  const findDoc = (docCode) => {
    const doc = userDocs.find((doc) => doc.doc_code === docCode);
    console.log("userDocs", userDocs);
    if (doc.ds_verified === true && doc.ocr_verified === true) return true;
    return false;
  };

  const getDocCodesFun = () => {
    getDocCodes()
      .then((res) => {
        setDocCodesData(res.data.docCodes);
      })
      .catch((err) => {});
  };

  const viewDocument = (docCode) => {
    getDocFile(docCode, userid).then((res) => {
      setShowPDFViewerModal(true);
      setTimeout(() => {
        setPdfFile(res.data);
      }, 3000);
      setIsPDFViewLoading(false);
    });
  };

  const handlePDFViewerModalClose = () => {
    setShowPDFViewerModal(false);
    setPdfFile(null);
  };

  return (
    <div className="verified_doc doc_section">
      <h2>
        <span className="material-icons">verified</span>Verified Documents
      </h2>
      <div className="doc_carausel doc-cards">
        {!docLoading ? (
          <>
            {userDocs.length !== 0 ? (
              docCodesData.map((doc) => {
                // map through the DocData array
                if (userDocs.length !== 0) {
                  // if userDocs is not empty
                  if (
                    userDocInfo[doc.doc_slug] !== null &&
                    findDoc(doc.doc_code)
                  ) {
                    // if user has uploaded the document and the document is verified
                    // if user has uploaded the document
                    return (
                      <DocCard
                        key={doc.doc_code} // pass the doc object to DocCard
                        doc={doc} // pass the doc object to DocCard
                        handleUploadFun={handleUploadFun} // pass the function to DocCard
                        viewStatus={viewStatus} // pass the function to DocCard
                        isDocVerified={findDoc(doc.doc_code)} // pass the function to DocCard
                        viewDocument={viewDocument} // pass the function to DocCard
                      />
                    );
                  }
                }
              })
            ) : (
              <div className="no-docs">
                <h4>No Documents </h4>
              </div>
            )}
          </>
        ) : (
          <ScaleLoader color="#00aa55" height={40} />
        )}
      </div>

      <ViewStatusModal // ViewStatusModal is a modal that shows the status of the document
        showViewStatusModal={showViewStatusModal}
        setShowViewStatusModal={setShowViewStatusModal}
        handleViewStatusModalClose={handleViewStatusModalClose}
        doc={currentstatusdoc}
      />
      <UploadModal
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
        handleUploadModalClose={handleUploadModalClose}
        fileUname={fileUname}
        docCode={docCode}
        getDocumentsFun={getDocumentsFun}
      />
      <PDFViewerModal
        setShowPDFViewerModal={setShowPDFViewerModal}
        showPDFViewerModal={showPDFViewerModal}
        handlePDFViewerModalClose={handlePDFViewerModalClose}
        pdfFile={pdfFile}
        isLoading={isPDFViewLoading}
        setPdfFile={setPdfFile}
      />
    </div>
  );
};

export default Verified;
