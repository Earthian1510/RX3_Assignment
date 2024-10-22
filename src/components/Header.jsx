import React from 'react'
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className='container'>
        <div>
          <nav className='navbar navbar-expand-lg navbar-light bgh-light'>
            
            <Link 
                to="/"
                className='navbar-brand' 
            >
                Student Managment System
            </Link>

            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent" 
              aria-controls="navbarSupportedContent" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link to="/students" className='nav-link'>Students</Link>
              </li>
              <li className='nav-item'>
                <Link to="/class" className='nav-link'>Class</Link>
              </li>
              <li className='nav-item'>
                <Link to="/teachers" className='nav-link'>Teachers</Link>
              </li>
              <li className='nav-item'>
                <Link to="/school" className='nav-link'>School</Link>
              </li>
            </ul>
            </div>
          </nav>
        </div>
    </div>
  )
}
