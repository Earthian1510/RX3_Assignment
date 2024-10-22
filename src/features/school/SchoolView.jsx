import React, {useEffect, useState} from 'react'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudents } from '../students/studentSlice'
import { updateSchoolStats } from './schoolSlice'
import { Link } from 'react-router-dom'

export default function SchoolView() {
  
  const dispatch = useDispatch()
  const students = useSelector((state) => state.students.students)

  const [schoolStats, setSchoolStats] = useState({
    totalStudents: 0,
    avgAttendance: 0,
    avgMarks: 0,
    topStudent: ''
  })
  
  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  useEffect(() => {

    const totalStudents = students.length;

    const totalAttendance = students.reduce((sum, student) => sum + student.attendance, 0)
    const totalMarks = students.reduce((sum, student) => sum + student.attendance, 0)
    const topStudentData = students.reduce((prev, current)=> (prev.marks > current.marks ? prev: current), students[0])

    const avgAttendance = totalStudents ? (totalAttendance / totalStudents).toFixed(2) : 0;
    const avgMarks = totalStudents ? (totalMarks / totalStudents).toFixed(2) : 0

    setSchoolStats({
      totalStudents: totalStudents,
      avgAttendance: avgAttendance,
      avgMarks: avgMarks,
      topStudent: topStudentData ? topStudentData.name : '-'
    })

    dispatch(updateSchoolStats({
      totalStudents: totalStudents,
      avgAttendance: avgAttendance,
      avgMarks: avgMarks,
      topStudent: topStudentData ? topStudentData.name : '-'
    }))

  }, [students, dispatch])

  return (
    <div>
      <Header />
      <div className='container'>
        <h1>School View</h1>
        <div className='mb-3'>
          <Link to='/teachers'>Teachers</Link>
        </div>
        <h2>Student Stats</h2>
        <p>
          Total Students: {schoolStats.totalStudents}
          <br />
          Average Attendance: {schoolStats.avgAttendance}
          <br />
          Average Marks: {schoolStats.avgMarks}
          <br />
          Top Student: {schoolStats.topStudent}
        </p>

      </div>
    </div>
  )
}
