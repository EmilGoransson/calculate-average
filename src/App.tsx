import './App.css'
import "../app/globals.css"
import pdfToText from "react-pdftotext";
import DisplayCourses from "./components/displayCourses.tsx";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ThemeProvider} from "@/components/theme-provider"
import {getCoursesAsArray} from "./averageCalc.ts";
import {useState} from "react";
import InfoSegment from "@/components/infoSegment.tsx";
import SideBar from "@/components/bottomOverlay.tsx";
import GradeSetter from "@/components/gradeTableSetter.tsx";

function App() {
    const [courseArray, setCourseArray] = useState([]);

    function extractText(event) {
        const file = event.target.files[0]
        pdfToText(file)
            .then(text => setCourseArray(getCoursesAsArray(text)))
            .catch(error => console.error(error))
    }

    function handleChange(newCourse){
        setCourseArray(newCourse)
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="text-xl text-left">
                    Räkna ut ditt snitt (KTH)!
                </div>
            </header>
            <div className="flex flex-row flex-grow ">
                <div className="flex flex-col items-center w-3/4 p-4 w-full">
                    <div className="w-full mb-8">
                        <Label htmlFor="pdf" className="block text-lg font-bold mb-2">Upload PDF here</Label>
                        <div className="relative border-dashed border-2 border-gray-300 rounded-lg p-4 flex justify-center items-center">
                            <Input type="file" accept="application/pdf" onChange={extractText} id="pdf"/>
                            <Label htmlFor="pdf" className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
                                <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </Label>
                        </div>
                    </div>

                    <div className="w-full">
                        <DisplayCourses courses={courseArray} updateCourse={handleChange}/>
                    </div>
                </div>
                <div className="w-1/4 p-8 right-0 xl:shrink-0 max-lg:hidden">
                    <div className="w-full pt-5 sticky top-4">
                        <SideBar courses={courseArray}></SideBar>
                    </div>
                    <div>
                        <InfoSegment/>
                    </div>
                    <div>
                        <GradeSetter></GradeSetter>
                    </div>
                </div>

            </div>
            <footer className="py-4 md:px-8 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Skapad av Emil Göransson <a href="https://www.linkedin.com/in/emil-goransson/" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">Linkedin</a>.
                        Source kod går att hitta på <a href="https://github.com/EmilGoransson/calculate-average" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">GitHub</a>.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App
