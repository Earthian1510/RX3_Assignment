import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTeachers } from "./schoolSlice";

export default function TeacherView() {
  const dispatch = useDispatch();
  const { teachers, status, error } = useSelector((state) => state.school);

  // console.log(teachers);
  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Link className="btn btn-primary" to="/teachers/addTeacher">
          Add Teacher
        </Link>
      </div>

      <div className="container mt-3">
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      </div>
      {status === "success" && (
        <div className="container">
          <br />
          <h2>Teachers List</h2>
          <ul>
            {teachers.map((person) => (
              <li key={person._id}>
                <Link to={`/teachers/${person._id}`}>
                  {person.name} (Class No: {person.classNo})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
