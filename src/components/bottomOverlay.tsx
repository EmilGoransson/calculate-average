import { Alert, AlertTitle } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { getAverageGPA, Course } from "@/averageCalc";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
interface SideBarProps {
    courses: Course[];
}

interface Data {
    gradeHpWeight: string;
    hpUntilNow: string;
    average: string;
    hpWithPGrade: string;
}

export default function SideBar(props: SideBarProps) {
    const [data, setData] = useState<Data>({ gradeHpWeight: "", hpUntilNow: "", average: "", hpWithPGrade: ""});
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const data = getAverageGPA(props.courses);
        if (props.courses && data) {
            setData({
                gradeHpWeight: data.gradeHpWeight.toString(),
                hpUntilNow: data.hpUntilNow.toString(),
                average: data.average.toString(),
                hpWithPGrade: data.hpWithPGrade.toString()
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
                average: data.average.toString(),
                hpWithPGrade: data.hpWithPGrade.toString()
            });
        }
    }, [courses]);

    return (
        <div className="max-w-md rounded-lg p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800">
            <Alert className="grid text-left mx-auto grid-cols-2">
                <AlertTitle>Snitt:</AlertTitle>
                <div className="text-right ">
                    {Math.round(Number(data.average) * 100) / 100}
                </div>

                <AlertTitle>Totalt HP:</AlertTitle>

                <HoverCard>
                    <HoverCardTrigger asChild>

                        <div className="text-black text-right text-primary underline-offset-4 hover:underline text-accent-foreground">

                        {data.hpWithPGrade ? data.hpWithPGrade : "0"}
                        </div>
                        </HoverCardTrigger>
                    <HoverCardContent>
                        (HP excluding courses with grade: Pass) ({data.hpUntilNow ? data.hpUntilNow : "0"})
                    </HoverCardContent>
                </HoverCard>

            </Alert>
        </div>
    );
}
