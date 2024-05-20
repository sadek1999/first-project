import { Request, Response } from "express";
import { StudentServices } from "./service";



const createStudent=async(req:Request,res :Response)=>{

try{
    const {student :studentData} =req.body;

const result= await StudentServices.createStudentIntoDB(studentData)

res.status(200).json({
    success:true,
    massage:'successfully created the student',
    data:result
})
} 
catch(err){
    console.log(err)
}
    
}

export const StudentController={
    createStudent
}