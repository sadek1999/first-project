import exp from 'constants';
import { Schema, model, connect } from 'mongoose';


export type Guardian ={
    fatherName:string;
    fatherOccupation:string;
    fatherPhone:string;

    motherName:string;
    motherOccupation:string;
    motherPhone:string;
}

export type LocalGuardian={
    name:string;
    occupation:string;
    phone:string;
    address:string
}

export type UserName={
    firstName:string;
    meddleName:string;
    lastName:string
}


export type Student= {
    Id:string;
    name: UserName;
    gender:"male"|"female";
    email: string;
    phoneNo:string;
    emergencyNo:string;
    bloodGroup?:'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress:string;
    permanentAddress:string;
    guardian:Guardian;
    localGuardian:LocalGuardian;
    profileImg?:string;
    isActive:'active'|'blocked'
  }