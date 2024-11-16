import { z } from "zod";


const stringValidationRules = {
  regex: /^[A-Za-z.]+(?: [A-Za-z.]+)*$/,
  refine: (value: string) => {
    const words = value.split(" ");
    return words.every((word) => /^[A-Z][a-z.]*$/.test(word));
  },
};

const regSchema = z
  .object({
    usertype: z.enum(["Student", "Teacher", "Instructor"]),
    name: z
      .string()
      .regex(
        stringValidationRules.regex,
        "Starting of each word must be uppercase letter"
      )
      .refine((value) => stringValidationRules.refine(value)),
    dept: z.enum(["IRE", "EdTech"]),

    // session: z
    //   .string()
    //   .regex(/^\d{4}-\d{2}$/, "Session must follow the pattern YYYY-YY"),
    session: z.enum([
      "2018-19",
      "2019-20",
      "2020-21",
      "2021-22",
      "2022-23",
      "2023-24",
    ]),
    id: z
      .number({ invalid_type_error: "Only digits are accepted" })
      .int()
      .min(10000, "ID must contain 5 digit to 8 digit")
      .max(9999999, "ID must contain 5 digit to 7 digit"),
    phone_no: z
      .string()
      .regex(/^(013|016|014|017|019|018)\d{8}$/, "Input a valid Phone number"),

    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?bdu\.ac\.bd$/,
        "Must follow 'example@bdu.ac.bd' format"
      ),
    username: z
      .string()
      .regex(
        /^(?=.{5,})[a-zA-Z][a-zA-Z0-9_-]*$/,
        "At least 5 characters long and start with alphabets"
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password cannot exceed 20 characters."),
    conpassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password cannot exceed 20 characters."),
  })
  .refine((data) => data.password === data.conpassword, {
    path: ["conpassword"],
    message: "Passwod doesnot match",
  });
const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 characters long" }),
});

type regData = z.infer<typeof regSchema>;
type otpData = z.infer<typeof otpSchema>;

const Registration = () => {
  return(
    <>
    </>
  )
}
