import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie'

const loginSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?bdu\.ac\.bd$/,
      "Must follow 'example@bdu.ac.bd' format"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password cannot exceed 20 characters."),
});
const otpSchema = z.object({
  otp: z
    .number({ invalid_type_error: "OTP is 6 digits number." })
    .int()
    .min(100000, "OTP is 6 digits number")
    .max(999999, "OTP is 6 digits number"),
});

type loginData = z.infer<typeof loginSchema>;
type otpData = z.infer<typeof otpSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });