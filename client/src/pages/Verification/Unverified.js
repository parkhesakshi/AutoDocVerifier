import React, { useState, useEffect } from "react";
import "./index.scss";
import DocCard from "./DocCard";
import UploadModal from "../../components/Modal/UploadModal";
import { useSelector } from "react-redux";

import { getDocCodes } from "../../functions/doc";
import { dsVerify, ocrVerify } from "../../functions/fileUpload";
import DsVerifyModal from "../../components/Modal/DsVerifyModal";
import OcrVerifyModal from "../../components/Modal/OcrVerifyModal";
import { ScaleLoader } from "react-spinners";
const Unverified = ({ userDocInfo, getDocumentsFun, userDocs, docLoading }) => {
  const [fileUname, setFileUname] = useState(null);
  const [docCode, setDocCode] = useState(null);
  const handleUploadModalClose = () => setShowUploadModal(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDsVerifyModal, setShowDsVerifyModal] = useState(false);
  const [showOcrVerifyModal, setShowOcrVerifyModal] = useState(false);
  const handleOcrVerifyModalClose = () => {
    setShowOcrVerifyModal(false);
    getDocumentsFun();
  };
  const handleDsVerifyModalClose = () => {
    setShowDsVerifyModal(false);
  };
  const [dsVerifyResponse, setDsVerifyResponse] = useState({});
  const [dsVerificaitonMessage, setDsVerificaitonMessage] = useState(null);
  const [ocerVerificationMessage, setocerVerificationMessage] = useState(null);
  const [ocrVerifyResponse, setOcrVerifyResponse] = useState({});

  const [dsVerifyLoading, setDsVerifyLoading] = useState(false);
  const [ocrVerifyLoading, setOcrVerifyLoading] = useState(false);
  const { userid } = useSelector((state) => state.user); // this is the redux hook
  const [docCodesData, setDocCodesData] = useState([]);

  const handleUploadFun = (uname, docCode) => {
    setFileUname(uname);
    setDocCode(docCode);
    setShowUploadModal(true);

    // getDocumentsFun();
  };

  useEffect(() => {
    getDocCodesFun();
  }, []);

  const findDoc = (docCode) => {
    const doc = userDocs.find((doc) => doc.doc_code === docCode);
    if (!doc) return false;
    if (doc.ds_verified === true && doc.ocr_verified === true) return true;
    return false;
  };

  const getDocCodesFun = () => {
    getDocCodes()
      .then((res) => {
        setDocCodesData(res.data.docCodes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOcrVerify = (doccode) => {
    console.log("I am in ocer", doccode);
    setShowOcrVerifyModal(true);
    setOcrVerifyLoading(true);
    setShowDsVerifyModal(false);
    ocrVerify({ docCode: doccode, userid: userid })
      .then((res) => {
        console.log("OCR VErify response", res.data);
        setOcrVerifyLoading(false);
        setOcrVerifyResponse(res.data);

        console.log("Called get docuemnt function", userDocs, userDocInfo);
        // setTimeout(() => {
        //   setShowDsVerifyModal(false);
        // }, 3000);
      })
      .catch((err) => setOcrVerifyLoading(false));

    getDocumentsFun();
  };

  const handleDsVerify = (doccode) => {
    setShowDsVerifyModal(true);
    setDsVerifyLoading(true);
    dsVerify({ docCode: doccode, userid: userid })
      .then((res) => {
        // setVerficationMessage(res.data.message);
        console.log(res.data);
        setDsVerifyLoading(false);
        setDsVerifyResponse(res.data);
        getDocumentsFun();
        // setTimeout(() => {
        //   setShowDsVerifyModal(false);
        // }, 3000);
      })
      .catch((err) => setDsVerifyLoading(false));
  };

  return (
    <div className="unverified_doc doc_section">
      <div className="d-flex justify-content-between">
        <h2>
          <span className="material-icons">pending_actions</span>
          Unverified Documents
        </h2>
        <div
          className="refresh_btn d-flex justify-content-center align-items-center"
          onClick={() => getDocumentsFun()}
        >
          <span className="material-symbols-outlined">refresh</span>
        </div>
      </div>
      <div className="doc_carausel">
        {!docLoading ? (
          docCodesData.map((doc) => {
            // map through the DocData array
            if (userDocs.length === 0) {
              // if userDocs is not empty
              return (
                <DocCard
                  key={doc.doc_code} // pass the doc object to DocCard
                  doc={doc} // pass the doc object to DocCard
                  handleUploadFun={handleUploadFun} // pass the function to DocCard
                  isDocNull={userDocInfo[doc.doc_slug] === null}
                />
              );
            } else {
              if (
                userDocInfo[doc.doc_slug] === null ||
                !findDoc(doc.doc_code)
              ) {
                return (
                  <DocCard
                    key={doc.doc_code} // pass the doc object to DocCard
                    doc={doc} // pass the doc object to DocCard
                    handleUploadFun={handleUploadFun} // pass the function to DocCard
                    isDocNull={userDocInfo[doc.doc_slug] === null}
                    isDocVerified={findDoc(doc.doc_code)} // pass the function to DocCard
                    handleDsVerify={handleDsVerify}
                  />
                );
              }
            }
          })
        ) : (
          <ScaleLoader color="#00aa55" height={40} />
        )}
      </div>
      <UploadModal
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
        handleUploadModalClose={handleUploadModalClose}
        fileUname={fileUname}
        docCode={docCode}
        getDocumentsFun={getDocumentsFun}
        setShowDsVerifyModal={setShowDsVerifyModal}
        handleDsVerify={handleDsVerify}
      />
      <DsVerifyModal
        showDsVerifyModal={showDsVerifyModal}
        setShowDsVerifyModal={setShowDsVerifyModal}
        handleDsVerifyModalClose={handleDsVerifyModalClose}
        dsVerifyLoading={dsVerifyLoading}
        dsVerifyResponse={dsVerifyResponse}
        setDsVerifyLoading={setDsVerifyLoading}
        handleOcrVerify={handleOcrVerify}
        docCode={docCode}
        dsVerificationMessage={dsVerificaitonMessage}
      />
      <OcrVerifyModal
        showOcrVerifyModal={showOcrVerifyModal}
        setShowOcrVerifyModal={setShowOcrVerifyModal}
        handleOcrVerifyModalClose={handleOcrVerifyModalClose}
        ocrVerifyLoading={ocrVerifyLoading}
        ocrVerifyResponse={ocrVerifyResponse}
        setOcrVerifyLoading={setOcrVerifyLoading}
        ocerVerificationMessage={ocerVerificationMessage}
        getDocumentsFun={getDocumentsFun}
      />
    </div>
  );
};

export default Unverified;
