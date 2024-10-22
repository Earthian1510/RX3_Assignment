import React, {useEffect} from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSortBy, fetchStudents } from "../students/studentSlice";

export default function ClassView() {
  const dispatch = useDispatch()
  const students = useSelector((state) => state.students.students)
  const filter = useSelector((state) => state.students.filter)
  const sortBy = useSelector((state) => state.students.sortBy)


  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])


  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value 
    dispatch(setFilter(selectedFilter))
  }

  const handleSortChange = (event) => {
    const selectedSortBy = event.target.value;
    dispatch(setSortBy(selectedSortBy));
  };

  const filteredStudents = students.filter((student) => {
    if(filter === 'all'){
      return true 
    }
    
    return filter === 'boys' ? student.gender === 'male' : student.gender === 'female'
  })


  const sortedStudent = filteredStudents.sort((a,b) => {
    if(sortBy === 'name') return a.name.localeCompare(b.name);
    return a[sortBy] - b[sortBy]
  })

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <h1>Class View</h1>
          <div className="row">
            <div className="col">
              Filter by Gender
              <br />
              <select 
                name="genderFilter" 
                className="form-control"
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
              </select>
            </div>
            <div className="col">
              Sort By
              <br />
              <select 
                name="sortBy" 
                className="form-control"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="name">Name</option>
                <option value="marks">Marks</option>
                <option value="attendance">Attendance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="container mt-3">
          <h2>Student List</h2>
          <ul>
            {
              sortedStudent.length > 0 ? sortedStudent.map((student) => (
                <li key={student._id}>
                  {student.name} - {student.gender} - Marks: {student.marks} - Attendance: {student.attendance}
                </li>
              ))
              :
              (
                <li>No student found.</li>
              )
            }
          </ul>
        </div>
      </main>
    </>
  );
}
