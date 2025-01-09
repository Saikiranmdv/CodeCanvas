import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodeEditorBox = ({ code, setCode }) => {

  return (
    <div style={{ margin: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <CodeMirror
        value={code}
        height="300px"
        extensions={[javascript()]}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
};

export default CodeEditorBox;
