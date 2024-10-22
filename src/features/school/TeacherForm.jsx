import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { addTeacherAsync, updateTeacherAsync, fetchTeachers } from "./schoolSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [teacherData, setTeacherData] = useState({
    name: '',
    age: '',
    gender: '',
    subject: '',
    classNo: ''
  })

  const teacher = useSelector((state) => state.school.teachers.find((teacher) => teacher._id === id))

  useEffect(() => {
    if(id && !teacher){
      dispatch(fetchTeachers())
    }
  }, [id, teacher, dispatch])

  useEffect(() => {
    if(teacher){
      setTeacherData({
        name: teacher.name,
        age: teacher.age,
        gender: teacher.gender,
        subject: teacher.subject,
        classNo: teacher.classNo
      })
    }
  }, [teacher])


  const handleTeacherData = (e) => {
    const {name, value} = e.target 

    setTeacherData((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newTeacher = {
      ...teacherData,
      age: parseInt(teacherData.age) || 0
    }

    if(id) {
      newTeacher._id = id;
      dispatch(updateTeacherAsync(newTeacher))
      navigate(`/teachers/${id}`)
    }
    else{
      dispatch(addTeacherAsync(newTeacher))
      setTeacherData({
        name: '',
        age: '',
        gender: '',
        subject: '',
        classNo: ''
      })
    }

    navigate('/teachers')

  }


  return (
    <div className="container">
      <Header />
      <br />
      <h1>{id ? "Edit Teacher" : "Add Teacher"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            name="name"
            value={teacherData.name}
            onChange={handleTeacherData}
          />
        </div>
        <br />
        <div>
          <input
            type="number"
            placeholder="Age"
            className="form-control"
            name="age"
            value={teacherData.age}
            onChange={handleTeacherData}
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
              className="form-check-input"
              checked = {teacherData.gender === 'male'}
              onChange={handleTeacherData}
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              className="form-check-input"
              style={{ marginLeft: "15px", marginRight: "5px" }}
              checked={teacherData.gender === 'female'}
              onChange={handleTeacherData}
            />
            Female
          </label>
        </div>
        <br />
        <div>
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                className="form-control"
                value={teacherData.subject}
                onChange={handleTeacherData}
              />
            </div>
            <br />
            <div>
              <input
                type="text"
                placeholder="Class Number"
                name="classNo"
                className="form-control"
                value={teacherData.classNo}
                onChange={handleTeacherData}
              />
            </div>
            <br />
        
        <button className="btn btn-success" type="submit">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
