import './App.css'
import pdfToText from "react-pdftotext";
import {extractData} from "./averageCalc.ts";
import {useState} from "react";

function App() {
    const [data, setData] = useState("init");

    function extractText(event) {
        const file = event.target.files[0]
        pdfToText(file)
            .then(text => setData(extractData(text)))
            .catch(error => console.error(error))
    }

  return (
    <>
        <div>
            <div className="App-header">
                <input type="file" accept="application/pdf" onChange={extractText}/>
            </div>
            <div className="overflow-auto">
                {data}
            </div>
        </div>
    </>
  )
}

export default App
