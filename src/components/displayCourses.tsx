import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import React, {useState} from "react";
import {getAverageGPA} from "@/averageCalc.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button.tsx";
export default function DisplayCourses(props: { updateCourse: (arg0: never[]) => void; courses: unknown; }){
    const [data, setData] = useState({gradeHpWeight: "", hpUntilNow: "", average: ""})
    const [courses, setCourses] = useState([]);

    function changeHP(e,name:string){
        if(courses){
            const courseIndx:number = courses.findIndex((course)=>
                course.name == name
            )
            const newCourses:Course = [...courses]
            newCourses[courseIndx].hp = Number(e.target.value)
            setCourses(newCourses)
            props.updateCourse(newCourses)
        }}
    function changeGrade(e,name:string){
        if(courses){
            const courseIndx:number = courses.findIndex((course)=>
                course.name == name
            )
            const newCourses = [...courses]
            newCourses[courseIndx].grade = e.target.value
            setCourses(newCourses)
            props.updateCourse(newCourses)
        }}
    function removeCourse(name:string){
        if(courses){
            const courseIndx:number = courses.findIndex((course)=>
                course.name == name
            )
            courses.splice(courseIndx, 1)
            const newCourses = [...courses]
            setCourses(newCourses)
            props.updateCourse(newCourses)

        }}


    React.useEffect(()=>{
        let data = getAverageGPA(props.courses)
        if(props.courses != null && data != null){
            setData(data)
            setCourses([...props.courses]);
        }
    }, [props.courses])
    React.useEffect(() => {
        const data = getAverageGPA(courses);
        if (data) {
            setData(data);
        }
    }, [courses]);


    function displayCourses(course:Course){
        /*return (<div className="flex flex-row space-x-4 justify-center" key={course.name}>
            <div>{course.name} </div><div>{course.hp}</div><div>{course.date}</div><div>{course.grade}</div>
        </div>)
        */
        return  <TableRow key={course.name}>
            <TableCell className="font-medium w-[100px]">{course.name}</TableCell>
            <TableCell className="w-[100px]"><Input id={course.name} type="text" placeholder={course.hp} value={course.hp} onChange={(e)=>changeHP(e,course.name)
            } /></TableCell>
            <TableCell className="">{course.date}</TableCell>
            <TableCell className="text-right w-[100px]"><Input id={`${course.name}-grade`} type="text" placeholder={course.grade} value={course.grade} onChange={(e)=>changeGrade(e,course.name)
            } /></TableCell>
            <TableCell className="font-medium w-[100px]"> <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-ellipsis h-4 w-4">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => {
                            removeCourse(course.name)
                        }}
                    >
                        Remove Course
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{
                        window.open(
                            `https://www.kth.se/search?q=${course.name}&urlFilter=&entityFilter=course&documentFilter=&filterLabel=&l=sv&noscript=false`, "_blank")
                    }}>Search for course</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu></TableCell>

        </TableRow>

    }
    return <div className="items-center flex-auto">
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Namn</TableHead>
                    <TableHead>HP</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead className="text-right">Betyg</TableHead>
                    <TableHead className="text-right">Action</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map(displayCourses)}

                <TableRow key="temp">

                </TableRow>
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell colSpan={1}>Total</TableCell>
                    <TableCell className="">{data.hpUntilNow}</TableCell>
                    <TableCell className=""> </TableCell>
                    <TableCell className="">{data.average}</TableCell>
                    <TableCell className=""> </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </div>
}