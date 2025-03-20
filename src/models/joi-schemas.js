import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(5).required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const StaffSpec = {
  role: Joi.string().required(),
  name: Joi.string().required(),
  years: Joi.string().required(),
};

export const DepartmentSpec = {
  title: Joi.string().required(),
};

export const HospitalSpec = {
  name: Joi.string().min(1).required(),
  type: Joi.string().min(1).required(),
};

