const axios = require("axios");
exports.getDocInfoFromBarcode = async (barcode) => {
  return await axios.get(
    `${process.env.DUMMY_SERVER_URL}/api/get-doc-info-from-barcode/${barcode}`
  );
};
