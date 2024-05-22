const mongoose = require("mongoose");
const UserDocumentEntry = require("../model/userDocumentEntry");
const DocCodes = require("../model/docCodes");
const User = require("../model/user");
var pdf2img = require("pdf-img-convert");
const fs = require("fs");
const barcode_ = require("aspose.barcode");
const aspose_barcode = barcode_.AsposeBarcode;
let BarCodeReader = aspose_barcode.BarCodeReader;
let QualitySettings = aspose_barcode.QualitySettings;
const { createWorker } = require("tesseract.js");
var os = require("os"); //import os module from node_modules folder
const { getDocInfoFromBarcode } = require("../helpers/dummy");
const { deleteFile } = require("../helpers/general");
const { log } = require("console");

if (os.platform() == "win32") {
  //check platform for windows 32 bit or 64 bit or linux 32 bit or 64 bit or macos or arm
  if (os.arch() == "ia32") {
    //check architecture for windows 32 bit or 64 bit or linux 32 bit or 64 bit or macos or arm
    var chilkat = require("@chilkat/ck-node16-win-ia32"); //import chilkat module for windows 32 bit
  } else {
    var chilkat = require("@chilkat/ck-node16-win64"); //import chilkat module for windows 64 bit
  }
} else if (os.platform() == "linux") {
  //check platform
  if (os.arch() == "arm") {
    //check architecture
    var chilkat = require("@chilkat/ck-node16-arm"); //import chilkat module for linux arm
  } else if (os.arch() == "x86") {
    //check architecture
    var chilkat = require("@chilkat/ck-node16-linux32"); //import chilkat module for linux 32 bit
  } else {
    var chilkat = require("@chilkat/ck-node16-linux64"); //import chilkat module for linux 64 bit
  }
}

exports.DSVerify = async (req, res) => {
  const { docCode, userid } = req.body; //get docCode and userid from request body
  const user = await User.findById(userid); //find user by email
  const doc = await UserDocumentEntry.findOne({
    doc_code: docCode,
    user_id: user._id,
  }); //find document by docCode and user id

  const doc_code = await DocCodes.findOne({ doc_code: docCode }); //find document code by docCode
  const png_file = `${__dirname}/../assets/users/${user.userfolder}/${doc.png_file_name}`;
  const pdf_file = `${__dirname}/../assets/users/${user.userfolder}/${doc.pdf_file_name}`;

  const png_filename = `${user.first_name}${user.last_name}_${doc_code.doc_slug}.png`; //create png_filename

  const { signInfoArray, validated } = this.dsVerification(pdf_file);
  const result = await this.PDF_TO_IMG(
    png_filename,
    pdf_file,
    user.userfolder,
    `${user.first_name}${user.last_name}`,
    user._id
  );

  if (signInfoArray.length === 0) {
    return res.json({
      dsExist: false,
      dsVerified: false,
      message: "No Digital Signature is found",
    });
  }

  if (!validated) {
    return res.json({
      dsExist: true,
      dsVerified: false,
      message: "Digital Signature is not validated or expired",
    });
  }

  doc.png_file_name = png_filename;
  doc.ds_verified = true;
  await doc.save();

  return res.json({
    dsExist: true,
    dsVerified: true,
    message: "Digital Signature is verified",
  });
};

exports.dsVerification = (docfile) => {
  //export function DSVerify
  var pdf = new chilkat.Pdf(); //create new instance of Pdf class
  // Load a PDF that has cryptographic signatures to be validated
  var success = pdf.LoadFile(docfile); //load pdf file
  if (success == false) {
    console.log(pdf.LastErrorText);
    return;
  }
  // Each time we verify a signature, information about the signature is written into
  // sigInfo (replacing whatever sigInfo previously contained).
  var sigInfo = new chilkat.JsonObject(); //create new instance of JsonObject class
  sigInfo.EmitCompact = false; //set EmitCompact property to false to emit the JSON in a human-readable format with indentation and newlines.
  // Iterate over each signature and validate each.
  var numSignatures = pdf.NumSignatures; //get number of signatures in pdf file and store it in numSignatures variable
  var validated = false; //set validated to false initially
  var i = 0; //set i to 0 initially
  const signInfoArray = []; //create empty array to store signature info
  while (i < numSignatures) {
    //iterate over each signature
    validated = pdf.VerifySignature(i, sigInfo); //verify signature and store result in validated variable
    console.log("Signature " + i + " validated: " + validated);
    console.log(sigInfo.Emit());
    signInfoArray.push(sigInfo.Emit()); //push signature info to signInfoArray
    i = i + 1;
  }
  return { signInfoArray, validated }; //return signInfoArray
};

