import React from "react";
import "./DocCard.scss";
const DocCard = ({
  doc,
  viewStatus,
  isDocNull,
  handleUploadFun,
  isDocVerified,
  handleDsVerify,
  viewDocument,
}) => {
  // this is the DocCard component that is used to show the documents in the Verified.js page
  return (
    <div className="doc_card" key={doc._id}>
      <div className="card__corner">
        <div className="card__corner-triangle"></div>
      </div>
      <div className="doc_card_top">
        <span className="material-icons">edit_document</span>
      </div>
      <div className="doc_card_bottom">
        <h3 className="doc_card_title">{doc.doc_name}</h3>
        <div className="status_button">
          {isDocNull && (
            <button
              className="doc_btn view_status_btn"
              onClick={() => handleUploadFun(doc.doc_slug, doc.doc_code)}
            >
              <span class="material-icons">cloud_upload</span>
              <p>Upload</p>
            </button>
          )}
          {!isDocNull && isDocVerified && (
            <>
              <button
                className="doc_btn viewPDF_btn"
                onClick={() => viewDocument(doc.doc_code)}
              >
                <span class="material-symbols-outlined">picture_as_pdf</span>
                <p>View Document</p>
              </button>
              <div className="d-flex w-100 justify-content-center">
                <button
                  className="doc_btn view_status_btn"
                  onClick={() => viewStatus(doc.doc_code)}
                >
                  <span className="material-icons">visibility</span>
                  <p>Status</p>
                </button>
                {doc.expirable && (
                  <button
                    className="doc_btn reverify_btn"
                    onClick={() => handleUploadFun(doc.doc_slug, doc.doc_code)}
                  >
                    <span className="material-icons">update</span>
                    <p>Reverify</p>
                  </button>
                )}
              </div>
            </>
          )}
          {!isDocNull && !isDocVerified && (
            <>
              <button
                className="doc_btn view_status_btn"
                onClick={() => handleUploadFun(doc.doc_slug, doc.doc_code)}
              >
                <span class="material-icons">sync</span>
                <p>Reupload</p>
              </button>
              <button
                className="doc_btn reverify_btn"
                onClick={() => handleDsVerify(doc.doc_code)}
              >
                <span className="material-icons">update</span>
                <p>Verify</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocCard;
