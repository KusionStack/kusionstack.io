import React, { useState } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import "./DocsRating.css";

const DocsRating = ({ label }) => {
  const isBrowser = useIsBrowser();
  const [haveVoted, setHaveVoted] = useState(false);
  if (!isBrowser) {
    return null;
  }

  const giveFeedback = (value) => {
    if (window.gtag) {
      console.info("Google Analytics 4 API is available.");
      window.gtag("event", "feedback", {
        event_category: "button",
        event_label: label,
        value: value,
      });
    } else {
      console.warn("Google Analytics 4 API is not available.");
    }
    setHaveVoted(true);
  };

  return (
    <div className="docsRatingContainer">
      <div className="docsRating">
        {haveVoted ? (
          "Thanks for letting us know!"
        ) : (
          <>
            Is this page useful?
            <svg
              className="i_thumbsup"
              alt="Like"
              onClick={() => giveFeedback(1)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 297 297"
            >
              <g>
                <g>
                  <g>
                    <g>
                      <circle
                        style={{ fill: "#17AB93" }}
                        cx="148.5"
                        cy="148.5"
                        r="148.5"
                      />
                    </g>
                  </g>
                </g>
                <path
                  style={{ fill: "#0D6D5B" }}
                  d="M186.168,59.569c-1.551,13.962-7.289,25.769-13.668,36.931c-15,24-13,50-25,73c-11,20-38,25-61,31
                        c-9.608,3.203-15.618,11.237-23.816,17.524l78.807,78.807c2.323,0.108,4.659,0.169,7.01,0.169
                        c75.058,0,137.099-55.69,147.085-128.002L186.168,59.569z"
                />
                <g>
                  <path
                    style={{ fill: "#ECF0F1" }}
                    d="M128.8,116.788c22.645-10.051,31.514-27.726,43.477-54.328c2.762-6.142,11.293-7.085,15.056-1.5
                            c2.09,3.102,3.586,7.541,3.586,13.895c0,21.087-13.179,45.469-13.179,45.469h52.447c11.416,0,19.703,10.86,16.689,21.871
                            l-17.765,64.9c-2.058,7.52-8.892,12.734-16.689,12.734H136.08c-4.715,0-9.409-0.629-13.958-1.869l-22.141-6.038V142.5
                            l8.328-10.177C113.813,125.597,120.856,120.313,128.8,116.788z"
                  />
                </g>
                <g>
                  <path
                    style={{ fill: "#2D4F44" }}
                    d="M71.987,221.969H93.31c7.15,0,12.946-5.796,12.946-12.946v-77.675
                          c0-7.15-5.796-12.946-12.946-12.946H71.987c-7.15,0-12.946,5.796-12.946,12.946v77.675
                          C59.041,216.172,64.837,221.969,71.987,221.969z"
                  />
                </g>
              </g>
            </svg>
            <svg
              className="i_thumbsdown"
              alt="Dislike"
              onClick={() => giveFeedback(0)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 297 297"
            >
              <g>
                <g>
                  <g>
                    <g>
                      <circle
                        style={{ fill: "#C0392B" }}
                        cx="148.5"
                        cy="148.5"
                        r="148.5"
                      />
                    </g>
                  </g>
                </g>
                <path
                  style={{ fill: "#931515" }}
                  d="M296.81,140.94l-58.366-58.076c-37.993,29.183-86.192,45.873-109.944,90.636c-3,6-1,14-3,20
                      c-5.25,15.749-7.576,31.413-9.763,47.643l53.749,54.374C241.561,285.32,297,223.39,297,148.5
                      C297,145.965,296.936,143.445,296.81,140.94z"
                />
                <g>
                  <path
                    style={{ fill: "#ECF0F1" }}
                    d="M170.971,182.446c-22.645,10.051-31.514,27.726-43.477,54.328
                        c-2.762,6.142-11.293,7.085-15.056,1.5c-2.09-3.102-3.586-7.541-3.586-13.895c0-21.087,13.179-45.469,13.179-45.469H69.584
                        c-11.416,0-19.703-10.86-16.689-21.871l17.765-64.9c2.058-7.52,8.892-12.734,16.689-12.734h76.342
                        c4.715,0,9.409,0.629,13.958,1.869l22.141,6.038v69.421l-8.328,10.177C185.958,173.637,178.915,178.92,170.971,182.446z"
                  />
                </g>
                <g>
                  <path
                    style={{ fill: "#EDB7AB" }}
                    d="M227.784,77.265h-21.323c-7.15,0-12.946,5.796-12.946,12.946v77.675
                        c0,7.15,5.796,12.946,12.946,12.946h21.323c7.15,0,12.946-5.796,12.946-12.946V90.211
                        C240.73,83.061,234.934,77.265,227.784,77.265z"
                  />
                </g>
              </g>
            </svg>
          </>
        )}
      </div>
    </div>
  );
};

export default DocsRating;
