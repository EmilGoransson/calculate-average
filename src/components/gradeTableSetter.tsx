import {Alert} from "@/components/ui/alert.tsx";
import React, {useState} from "react";

export default function GradeSetter() {
    const [gradeTypes, ] = useState([])

    React.useEffect(() => {
        //update types somewhere
    }, [gradeTypes])

    /*function displayCurrentGradeTable(){
        return <>
            <Button variant="outline">

            </Button>
        </>

    }*/

    return <>
    <Alert>
        temp
    </Alert>
    </>
}