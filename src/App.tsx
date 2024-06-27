import './App.css'
import pdfToText from "react-pdftotext";
import DisplayCourses from "./components/displayCourses.tsx";
import DisplayGPA from "./components/displayGPA.tsx";
import {getCoursesAsArray} from "./averageCalc.ts";
import {useState} from "react";

function App() {
    const [courseArray, setCourseArray] = useState([]);
    function extractText(event) {
        const file = event.target.files[0]
        pdfToText(file)
            .then(text => setCourseArray(getCoursesAsArray(text)))
            .catch(error => console.error(error))
    }

  return (
      courseArray.length == 0? <>
              <div className="">
                  <input type="file" accept="application/pdf" onChange={extractText}/>
              </div>
          </>
          :
          <>
              <div>
                  <div className="App-header">
                      <input type="file" accept="application/pdf" onChange={extractText}/>
            </div>
            <div className="">
                <DisplayCourses courses={courseArray}>

            </DisplayCourses>
                <DisplayGPA courses={courseArray}>

                </DisplayGPA>

            </div>
        </div>
    </>
  )
}

export default App
