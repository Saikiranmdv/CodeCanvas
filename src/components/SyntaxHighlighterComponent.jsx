import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import './SyntaxHighlighterComponent.css'

const SyntaxHighlighterComponent = ({ Response }) => {
  const [showAlert, setshowAlert] = useState(false)
  const handleCopy = () => {

    if(!Response){
      setshowAlert(true)
      setTimeout(() => {
        setshowAlert(false)
      }, 3000);
      return;
    }

    navigator.clipboard.writeText(Response || "// no code to display")
    setshowAlert(true)
      setTimeout(() => {
        setshowAlert(false)
      }, 3000);
  };
    return (
        <div style={{ position: "relative" }}>
        <button className="copy-button"
        onClick={handleCopy}
      >
        Copy Code
      </button>
      {
        showAlert && (
          <div className="alert-box">
          { Response ? "Code Copied" : " No Code to Copy "}
          </div>
        )
      }
          <SyntaxHighlighter language="css" style={vscDarkPlus}>
            {Response || "// No code to display."}
          </SyntaxHighlighter>
        </div>
      );
};

export default SyntaxHighlighterComponent;
