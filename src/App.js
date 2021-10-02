import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Banner = ({ title }) => (
  <h1> { title } </h1>
);
  
const terms = { 'F':'Fall', 'W':'Winter', 'S':'Spring' } 

const getCourseTerm = ( course ) => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = ( course ) => (
  course.id.slice(1,4)
);

const Course = ( { course } ) => (
<div className="card m-1 p-2">
  <div className="card-body" >
    <div className="card-title">
      { getCourseTerm(course) } CS { getCourseNumber(course) }
    </div>
    <div className="card-text">
      { course.title }
    </div>
  </div>
</div>
);

const CourseList = ({ courses }) => (
  <div className="course-list">
    { Object.values(courses).map(course => <Course key = { course.id } course = { course }/>) }
  </div>
  
);

const App = () =>  {
  const [schedule, setSchedule] = useState();
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  
  useEffect (() => {
    const fetchScheule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    fetchScheule();
  }, []);
  

  if(!schedule) return <h1> Loading Schedule </h1>;

  return (<div className="container">
    <Banner title = { schedule.title } />
    <CourseList courses = { schedule.courses }/> 
  </div>)
}

export default App;
