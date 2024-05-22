const { Connection } = require("../config/config");

const db = Connection.open();

exports.getDocInfo = async (req, res) => {
  const barcode = req.params.barcode;

  const docCodeFromBarcode = barcode.slice(0, 4);

  console.log("docCodeFromBarcode", docCodeFromBarcode);
  const docInfo = await db
    .collection("doccodes")
    .findOne({ doc_code: parseInt(docCodeFromBarcode) });

  console.log(barcode);

  const UserDocInfo = await db
    .collection(docInfo?.doc_slug)
    .findOne(
      { barcode_no: barcode?.toString() },
      { projection: { _id: 0, barcode_no: 0 } }
    );

  // console.log(UserDocInfo);

  if (!UserDocInfo) {
    return res.json({
      notFound: true,
      message: "No document found",
    });
  }

  return res.status(200).send({
    data: UserDocInfo,
  });
};
