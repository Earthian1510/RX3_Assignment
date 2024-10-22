import React from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Header from '../../components/Header'
import { fetchTeachers, deleteTeacherAsync } from './schoolSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function TeacherDetails() {

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const teacher = useSelector((state) => state.school.teachers.find((teacher) => teacher._id === id))
//   console.log(teacher)

  useEffect(() => {
    if(!teacher){
        dispatch(fetchTeachers())
    }
  }, [teacher, dispatch])

  const handleDelete = () => {
    if(window.confirm("Are you sure you want to delete this teacher?")) {
        dispatch(deleteTeacherAsync(id)).then(() => {
            navigate('/teachers')
        })
    }
  }

  return (
    <div>
        <Header />
        {
            teacher 
            ? 
            (
                <div className='container'>
                    <h1>Teacher Details</h1>
                    <p>
                        Name: {teacher.name} <br />
                        Age: {teacher.age} <br />
                        Gender: {teacher.gender} <br />
                        Subject: {teacher.subject} <br />
                        Class Number: {teacher.classNo} <br />
                    </p>
                    <button className='btn btn-warning'>
                        <Link className='text-black' to={`/teachers/addTeacher/${teacher._id}`}>
                            Edit Details
                        </Link>
                    </button>
                    <button className='btn btn-danger mx-3' onClick={handleDelete}>
                        <Link className='text-white'>
                            Delete
                        </Link>
                    </button>


                </div>
            )
            :
            (
                <p className='container'>Loading Teacher Details...</p>
            )
        }
    </div>
  )
}
