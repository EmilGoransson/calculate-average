export default function DisplayCourses(props){
    console.log(props.courses)
    function displayCourses(course){
        return (<div className="flex flex-row space-x-4 justify-center" key={course.name}>
            <div>{course.name} </div><div>{course.hp}</div><div>{course.date}</div><div>{course.grade}</div>
        </div>)
    }
    return <div className="">
        {props.courses.map(displayCourses)}
    </div>
}