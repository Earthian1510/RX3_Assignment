import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'
import { fetchStudents, deleteStudentAsync } from './studentSlice'


export default function StudentDetail() {

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const student = useSelector((state) => state.students.students.find((student) => student._id === id))
//   console.log(student)

  useEffect(() => {
    if(!student){
        dispatch(fetchStudents())
    }
  }, [student, dispatch])

  const handleDelete = () => {
    if(window.confirm("Are you sure you want to delete this student?")) {
        dispatch(deleteStudentAsync(id)).then(() => {
            navigate('/students')
        })
    }
  }

  return (
    <div>
        <Header />
        {
            student 
            ? 
            (
                <div className='container'>
                <h1>Student Details</h1>
                <p>
                    Name: {student.name} <br />
                    Age: {student.age} <br />
                    Grade: {student.grade} <br />
                    Gender: {student.gender} <br />
                    Attendance: {student.attendance} <br />
                    Marks: {student.marks}
                </p>
                <button className='btn btn-warning'>
                    <Link 
                        className='text-black'
                        to={`/students/addStudent/${student._id}`}
                    >
                        Edit Details
                    </Link>
                </button>
                <button className='btn btn-danger mx-2' onClick={handleDelete}>
                    <Link className='text-white'>Delete</Link>
                </button>
                
            </div> 
            )
            :
            (
                <p>Loading Students details...</p>
            )
            
        }
    </div>
  )
}
