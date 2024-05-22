const express = require("express"); //import express package from node_modules folder
const router = express.Router(); //create new router using express router method
const {
  //import docUpload, getDocuments and verifyds functions from controllers\docUpload.js file
  docUpload,
  getDocuments,
  getDocumentFile,
  getDocumentInfo,
} = require("../controllers/documentProcess");
const { DSVerify, OCRVerify } = require("../controllers/docVerification");

router.post("/docupload", docUpload); //upload document route

router.post("/getDocuments", getDocuments); //get documents route

router.post("/ds-verify", DSVerify); //verify digital signature route

router.post("/ocr-verify", OCRVerify); //verify digital signature route

router.get("/get-document-file", getDocumentFile);

router.get("/getDocumentInfo", getDocumentInfo);

module.exports = router; //export router to use in server.js file
