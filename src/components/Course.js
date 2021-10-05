import { hasConflict, terms } from "../utilities/times";

const getCourseNumber = ( course ) => (
    course.id.slice(1,4)
);

const getCourseTerm = ( course ) => (
    terms[course.id.charAt(0)]
);

const toggle = (x, lst) => (
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

export const Course = ( { course, time, selected, setSelected} ) => {
    const isSelected = selected.includes(course);
    const isDisabled = !isSelected && hasConflict(course, selected);
    const style = {
      backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
    }
  return(<div className="card m-1 p-2"
  style = {style}
  onClick={() => setSelected(toggle(course, selected))}>
    <div className="card-body" >
      <div className="card-title">
        { getCourseTerm(course) } CS { getCourseNumber(course) }
      </div>
      <div className="card-text">
        { course.title } { time }
      </div>
    </div>
  </div>);
  }