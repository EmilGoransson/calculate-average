const enum grade {
    A = 5,
    B = 4.5,
    C = 4,
    D = 3.5,
    E = 3,
    F = 0,
    P = 3,
}
class Course {
    public name: string;
    public hp: number;
    public grade: string;
    public date: string;
    constructor(name:string, hp: number,grade:string, date:string){
        this.name = name;
        this.hp = hp;
        this.grade = grade
        this.date = date;
    }
}
function isDateValid(dateStr:string):boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}
function trimText(text:string){
    let trimmedText:string = text.substring(text.indexOf("Not" ), text.indexOf("Summering"))
    trimmedText = trimmedText.substring(4,text.lastIndexOf("Kontrollera "))
    return trimmedText
}

export function getCoursesAsArray(text: string):Course[]{
    //removes text extracted from pdf
    let trimmedText:string = text.substring(text.indexOf("Not" ), text.indexOf("Summering"))
    trimmedText = trimmedText.substring(4,text.lastIndexOf("Kontrollera "))

    let textCoursesPassed:string = trimmedText.substring(0, trimmedText.indexOf("Delar "))
    let textCoursesFailed:string = trimmedText.substring(trimmedText.indexOf("Delar"))
    textCoursesFailed = textCoursesFailed.substring(textCoursesFailed.indexOf("Not ")+5, textCoursesFailed.lastIndexOf("Kontrollera"))


    //Passed Courses
    const courses:Course[] = [];
    const arr:string[] = textCoursesPassed.replaceAll(",", ".").split("  ")
    for (let i = 0; i < arr.length-1; i = i+6) {
        const name:string = arr[i]
        const hp:number= Number(arr[i+1].replace(" ", ""))
        const grade:string = arr[i+3].replace(" ", "")
        const date:string = arr[i+4].replace(" ", "")
        const course = new Course(name,hp,grade,date)
        courses.push(course)
    }
    //Failed Courses
    const failedCourses:Course[] = []
    const arrayFailedCrses:string[] = textCoursesFailed.replaceAll(",", ".").split("  ")

    let name:string = null
    let hp:number = null
    let grade:string = null
    let date:string = null

    for (let i = 0; i < arrayFailedCrses.length-1; i++) {
        let key = arrayFailedCrses[i]
        if (key.startsWith(" ")){
            key = key.substring(1)
        }
        if(key.startsWith("(")){
            console.log(key)
            name = arrayFailedCrses[i-1]
            hp = Number(key.replace("(", ""))
            grade = "F"
        }
        if(isDateValid(key)){
            date = key
        }
        if( name && hp && grade && date){

            courses.push(new Course(name,hp,grade,date))
            name = null
            hp = null
            grade = null
            date = null
        }

    }
    return courses


}
export function getAverageGPA(courses:Course[]):number{
    if(courses.length != 0){
        console.log(courses);
        //const expectedHP:number = 180;
        let hpUntilNow:number = 0;
        let gradeHpWeight:number = 0;
        courses.forEach((course:Course)=>{
            gradeHpWeight += grade[course.grade] * (course.hp)
            hpUntilNow += course.hp
        })
        // return gradeHpWeight / expectedHP
        return gradeHpWeight / hpUntilNow
    }
}
