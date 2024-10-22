import React from 'react'
import StudentList from './StudentList'
import { fetchStudents } from './studentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'

export default function StudentView() {
  
    const dispatch = useDispatch()
    const {students, status, error} = useSelector((state)=> state.students)
    
    useEffect(() => {
      dispatch(fetchStudents())
    }, [])

    return (
        <div>
            <Header />
            <div className="container">
                <h1>Student View</h1>
                <button className='btn btn-warning'>
                    <Link to='/students/addStudent'>
                        Add Student
                    </Link>
                </button>

                {status === 'loading' && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {
                    status === 'success' 
                    &&
                    <StudentList students={students}/>
                }
            </div>
            
        </div>
    )
}
