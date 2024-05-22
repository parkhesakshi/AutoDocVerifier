import React from "react";
import "./index.scss";
import { useMediaQuery } from "react-responsive";
import LoaderGIF from "../../assets/loader.gif";
const Loader = () => {
  const mobielView = useMediaQuery({
    query: "(max-width:500px)",
  });
  return (
    <div className="loader">
      <div className="loader-content">
        {/* <img src={Brand} alt="" /> */}
        <img src={LoaderGIF} alt="" />
        <h3
          style={{
            color: "#00aa55",
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          Make your document verification process
        </h3>
        <h3
          style={{
            color: "#00aa55",
            fontWeight: "bold",
          }}
        >
          seamless and time efficient
        </h3>
      </div>
    </div>
  );
};

export default Loader;
