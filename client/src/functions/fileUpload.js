import axios from "axios"; // this is the modal component that is used to upload the document in the Upload.js page and to show the status of the document in the Verified.js page

export const docfileUpload = async (formData) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/docupload`, // this is the axios call to the backend to upload the document file to the database using the user id as the parameter to the function in the backend
    formData
  );
};
export const dsVerify = async (formData) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/ds-verify`, // this is the axios call to the backend to verify the digital signature of the document file to the database using the user id as the parameter to the function in the backend
    formData
  );
};

export const ocrVerify = async (formData) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/ocr-verify`, // this is the axios call to the backend to verify the digital signature of the document file to the database using the user id as the parameter to the function in the backend
    formData
  );
};

export const getDocFile = async (docCode, userid) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/get-document-file?docCode=${docCode}&userid=${userid}`,
    { responseType: "blob" }
  ); // this is the axios call to the backend to get the document file from the database using the user id as the parameter to the function in the backend
};

export const getDocInfo = async (docCode, userid) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/getDocumentInfo?docCode=${docCode}&userid=${userid}`
  ); // this is the axios call to the backend to get the document file from the database using the user id as the parameter to the function in the backend
};
