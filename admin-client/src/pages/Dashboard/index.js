import React, { useState } from "react";
import AllUsers from "./Users/AllUsers";
import "./index.scss";
import DocStats from "./DocStats";
import PDF from "./Domicile.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Dashboard = () => {
  const [numPages, setNumPages] = React.useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div className="dashboard_container">
      <div className="dashboard_left">
        {/* <DocStats /> */}
        <Document file={PDF} onLoadSuccess={onDocumentLoadSuccess}>
          {/* {Array.from(new Array(numPages), (el, index) => (
            
          ))} */}
          <Page key={`page_${0 + 1}`} pageNumber={1} renderTextLayer={false} />
        </Document>
      </div>
      <div className="dashboard_right">
        <AllUsers />
      </div>
    </div>
  );
};

export default Dashboard;
