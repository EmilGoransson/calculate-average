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
export default function DisplayCourses(props){
    const [data, setData] = useState({gradeHpWeight: "", hpUntilNow: "", average: ""})
    const [courses, setCourses] = useState([]);

    function changeHP(e,name:string){
        if(courses){
            const courseIndx:number = courses.findIndex((course)=>
                course.name == name
            )
            const newCourses = [...courses]
            newCourses[courseIndx].hp = Number(e.target.value)
            setCourses(newCourses)
        }}
    function changeGrade(e,name:string){
        if(courses){
            const courseIndx:number = courses.findIndex((course)=>
                course.name == name
            )
            const newCourses = [...courses]
            newCourses[courseIndx].grade = e.target.value
            setCourses(newCourses)
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


    function displayCourses(course){
        /*return (<div className="flex flex-row space-x-4 justify-center" key={course.name}>
            <div>{course.name} </div><div>{course.hp}</div><div>{course.date}</div><div>{course.grade}</div>
        </div>)
        */
        return  <TableRow key={course.name}>
            <TableCell className="font-medium">{course.name}</TableCell>
            <TableCell><Input id={course.name} type="text" placeholder={course.hp} value={course.hp} onChange={(e)=>changeHP(e,course.name)
            } /></TableCell>
            <TableCell>{course.date}</TableCell>
            <TableCell className="text-right"><Input id={`${course.name}-grade`} type="text" placeholder={course.grade} value={course.grade} onChange={(e)=>changeGrade(e,course.name)
            } /></TableCell>
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
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.courses.map(displayCourses)}

                <TableRow key="temp">

                </TableRow>
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="">{data.hpUntilNow}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={3}>Snitt</TableCell>
                    <TableCell className="">{data.average}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </div>
}