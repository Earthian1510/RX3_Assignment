import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentList({ students }) {
  const studentsArr = students;
  
  return (
    <div>
      <br />
      <h2>Student List</h2>
      <ul>
        {
          studentsArr.map((person) => (
            <li key={person._id}>
              <Link to={`/students/${person._id}`}>
                {person.name} (Age: {person.age}) 
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
