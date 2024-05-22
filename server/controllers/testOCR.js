var pdf2img = require("pdf-img-convert");
const fs = require("fs");
const { createWorker } = require("tesseract.js");

async function matchStringsInPDF(pdfPath, stringsToMatch) {
  // Convert the PDF to an image
  const outputDir = `${__dirname}/../assets/out_img`;
  (async function () {
    pdfArray = await pdf2img.convert(pdfPath, { width: 2000, height: 2000 });
    console.log("saving");
    for (i = 0; i < pdfArray.length; i++) {
      fs.writeFile(
        `${outputDir}/output${i}.png`,
        pdfArray[i],
        function (error) {
          if (error) {
            console.error("Error: " + error);
          }
        }
      ); //writeFile
    } // for
  })();

  // Create a Tesseract OCR worker
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage(["eng", "mar"]);
  await worker.initialize(["eng", "mar"]);

  // Match each string using OCR and regular expressions
  const matches = [];
  const imagePath = `${outputDir}/output0.png`;
  const { data } = await worker.recognize(imagePath);
  const text = data.text;
  console.log("extracted text", text);

  for (const str of stringsToMatch) {
    const regex = new RegExp(str, "gi");
    const result = regex.test(text);
    matches.push({ string: str, matched: result });
  }

  // Terminate the worker
  await worker.terminate();

  // // Return the matches
  return matches;
}

// Example usage
const pdfPath = `${__dirname}/Income.pdf`;
const stringsToMatch = ["बाबुराव राउत"];
const test = async () => {
  const matches = await matchStringsInPDF(pdfPath, stringsToMatch);
  console.log(matches);
};

test();
