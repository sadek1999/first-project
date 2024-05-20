import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const getStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (Id: string) => {
  const result = await StudentModel.findOne({ Id });

  return result;
};

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getStudentFromDB,
  getSingleStudentFromDB,
};
