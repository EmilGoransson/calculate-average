
export enum grade {
    A = 5,
    B = 4.5,
    C = 4,
    D = 3.5,
    E = 3,
    F = 0,
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    P = 3,
}

export class Course {
    public name: string;
    public hp: string;
    public grade: string;
    public date: string;
    constructor(name:string, hp: string,grade:string, date:string){
        this.name = name;
        this.hp = hp;
        this.grade = grade
        this.date = date;
    }
}
function isDateValid(dateStr:string):boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

export function getCoursesAsArray(text: string):Course[]{
    const trimmedText:string = text.substring(text.indexOf("Not" ), text.indexOf("Summering")).replaceAll(",", ".")
    const arr:string[] = trimmedText.split("  ")
    let isInFailedSection = false;
    const newArr = arr.map((key) => {
        if (key.charAt(0) === " ") {
            return key.slice(1);
        } else {
            return key;
        }
    });

    let courses = []
    let name:string = ""
    let hp:string = "-1"
    let grade:string = ""
    let date:string = ""
    for (let i = 0; i < newArr.length; i++) {
        const key = newArr[i]


        if(key == "hp" && !isInFailedSection){
            name = newArr[i-2]
            hp = newArr[i-1]
            grade = newArr[i+1]
            date = newArr[i+2]
            courses.push(new Course(name,hp,grade,date))
            i+=2
        }
        if(key == "hp)"){
            name = newArr[i-2]
            hp = newArr[i-1].replace("(", "")
            grade = "F"
            isInFailedSection = true
        }
        if(isInFailedSection && isDateValid(key) && name != "" && hp != "-1" && grade != ""){
            date = key
            courses.push(new Course(name,hp,grade,date))
            name = ""
            hp = "-1"
            grade = ""
            date = ""
        }
    }
    courses = validateAndRemoveInvalidCourses(courses)
    return courses
}


function validateAndRemoveInvalidCourses(courses:Course[]):Course[]{

    return courses.filter((course:Course)=> {
        return !isNaN(parseFloat(String(course.hp))) && isDateValid(course.date)
    })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function getAverageGPA(courses:Course[]): { average: number, gradeHpWeight: number, hpUntilNow: number, hpWithPGrade:number}{
    if(courses.length != 0){
        //const expectedHP:number = 180;
        let hpUntilNow:number = 0;
        let gradeHpWeight:number = 0;
        let hpWithPGrade:number = 0
        courses.forEach((course:Course)=>{
            if(course.grade == "P"){
                hpWithPGrade += parseFloat(course.hp)
                return
            }
            gradeHpWeight += grade[course.grade.toUpperCase() as keyof typeof grade] * parseFloat(course.hp)
            hpUntilNow += parseFloat(course.hp)
            hpWithPGrade +=parseFloat(course.hp)
        })
        // return gradeHpWeight / expectedHP
        return {gradeHpWeight: Number(gradeHpWeight), hpUntilNow: Number(hpUntilNow), average: Number(gradeHpWeight / hpUntilNow), hpWithPGrade:hpWithPGrade}

    }
}

//TODO: Tillgodoräknade kurser?