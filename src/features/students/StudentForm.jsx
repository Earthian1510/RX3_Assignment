import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudentAsync,
  fetchStudents,
  updateStudentAsync,
} from "./studentSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "male",
    marks: "",
    attendance: "",
  });

  const student = useSelector((state) =>
    state.students.students.find((student) => student._id === id)
  );

  useEffect(() => {
    if (id && !student) {
      dispatch(fetchStudents());
    }
  }, [id, student, dispatch]);
  
  useEffect(() => {

    if (student) {
      setStudentData({
        name: student.name,
        age: student.age,
        grade: student.grade,
        gender: student.gender || 'male',
        marks: student.marks || '',
        attendance: student.attendance || '',
      });
    }
  }, [student])

  const handleStudentData = (e) => {
    const { name, value } = e.target;

    setStudentData((prev) => ({
      ...prev,
      [name]: name === "age" || name === "marks" || name === "attendance" 
        ? value === "" ? "" : Number(value)
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      ...studentData,
      age: parseInt(studentData.age) || 0,
      marks: parseInt(studentData.marks) || 0,
      attendance: parseInt(studentData.attendance) || 0,
    };

    if (id) {
      newStudent._id = id;
      dispatch(updateStudentAsync(newStudent));
      navigate(`/students/${id}`);
    } 
    else {
      dispatch(addStudentAsync(newStudent));
      setStudentData({
        name: "",
        age: "",
        grade: "",
        gender: "male",
        marks: "",
        attendance: "",
      });
    }

    navigate("/students");
  };

  return (
    <div className="container">
      <Header />
      <br />
      <h1>{id ? "Edit Student" : "Add Student"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            name="name"
            value={studentData.name}
            onChange={handleStudentData}
          />
        </div>
        <br />
        <div>
          <input
            type="number"
            placeholder="Age"
            className="form-control"
            name="age"
            value={studentData.age}
            onChange={handleStudentData}
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="Grade"
            className="form-control"
            name="grade"
            value={studentData.grade}
            onChange={handleStudentData}
          />
        </div>
        <br />
        <div>
          Gender:{" "}
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={studentData.gender === 'male'}
              className="form-check-input"
              onChange={handleStudentData}
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={studentData.gender === 'female'}
              className="form-check-input"
              style={{ marginLeft: "15px", marginRight: "5px" }}
              onChange={handleStudentData}
            />
            Female
          </label>
        </div>
        <br />
        

        {/* When Form is updating */}
        {id && (
          <>
            <div>
              <input
                type="number"
                placeholder="Marks"
                name="marks"
                className="form-control"
                value={studentData.marks}
                onChange={handleStudentData}
              />
            </div>
            <br />
            <div>
              <input
                type="number"
                placeholder="Attendance"
                name="attendance"
                className="form-control"
                value={studentData.attendance}
                onChange={handleStudentData}
              />
            </div>
            <br />
          </>
        )}

        <button className="btn btn-success" type="submit">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
