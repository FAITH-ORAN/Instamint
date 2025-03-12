import { any, object, string } from "zod"

export const siginSchema = object({
  email: string().email({ message: "Invalid email format" }).max(255),
  password: string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(255)
    .refine(
      (val) =>
        /^(?=.*[^a-zA-Z0-9])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/u.test(val),
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
        path: ["password"],
      },
    ),
})

export const signupSchema = object({
  username: string()
    .min(3)
    .max(255)
    .trim()
    .refine((val) => val.trim() !== "", {
      message: "Last name is required",
      path: ["lastName"],
    }),
  email: string().email({ message: "Invalid email format" }).max(255),
  password: string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(255)
    .refine(
      (val) =>
        /^(?=.*[^a-zA-Z0-9])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/u.test(val),
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
        path: ["password"],
      },
    ),
})

export const updateUserSchema = object({
  username: string().min(3).max(30),
  file: any(),
})

export const requestResetPassword = object({
  email: string().email({ message: "Invalid email format" }).max(255),
})

export const resetPassword = object({
  newPassword: string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(255)
    .refine(
      (val) =>
        /^(?=.*[^a-zA-Z0-9])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/u.test(val),
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
        path: ["password"],
      },
    ),
  password: string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(255)
    .refine(
      (val) =>
        /^(?=.*[^a-zA-Z0-9])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/u.test(val),
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
        path: ["password"],
      },
    ),
})

export const emailChange = object({
  oldEmail: string().email({ message: "Invalid email format" }).max(255),
  newEmail: string().email({ message: "Invalid email format" }).max(255),
})

export const passwordChange = object({
  currentPassword: string()
    .min(8, "Current password must be at least 8 characters")
    .nonempty("Current password is required"),
  newPassword: string()
    .min(8, "New password must be at least 8 characters")
    .nonempty("New password is required"),
  confirmPassword: string()
    .min(8, "Confirm password must be at least 8 characters")
    .nonempty("Confirm password is required"),
}).strip()

export const userInformationSchema = object({
  userId: string(),
})
