import './App.css'
import "../app/globals.css"
import pdfToText from "react-pdftotext";
import DisplayCourses from "./components/displayCourses.tsx";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Course, getCoursesAsArray} from "./averageCalc.ts";
import {useState} from "react";
import InfoSegment from "@/components/infoSegment.tsx";
import SideBar from "@/components/bottomOverlay.tsx";
import {ThemeProvider} from "@/components/theme-selector.tsx"
import {ThemeToggler} from "@/components/theme-toggler.tsx";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {Button} from "@/components/ui/button.tsx";
//import GradeSetter from "@/components/gradeTableSetter.tsx";
//TODO: fix so that you can add custom course, and then add the PDF without clearing.
function App() {
    const [courseArray, setCourseArray] = useState<Course[]>([]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    function extractText(event) {
        const file = event.target.files[0]
        pdfToText(file)
            .then(text => setCourseArray(getCoursesAsArray(text)))
            .catch(error => console.error(error))
    }

    function handleChange(newCourse: Course[]) {
        setCourseArray(newCourse)
    }

    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="flex flex-col min-h-screen bg-background ">
                <header
                    className="flex flex-row p-3 justify-between items-center sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
                    <div className="text-xl">
                        Calculate Average Grade (KTH)!
                    </div>
                    <div>
                        <ThemeToggler/>
                    </div>
                </header>

                <div className="flex flex-row flex-grow p-4 ">
                    <div className="flex flex-col items-center p-4 w-full">
                        <div className="w-full mb-8">
                            <div>
                                <Label htmlFor="pdf" className="block text-lg font-bold mb-2 flex items-center">
                                    Upload PDF here
                                    <HoverCard>
                                        <HoverCardTrigger asChild>

                                            <div className="ml-2">
                                                <svg className="text-gray-900 dark:text-white" width="20" height="20"
                                                     viewBox="0 0 20 20">
                                                    <path fill="currentColor"
                                                          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9 8V6h2v2H9zm0 6V9h2v5H9z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            <div onClick={() => {
                                                window.open("https://github.com/EmilGoransson/calculate-average#readme", "_blank")
                                            }}>
                                                <HoverCard>
                                                    <HoverCardTrigger asChild>
                                                        <Button variant="link">Instructions (click me)</Button>
                                                    </HoverCardTrigger>
                                                </HoverCard></div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </Label>
                            </div>
                            <div
                                className="relative border-dashed border-2 border-gray-300 rounded-lg p-5 flex justify-center items-center">
                                <Label htmlFor="pdf"
                                       className="left cursor-pointer overflow text-gray-600 hover:text-blue-700 transition duration-300 ease-in-out">
                                    Select file
                                </Label>
                                <Input type="file" accept="application/pdf" onChange={extractText} id="pdf"/>
                            </div>
                        </div>

                        <div className="w-full">
                            <DisplayCourses courses={courseArray} updateCourse={handleChange}/>
                        </div>
                    </div>
                    <div className="w-1/4 p-8 right-0 xl:shrink-0 max-lg:hidden">
                        <div className="w-full pt-5 sticky top-16">
                            <SideBar courses={courseArray}></SideBar>
                        </div>

                        <div>
                            <InfoSegment/>
                        </div>
                    </div>
                </div>


                <footer className="py-4 md:px-8 md:py-0 bg-background">
                    <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                            Created by Emil Göransson <a href="https://www.linkedin.com/in/emil-goransson/"
                                                         target="_blank" rel="noreferrer"
                                                         className="font-medium underline underline-offset-4">Linkedin</a>.
                            Source code at <a href="https://github.com/EmilGoransson/calculate-average" target="_blank"
                                              rel="noreferrer"
                                              className="font-medium underline underline-offset-4">GitHub</a>.
                        </p>
                    </div>
                </footer>
            </div>
        </ThemeProvider>

    );
}

export default App
