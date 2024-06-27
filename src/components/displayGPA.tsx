import {getAverageGPA} from "../averageCalc.ts";
import {useState} from "react";
// @ts-ignore
export default function DisplayGPA(props){
    const [gPA, setGPA] = useState(getAverageGPA(props.courses))

    return <div>

        Your GPA: {gPA}
    </div>
}