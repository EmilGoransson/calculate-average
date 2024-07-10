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
import {Input} from "@/components/ui/input"
import React, {useEffect, useState} from "react";
import {Course, getAverageGPA, grade} from "@/averageCalc";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {HoverCard, HoverCardContent, HoverCardTrigger,} from "@/components/ui/hover-card"
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label.tsx";

interface DisplayCoursesProps {
    updateCourse: (courses: Course[]) => void;
    courses: Course[];
}

export interface Data {
    gradeHpWeight: number;
    hpUntilNow: number;
    average: number;
    hpWithPGrade: number;
}

export default function DisplayCourses(props: DisplayCoursesProps) {
    const [data, setData] = useState<Data>({gradeHpWeight: 0, hpUntilNow: 0, average: 0, hpWithPGrade: 0});
    const [courses, setCourses] = useState<Course[]>([]);
    const [sortOrder, setSortOrder] = useState({name: "asc", hp: "asc", weighted: "asc", date: "asc", grade: "asc"})

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

    function changeHP(e: React.ChangeEvent<HTMLInputElement>, name: string) {
        console.log(e.target.value)
        const value: string = e.target.value.replace(',', '.');

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

    function addCourse() {
        const date: string = new Date().toISOString().split('T')[0]
        let count = 0
        courses.forEach((course) => {
            if (course.name.startsWith("Temp")) {
                count = count + 1
            }
        })
        const course = new Course(`Temp course ${count}`, "0", " ", date)
        const newCourses = [course, ...courses]
        props.updateCourse(newCourses)
    }

    function sortCoursesOption(option: string) {
        let sortedCourseArray: Course[] = []
        const newSortOrder = sortOrder
        console.log(option)
        if (option == "Name" && courses.length > 0) {
            sortedCourseArray = courses.sort((course: Course, course2: Course) => {
                const comparison = course.name.localeCompare(course2.name);
                return sortOrder.name == "asc" ? comparison : -comparison;
            });
            newSortOrder.name == "asc" ? newSortOrder.name = "desc" : newSortOrder.name = "asc"
        } else if (option == "HP" && courses.length > 0) {
            sortedCourseArray = courses.sort((course: Course, course2: Course) => {
                const comparison: number = Number(course.hp) - Number(course2.hp);
                return sortOrder.hp == "asc" ? comparison : -comparison;
            });
            newSortOrder.hp == "asc" ? newSortOrder.hp = "desc" : newSortOrder.hp = "asc"
        } else if (option == "Weighted Grade" && courses.length > 0) {
            sortedCourseArray = courses.sort((course: Course, course2: Course) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const comparison = Number(grade[course.grade.toUpperCase()] * parseFloat(course.hp)) - (grade[course2.grade.toUpperCase()] * parseFloat(course2.hp));
                return sortOrder.weighted == "asc" ? comparison : -comparison;
            });
            newSortOrder.weighted == "asc" ? newSortOrder.weighted = "desc" : newSortOrder.weighted = "asc"
        } else if (option == "Date" && courses.length > 0) {
            sortedCourseArray = courses.sort((course: Course, course2: Course) => {
                const comparison = new Date(course.date) > new Date(course2.date) ? 1 : -1
                return sortOrder.date == "asc" ? comparison : -comparison;
            });
            newSortOrder.date == "asc" ? newSortOrder.date = "desc" : newSortOrder.date = "asc"
        } else if (option == "Grade" && courses.length > 0) {
            sortedCourseArray = courses.sort((course: Course, course2: Course) => {
                const comparison = course.grade.localeCompare(course2.grade);
                return sortOrder.grade == "asc" ? comparison : -comparison;
            });
            newSortOrder.grade == "asc" ? newSortOrder.grade = "desc" : newSortOrder.grade = "asc"
        } else
            return
        console.log(newSortOrder)
        setSortOrder(newSortOrder)
        setCourses([...sortedCourseArray])
    }


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
                        placeholder={course.hp.toString() == " " ? course.hp.toString() : "0"}
                        value={course.hp}
                        onChange={(e) => changeHP(e, course.name)}
                    />
                </TableCell>
                <TableCell
                    className="w-[200px] text-left">{grade[course.grade.toUpperCase() as keyof typeof grade] * parseFloat(course.hp)}</TableCell>
                <TableCell className="w-[200px] text-left">{course.date}</TableCell>
                <TableCell className="justify-center w-[100px]">
                    <Input
                        id={`${course.name}-grade`}
                        type="text"
                        className="items-start"
                        placeholder={course.grade}
                        value={course.grade}
                        onChange={(e) => changeGrade(e, course.name)}
                    />
                </TableCell>
                <TableCell className="font-medium w-[100px]">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-4 p-0 right">
                                <span className="sr-only ">Open menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="lucide lucide-ellipsis h-4 w-4">
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => removeCourse(course.name)}>Remove Course</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem
                                onClick={() => window.open(`https://www.kth.se/search?q=${course.name}&urlFilter=&entityFilter=course&documentFilter=&filterLabel=&l=sv&noscript=false`, "_blank")}>
                                Search for course
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <div className="items-start">
            <div className="flex">
                <div className="flex items-center space-x-4">
                    <Label className="cursor-pointer hover:text-black transition duration-300 ease-in-out p-2">
                        <Button
                            variant="outline"
                            onClick={addCourse}
                        >
                            Add custom course
                        </Button>
                    </Label>
                </div>


            </div>


            <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                    <TableRow className="cursor-pointer"
                              onClick={(e: React.MouseEvent<HTMLElement>) => sortCoursesOption((e.target as HTMLElement).innerHTML.toString())}>
                        <TableHead
                            className="w-[100px]"
                        >
                            Name
                        </TableHead>
                        <TableHead>HP</TableHead>
                        <TableHead className="text-muted-foreground underline-offset-4 hover:underline ">
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <div> Weighted Grade</div>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <div className="flex justify-between space-x-1">
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-semibold">Grade * HP</h4>


                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>

                        </TableHead>

                        <TableHead>Date</TableHead>
                        <TableHead className="text-left">Grade</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="">
                    {courses.map(displayCourses)}
                    <TableRow key="temp"></TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={1}>Total</TableCell>
                        <TableCell className="text-left">{data.hpWithPGrade} ({data.hpUntilNow})</TableCell>
                        <TableCell className="text-left">{data.gradeHpWeight}</TableCell>

                        <TableCell className=""></TableCell>
                        <TableCell className="">{Math.round(Number(data.average) * 100) / 100}</TableCell>
                        <TableCell className=""></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
