import Head from "next/head";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "react-spinners/BeatLoader";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import TextInput from "../../components/TextInput";
import useSignInMutation from "../../hooks/mutations/use-sign-in-mutation";
import useGoogleSignInMutation from "../../hooks/mutations/use-google-sign-in-mutation";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email format is invalid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignInPage = () => {
  const signInMutation = useSignInMutation();
  const googleSignInMutation = useGoogleSignInMutation();
  const queryClient = useQueryClient();
  const router = useRouter();
  const refGoogleButton = useRef<HTMLDivElement>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      try {
        const response = await signInMutation.mutateAsync({
          email: values.email,
          password: values.password,
        });

        queryClient.setQueryData(["user"], response.user);
        localStorage.setItem("access_token", response.access_token.token);
        router.push("/");
      } catch (error) {
        toast.error("Email or password is invalid !");
      }
    },
  });

  const callback = async (googleResponse: any) => {
    try {
      const response = await googleSignInMutation.mutateAsync({
        token: googleResponse.credential
      });

      queryClient.setQueryData(["user"], response.user);
      localStorage.setItem("access_token", response.access_token.token);
      router.push("/");
    } catch (error) {
      toast.error("Failed to sign in with google !");
    }
  }

  useEffect(() => {
    const clientId =
      "633965568644-f3b18b07t2k1dsoiqdkiqkoi47kmjkj0.apps.googleusercontent.com";

    google.accounts.id.initialize({
      client_id: clientId,
      callback,
    })

    google.accounts.id.renderButton(refGoogleButton.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      width: 400,
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Sign In | Noobium</title>
        <script src="https://accounts.google.com/gsi/client" async defer />
      </Head>

      <NavBar />
      {signInMutation.isLoading || googleSignInMutation.isLoading && (
        <div className="h-screen flex justify-center items-center">
          <Loading size={16} color="rgb(30 64 175)" />
        </div>
      )}
      {!signInMutation.isLoading && !googleSignInMutation.isLoading && (
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

          <Button
            size="large"
            isFullWidth
            onClick={() => formik.handleSubmit()}
          >
            Sign In
          </Button>

          <div className="border-b my-8" />

          <div ref={refGoogleButton} />

          <p className="text-slate-900 font-sans text-sm text-center mt-8">
            Don&lsquo;t have an account ?{" "}
            <Link href="/auth/sign-up">
              <a>
                <span className="text-blue-800">Sign up here</span>
              </a>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
