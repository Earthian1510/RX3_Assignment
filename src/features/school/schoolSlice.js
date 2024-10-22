import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const BASE_URL = "https://backend-students.vercel.app/teachers";

// GET 
export const fetchTeachers = createAsyncThunk("teachers/fetchTeachers", async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
})

// POST 
export const addTeacherAsync = createAsyncThunk("teachers/addTeacher", async (teacherData) => {
    const response = await axios.post(BASE_URL, teacherData)
    return response.data;
})

// UPDATE 
export const updateTeacherAsync = createAsyncThunk("teachers/updateTeacher", 
    async (teacherData) => {
        const response = await axios.put(`${BASE_URL}/${teacherData._id}`)
        return response.data;
    }
)

// DELETE 
export const deleteTeacherAsync = createAsyncThunk("teachers/deleteTeacher", 
    async (id) => {
        await axios.delete(`${BASE_URL}/${id}`)
        return id;
    }
)

export const schoolSlice = createSlice({
    name: 'school',
    initialState: {
        teachers: [],
        schoolStats: {
            totalStudents: 0,
            averageAttendance: 0,
            averageMarks: 0,
            topStudent: ''
        },
        state: 'idle',
        error: null
    },

    reducers: {
        updateSchoolStats: (state, action) => {
            state.schoolStats = {...state.schoolStats, ...action.payload}
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchTeachers.pending, (state) => {
            state.status = 'loading';
        })

        builder.addCase(fetchTeachers.fulfilled, (state, action) => {
            state.status = "success",
            state.teachers = action.payload 
        })

        builder.addCase(fetchTeachers.rejected, (state, action) => {
            state.status = "error",
            state.error = action.error.message
        })

        builder.addCase(addTeacherAsync.fulfilled, (state, action) => {
            state.teachers.push(action.payload)
        })

        builder.addCase(updateTeacherAsync.fulfilled, (state, action) => {
            const index = state.teachers.findIndex((teacher) => teacher._id == action.payload._id)
            if(index !== -1) {
                state.teachers[index] = action.payload
            }
        })

        builder.addCase(deleteTeacherAsync.fulfilled, (state, action) => {
            state.teachers = state.teachers.filter((teacher) => teacher._id !== action.payload)
        })
    }

})

export const { updateSchoolStats } = schoolSlice.actions
export default schoolSlice.reducer