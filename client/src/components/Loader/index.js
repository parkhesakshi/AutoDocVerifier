import React from "react";
import ReactEcharts from "echarts-for-react";
import { useMediaQuery } from "react-responsive";
import LoaderGIF from "../../assets/loader.gif";
const Loader = () => {
  const mobielView = useMediaQuery({
    query: "(max-width:500px)",
  });
  const option = {
    graphic: {
      elements: [
        {
          type: "text",
          left: "center",
          top: "center",
          style: {
            text: "AutoDocVerifier",
            fontFamily: "caliber",
            fontSize: 80,
            fontWeight: "bold",
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: "transparent",
            stroke: "#00aa55",
            lineWidth: 1,
          },
          keyframeAnimation: {
            duration: 4000,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: "transparent",
                  lineDashOffset: 200,
                  lineDash: [200, 0],
                },
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: "transparent",
                },
              },
              {
                percent: 1,
                style: {
                  fill: "#00aa55",
                },
              },
            ],
          },
        },
      ],
    },
  };
  return (
    <div className="loader">
      <div className="loader-content">
        {/* <img src={Brand} alt="" /> */}
        <img src={LoaderGIF} alt="" />
        <ReactEcharts
          option={option}
          style={{ height: "140px", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Loader;
