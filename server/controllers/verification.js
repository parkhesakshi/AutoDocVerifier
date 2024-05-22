var https = require("https");
var path = require("path");
var fs = require("fs");
var request = require("request");

const getbarcode = async () => {
  let userBarcode = [];
  console.log();
  const API_KEY =
    "sakshiparkhe56@gmail.com_obYkq4SDU2eZs196vrRWIFAl5q3Xc70F3RQQVA3GOd28GO65GGN2ob4sNk5MOj96";

  const SourceFile = "./Domicile.pdf";
  // Comma-separated list of barcode types to search.
  // See valid barcode types in the documentation https://apidocs.pdf.co
  const BarcodeTypes = "Code128,Code39,Interleaved2of5,EAN13";
  // Comma-separated list of page indices (or ranges) to process. Leave empty for all pages. Example: '0,2-5,7-'.
  const Pages = "";
  // 1. RETRIEVE THE PRESIGNED URL TO UPLOAD THE FILE.
  getPresignedUrl(API_KEY, SourceFile)
    .then(([uploadUrl, uploadedFileUrl]) => {
      // 2. UPLOAD THE FILE TO CLOUD.
      uploadFile(API_KEY, SourceFile, uploadUrl)
        .then(() => {
          // 3. READ BARCODES FROM UPLOADED FILE
          readBarcodes(API_KEY, uploadedFileUrl, Pages, BarcodeTypes);
          console.log("I am in then", userBarcode);
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });

  function getPresignedUrl(apiKey, localFile) {
    return new Promise((resolve) => {
      // Prepare request to `Get Presigned URL` API endpoint
      let queryPath = `/v1/file/upload/get-presigned-url?contenttype=application/octet-stream&name=${path.basename(
        SourceFile
      )}`;
      let reqOptions = {
        host: "api.pdf.co",
        path: encodeURI(queryPath),
        headers: { "x-api-key": API_KEY },
      };
      // Send request
      https
        .get(reqOptions, (response) => {
          response.on("data", (d) => {
            let data = JSON.parse(d);
            if (data.error == false) {
              // Return presigned url we received
              resolve([data.presignedUrl, data.url]);
            } else {
              // Service reported error
              console.log("getPresignedUrl(): " + data.message);
            }
          });
        })
        .on("error", (e) => {
          // Request error
          console.log("getPresignedUrl(): " + e);
        });
    });
  }

  function uploadFile(apiKey, localFile, uploadUrl) {
    return new Promise((resolve) => {
      fs.readFile(SourceFile, (err, data) => {
        request(
          {
            method: "PUT",
            url: uploadUrl,
            body: data,
            headers: {
              "Content-Type": "application/octet-stream",
            },
          },
          (err, res, body) => {
            if (!err) {
              resolve();
            } else {
              console.log("uploadFile() request error: " + e);
            }
          }
        );
      });
    });
  }

  function readBarcodes(apiKey, uploadedFileUrl, pages, barcodeTypes) {
    // Prepare request to `Barcode Reader` API endpoint
    let queryPath = `/v1/barcode/read/from/url`;

    // JSON payload for api request
    var jsonPayload = JSON.stringify({
      types: barcodeTypes,
      pages: pages,
      url: uploadedFileUrl,
      async: true,
    });

    let reqOptions = {
      host: "api.pdf.co",
      method: "POST",
      path: queryPath,
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(jsonPayload, "utf8"),
      },
    };
    // Send request
    var postRequest = https
      .request(reqOptions, (response) => {
        response.on("data", (d) => {
          response.setEncoding("utf8");
          // Parse JSON response
          let data = JSON.parse(d);
          if (data.error == false) {
            console.log(`Job #${data.jobId} has been created!`);
            checkIfJobIsCompleted(data.jobId, data.url);
          } else {
            // Service reported error
            console.log("readBarcodes(): " + data.message);
          }
        });
      })
      .on("error", (e) => {
        // Request error
        console.log("readBarcodes(): " + e);
      });

    // Write request data
    postRequest.write(jsonPayload);
    postRequest.end();
  }

  function checkIfJobIsCompleted(jobId, resultFileUrlJson) {
    let queryPath = `/v1/job/check`;
    // JSON payload for api request
    let jsonPayload = JSON.stringify({
      jobid: jobId,
    });

    let reqOptions = {
      host: "api.pdf.co",
      path: queryPath,
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(jsonPayload, "utf8"),
      },
    };

    // Send request
    var postRequest = https.request(reqOptions, (response) => {
      response.on("data", (d) => {
        response.setEncoding("utf8");
        // Parse JSON response
        let data = JSON.parse(d);
        console.log(
          `Checking Job #${jobId}, Status: ${
            data.status
          }, Time: ${new Date().toLocaleString()}`
        );

        if (data.status == "working") {
          // Check again after 3 seconds
          setTimeout(function () {
            checkIfJobIsCompleted(jobId, resultFileUrlJson);
          }, 3000);
        } else if (data.status == "success") {
          request(
            { method: "GET", uri: resultFileUrlJson, gzip: true },
            function (error, response, body) {
              // Parse JSON response
              let respJsonFileArray = JSON.parse(body);

              respJsonFileArray.forEach((element) => {
                userBarcode.push(element);
              }, this);
              console.log("User barcode", userBarcode);
              //   verifyBar(respJsonFileArray);
            }
          );
        } else {
          console.log(`Operation ended with status: "${data.status}".`);
        }
      });
    });

    // Write request data
    postRequest.write(jsonPayload);
    postRequest.end();
  }

  return userBarcode;
};

function verifyBar(barcode) {
  console.log("I am in verifyBar", barcode);
}

// getbarcode();
