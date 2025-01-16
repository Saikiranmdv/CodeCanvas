import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import './SyntaxHighlighterComponent.css'

const SyntaxHighlighterComponent = ({ Response }) => {
  const handleCopy = () => {
    if (Response) {
      navigator.clipboard
        .writeText(Response)
        .then(() => {
          alert("Code copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    } else {
      alert("No code to copy!");
    }
  };
    return (
        <div style={{ position: "relative" }}>
        <button className="copy-button"
        onClick={handleCopy}
      >
        Copy Code
      </button>
          <SyntaxHighlighter language="css" style={vscDarkPlus}>
            {Response || "// No code to display."}
          </SyntaxHighlighter>
        </div>
      );
};

export default SyntaxHighlighterComponent;
