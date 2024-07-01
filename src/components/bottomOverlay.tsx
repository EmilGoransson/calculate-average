import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import React, {useContext, useState} from "react";
import {getAverageGPA} from "@/averageCalc.ts";

export default function SideBar(props){
    const [data, setData] = useState({gradeHpWeight: "", hpUntilNow: "", average: ""})
    const [courses, setCourses] = useState([]);

    React.useEffect(()=>{
        const data = getAverageGPA(props.courses)
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
    return <div
        className="max-w-md rounded-lg p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 ">
        <Alert className="grid text-left mx-auto grid-cols-2">

            <AlertTitle>Snitt:
            </AlertTitle>
            <div className="text-right font-bold"> {Math.round(Number(data.average) * 100) / 100}</div>


            <AlertTitle>Totalt HP:  </AlertTitle>
            <div className="text-right font-bold"> {data.hpUntilNow ? data.hpUntilNow : 0}</div>


        </Alert></div>
}