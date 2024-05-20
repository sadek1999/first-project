import { Request, Response } from 'express';
import { StudentServices } from './service';
import Joi from 'joi';

const createStudent = async (req: Request, res: Response) => {
  try {


    const userNameSchema = Joi.object({
      firstName: Joi.string()
        .trim()
        .required()
        .max(20)
        .regex(/^[A-Z][a-z]*$/, 'capitalize format')
        .messages({
          'string.base': 'First name must be a string',
          'string.empty': 'First name is required',
          'string.max': 'First name cannot be more than 20 characters',
          'string.pattern.name': 'First name must be capitalized',
        }),
      meddleName: Joi.string().optional(),
      lastName: Joi.string()
        .required()
        .regex(/^[A-Za-z]+$/, 'alpha')
        .messages({
          'string.base': 'Last name must be a string',
          'string.empty': 'Last name is required',
          'string.pattern.name': 'Last name must contain only letters',
        }),
    });
    
    // Guardian schema
    const guardianSchema = Joi.object({
      fatherName: Joi.string().required().messages({
        'string.empty': "Father's name is required",
      }),
      fatherOccupation: Joi.string().required().messages({
        'string.empty': "Father's occupation is required",
      }),
      fatherPhone: Joi.string().required().messages({
        'string.empty': "Father's phone number is required",
      }),
      motherName: Joi.string().required().messages({
        'string.empty': "Mother's name is required",
      }),
      motherOccupation: Joi.string().required().messages({
        'string.empty': "Mother's occupation is required",
      }),
      motherPhone: Joi.string().required().messages({
        'string.empty': "Mother's phone number is required",
      }),
    });
    
    // Local Guardian schema
    const localGuardianSchema = Joi.object({
      name: Joi.string().required().messages({
        'string.empty': "Local guardian's name is required",
      }),
      occupation: Joi.string().required().messages({
        'string.empty': "Local guardian's occupation is required",
      }),
      phone: Joi.string().required().messages({
        'string.empty': "Local guardian's phone number is required",
      }),
      address: Joi.string().required().messages({
        'string.empty': "Local guardian's address is required",
      }),
    });
    
    // Student schema
    const studentSchema = Joi.object({
      Id: Joi.string().required().messages({
        'string.empty': 'Student ID is required',
      }),
      name: userNameSchema.required().messages({
        'any.required': 'Name is required',
      }),
      gender: Joi.string().valid('male', 'female').required().messages({
        'any.only': '{#label} is not a valid gender',
        'string.empty': 'Gender is required',
      }),
      email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address',
        'string.empty': 'Email is required',
      }),
      phoneNo: Joi.string().required().messages({
        'string.empty': 'Phone number is required',
      }),
      emergencyNo: Joi.string().required().messages({
        'string.empty': 'Emergency phone number is required',
      }),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .messages({
          'any.only': '{#label} is not a valid blood group',
        }),
      presentAddress: Joi.string().required().messages({
        'string.empty': 'Present address is required',
      }),
      permanentAddress: Joi.string().required().messages({
        'string.empty': 'Permanent address is required',
      }),
      guardian: guardianSchema.required().messages({
        'any.required': 'Guardian information is required',
      }),
      localGuardian: localGuardianSchema.required().messages({
        'any.required': 'Local guardian information is required',
      }),
      profileImg: Joi.string().optional(),
      isActive: Joi.string().valid('active', 'blocked').required().messages({
        'any.only': '{#label} is not a valid status',
        'string.empty': 'Status is required',
      }),
    });



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
