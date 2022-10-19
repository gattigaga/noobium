import Head from "next/head";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Loading from "react-spinners/BeatLoader";

import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import TextInput from "../../components/TextInput";
import useSignUpMutation from "../../hooks/mutations/use-sign-up-mutation";

const SignUpSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(8, "Full Name should have at least 8 characters")
    .max(30, "Full Name should have maximum 30 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Email format is invalid")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should have at least 8 characters")
    .max(50, "Password should have maximum 50 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Confirm Password is mismatch")
    .required("Confirm Password is required"),
});

const SignUpPage = () => {
  const signUpMutation = useSignUpMutation();
  const queryClient = useQueryClient();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      try {
        const response = await signUpMutation.mutateAsync({
          name: values.fullname,
          email: values.email,
          password: values.password,
        });

        queryClient.setQueryData(["user"], response.user);
        localStorage.setItem("access_token", response.access_token.token);
        router.push("/");
      } catch (error) {
        toast.error("Failed to sign up !");
      }
    },
  });

  return (
    <div>
      <Head>
        <title>Sign Up | Noobium</title>
      </Head>

      <NavBar />
      {signUpMutation.isLoading && (
        <div className="h-screen flex justify-center items-center">
          <Loading size={16} color="rgb(30 64 175)" />
        </div>
      )}
      {!signUpMutation.isLoading && (
        <div className="w-[400px] mx-auto py-24">
          <h1 className="font-sans font-bold text-slate-900 text-5xl text-center mb-4">
            Sign Up
          </h1>
          <p className="font-sans text-slate-900 text-center mb-16">
            Fill the form to create an account.
          </p>

          <TextInput
            name="fullname"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formik.values.fullname}
            hasError={!!formik.errors.fullname}
            errorMessage={formik.errors.fullname}
            onChange={formik.handleChange}
          />
          <div className="h-4" />
          <TextInput
            name="email"
            label="Email Address"
            type="text"
            placeholder="Enter your email address"
            value={formik.values.email}
            hasError={!!formik.errors.email}
            errorMessage={formik.errors.email}
            onChange={formik.handleChange}
          />
          <div className="h-4" />
          <TextInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formik.values.password}
            hasError={!!formik.errors.password}
            errorMessage={formik.errors.password}
            onChange={formik.handleChange}
          />
          <div className="h-4" />
          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Enter your password again"
            value={formik.values.confirmPassword}
            hasError={!!formik.errors.confirmPassword}
            errorMessage={formik.errors.confirmPassword}
            onChange={formik.handleChange}
          />
          <div className="h-10" />

          <Button
            size="large"
            isFullWidth
            onClick={() => formik.handleSubmit()}
          >
            Sign Up
          </Button>

          <p className="text-slate-900 font-sans text-sm text-center mt-8">
            Already have an account ?{" "}
            <Link href="/auth/sign-in">
              <a>
                <span className="text-blue-800">Sign in here</span>
              </a>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
