import Head from "next/head";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import TextInput from "../../components/TextInput";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email format is invalid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignInPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: () => {
      alert("Sign In successfully");
    },
  });

  return (
    <div>
      <Head>
        <title>Sign In | Noobium</title>
      </Head>

      <NavBar />
      <div className="w-[400px] mx-auto py-24">
        <h1 className="font-sans font-bold text-slate-900 text-5xl text-center mb-4">
          Sign In
        </h1>
        <p className="font-sans text-slate-900 text-center mb-16">
          Fill the form to sign in to your account.
        </p>

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
        <div className="h-10" />

        <Button size="large" isFullWidth onClick={() => formik.handleSubmit()}>
          Sign In
        </Button>

        <p className="text-slate-900 font-sans text-sm text-center mt-8">
          Don&lsquo;t have an account ?{" "}
          <Link href="/auth/sign-up">
            <a>
              <span className="text-blue-800">Sign up here</span>
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
