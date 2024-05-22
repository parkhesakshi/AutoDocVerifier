const User = require("../model/user");
const UserDocuments = require("../model/document");
const UserDocumentEntry = require("../model/userDocumentEntry");
const DocCodes = require("../model/docCodes");
const fs = require("fs");

exports.docUpload = async (req, res) => {
  //upload document
  try {
    const { useremail, fileuname, docCode } = req.body; //get user email, filename,docCode from request body

    const user = await User.findOne({ email: useremail }); //find user by email
    const newpath = `./assets/users/${user.userfolder}/`; //create path for user folder
    const file = req.files.file; //get file from request
    const pdf_filename = `${user.first_name}${user.last_name}_${fileuname}.pdf`; //create pdf_filename

    file.mv(`${newpath}${pdf_filename}`, (err) => {
      //move file to user folder
      if (err) {
        //if error occurs
        res.status(500).json({ message: "File upload failed", code: 500 }); //send error message
        return;
      }
      // res.status(200).send({ message: "File Uploaded", code: 200 }); //send success message
    });

    const doc_code = await DocCodes.findOne({ doc_code: docCode });
    //get document name from docCode

    const checkdoc = await UserDocumentEntry.findOne({
      doc_code: docCode,
      user_id: user._id,
    });

    if (!checkdoc) {
      const doc = await UserDocumentEntry({
        doc_code: docCode,
        user_id: user._id,
        pdf_file_name: pdf_filename,
        doc_name: doc_code.doc_name,
        uploaded_at: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Calcutta",
        }),
      }).save();
      const doc_info = await UserDocuments.findOneAndUpdate(
        //update document info in user document collection
        { user: user._id }, //find user by id in user document collection
        { [doc_code.doc_slug]: doc._id } //update document info
      );

      res.json({
        //send response
        message: "File Reuploaded",
        code: 200,
      });
      return;
    }

    return res.json({
      //send response
      message: "File Uploaded",
      code: 200,
    });
  } catch (err) {
    //catch error
    console.log(err);
    res.status(500).json({ message: "File upload failed", code: 500 }); //send error message
  }
};

exports.getDocuments = async (req, res) => {
  const { userID } = req.body;

  const DocInfo = await UserDocuments.findOne({ user: userID });
  const Docs = await UserDocumentEntry.find({ user_id: userID });
  res.json({
    doc_info: DocInfo,
    docs: Docs,
  });
};

exports.getDocumentFile = async (req, res) => {
  const { docCode, userid } = req.query;
  const user = await User.findById(userid); //find user by email
  const doc = await UserDocumentEntry.findOne({
    doc_code: docCode,
    user_id: userid,
  }); //find document by docCode and user id
  const file = `${__dirname}/../assets/users/${user.userfolder}/${doc.pdf_file_name}`;
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename= "${doc.pdf_file_name}"`
  );

  const readStream = fs.createReadStream(file);
  readStream.pipe(res);
};

exports.getDocumentInfo = async (req, res) => {
  const { docCode, userid } = req.query;

  const user = await User.findById(userid); //find user by email
  const docCodeInfo = await DocCodes.findOne({ doc_code: docCode });
  const doc = await UserDocumentEntry.findOne({
    doc_code: docCode,
    user_id: userid,
  }); //find document by docCode and user id
  res.json({
    doc_name: docCodeInfo.doc_name,
    doc_barcode: doc.barcode,
    doc_uploaded: doc.uploaded_at,
    doc_verified: doc.verified_at,
  });
};
