import express from 'express'
import { StudentController } from './student.controller'
import e from 'express'

const router=express.Router()

router.post('/create-student',StudentController.createStudent)

export  const StudentRout=router;