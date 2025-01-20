import { React, useState } from "react";
import CodeEditorBox from "./components/Codeeditorbox";
import axios from "axios";
import "./App.css"
import SyntaxHighlighterComponent from "./components/SyntaxHighlighterComponent";


const App = () => {

  const [Theme, setTheme] = useState("")
  const [AdditionalDetails, setAdditionalDetails] = useState("")
  const [Response, setResponse] = useState("")
  const [code, setCode] = useState(`//enter the react code`)
  const [Loading, setLoading] = useState(false)

  async function generateAnswer() {
    if (!code.trim()) {
      // Check if the question is empty or only contains whitespace
      setResponse("Please enter a question before generating an answer.");
      return;
    }
    try {
      const apiKey = import.meta.env.VITE_API_KEY; // Use process.env for CRA
      setLoading(true)

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Generate only the CSS code for styling the following HTML component. Ensure the styles match the given theme and incorporate the specified additional details. Do not include any explanations, comments, or additional text—output only the CSS code.

Input Details:
HTML Code: ${code}
Theme: ${Theme}
Additional Details:${AdditionalDetails}`,
                },
              ],
            },
          ],
        },
      });
      setResponse(response.data.candidates[0].content.parts[0].text.replace(/```css|```/g, "")); // Correct the response structure
    } catch (error) {
      setResponse("Error generating the answer. Please try again.");
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-container">
      <div className="header-container">
        <img className="logo" src="./CodeCanvasLogo.jpg" />
        <div>
        <h2> Code Canvas</h2>
        <h3> genearate css based on the component </h3>
        </div>        
      </div>
      <div className="input-container">
        <h4>React component to be styled</h4>
        <CodeEditorBox code = {code} setCode={setCode} />
        <h4>Theme of the CSS (e.g., Minimalist, Dark, Light, Modern, etc.)</h4>
        <textarea value={Theme} 
        onChange={(e) => setTheme(e.target.value)}/>
        <h4>Additional Details(e.g., Include hover effects, make it mobile-friendly, add animations, use a specific color palette, etc.)</h4>
        <textarea value={AdditionalDetails} 
        onChange={(e) => setAdditionalDetails(e.target.value)}/>
        <button className="generate-button" onClick={generateAnswer} disabled = {Loading}>{Loading ? "Loading..." : "Generate CSS" }</button>
      </div>
      <SyntaxHighlighterComponent Response = {Response} />
    </div>
  );
};

export default App;
