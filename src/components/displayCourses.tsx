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
import React, { useState, useEffect } from "react";
import { Course, getAverageGPA } from "@/averageCalc";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import {Label} from "@/components/ui/label.tsx";

interface DisplayCoursesProps {
    updateCourse: (courses: Course[]) => void;
    courses: Course[];
}

interface Data {
    gradeHpWeight: number;
    hpUntilNow: number;
    average: number;
}

export default function DisplayCourses(props: DisplayCoursesProps) {
    const [data, setData] = useState<Data>({ gradeHpWeight: 0, hpUntilNow: 0, average: 0 });
    const [courses, setCourses] = useState<Course[]>([]);

    function changeHP(e: React.ChangeEvent<HTMLInputElement>, name: string) {
        console.log(e.target.value)
        const value:string = e.target.value.replace(',', '.');

        if (courses) {

            const courseIndx = courses.findIndex((course) => course.name === name);
            const newCourses = [...courses];
            newCourses[courseIndx].hp = value;
            setCourses(newCourses);
            props.updateCourse(newCourses);
        }
    }

    function changeGrade(e: React.ChangeEvent<HTMLInputElement>, name: string) {
        if (courses) {
            const courseIndx = courses.findIndex((course) => course.name === name);
            const newCourses = [...courses];
            newCourses[courseIndx].grade = e.target.value.trim();
            setCourses(newCourses);
            props.updateCourse(newCourses);
        }
    }

    function removeCourse(name: string) {
        if (courses) {
            const courseIndx = courses.findIndex((course) => course.name === name);
            courses.splice(courseIndx, 1);
            const newCourses = [...courses];
            setCourses(newCourses);
            props.updateCourse(newCourses);
        }
    }

    function addCourse(){
        const date: string = new Date().toISOString().split('T')[0]
        let count = 0
        courses.forEach((course)=>{
            if(course.name.startsWith("Temp")){
                count = count + 1
            }
        })
        const course = new Course(`Temp course ${count}`, "0", " ", date)
        const newCourses = [course, ...courses]
        props.updateCourse(newCourses)
    }


    useEffect(() => {
        const data = getAverageGPA(props.courses);
        if (props.courses && data) {
            setData(data);
            setCourses([...props.courses]);
        }
    }, [props.courses]);

    useEffect(() => {
        const data = getAverageGPA(courses);
        if (data) {
            setData(data);
        }
    }, [courses]);

    function displayCourses(course: Course) {
        return (
            <TableRow key={course.name}>
                <TableCell className="font-medium w-[100px]">{course.name}</TableCell>
                <TableCell className="w-[100px]">
                    <Input
                        id={course.name}
                        type="text"
                        step="0.1"
                        min="0"
                        lang="en"
                        placeholder={course.hp.toString() == " "? course.hp.toString() : "0"}
                        value={course.hp}
                        onChange={(e) => changeHP(e, course.name)}
                    />
                </TableCell>
                <TableCell className="">{course.date}</TableCell>
                <TableCell className="text-right w-[100px]">
                    <Input
                        id={`${course.name}-grade`}
                        type="text"
                        placeholder={course.grade}
                        value={course.grade}
                        onChange={(e) => changeGrade(e, course.name)}
                    />
                </TableCell>
                <TableCell className="font-medium w-[100px]">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis h-4 w-4">
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => removeCourse(course.name)}>Remove Course</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => window.open(`https://www.kth.se/search?q=${course.name}&urlFilter=&entityFilter=course&documentFilter=&filterLabel=&l=sv&noscript=false`, "_blank")}>
                                Search for course
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <div className="items-start flex-grow">
            <Label className="cursor-pointer hover:text-black transition duration-300 ease-in-out p-2"
                   onClick={addCourse}>
                <Button variant="outline" className="flex items-start justify-start">
                    Add custom course
                </Button>
            </Label>
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
                    <TableRow key="temp"></TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={1}>Total</TableCell>
                        <TableCell className="">{data.hpUntilNow}</TableCell>
                        <TableCell className=""></TableCell>
                        <TableCell className="">{Math.round(Number(data.average) * 100) / 100}</TableCell>
                        <TableCell className=""></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