exports.PDF_TO_IMG = async (filename, docfilePath, user_folder, user_id) => {
  const outputDir = `${__dirname}/../assets/users/${user_folder}`;
  const imgFile = `${filename}_${user_id}.png`;

  pdfArray = await pdf2img.convert(docfilePath, { width: 2000, height: 2000 });
  console.log("saving", typeof pdfArray);
  for (i = 0; i < pdfArray.length; i++) {
    fs.writeFile(`${outputDir}/${filename}`, pdfArray[i], function (error) {
      if (error) {
        console.error("Error: " + error);
      }
    }); //writeFile
  }
};

exports.OCRVerify = async (req, res) => {
  const { docCode, userid } = req.body; //get docCode and userid from request body'

  console.log("docCode", docCode);

  const user = await User.findById(userid); //find user by email

  const doc = await UserDocumentEntry.findOne({
    doc_code: docCode,
    user_id: user._id,
  });
  const doc_code = await DocCodes.findOne({ doc_code: docCode }); //find document code by docCode

  const pdf_file = `${__dirname}/../assets/users/${user.userfolder}/${doc.pdf_file_name}`;
  const png_file = `${__dirname}/../assets/users/${user.userfolder}/${doc.png_file_name}`;

  console.log("reading barcode");
  // const docBarcode = ["12842206031005168976"];
  const barcodes = this.readBarcodeFromImg(png_file);
  console.log('barcodes', barcodes)
  const docBarcode = barcodes[0].split("****");
  doc.barcode = docBarcode[0];
  await doc.save();

  const docCodeFromDocument = docBarcode[0].substring(0, 4);

  if (parseInt(docCodeFromDocument) !== parseInt(docCode)) {
    deleteFile(pdf_file, user._id, docCode);
    // deleteFile(png_file, user._id, docCode);
    return res.json({
      ocrVerified: false,
      notRelevantDoc: true,
      message: "Please upload the relevant document",
    });
  }

  //get document info using barcode from dummy server
  const checkDocInfo = await getDocInfoFromBarcode(docBarcode[0]);

  if (checkDocInfo.data.notFound) {
    return res.json({
      ocrVerified: false,
      message: "Document is not found",
    });
  }

  let stringToMatch = Object.values(checkDocInfo.data.data);
  console.log("stringToMatch", stringToMatch);

  const matches = await this.extractMatchData(png_file, stringToMatch);
  console.log("matches", matches);

  if (matches.includes(false)) {
    return res.json({
      ocrVerified: false,
      message: "Document is not verified",
    });
  }

  doc.ocr_verified = true;
  doc.verified_at = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
  });
  await doc.save();

  return res.json({
    // docInfo: checkDocInfo,
    ocrVerified: true,
    notRelevantDoc: false,
    message: "Document is verified",
  });
};

exports.stringMatchingData = (data) => {};

exports.readBarcodeFromImg = (imgFile) => {
  console.log("imgFile:", imgFile);
  let barcodes = [];
  try {
    let reader = new BarCodeReader(imgFile, null, null);
    reader.setQualitySettings(QualitySettings.getHighPerformance());
    reader.getQualitySettings().setAllowMedianSmoothing(true);
    reader.getQualitySettings().setMedianSmoothingWindowSize(5);
    reader.readBarCodes().forEach(function (result, i, results) {
      barcodes.push(result.getCodeText());
      console.log(result.getCodeText());
    });
  } catch (error) {
    console.log("error", error);
  }
  return barcodes;
};

exports.extractMatchData = async (png_file, stringsToMatch) => {
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage(["eng", "mar"]);
  await worker.initialize(["eng", "mar"]);

  // Match each string using OCR and regular expressions
  const matches = [];

  const { data } = await worker.recognize(png_file);
  const text = data.text.toLowerCase();
  console.log("extracted text", text);

  for (const str of stringsToMatch) {
    const regex = new RegExp(str.toLowerCase(), "gi");
    const result = regex.test(text);
    matches.push({ string: str, matched: result });
  }

  // Terminate the worker
  await worker.terminate();

  let valueMatches = matches.map((m) => {
    return m.matched;
  });
  // // Return the matches
  return valueMatches;
};
