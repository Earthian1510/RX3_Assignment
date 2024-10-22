import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import App from './App.jsx'
import StudentView from './features/students/StudentView.jsx'
import StudentForm from './features/students/StudentForm.jsx'
import StudentDetail from './features/students/StudentDetail.jsx'
import ClassView from './features/classes/ClassView.jsx'
import SchoolView from './features/school/SchoolView.jsx'
import TeacherView from './features/school/TeacherView.jsx'
import TeacherForm from './features/school/TeacherForm.jsx'
import TeacherDetails from './features/school/TeacherDetails.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: '/students',
    element: <StudentView />
  },
  {
    path: '/students/addStudent',
    element: <StudentForm />
  },
  
  {
    path: '/students/addStudent/:id',
    element: <StudentForm />
  },

  {
    path: '/students/:id',
    element: <StudentDetail />
  },
  {
    path: '/class',
    element: <ClassView />
  },
  {
    path: '/school',
    element: <SchoolView />
  },
  {
    path: '/teachers',
    element: <TeacherView />
  },
  {
    path: '/teachers/addTeacher',
    element: <TeacherForm />
  },
  {
    path: '/teachers/addTeacher/:id',
    element: <TeacherForm />
  },
  {
    path: '/teachers/:id',
    element: <TeacherDetails />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
