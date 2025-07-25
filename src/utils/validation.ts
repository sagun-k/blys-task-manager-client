import * as Yup from "yup";
import { Priority } from "../enums/Priority";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const taskSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .required("Description is also required")
    .max(500, "Description must be less than 500 characters"),
  priority: Yup.string()
    .oneOf([Priority.LOW, Priority.MEDIUM, Priority.HIGH], "Invalid priority")
    .required("Priority is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "End date cannot be in the past"
    ),
});
