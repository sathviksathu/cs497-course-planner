import React, { useState } from "react";
import { terms } from "../utilities/times";
import { Course } from "./Course";
import  { signInWithGoogle, signOut, useUserState } from "../utilities/firebase";

const getCourseTerm = ( course ) => (
    terms[course.id.charAt(0)]
);
  
const TermButton = ( {term, setTerm, checked} ) => (
    <>
      <input type="radio" id= { term } cassName="btn-check" autoComplete="off" checked={ checked } 
      onChange={() => setTerm(term)} />
      <label class="btn btn-success m-1 p-2" htmlFor={term}> {term}</label>
    </>
)
    
const SignInButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const SignOutButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signOut()}>
    Sign Out
  </button>
);

const TermSelector = ( { term, setTerm } ) => {
  const [user] = useUserState();
  return(
    <div className="btn-toolbar justify-content-between">
      <div className="btn-group">
      { 
        Object.values(terms).map(
          value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
        )
      }
      </div>
      { user ? <SignOutButton /> : <SignInButton /> }
    </div>
  );

 }

export const CourseList = ({ courses }) => {
    const [term, setTerm] = useState("Fall");
    const [selected, setSelected] = useState([]);
  
    const termCourses = Object.values(courses).filter(course => getCourseTerm(course) === term )
    return(<>
      <TermSelector term={term} setTerm={setTerm}/>
      <div className="course-list">
        { termCourses.map(course => <Course key = { course.id } course = { course } time = {course.meets}
        selected={selected} setSelected={ setSelected }  />) }
      </div>
      </>
    );
}