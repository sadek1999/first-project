import { z } from "zod";


const userNameValidationSchema = z.object({
    firstName: z.string()
      .trim()
      .max(20, { message: 'First name cannot be more than 20 characters' })
      .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
        message: 'First name must be capitalized',
      }),
    meddleName: z.string().optional(),
    lastName: z.string()
      .nonempty('Last name is required')
      .refine(value => /^[A-Za-z]+$/.test(value), {
        message: 'Last name must contain only letters',
      }),
  });
  
  // Guardian schema
  const guardianValidationSchema = z.object({
    fatherName: z.string().nonempty("Father's name is required"),
    fatherOccupation: z.string().nonempty("Father's occupation is required"),
    fatherPhone: z.string().nonempty("Father's phone number is required"),
    motherName: z.string().nonempty("Mother's name is required"),
    motherOccupation: z.string().nonempty("Mother's occupation is required"),
    motherPhone: z.string().nonempty("Mother's phone number is required"),
  });
  
  // Local Guardian schema
  const localGuardianValidationSchema = z.object({
    name: z.string().nonempty("Local guardian's name is required"),
    occupation: z.string().nonempty("Local guardian's occupation is required"),
    phone: z.string().nonempty("Local guardian's phone number is required"),
    address: z.string().nonempty("Local guardian's address is required"),
  });
  
  // Student schema
  const studentValidationSchema = z.object({
    Id: z.string().nonempty('Student ID is required'),
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female'], { 
      errorMap: (issue, _ctx) => {
        if (issue.code === 'invalid_enum_value') {
          return { message: `${issue.input} is not a valid gender` };
        }
        return { message: 'Gender is required' };
      }
    }),
    email: z.string().email('Email must be a valid email address'),
    phoneNo: z.string().nonempty('Phone number is required'),
    emergencyNo: z.string().nonempty('Emergency phone number is required'),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional()
      .or(z.literal('').transform(() => undefined)).optional()
      .refine(value => value === undefined || ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(value), {
        message: '{VALUE} is not a valid blood group',
      }),
    presentAddress: z.string().nonempty('Present address is required'),
    permanentAddress: z.string().nonempty('Permanent address is required'),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'blocked'], {
      errorMap: (issue, _ctx) => {
        if (issue.code === 'invalid_enum_value') {
          return { message: `${issue.input} is not a valid status` };
        }
        return { message: 'Status is required' };
      }
    }),
  });
  
  export default studentValidationSchema