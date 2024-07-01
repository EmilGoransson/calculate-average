import { Alert, AlertTitle } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { getAverageGPA, Course } from "@/averageCalc";

interface SideBarProps {
    courses: Course[];
}

interface Data {
    gradeHpWeight: string;
    hpUntilNow: string;
    average: string;
}

export default function SideBar(props: SideBarProps) {
    const [data, setData] = useState<Data>({ gradeHpWeight: "", hpUntilNow: "", average: "" });
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const data = getAverageGPA(props.courses);
        if (props.courses && data) {
            setData({
                gradeHpWeight: data.gradeHpWeight.toString(),
                hpUntilNow: data.hpUntilNow.toString(),
                average: data.average.toString()
            });
            setCourses([...props.courses]);
        }
    }, [props.courses]);

    useEffect(() => {
        const data = getAverageGPA(courses);
        if (data) {
            setData({
                gradeHpWeight: data.gradeHpWeight.toString(),
                hpUntilNow: data.hpUntilNow.toString(),
                average: data.average.toString()
            });
        }
    }, [courses]);

    return (
        <div className="max-w-md rounded-lg p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800">
            <Alert className="grid text-left mx-auto grid-cols-2">
                <AlertTitle>Snitt:</AlertTitle>
                <div className="text-right font-bold">
                    {Math.round(Number(data.average) * 100) / 100}
                </div>

                <AlertTitle>Totalt HP:</AlertTitle>
                <div className="text-right font-bold">
                    {data.hpUntilNow ? data.hpUntilNow : "0"}
                </div>
            </Alert>
        </div>
    );
}
