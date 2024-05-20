import { Request, Response } from 'express';
import { StudentServices } from './service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    const result = await StudentServices.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      massage: 'successfully created the student',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: 'some think went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentFromDB();

    res.status(200).json({
      success: true,
      massage: 'students are read successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    // console.log(studentId)
    res.status(200).json({
      success: true,
      massage: 'a student read successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
