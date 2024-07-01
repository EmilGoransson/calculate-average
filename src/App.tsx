import './App.css'
import "../app/globals.css"
import pdfToText from "react-pdftotext";
import DisplayCourses from "./components/displayCourses.tsx";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ThemeProvider} from "@/components/theme-provider"
import {getCoursesAsArray} from "./averageCalc.ts";
import {useState} from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import InfoSegment from "@/components/infoSegment.tsx";
import SideBar from "@/components/bottomOverlay.tsx";

function App() {
    const [courseArray, setCourseArray] = useState([]);

    function extractText(event) {
        const file = event.target.files[0]
        pdfToText(file)
            .then(text => setCourseArray(getCoursesAsArray(text)))
            .catch(error => console.error(error))
    }

    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <header className="text-xl text-left    ">
                    Räkna ut ditt snitt!
                </header>
            </header>
        <div className="flex flex-row">
            <div className="flex flex-col items-center w-3/4 p-4">
                <div className="w-full mb-8">
                    <Label htmlFor="pdf" className="block text-lg font-bold mb-2">Upload PDF here</Label>
                    <div
                        className="relative border-dashed border-2 border-gray-300 rounded-lg p-4 flex justify-center items-center">
                        <Input
                            type="file"
                            accept="application/pdf"
                            onChange={extractText}
                            id="pdf"
                        />
                        <Label
                            htmlFor="pdf"
                            className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
                        >
                            <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                        </Label>
                    </div>
                </div>

                <div className="w-full">
                    <DisplayCourses courses={courseArray}/>
                </div>
            </div>
            <div className="w-1/4 p-8  right-0">

                <div className="w-full pt-5 sticky top-4">
                    <SideBar></SideBar>
                </div>
                <div>
                    <InfoSegment/>
                </div>
            </div>

        </div>
        </div>
    );
}

export default App
