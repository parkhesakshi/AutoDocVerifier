const fs = require("fs");
const UserDocumentEntry = require("../model/userDocumentEntry");
const UserDocuments = require("../model/document");
const DocCodes = require("../model/docCodes");
exports.calculateAge = (dob) => {
  const date = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
    age -= 1;
  }
  return age;
};

exports.deleteFile = async (filePath, userid, docCode) => {
  fs.unlink(filePath, function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
    } else {
      console.info(`removed`);
    }
  });

  await UserDocumentEntry.findOneAndDelete({
    user_id: userid,
    doc_code: docCode,
  });

  const doc_code = await DocCodes.findOne({ doc_code: docCode });

  await UserDocuments.findOneAndUpdate(
    { user: userid },
    { [doc_code.doc_slug]: null }
  );
};
