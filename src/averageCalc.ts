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
function trimText(text:string){
    let trimmedText:string = text.substring(text.indexOf("Not" ), text.indexOf("Summering"))
    trimmedText = trimmedText.substring(4,text.lastIndexOf("Kontrollera "))
    return trimmedText
}

function extractCourses(trimmedText: string){
    const courses:Course[] = [];
    const arr:string[] = trimmedText.split("  ")
    console.log(arr.length)
    for (let i = 0; i < arr.length-1; i = i+6) {
        const name:string = arr[i]
        const hp:number= Number(arr[i+1])
        const grade:string = arr[i+3]
        const date:string = arr[i+4]
        const course = new Course(name,hp,grade,date)
        courses.push(course)
    }
    console.log(courses)



}
function calculateAverage(Courses:Course[]){
    let sum = 0;

}
export function extractData(text:string){
    const trimmedTxt = trimText(text)
    extractCourses(trimmedTxt)
    return trimmedTxt;
}